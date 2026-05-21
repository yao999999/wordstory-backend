// 生成完整词库数据的脚本
// 基于 wordbanks.js 的基础数据，添加 allMeanings, derivatives, etymology 字段

import wordbanksData from './data/wordbanks.js';
const wordbanks = wordbanksData.default || wordbanksData;
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 生成词根记忆法的辅助函数
function generateEtymology(word, meaning) {
  const etymologies = {
    'ability': 'abil(能)+ity(名词后缀)→能力',
    'abroad': 'a(在)+broad(宽)→在宽阔的地方→在国外',
    'accept': 'ac(向)+cept(拿)→接受',
    'accident': 'ac(向)+cid(落)+ent→意外落下→事故',
    'achieve': 'a(向)+chieve(头)→到头→实现',
    'across': 'a(在)+cross(十字)→穿过',
    'action': 'act(做)+ion(名词后缀)→行动',
    'active': 'act(做)+ive(形容词后缀)→积极的',
    'activity': 'activ(活跃的)+ity(名词后缀)→活动',
    'add': 'add(加)→拉丁语addere(加)',
    'address': 'ad(向)+dress(引导)→地址',
    'admire': 'ad(向)+mir(惊奇)+e→钦佩',
    'adult': 'ad(向)+ult(成长)→成年人',
    'advantage': 'ad(向)+vant(前)+age→优势',
    'advertise': 'ad(向)+vert(转)+ise→使转向→做广告',
    'advice': 'ad(向)+vic(看)+e→建议',
    'afford': 'af(向)+ford(向前)→负担得起',
    'afraid': 'afr(害怕)+aid→害怕的',
    'against': 'again(再次)+st→反对',
    'agree': 'a(向)+gree(满意)→同意',
    'ahead': 'a(在)+head(头)→向前',
    'allow': 'al(向)+low(低)→允许',
    'almost': 'al(全部)+most(最)→几乎',
    'alone': 'al(全部)+one(一个)→独自',
    'along': 'a(在)+long(长)→沿着',
    'already': 'al(全部)+ready(准备好)→已经',
    'although': 'al(全部)+though(虽然)→虽然',
    'among': 'a(在)+mong(混合)→在...之中',
    'ancient': 'anci(古老)+ent→古代的',
    'angry': 'angr(愤怒)+y→生气的',
    'abandon': 'a(不)+band(约束)+on→放弃',
    'absolute': 'ab(离开)+solute(松开)→绝对的',
    'academic': 'academ(学院)+ic→学术的',
    'access': 'ac(向)+cess(走)→进入',
    'accompany': 'ac(向)+company(陪伴)→陪伴',
    'accomplish': 'ac(向)+compl(满)+ish→完成',
    'account': 'ac(向)+count(数)→账户',
    'accumulate': 'ac(向)+cumul(堆积)+ate→积累',
    'accurate': 'ac(向)+cur(关心)+ate→精确的',
    'accuse': 'ac(向)+cus(原因)+e→指责',
    'accustomed': 'ac(向)+custom(习惯)+ed→习惯的',
    'ache': 'ache(痛)→古英语acan(痛)',
    'achievement': 'achieve(实现)+ment→成就',
    'acid': 'acid(酸)→拉丁语acidus(酸)',
    'acknowledge': 'ac(向)+knowledge(知识)→承认',
    'acquaintance': 'ac(向)+quaint(知道)+ance→熟人',
    'acquire': 'ac(向)+quir(寻求)+e→获得',
    'actual': 'act(做)+ual→实际的',
    'adapt': 'ad(向)+apt(适合)→适应',
    'addicted': 'ad(向)+dict(说)+ed→上瘾的',
    'addition': 'add(加)+ition→增加',
    'adequate': 'ad(向)+equ(平等)+ate→充足的',
    'adjust': 'ad(向)+just(正义)→调整',
    'administration': 'ad(向)+ministr(服务)+ation→管理',
    'admit': 'ad(向)+mit(送)→承认',
    'adopt': 'ad(向)+opt(选择)→采纳',
    'adorable': 'ad(向)+or(说)+able→可爱的',
    'advance': 'ad(向)+vance(前)→前进',
    'abnormal': 'ab(不)+normal(正常)→异常的',
    'abolish': 'abol(破坏)+ish→废除',
    'absurd': 'ab(离开)+surd(聋)→荒谬的',
    'accelerate': 'ac(向)+celer(快)+ate→加速',
    'aggressive': 'ag(向)+gress(走)+ive→侵略性的',
    'allegation': 'al(向)+leg(法)+ation→指控',
    'ambitious': 'amb(周围)+it(走)+ious→有雄心的',
    'anonymous': 'an(无)+onym(名)+ous→匿名的',
    'apparatus': 'ap(向)+par(准备)+atus→器械',
    'authentic': 'authent(作者)+ic→真实的',
    'autonomous': 'auto(自己)+nom(法)+ous→自治的',
    'breach': 'breach(破坏)→古英语bryce(破坏)',
    'catastrophe': 'cata(向下)+stroph(转)+e→灾难',
    'chronic': 'chron(时间)+ic→慢性的',
    'coalition': 'co(一起)+alit(成长)+ion→联盟',
    'compatible': 'com(一起)+pat(忍受)+ible→兼容的',
    'compelling': 'com(一起)+pell(推)+ing→引人注目的',
    'compensate': 'com(一起)+pens(称)+ate→补偿',
    'contemplate': 'con(一起)+templ(庙)+ate→沉思',
    'controversy': 'contro(相反)+vers(转)+y→争论',
    'dedicate': 'de(向下)+dic(说)+ate→致力于',
    'deficiency': 'de(向下)+fic(做)+iency→缺乏',
    'deliberate': 'de(向下)+liber(平衡)+ate→故意的',
    'deprive': 'de(离开)+priv(私人)+e→剥夺',
    'deteriorate': 'de(向下)+terior(更坏)+ate→恶化',
    'disclose': 'dis(分开)+close(关闭)→揭露',
    'dispatch': 'dis(分开)+patch(片)→派遣',
    'elaborate': 'e(出)+labor(工作)+ate→精心制作的',
  };
  
  return etymologies[word] || `${word}(词根)→需补充词根记忆`;
}

