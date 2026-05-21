import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// 中间件
app.use(cors());
app.use(express.json());

// ==================== 词库数据（按需加载） ====================

const BANKS_DIR = path.join(__dirname, 'data', 'banks');

// 缓存已加载的词库
const bankCache = {};

// 获取词库索引（只加载元信息）
function getBankIndex() {
  const indexPath = path.join(BANKS_DIR, 'index.json');
  if (fs.existsSync(indexPath)) {
    return JSON.parse(fs.readFileSync(indexPath, 'utf-8'));
  }
  return [];
}

// 按需加载指定词库
function loadBank(id) {
  if (bankCache[id]) return bankCache[id];
  const bankPath = path.join(BANKS_DIR, `${id}.json`);
  if (!fs.existsSync(bankPath)) return null;
  const data = JSON.parse(fs.readFileSync(bankPath, 'utf-8'));
  bankCache[id] = data;
  return data;
}

// 将单词按首字母分组
function groupByLetter(words) {
  const grouped = {};
  words.forEach(w => {
    const letter = w.word.charAt(0).toUpperCase();
    if (!grouped[letter]) grouped[letter] = [];
    grouped[letter].push(w);
  });
  const sorted = {};
  Object.keys(grouped).sort().forEach(letter => {
    sorted[letter] = grouped[letter];
  });
  return sorted;
}

// ==================== 词库接口 ====================

// 获取所有词库列表（按分类分组）
app.get('/api/wordbanks', (req, res) => {
  const list = getBankIndex();
  
  // 按 category 分组
  const grouped = {};
  list.forEach(bank => {
    if (!grouped[bank.category]) {
      grouped[bank.category] = [];
    }
    grouped[bank.category].push({
      id: bank.id,
      name: bank.name,
      count: bank.count
    });
  });
  
  // 转换为前端期望的格式
  const categories = Object.entries(grouped).map(([category, wordbanks]) => ({
    category,
    wordbanks
  }));
  
  res.json({ success: true, data: categories });
});

// 获取指定词库的单词按字母分组
app.get('/api/wordbanks/:id/letters', (req, res) => {
  const { id } = req.params;
  const bank = loadBank(id);

  if (!bank) {
    return res.status(404).json({ success: false, message: `词库 "${id}" 不存在` });
  }

  const grouped = groupByLetter(bank.words);

  res.json({
    success: true,
    data: {
      id,
      name: bank.name,
      count: bank.count,
      letters: Object.keys(grouped),
      wordsByLetter: grouped,
    },
  });
});

// 获取词库中某个字母开头的单词
app.get('/api/wordbanks/:id/letter/:letter', (req, res) => {
  const { id, letter } = req.params;
  const bank = loadBank(id);

  if (!bank) {
    return res.status(404).json({ success: false, message: `词库 "${id}" 不存在` });
  }

  const upperLetter = letter.toUpperCase();
  const words = bank.words.filter(w => w.word && w.word[0] && w.word[0].toUpperCase() === upperLetter);

  res.json({
    success: true,
    data: {
      letter: upperLetter,
      count: words.length,
      words: words,
    },
  });
});

// ==================== 单词搜索接口 ====================

