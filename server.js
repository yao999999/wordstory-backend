import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import wordbanks from './data/wordbanks.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// 中间件
app.use(cors());
app.use(express.json());

// ==================== 词库接口 ====================

// 获取所有词库列表
app.get('/api/wordbanks', (req, res) => {
  const list = Object.entries(wordbanks).map(([id, words]) => ({
    id,
    name: getWordbankName(id),
    count: words.length,
  }));
  res.json({ success: true, data: list });
});

// 获取指定词库的单词列表
app.get('/api/wordbanks/:id', (req, res) => {
  const { id } = req.params;
  const words = wordbanks[id];

  if (!words) {
    return res.status(404).json({ success: false, message: `词库 "${id}" 不存在` });
  }

  res.json({
    success: true,
    data: {
      id,
      name: getWordbankName(id),
      words,
    },
  });
});

// ==================== 核心生成接口 ====================

// 生成单词故事
app.post('/api/generate', async (req, res) => {
  try {
    const { wordbankId, workInfo, count = 20 } = req.body;

    // 参数校验
    if (!wordbankId) {
      return res.status(400).json({
        success: false,
        message: '缺少必要参数：wordbankId',
      });
    }

    if (!workInfo || !workInfo.title || !workInfo.type) {
      return res.status(400).json({
        success: false,
        message: '缺少必要参数：workInfo（需包含 title 和 type）',
      });
    }

    // 获取词库
    const bankWords = wordbanks[wordbankId];
    if (!bankWords) {
      return res.status(404).json({
        success: false,
        message: `词库 "${wordbankId}" 不存在`,
      });
    }

    // 随机选取单词
    const selectedWords = getRandomWords(bankWords, Math.min(count, bankWords.length));

    // 构建提示词
    const prompt = buildPrompt(selectedWords, workInfo);

    // 调用 DeepSeek API
    const aiResponse = await callDeepSeekAPI(prompt);

    // 解析 AI 返回的内容
    const result = parseAIResponse(aiResponse, selectedWords);

    res.json({
      success: true,
      data: {
        wordbank: { id: wordbankId, name: getWordbankName(wordbankId) },
        workInfo: { title: workInfo.title, type: workInfo.type },
        words: result,
      },
    });
  } catch (error) {
    console.error('生成失败:', error);
    res.status(500).json({
      success: false,
      message: '生成失败，请稍后重试',
      error: error.message,
    });
  }
});

// ==================== 工具函数 ====================

// 获取词库中文名称
function getWordbankName(id) {
  const names = {
    ielts: '雅思核心词汇',
    cet4: '四级核心词汇',
    cet6: '六级核心词汇',
    gre: 'GRE核心词汇',
    toefl: '托福核心词汇',
  };
  return names[id] || id;
}