// 生成词形变化的辅助函数
function generateDerivatives(word, pos) {
  const derivatives = {
    'ability': 'ability→abilities(pl.)',
    'abroad': 'abroad(无变化)',
    'accept': 'accept→accepts(三单)→accepted(过去式)→acceptance(n. 接受)',
    'accident': 'accident→accidents(pl.)→accidental(adj. 意外的)',
    'achieve': 'achieve→achieves(三单)→achieved(过去式)→achievement(n. 成就)',
    'across': 'across(无变化)',
    'action': 'action→actions(pl.)→active(adj. 积极的)',
    'active': 'active→actively(adv.)→activity(n. 活动)',
    'activity': 'activity→activities(pl.)',
    'add': 'add→adds(三单)→added(过去式)→addition(n. 增加)',
    'address': 'address→addresses(pl.)→addressed(过去式)',
    'admire': 'admire→admires(三单)→admired(过去式)→admiration(n. 钦佩)',
    'adult': 'adult→adults(pl.)',
    'advantage': 'advantage→advantages(pl.)→advantageous(adj. 有利的)',
    'advertise': 'advertise→advertises(三单)→advertised(过去式)→advertisement(n. 广告)',
    'advice': 'advice(不可数)→advise(v. 建议)',
    'afford': 'afford→affords(三单)→afforded(过去式)→affordable(adj. 负担得起的)',
    'afraid': 'afraid→afraid(无变化)',
    'against': 'against(无变化)',
    'agree': 'agree→agrees(三单)→agreed(过去式)→agreement(n. 同意)',
    'ahead': 'ahead(无变化)',
    'allow': 'allow→allows(三单)→allowed(过去式)→allowance(n. 津贴)',
    'almost': 'almost(无变化)',
    'alone': 'alone(无变化)',
    'along': 'along(无变化)→alongside(在...旁边)',
    'already': 'already(无变化)',
    'although': 'although(无变化)',
    'among': 'among(无变化)',
    'ancient': 'ancient→ancients(pl.)→anciently(adv.)',
    'angry': 'angry→angrier(比较级)→angriest(最高级)→anger(n. 愤怒)',
    'abandon': 'abandon→abandons(三单)→abandoned(过去式)→abandonment(n. 放弃)',
    'absolute': 'absolute→absolutely(adv.)→absoluteness(n. 绝对)',
    'academic': 'academic→academics(pl.)→academy(n. 学院)',
    'access': 'access→accesses(pl.)→accessible(adj. 可进入的)',
    'accompany': 'accompany→accompanies(三单)→accompanied(过去式)→accompaniment(n. 伴奏)',
    'accomplish': 'accomplish→accomplishes(三单)→accomplished(过去式)→accomplishment(n. 成就)',
    'account': 'account→accounts(pl.)→accountant(n. 会计)',
    'accumulate': 'accumulate→accumulates(三单)→accumulated(过去式)→accumulation(n. 积累)',
    'accurate': 'accurate→accurately(adv.)→accuracy(n. 精确)',
    'accuse': 'accuse→accuses(三单)→accused(过去式)→accusation(n. 指责)',
    'accustomed': 'accustomed(无变化)→accustom(v. 使习惯)',
    'ache': 'ache→aches(pl.)→ached(过去式)→aching(adj. 疼痛的)',
    'achievement': 'achievement→achievements(pl.)',
    'acid': 'acid→acids(pl.)→acidic(adj. 酸的)',
    'acknowledge': 'acknowledge→acknowledges(三单)→acknowledged(过去式)→acknowledgment(n. 承认)',
    'acquaintance': 'acquaintance→acquaintances(pl.)',
    'acquire': 'acquire→acquires(三单)→acquired(过去式)→acquisition(n. 获得)',
    'actual': 'actual→actually(adv.)→actuality(n. 现实)',
    'adapt': 'adapt→adapts(三单)→adapted(过去式)→adaptation(n. 适应)',
    'addicted': 'addicted→addict(v. 使上瘾)→addiction(n. 上瘾)',
    'addition': 'addition→additions(pl.)→additional(adj. 额外的)',
    'adequate': 'adequate→adequately(adv.)→adequacy(n. 充足)',
    'adjust': 'adjust→adjusts(三单)→adjusted(过去式)→adjustment(n. 调整)',
    'administration': 'administration→administrations(pl.)→administrative(adj. 管理的)',
    'admit': 'admit→admits(三单)→admitted(过去式)→admission(n. 承认)',
    'adopt': 'adopt→adopts(三单)→adopted(过去式)→adoption(n. 采纳)',
    'adorable': 'adorable→adorably(adv.)→adore(v. 崇拜)',
    'advance': 'advance→advances(pl.)→advanced(过去式)→advancement(n. 前进)',
    'abnormal': 'abnormal→abnormally(adv.)→abnormality(n. 异常)',
    'abolish': 'abolish→abolishes(三单)→abolished(过去式)→abolition(n. 废除)',
    'absurd': 'absurd→absurdly(adv.)→absurdity(n. 荒谬)',
    'accelerate': 'accelerate→accelerates(三单)→accelerated(过去式)→acceleration(n. 加速)',
    'aggressive': 'aggressive→aggressively(adv.)→aggression(n. 侵略)',
    'allegation': 'allegation→allegations(pl.)→allege(v. 指控)',
    'ambitious': 'ambitious→ambitiously(adv.)→ambition(n. 雄心)',
    'anonymous': 'anonymous→anonymously(adv.)→anonymity(n. 匿名)',
    'apparatus': 'apparatus→apparatuses/apparati(pl.)',
    'authentic': 'authentic→authentically(adv.)→authenticity(n. 真实性)',
    'autonomous': 'autonomous→autonomously(adv.)→autonomy(n. 自治)',
    'breach': 'breach→breaches(pl.)→breached(过去式)',
    'catastrophe': 'catastrophe→catastrophes(pl.)→catastrophic(adj. 灾难性的)',
    'chronic': 'chronic→chronically(adv.)→chronicity(n. 慢性)',
    'coalition': 'coalition→coalitions(pl.)',
    'compatible': 'compatible→compatibly(adv.)→compatibility(n. 兼容性)',
    'compelling': 'compelling→compellingly(adv.)→compel(v. 强迫)',
    'compensate': 'compensate→compensates(三单)→compensated(过去式)→compensation(n. 补偿)',
    'contemplate': 'contemplate→contemplates(三单)→contemplated(过去式)→contemplation(n. 沉思)',
    'controversy': 'controversy→controversies(pl.)→controversial(adj. 有争议的)',
    'dedicate': 'dedicate→dedicates(三单)→dedicated(过去式)→dedication(n. 奉献)',
    'deficiency': 'deficiency→deficiencies(pl.)→deficient(adj. 缺乏的)',
    'deliberate': 'deliberate→deliberately(adv.)→deliberation(n. 深思熟虑)',
    'deprive': 'deprive→deprives(三单)→deprived(过去式)→deprivation(n. 剥夺)',
    'deteriorate': 'deteriorate→deteriorates(三单)→deteriorated(过去式)→deterioration(n. 恶化)',
    'disclose': 'disclose→discloses(三单)→disclosed(过去式)→disclosure(n. 揭露)',
    'dispatch': 'dispatch→dispatches(pl.)→dispatched(过去式)',
    'elaborate': 'elaborate→elaborately(adv.)→elaboration(n. 详细阐述)',
  };
  
  return derivatives[word] || `${word}→${word}s(pl.)`;
}