// 在所有词库中搜索单词
app.get('/api/search', (req, res) => {
  const { q, limit = 20 } = req.query;
  
  if (!q || q.trim().length === 0) {
    return res.json({ success: true, data: [], total: 0 });
  }
  
  const keyword = q.trim().toLowerCase();
  const maxResults = parseInt(limit) || 20;
  const results = [];
  
  // 获取所有词库索引
  const banks = getBankIndex();
  
  // 在每个词库中搜索
  for (const bank of banks) {
    const bankData = loadBank(bank.id);
    if (!bankData) continue;
    
    for (const word of bankData.words) {
      // 匹配单词本身（前缀匹配）
      if (word.word.toLowerCase().startsWith(keyword)) {
        results.push({
          word: word.word,
          phonetic: word.phonetic,
          pos: word.pos,
          meaning: word.meaning,
          bankId: bank.id,
          bankName: bank.name,
          matchType: 'word'
        });
      }
      // 匹配中文释义（包含匹配）
      else if (word.meaning && word.meaning.toLowerCase().includes(keyword)) {
        results.push({
          word: word.word,
          phonetic: word.phonetic,
          pos: word.pos,
          meaning: word.meaning,
          bankId: bank.id,
          bankName: bank.name,
          matchType: 'meaning'
        });
      }
      
      if (results.length >= maxResults) break;
    }
    
    if (results.length >= maxResults) break;
  }
  
  res.json({
    success: true,
    data: results,
    total: results.length,
    keyword: keyword
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
    const bank = loadBank(wordbankId);
    if (!bank) {
      return res.status(404).json({
        success: false,
        message: `词库 "${wordbankId}" 不存在`,
      });
    }
    const bankWords = bank.words;

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
  const bank = loadBank(id);
  return bank?.name || id;
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
4. ⚠️ 每个单词的剧情句子必须是一句话，控制在20-50字以内，简洁有力，不要写成长段落。

【输出格式要求】
严格按以下格式输出，每行一个单词条目，使用 ||| 分隔各字段：

序号. 单词 ||| 音标 ||| 词性 ||| 释义 ||| 剧情句子 ||| 所有词性及含义（用分号分隔不同词性） ||| 词根词缀记忆法（格式如：前缀dis(分开)+词根miss(送,放出)→dismiss(解散)） ||| 词形变化/派生词（格式如：luck(n. 运气)→lucky(adj. 幸运的)→luckily(adv. 幸运地)）

示例：
1. dismiss ||| /dɪsˈmɪs/ ||| v. ||| 解散，解雇 ||| 经历无数次失败后，主角决定dismiss过去的身份，重新开始。 ||| v. 解散，解雇；v. 驳回，不予受理；v. 不再考虑 ||| dis(分开，否定)+miss(送，放出)→dismiss(送走，打发走→解散，解雇) ||| dismiss→dismissal(n. 解雇，免职)→dismissive(adj. 轻蔑的，不屑一顾的)
2. luck ||| /lʌk/ ||| n. ||| 运气 ||| 范闲觉得自己真是luck好，才能在庆国朝堂上步步为营。 ||| n. 运气；n. 幸运 ||| 来自中古荷兰语luc，意为"好运" ||| luck(n. 运气)→lucky(adj. 幸运的)→luckily(adv. 幸运地)→unlucky(adj. 不幸的)

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

// ==================== 每日一词接口 ====================

// 基于日期的简单种子随机数生成器
function seededRandom(seed) {
  let x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

app.get('/api/daily-word', (req, res) => {
  try {
    // 获取所有词库中的全部单词
    const banks = getBankIndex();
    const allWords = [];

    for (const bank of banks) {
      const bankData = loadBank(bank.id);
      if (!bankData || !bankData.words) continue;
      for (const word of bankData.words) {
        allWords.push({ ...word, bankName: bank.name, bankId: bank.id });
      }
    }

    if (allWords.length === 0) {
      return res.status(404).json({ success: false, message: '没有可用的词库数据' });
    }

    // 基于日期生成种子，保证同一天返回同一个词
    const today = new Date();
    const dateSeed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
    const randomIndex = Math.floor(seededRandom(dateSeed) * allWords.length);
    const selectedWord = allWords[randomIndex];

    // 生成励志例句
    const meaningText = selectedWord.meaning || selectedWord.allMeanings || 'knowledge grows with effort';
    const inspirationalSentence = `The word '${selectedWord.word}' reminds us that ${meaningText}. Keep learning!`;

    res.json({
      success: true,
      data: {
        word: selectedWord.word,
        phonetic: selectedWord.phonetic || '',
        pos: selectedWord.pos || '',
        meaning: selectedWord.meaning || '',
        allMeanings: selectedWord.allMeanings || '',
        derivatives: selectedWord.derivatives || '',
        etymology: selectedWord.etymology || '',
        bankName: selectedWord.bankName,
        inspirationalSentence,
        date: today.toISOString().split('T')[0],
      },
    });
  } catch (error) {
    console.error('获取每日一词失败:', error);
    res.status(500).json({ success: false, message: '获取每日一词失败', error: error.message });
  }
});

// ==================== 词根专题接口 ====================

// 常见词根定义
const ROOT_DEFINITIONS = [
  { root: 'port', meaning: '搬运，运送', pattern: 'port' },
  { root: 'duct', meaning: '引导，导致', pattern: 'duct' },
  { root: 'spect', meaning: '看，观察', pattern: 'spect' },
  { root: 'struct', meaning: '建造，构建', pattern: 'struct' },
  { root: 'tract', meaning: '拉，拖，牵引', pattern: 'tract' },
  { root: 'dict', meaning: '说，言语', pattern: 'dict' },
  { root: 'scrib/script', meaning: '写，书写', pattern: 'scrib|script' },
  { root: 'vis/vid', meaning: '看，看见', pattern: 'vis|vid' },
  { root: 'aud', meaning: '听，听觉', pattern: 'aud' },
  { root: 'phon', meaning: '声音，语音', pattern: 'phon' },
  { root: 'graph', meaning: '写，画，记录', pattern: 'graph' },
  { root: 'meter', meaning: '测量，计量', pattern: 'meter|metre' },
  { root: 'therm', meaning: '热，温度', pattern: 'therm' },
  { root: 'chron', meaning: '时间', pattern: 'chron' },
  { root: 'geo', meaning: '地球，土地', pattern: 'geo' },
  { root: 'bio', meaning: '生命，生物', pattern: 'bio' },
  { root: 'auto', meaning: '自动，自身', pattern: 'auto' },
  { root: 'tele', meaning: '远距离', pattern: 'tele' },
  { root: 'micro', meaning: '微小', pattern: 'micro' },
  { root: 'macro', meaning: '巨大，宏观', pattern: 'macro' },
  { root: 'cred', meaning: '相信，信任', pattern: 'cred' },
  { root: 'fid', meaning: '信任，信念', pattern: 'fid' },
  { root: 'ject', meaning: '投掷，抛', pattern: 'ject' },
  { root: 'miss/mit', meaning: '送，放出', pattern: 'miss|mit' },
  { root: 'pend', meaning: '悬挂，称量，支付', pattern: 'pend' },
  { root: 'pose/pon', meaning: '放置，放置', pattern: 'pose|pon' },
  { root: 'press', meaning: '压，挤压', pattern: 'press' },
  { root: 'rupt', meaning: '破裂，断裂', pattern: 'rupt' },
  { root: 'sign', meaning: '标记，符号', pattern: 'sign' },
  { root: 'vent', meaning: '来，风', pattern: 'vent' },
  { root: 'vers/vert', meaning: '转，转向', pattern: 'vers|vert' },
  { root: 'viv/vit', meaning: '活，生命', pattern: 'viv|vit' },
  { root: 'voc/vok', meaning: '声音，呼唤', pattern: 'voc|vok' },
];

app.get('/api/roots', (req, res) => {
  try {
    // 收集所有词库中的单词（去重）
    const banks = getBankIndex();
    const allWordsMap = new Map();

    for (const bank of banks) {
      const bankData = loadBank(bank.id);
      if (!bankData || !bankData.words) continue;
      for (const word of bankData.words) {
        const key = word.word.toLowerCase();
        if (!allWordsMap.has(key)) {
          allWordsMap.set(key, word);
        }
      }
    }

    const allWords = Array.from(allWordsMap.values());

    // 为每个词根筛选匹配的单词
    const rootsData = ROOT_DEFINITIONS.map(({ root, meaning, pattern }) => {
      const regex = new RegExp(pattern, 'i');
      const matchedWords = allWords
        .filter(w => regex.test(w.word.toLowerCase()))
        .slice(0, 10)
        .map(w => ({
          word: w.word,
          phonetic: w.phonetic || '',
          pos: w.pos || '',
          meaning: w.meaning || '',
        }));

      return {
        root,
        meaning,
        words: matchedWords,
      };
    });

    res.json({
      success: true,
      data: rootsData,
      total: rootsData.length,
    });
  } catch (error) {
    console.error('获取词根专题失败:', error);
    res.status(500).json({ success: false, message: '获取词根专题失败', error: error.message });
  }
});

// ==================== 测验题目接口 ====================

app.get('/api/quiz/:bankId', (req, res) => {
  try {
    const { bankId } = req.params;
    const bank = loadBank(bankId);

    if (!bank) {
      return res.status(404).json({ success: false, message: `词库 "${bankId}" 不存在` });
    }

    const words = bank.words;
    if (!words || words.length < 4) {
      return res.status(400).json({ success: false, message: '词库单词数量不足，至少需要4个单词才能生成测验' });
    }

    // 随机选取10个词作为题目（如果词库不足10个则全部选取）
    const quizCount = Math.min(10, words.length);
    const shuffledWords = [...words].sort(() => Math.random() - 0.5);
    const selectedWords = shuffledWords.slice(0, quizCount);

    const quiz = selectedWords.map((word, index) => {
      // 随机选择题目类型
      const types = ['zh2en', 'en2zh', 'listening'];
      const type = types[Math.floor(Math.random() * types.length)];

      // 生成干扰项（从同一词库中随机选取，排除正确答案）
      const distractors = words
        .filter(w => w.word.toLowerCase() !== word.word.toLowerCase())
        .sort(() => Math.random() - 0.5)
        .slice(0, 3);

      let question, options, answer;

      if (type === 'zh2en') {
        // 中文释义选英文单词
        question = `"${word.meaning || word.word}" 的英文单词是？`;
        const correctOption = word.word;
        const wrongOptions = distractors.map(d => d.word);
        options = [correctOption, ...wrongOptions].sort(() => Math.random() - 0.5);
        answer = options.indexOf(correctOption);
      } else if (type === 'en2zh') {
        // 英文单词选中文释义
        question = `"${word.word}" 的中文释义是？`;
        const correctOption = word.meaning || '未知释义';
        const wrongOptions = distractors.map(d => d.meaning || '未知释义');
        options = [correctOption, ...wrongOptions].sort(() => Math.random() - 0.5);
        answer = options.indexOf(correctOption);
      } else {
        // 听力题：给音标选英文单词
        question = `听音标 "${word.phonetic || '/-/-/'}"，选出对应的英文单词：`;
        const correctOption = word.word;
        const wrongOptions = distractors.map(d => d.word);
        options = [correctOption, ...wrongOptions].sort(() => Math.random() - 0.5);
        answer = options.indexOf(correctOption);
      }

      return {
        type,
        question,
        options,
        answer,
        word: word.word,
        phonetic: word.phonetic || '',
      };
    });

    res.json({
      success: true,
      data: {
        bankId,
        bankName: bank.name,
        quiz,
        total: quiz.length,
      },
    });
  } catch (error) {
    console.error('生成测验失败:', error);
    res.status(500).json({ success: false, message: '生成测验失败', error: error.message });
  }
});

// ==================== AI 流式生成接口 ====================

app.post('/api/generate-stream', async (req, res) => {
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
    const bank = loadBank(wordbankId);
    if (!bank) {
      return res.status(404).json({
        success: false,
        message: `词库 "${wordbankId}" 不存在`,
      });
    }
    const bankWords = bank.words;

    // 随机选取单词
    const selectedWords = getRandomWords(bankWords, Math.min(count, bankWords.length));

    // 构建 SSE 响应头
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.setHeader('X-Accel-Buffering', 'no');
    res.flushHeaders();

    // 构建提示词
    const prompt = buildPrompt(selectedWords, workInfo);

    // 调用 DeepSeek API（流式）
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
        stream: true,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      res.write(`data: ${JSON.stringify({ error: `DeepSeek API 调用失败 (${response.status}): ${errorText}` })}\n\n`);
      res.end();
      return;
    }

    // 读取流式响应并逐条解析
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = '';
    let fullContent = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop() || '';

      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed || !trimmed.startsWith('data: ')) continue;
        const data = trimmed.slice(6);
        if (data === '[DONE]') continue;

        try {
          const parsed = JSON.parse(data);
          const delta = parsed.choices?.[0]?.delta?.content;
          if (delta) {
            fullContent += delta;
          }
        } catch (e) {
          // 忽略解析错误
        }
      }
    }

    // 流式读取完毕，解析完整内容并逐个发送单词事件
    const results = parseAIResponse(fullContent, selectedWords);
    const total = results.length;

    for (let i = 0; i < results.length; i++) {
      const eventData = {
        word: results[i],
        index: i,
        total,
      };
      res.write(`data: ${JSON.stringify(eventData)}\n\n`);
    }

    // 发送完成信号
    res.write(`data: ${JSON.stringify({ done: true, total })}\n\n`);
    res.end();
  } catch (error) {
    console.error('流式生成失败:', error);
    // 如果响应头已发送，通过 SSE 发送错误
    if (!res.headersSent) {
      res.status(500).json({
        success: false,
        message: '流式生成失败，请稍后重试',
        error: error.message,
      });
    } else {
      res.write(`data: ${JSON.stringify({ error: error.message })}\n\n`);
      res.end();
    }
  }
});