// 从词库中随机选取指定数量的单词
function getRandomWords(words, count) {
  const shuffled = [...words].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

// 构建 DeepSeek 提示词
function buildPrompt(words, workInfo) {
  const wordList = words.map((w) => `${w.word} ${w.phonetic} ${w.pos} ${w.meaning}`).join('\n');

  let workDetails = `【作品信息】
作品名：${workInfo.title}
类型：${workInfo.type}`;

  if (workInfo.characters) {
    workDetails += `\n主要角色：${workInfo.characters}`;
  }

  if (workInfo.plot) {
    workDetails += `\n剧情简介：${workInfo.plot}`;
  }

  return `你是一位创意写作专家，擅长将英语单词融入影视剧情中。请完成以下任务：

${workDetails}

【需要融入的单词】（共${words.length}个）
${wordList}

【任务要求】
1. 将以上每个单词自然地融入"${workInfo.title}"的剧情中，创作一段连贯的故事。
2. 使用作品中的角色名，让故事像剧情回顾一样有连贯性。
3. 故事要有起承转合，前后衔接自然。

【输出格式要求】
严格按以下格式输出，每行一个单词条目，使用 ||| 分隔各字段：

序号. 单词 ||| 音标 ||| 词性 ||| 释义 ||| 剧情句子 ||| 所有词性及含义（用分号分隔不同词性） ||| 词根词缀记忆法（格式如：前缀dis(分开)+词根miss(送,放出)→dismiss(解散)） ||| 词形变化/派生词（格式如：luck(n. 运气)→lucky(adj. 幸运的)→luckily(adv. 幸运地)）

示例：
1. dismiss ||| /dɪsˈmɪs/ ||| v. ||| 解散，解雇 ||| 在经历了无数次失败后，主角决定 dismiss 过去的身份，以全新的面貌重新开始。 ||| v. 解散，解雇；v. 驳回，不予受理；v. 不再考虑 ||| dis(分开，否定)+miss(送，放出)→dismiss(送走，打发走→解散，解雇) ||| dismiss→dismissal(n. 解雇，免职)→dismissive(adj. 轻蔑的，不屑一顾的)
2. luck ||| /lʌk/ ||| n. ||| 运气 ||| 范闲觉得自己真是 luck 好，才能在庆国朝堂上步步为营。 ||| n. 运气；n. 幸运 ||| 来自中古荷兰语luc，意为"好运" ||| luck(n. 运气)→lucky(adj. 幸运的)→luckily(adv. 幸运地)→unlucky(adj. 不幸的)

请直接输出内容，不要添加任何额外的说明或开头结尾。`;
}

// 调用 DeepSeek API
async function callDeepSeekAPI(prompt) {
  const apiKey = process.env.DEEPSEEK_API_KEY || 'sk-37912f3dded94d8b9e3cc0194fb4cbdc';
  const url = 'https://api.deepseek.com/v1/chat/completions';

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'deepseek-chat',
      messages: [
        {
          role: 'system',
          content: '你是一位创意写作专家，擅长将英语单词自然融入影视剧情中，创作连贯有趣的故事。',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.8,
      max_tokens: 4000,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`DeepSeek API 调用失败 (${response.status}): ${errorText}`);
  }

  const data = await response.json();
  return data.choices[0].message.content;
}

// 解析 AI 返回的内容为结构化数据
function parseAIResponse(content, originalWords) {
  const results = [];

  // 按序号分割条目
  const entries = content.split(/\n+(?=\d+\.)/);

  for (const entry of entries) {
    const parsed = parseEntry(entry.trim());
    if (parsed) {
      // 尝试匹配原始单词数据以补全信息
      const originalWord = originalWords.find(
        (w) => w.word.toLowerCase() === parsed.word.toLowerCase()
      );
      results.push({
        ...parsed,
        phonetic: parsed.phonetic || (originalWord ? originalWord.phonetic : ''),
        pos: parsed.pos || (originalWord ? originalWord.pos : ''),
        meaning: parsed.meaning || (originalWord ? originalWord.meaning : ''),
        allMeanings: parsed.allMeanings || '',
        etymology: parsed.etymology || '',
        derivatives: parsed.derivatives || '',
      });
    }
  }

  // 如果解析结果为空，尝试备用解析方式
  if (results.length === 0) {
    return fallbackParse(content, originalWords);
  }

  return results;
}

// 解析单个条目
function parseEntry(entry) {
  // 优先尝试新格式：序号. 单词 ||| 音标 ||| 词性 ||| 释义 ||| 句子 ||| 所有词性含义 ||| 词根记忆法 ||| 派生词
  const newFormatRegex = /^(\d+)\.\s+(\S+)\s*\|\|\|\s*(.*?)\s*\|\|\|\s*(.*?)\s*\|\|\|\s*(.*?)\s*\|\|\|\s*(.*?)\s*\|\|\|\s*(.*?)\s*\|\|\|\s*(.*?)\s*\|\|\|\s*(.*?)$/s;
  let match = entry.match(newFormatRegex);
  if (match) {
    return {
      index: parseInt(match[1], 10),
      word: match[2],
      phonetic: match[3].trim(),
      pos: match[4].trim(),
      meaning: match[5].trim(),
      sentence: match[6].trim(),
      allMeanings: match[7].trim(),
      etymology: match[8].trim(),
      derivatives: match[9] ? match[9].trim() : '',
    };
  }

  // 兼容旧格式：序号. 单词 音标 词性 释义 \n 句子
  const multiLineRegex =
    /^(\d+)\.\s+(\S+)\s+(\/[^/]+\/)\s+(\S+)\s+(.+?)\n(.+)$/s;
  const singleLineRegex =
    /^(\d+)\.\s+(\S+)\s+(\/[^/]+\/)\s+(\S+)\s+(.+?)\s+(.+)$/;

  match = entry.match(multiLineRegex);
  if (match) {
    return {
      index: parseInt(match[1], 10),
      word: match[2],
      phonetic: match[3],
      pos: match[4],
      meaning: match[5].trim(),
      sentence: match[6].trim(),
      allMeanings: '',
      etymology: '',
      derivatives: '',
    };
  }

  match = entry.match(singleLineRegex);
  if (match) {
    return {
      index: parseInt(match[1], 10),
      word: match[2],
      phonetic: match[3],
      pos: match[4],
      meaning: match[5].trim(),
      sentence: match[6].trim(),
      allMeanings: '',
      etymology: '',
      derivatives: '',
    };
  }

  // 更宽松的匹配：序号. 单词 ... 句子
  const looseRegex = /^(\d+)\.\s+(\S+)\s+(.+)$/;
  match = entry.match(looseRegex);
  if (match) {
    const rest = match[3];
    // 尝试从剩余内容中提取音标
    const phoneticMatch = rest.match(/(\/[^/]+\/)/);
    const phonetic = phoneticMatch ? phoneticMatch[1] : '';

    return {
      index: parseInt(match[1], 10),
      word: match[2],
      phonetic,
      pos: '',
      meaning: '',
      sentence: rest.replace(phonetic, '').trim(),
      allMeanings: '',
      etymology: '',
      derivatives: '',
    };
  }

  return null;
}

// 备用解析方式：逐行扫描
function fallbackParse(content, originalWords) {
  const results = [];
  const lines = content.split('\n').filter((line) => line.trim());

  for (const line of lines) {
    const wordMatch = originalWords.find((w) => line.includes(w.word));
    if (wordMatch) {
      results.push({
        index: results.length + 1,
        word: wordMatch.word,
        phonetic: wordMatch.phonetic,
        pos: wordMatch.pos,
        meaning: wordMatch.meaning,
        sentence: line.trim(),
        allMeanings: '',
        etymology: '',
        derivatives: '',
      });
    }
  }

  return results;
}

// ==================== 启动服务器 ====================

app.listen(PORT, () => {
  console.log(`WordStory 后端服务已启动: http://localhost:${PORT}`);
  console.log(`可用词库: ${Object.keys(wordbanks).join(', ')}`);
});