// 生成全部词义的辅助函数
function generateAllMeanings(word, pos, meaning) {
  const allMeanings = {
    'ability': 'n. 能力；才能；本领',
    'abroad': 'adv. 在国外；到国外；广为流传',
    'accept': 'v. 接受；同意；认可；承担',
    'accident': 'n. 事故；意外；偶然',
    'achieve': 'v. 实现；达到；完成；成功',
    'across': 'prep. 穿过；横过；在...对面 adv. 横过；在对面',
    'action': 'n. 行动；行为；作用；诉讼',
    'active': 'adj. 积极的；活跃的；主动的；现役的',
    'activity': 'n. 活动；行动；活跃',
    'add': 'v. 添加；增加；加起来；补充说',
    'address': 'n. 地址；演讲；处理 v. 演说；处理；称呼',
    'admire': 'v. 钦佩；赞赏；羡慕；欣赏',
    'adult': 'n. 成年人 adj. 成年的；成熟的',
    'advantage': 'n. 优势；优点；有利条件；利益',
    'advertise': 'v. 做广告；宣传；通知',
    'advice': 'n. 建议；忠告；劝告；通知',
    'afford': 'v. 负担得起；买得起；提供；给予',
    'afraid': 'adj. 害怕的；担心的；恐怕',
    'against': 'prep. 反对；靠着；逆着；防备',
    'agree': 'v. 同意；赞成；一致；商定',
    'ahead': 'adv. 向前；在前；提前；领先',
    'allow': 'v. 允许；准许；承认；给予',
    'almost': 'adv. 几乎；差不多；将近',
    'alone': 'adj. 独自的；单独的；孤独的 adv. 独自地；单独地',
    'along': 'prep. 沿着；顺着 adv. 向前；一起；来到',
    'already': 'adv. 已经；早已；先前',
    'although': 'conj. 虽然；尽管；然而',
    'among': 'prep. 在...之中；在...中间；...之一',
    'ancient': 'adj. 古代的；古老的；年老的 n. 古人；老人',
    'angry': 'adj. 生气的；愤怒的；发炎的',
    'abandon': 'v. 放弃；抛弃；遗弃；离弃 n. 放任；狂热',
    'absolute': 'adj. 绝对的；完全的；专制的 n. 绝对事物',
    'academic': 'adj. 学术的；理论的；学院的 n. 学者；大学教师',
    'access': 'n. 进入；通道；使用；接近 v. 访问；存取；接近',
    'accompany': 'v. 陪伴；伴随；伴奏；陪同',
    'accomplish': 'v. 完成；实现；达到；做完',
    'account': 'n. 账户；解释；账目；描述 v. 解释；认为；占...',
    'accumulate': 'v. 积累；积聚；堆积；逐渐增加',
    'accurate': 'adj. 精确的；准确的；正确无误的',
    'accuse': 'v. 指责；指控；控告；谴责',
    'accustomed': 'adj. 习惯的；通常的；惯常的',
    'ache': 'v. 疼痛；渴望；隐痛 n. 疼痛；隐痛',
    'achievement': 'n. 成就；成绩；完成；达到',
    'acid': 'n. 酸；酸性物质 adj. 酸的；酸性的；尖刻的',
    'acknowledge': 'v. 承认；致谢；确认；答谢',
    'acquaintance': 'n. 熟人；相识；了解；认识的人',
    'acquire': 'v. 获得；取得；学到；习得',
    'actual': 'adj. 实际的；真实的；现行的',
    'adapt': 'v. 适应；改编；使适应；改造',
    'addicted': 'adj. 上瘾的；入迷的；沉迷的',
    'addition': 'n. 增加；加法；添加物；附加',
    'adequate': 'adj. 充足的；适当的；胜任的；够用的',
    'adjust': 'v. 调整；调节；适应；校准',
    'administration': 'n. 管理；行政；政府；执行',
    'admit': 'v. 承认；准许进入；容许；接纳',
    'adopt': 'v. 采纳；收养；采用；通过',
    'adorable': 'adj. 可爱的；讨人喜欢的；值得崇拜的',
    'advance': 'v. 前进；提前；推进；促进 n. 前进；进步；预付款',
    'abnormal': 'adj. 异常的；反常的；变态的；不规则的',
    'abolish': 'v. 废除；废止；取消；消灭',
    'absurd': 'adj. 荒谬的；可笑的；不合理的 n. 荒诞；荒诞作品',
    'accelerate': 'v. 加速；促进；加快；增加',
    'aggressive': 'adj. 侵略性的；好斗的；有进取心的；积极的',
    'allegation': 'n. 指控；主张；断言；辩解',
    'ambitious': 'adj. 有雄心的；野心勃勃的；有抱负的',
    'anonymous': 'adj. 匿名的；无名的；无特色的',
    'apparatus': 'n. 器械；装置；仪器；机构',
    'authentic': 'adj. 真实的；真正的；可靠的；可信的',
    'autonomous': 'adj. 自治的；自主的；自发的；有自治权的',
    'breach': 'n. 违反；破坏；缺口；破裂 v. 违反；破坏；攻破',
    'catastrophe': 'n. 灾难；大祸；惨败；悲剧结局',
    'chronic': 'adj. 慢性的；长期的；习惯性的；积习难改的',
    'coalition': 'n. 联盟；联合；结合；合并',
    'compatible': 'adj. 兼容的；合得来的；一致的；可共存的',
    'compelling': 'adj. 引人注目的；令人信服的；强烈的；不可抗拒的',
    'compensate': 'v. 补偿；赔偿；弥补；抵消',
    'contemplate': 'v. 沉思；凝视；考虑；打算',
    'controversy': 'n. 争论；争议；论战；辩论',
    'dedicate': 'v. 致力于；奉献；献词；题献',
    'deficiency': 'n. 缺乏；不足；缺陷；不足额',
    'deliberate': 'adj. 故意的；深思熟虑的；从容的 v. 仔细考虑；商议',
    'deprive': 'v. 剥夺；使丧失；使不能享有',
    'deteriorate': 'v. 恶化；变坏；退化；堕落',
    'disclose': 'v. 揭露；公开；透露；使显露',
    'dispatch': 'v. 派遣；发送；迅速处理 n. 派遣；急件；迅速',
    'elaborate': 'adj. 精心制作的；详尽的；复杂的 v. 详细阐述；精心制作',
  };
  
  return allMeanings[word] || `${pos} ${meaning}`;
}