// ==================== 学习统计接口（模拟数据） ====================

app.get('/api/stats/summary', (req, res) => {
  try {
    // 获取词库信息用于统计总数
    const banks = getBankIndex();
    let totalWordsInBanks = 0;
    for (const bank of banks) {
      totalWordsInBanks += bank.count || 0;
    }

    // 生成最近7天的模拟学习数据
    const weeklyData = [];
    const dayNames = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dayName = dayNames[date.getDay()];
      const learned = Math.floor(Math.random() * 20) + 5;
      weeklyData.push({
        date: date.toISOString().split('T')[0],
        day: dayName,
        count: learned,
      });
    }

    const todayLearned = weeklyData[weeklyData.length - 1].count;
    const learnedWords = Math.floor(Math.random() * 200) + 50;
    const streak = Math.floor(Math.random() * 30) + 1;

    // 模拟成就数据
    const achievements = [
      { id: 'first_word', name: '初识新词', description: '学习第一个单词', icon: '🌱', unlocked: true },
      { id: 'ten_words', name: '小有所成', description: '累计学习10个单词', icon: '📚', unlocked: true },
      { id: 'fifty_words', name: '词汇达人', description: '累计学习50个单词', icon: '🏆', unlocked: learnedWords >= 50 },
      { id: 'hundred_words', name: '百词斩将', description: '累计学习100个单词', icon: '💎', unlocked: learnedWords >= 100 },
      { id: 'streak_7', name: '坚持不懈', description: '连续学习7天', icon: '🔥', unlocked: streak >= 7 },
      { id: 'streak_30', name: '月度学霸', description: '连续学习30天', icon: '👑', unlocked: streak >= 30 },
      { id: 'quiz_perfect', name: '完美测验', description: '测验全部答对', icon: '⭐', unlocked: Math.random() > 0.5 },
      { id: 'roots_master', name: '词根大师', description: '学习全部词根专题', icon: '📖', unlocked: false },
    ];

    res.json({
      success: true,
      data: {
        totalLearned: learnedWords,
        dailyStreak: streak,
        todayWordCount: todayLearned,
        weekData: weeklyData,
        achievements,
      },
    });
  } catch (error) {
    console.error('获取学习统计失败:', error);
    res.status(500).json({ success: false, message: '获取学习统计失败', error: error.message });
  }
});