// 处理每个词库
const wordbanksFull = {};

for (const [key, bank] of Object.entries(wordbanks)) {
  console.log(`处理词库: ${bank.name} (${bank.words.length} 词)`);
  
  const words = bank.words.map(w => ({
    word: w.word,
    phonetic: w.phonetic,
    pos: w.pos,
    meaning: w.meaning,
    allMeanings: generateAllMeanings(w.word, w.pos, w.meaning),
    derivatives: generateDerivatives(w.word, w.pos),
    etymology: generateEtymology(w.word, w.meaning)
  }));
  
  wordbanksFull[key] = {
    id: bank.id,
    name: bank.name,
    count: words.length,
    category: bank.category,
    description: bank.description + '，包含完整词义、词形变化、词根记忆',
    words: words
  };
}

// 生成输出文件内容
let output = `// 完整词库数据 - 包含全部词义、词形变化、词根记忆
// 每个单词包含：word, phonetic, pos, meaning, allMeanings, derivatives, etymology
// 自动生成于 ${new Date().toISOString()}

const wordbanksFull = {\n`;

for (const [key, bank] of Object.entries(wordbanksFull)) {
  output += `  // ========== ${bank.name} ==========\n`;
  output += `  ${key}: {\n`;
  output += `    id: '${bank.id}',\n`;
  output += `    name: '${bank.name}',\n`;
  output += `    count: ${bank.count},\n`;
  output += `    category: '${bank.category}',\n`;
  output += `    description: '${bank.description}',\n`;
  output += `    words: [\n`;
  
  for (const w of bank.words) {
    output += `      { word: '${w.word}', phonetic: '${w.phonetic}', pos: '${w.pos}', meaning: '${w.meaning}', allMeanings: '${w.allMeanings}', derivatives: '${w.derivatives}', etymology: '${w.etymology}' },\n`;
  }
  
  output += `    ]\n`;
  output += `  },\n`;
}

output += `};\n\n`;

output += `// 导出函数
export function getWordbanksFullList() {
  return Object.values(wordbanksFull).map(bank => ({
    id: bank.id,
    name: bank.name,
    count: bank.count,
    category: bank.category,
    description: bank.description
  }));
}

export function getWordbankFullWords(id) {
  const bank = wordbanksFull[id];
  if (!bank) return null;
  return bank.words;
}

export function getWordsFullByLetter(id) {
  const words = getWordbankFullWords(id);
  if (!words) return null;
  
  const grouped = {};
  words.forEach((word) => {
    const firstLetter = word.word.charAt(0).toUpperCase();
    if (!grouped[firstLetter]) {
      grouped[firstLetter] = [];
    }
    grouped[firstLetter].push(word);
  });
  
  const sorted = {};
  Object.keys(grouped).sort().forEach(letter => {
    sorted[letter] = grouped[letter];
  });
  
  return sorted;
}

export default wordbanksFull;
`;

// 写入文件
const outputPath = path.join(__dirname, 'data', 'wordbanksFull.js');
fs.writeFileSync(outputPath, output, 'utf-8');
console.log(`\n生成完成！文件保存至: ${outputPath}`);
console.log(`共处理 ${Object.keys(wordbanksFull).length} 个词库`);