// ==================== 剧情背单词：生成剧情单词内容 ====================
app.post('/api/generate-story-words', async (req, res) => {
  try {
    const { artworkTitle, artworkCharacters, words, day, startIndex } = req.body;
    
    if (!artworkTitle || !words || words.length === 0) {
      return res.status(400).json({ success: false, message: '缺少必要参数' });
    }

    const characters = artworkCharacters ? artworkCharacters.split(/[,，、]+/).map(s => s.trim()).filter(Boolean) : [];

    // 构建AI提示词 - 让LLM深度理解作品
    const prompt = `你是一个创意写作专家，同时也是一位资深文学评论家和浪漫小说家。你精通各类小说、电影、电视剧、动漫、游戏等艺术作品，对每部作品的剧情细节、角色性格、经典台词都烂熟于心。

## 任务
将以下${words.length}个英语单词，融入到《${artworkTitle}》的剧情语境中，用故事帮助用户记忆单词。

## 作品信息
- 作品名称：《${artworkTitle}》
${characters.length > 0 ? `- 主要角色：${characters.join('、')}` : '- 主要角色：请你根据作品自动选择合适的角色'}

## ⚠️ 死命令（必须100%遵守）

### 【死命令1：100%符合原著剧情】
- 你必须完全忠实于《${artworkTitle}》的原著剧情、人物设定、世界观
- 禁止编造不存在的剧情、角色关系或场景
- 禁止OOC（角色性格崩坏），每个角色的言行必须符合原著人设
- 如果不确定某个情节，宁可跳过也不要瞎编

### 【死命令2：内容必须有趣】
- 每个句子都要有画面感，像电影镜头一样
- 要有戏剧张力：冲突、悬念、转折、幽默或温馨时刻
- 避免平淡无奇的陈述句，要有情感起伏
- 可以加入角色的内心独白、经典台词的改编

### 【死命令3：融入浪漫元素】
- 如果作品本身有爱情线，必须体现角色之间的情感羁绊
- 用细腻的笔触描写心动、思念、守护、告白等浪漫时刻
- 即使是非爱情作品，也要有温情脉脉的友情、亲情或师徒情
- 让读者感受到角色之间的情感连接

## 你的工作流程
1. **深度回忆作品**：仔细回忆《${artworkTitle}》的每一个经典场景、每一句经典台词、每一个角色的性格特点
2. **理解单词**：理解每个单词的含义、用法、情感色彩
3. **精准匹配**：把单词嵌入到最合适的原著场景中，让单词与剧情完美融合
4. **情感渲染**：用浪漫、有趣的笔触描写场景，让读者沉浸其中

## 单词列表
${words.map((w, i) => `${i + 1}. ${w.word} ${w.phonetic || ''} ${w.pos || ''} ${w.meaning || ''}`).join('\n')}

## 输出要求
1. 每个单词写一个独立的剧情句子，像小说片段一样自然流畅
2. 句子必须来自《${artworkTitle}》的真实剧情场景，禁止编造
3. 单词要自然融入中文句子中（保留英文原词），不要生硬
4. ⚠️ 每个句子必须是一句话，控制在20-50字以内，简洁有力，不要写成长段落
5. 如果单词没有提供释义，请自动补充准确的释义
6. 每个句子标注涉及的角色名

## 输出格式
直接返回JSON，不要有其他内容：
{"data":[{"word":"xxx","phonetic":"/xxx/","pos":"n.","meaning":"中文释义","storyContext":"剧情句子（英文单词保留原形嵌入中文句子中，要有浪漫氛围和画面感）","character":"角色名"}]}

## 示例（以《哈利·波特》为例）
{"data":[
  {"word":"destiny","phonetic":"/ˈdestəni/","pos":"n.","meaning":"命运","storyContext":"分院帽低语斯莱特林能带来greatness，但哈利心中想的不是destiny，而是父母离去的那个夜晚。","character":"哈利"},
  {"word":"eternal","phonetic":"/ɪˈtɜːnl/","pos":"adj.","meaning":"永恒的","storyContext":"冥想盆中银色记忆旋转，斯内普终于明白了那句Always——有些爱是eternal的。","character":"斯内普"}
]}

## 示例（以《陷入我们的热恋》为例）
{"data":[
  {"word":"forehead","phonetic":"/ˈfɔːhed/","pos":"n.","meaning":"前额","storyContext":"巷口初遇，少年额角碎发被风吹贴在forehead上，徐栀竟忘了躲开。","character":"徐栀"},
  {"word":"nerve","phonetic":"/nɜːv/","pos":"n.","meaning":"神经；勇气","storyContext":"她攥紧衣角攒够nerve抬头，对上陈路周那双带笑的眼睛。","character":"徐栀"}
]}

请直接返回JSON数组。`;

    // 调用AI生成
    if (process.env.DEEPSEEK_API_KEY) {
      const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`
        },
        body: JSON.stringify({
          model: 'deepseek-chat',
          messages: [{ role: 'user', content: prompt }],
          temperature: 0.85,
          max_tokens: 6000
        })
      });

      const data = await response.json();
      const content = data.choices?.[0]?.message?.content || '';
      
      // 尝试解析JSON
      try {
        const jsonMatch = content.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          const parsed = JSON.parse(jsonMatch[0]);
          const items = parsed.data || parsed;
          if (Array.isArray(items) && items.length > 0) {
            const result = items.map((item, idx) => ({
              word: item.word || words[idx]?.word || '',
              phonetic: item.phonetic || words[idx]?.phonetic || '',
              pos: item.pos || words[idx]?.pos || '',
              meaning: item.meaning || words[idx]?.meaning || '',
              storyContext: item.storyContext || '',
              character: item.character || (characters[idx % characters.length] || ''),
              index: startIndex + idx,
              day: day
            }));
            return res.json({ success: true, data: result });
          }
        }
      } catch (parseError) {
        console.error('解析AI返回JSON失败:', parseError);
        console.error('AI原始返回:', content.substring(0, 500));
      }
    }

    // 如果AI调用失败，使用本地生成
    const chars = characters.length > 0 ? characters : ['主角'];
    const storyWords = words.map((w, idx) => {
      const character = chars[idx % chars.length];
      const meaning = w.meaning || '';
      const templates = [
        `${character}看着窗外，心中默念着"${w.word}"，${meaning ? meaning.split('；')[0] : '这个词的含义在心中回荡'}。`,
        `这一刻，${character}终于明白了什么是${w.word}——${meaning ? meaning.split('；')[0] : '一切尽在不言中'}。`,
        `"${w.word}。"${character}轻声说道，眼神里藏着${meaning ? meaning.split('；')[0] : '说不清道不明'}的意味。`,
      ];
      return {
        word: w.word,
        phonetic: w.phonetic || '',
        pos: w.pos || '',
        meaning: w.meaning || '',
        storyContext: templates[idx % templates.length],
        character,
        index: startIndex + idx,
        day
      };
    });

    res.json({ success: true, data: storyWords });
  } catch (error) {
    console.error('生成剧情单词失败:', error);
    res.status(500).json({ success: false, message: '生成剧情单词失败', error: error.message });
  }
});

// ==================== 启动服务器 ====================

app.listen(PORT, () => {
  console.log(`WordStory 后端服务已启动: http://localhost:${PORT}`);
  const list = getBankIndex();
  console.log(`可用词库: ${list.map(b => b.name).join(', ')}`);
});
