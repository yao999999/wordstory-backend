// 内置词库数据 - 按分类组织
// 每个词库包含：id, name, count, category, description, words数组

const wordbanks = {
  // ========== 国内教育阶段 ==========
  primary: {
    id: 'primary',
    name: '小学英语词汇',
    count: 800,
    category: '国内教育',
    description: '教育部课标要求，小学毕业600-800词',
    words: [
      { word: 'apple', phonetic: '/ˈæpl/', pos: 'n.', meaning: '苹果' },
      { word: 'book', phonetic: '/bʊk/', pos: 'n.', meaning: '书' },
      { word: 'cat', phonetic: '/kæt/', pos: 'n.', meaning: '猫' },
      { word: 'dog', phonetic: '/dɒɡ/', pos: 'n.', meaning: '狗' },
      { word: 'egg', phonetic: '/eɡ/', pos: 'n.', meaning: '鸡蛋' },
      { word: 'fish', phonetic: '/fɪʃ/', pos: 'n.', meaning: '鱼' },
      { word: 'girl', phonetic: '/ɡɜːl/', pos: 'n.', meaning: '女孩' },
      { word: 'hand', phonetic: '/hænd/', pos: 'n.', meaning: '手' },
      { word: 'ice', phonetic: '/aɪs/', pos: 'n.', meaning: '冰' },
      { word: 'juice', phonetic: '/dʒuːs/', pos: 'n.', meaning: '果汁' },
      { word: 'kite', phonetic: '/kaɪt/', pos: 'n.', meaning: '风筝' },
      { word: 'lion', phonetic: '/ˈlaɪən/', pos: 'n.', meaning: '狮子' },
      { word: 'milk', phonetic: '/mɪlk/', pos: 'n.', meaning: '牛奶' },
      { word: 'nose', phonetic: '/nəʊz/', pos: 'n.', meaning: '鼻子' },
      { word: 'orange', phonetic: '/ˈɒrɪndʒ/', pos: 'n.', meaning: '橙子' },
      { word: 'pen', phonetic: '/pen/', pos: 'n.', meaning: '钢笔' },
      { word: 'queen', phonetic: '/kwiːn/', pos: 'n.', meaning: '女王' },
      { word: 'rabbit', phonetic: '/ˈræbɪt/', pos: 'n.', meaning: '兔子' },
      { word: 'sun', phonetic: '/sʌn/', pos: 'n.', meaning: '太阳' },
      { word: 'tiger', phonetic: '/ˈtaɪɡər/', pos: 'n.', meaning: '老虎' },
      { word: 'umbrella', phonetic: '/ʌmˈbrelə/', pos: 'n.', meaning: '雨伞' },
      { word: 'violin', phonetic: '/ˌvaɪəˈlɪn/', pos: 'n.', meaning: '小提琴' },
      { word: 'water', phonetic: '/ˈwɔːtər/', pos: 'n.', meaning: '水' },
      { word: 'box', phonetic: '/bɒks/', pos: 'n.', meaning: '盒子' },
      { word: 'yellow', phonetic: '/ˈjeləʊ/', pos: 'adj.', meaning: '黄色的' },
      { word: 'zoo', phonetic: '/zuː/', pos: 'n.', meaning: '动物园' },
      { word: 'big', phonetic: '/bɪɡ/', pos: 'adj.', meaning: '大的' },
      { word: 'small', phonetic: '/smɔːl/', pos: 'adj.', meaning: '小的' },
      { word: 'happy', phonetic: '/ˈhæpi/', pos: 'adj.', meaning: '开心的' },
      { word: 'sad', phonetic: '/sæd/', pos: 'adj.', meaning: '难过的' },
    ]
  },

  middle: {
    id: 'middle',
    name: '初中英语词汇',
    count: 1600,
    category: '国内教育',
    description: '中考核心词汇，约1600词',
    words: [
      { word: 'ability', phonetic: '/əˈbɪləti/', pos: 'n.', meaning: '能力' },
      { word: 'abroad', phonetic: '/əˈbrɔːd/', pos: 'adv.', meaning: '在国外' },
      { word: 'accept', phonetic: '/əkˈsept/', pos: 'v.', meaning: '接受' },
      { word: 'accident', phonetic: '/ˈæksɪdənt/', pos: 'n.', meaning: '事故' },
      { word: 'achieve', phonetic: '/əˈtʃiːv/', pos: 'v.', meaning: '实现，达到' },
      { word: 'across', phonetic: '/əˈkrɒs/', pos: 'prep.', meaning: '穿过' },
      { word: 'action', phonetic: '/ˈækʃn/', pos: 'n.', meaning: '行动' },
      { word: 'active', phonetic: '/ˈæktɪv/', pos: 'adj.', meaning: '积极的' },
      { word: 'activity', phonetic: '/ækˈtɪvəti/', pos: 'n.', meaning: '活动' },
      { word: 'add', phonetic: '/æd/', pos: 'v.', meaning: '添加' },
      { word: 'address', phonetic: '/əˈdres/', pos: 'n.', meaning: '地址' },
      { word: 'admire', phonetic: '/ədˈmaɪər/', pos: 'v.', meaning: '钦佩' },
      { word: 'adult', phonetic: '/ˈædʌlt/', pos: 'n.', meaning: '成年人' },
      { word: 'advantage', phonetic: '/ədˈvɑːntɪdʒ/', pos: 'n.', meaning: '优势' },
      { word: 'advertise', phonetic: '/ˈædvətaɪz/', pos: 'v.', meaning: '做广告' },
      { word: 'advice', phonetic: '/ədˈvaɪs/', pos: 'n.', meaning: '建议' },
      { word: 'afford', phonetic: '/əˈfɔːd/', pos: 'v.', meaning: '负担得起' },
      { word: 'afraid', phonetic: '/əˈfreɪd/', pos: 'adj.', meaning: '害怕的' },
      { word: 'against', phonetic: '/əˈɡenst/', pos: 'prep.', meaning: '反对' },
      { word: 'agree', phonetic: '/əˈɡriː/', pos: 'v.', meaning: '同意' },
      { word: 'ahead', phonetic: '/əˈhed/', pos: 'adv.', meaning: '向前' },
      { word: 'allow', phonetic: '/əˈlaʊ/', pos: 'v.', meaning: '允许' },
      { word: 'almost', phonetic: '/ˈɔːlməʊst/', pos: 'adv.', meaning: '几乎' },
      { word: 'alone', phonetic: '/əˈləʊn/', pos: 'adj.', meaning: '独自的' },
      { word: 'along', phonetic: '/əˈlɒŋ/', pos: 'prep.', meaning: '沿着' },
      { word: 'already', phonetic: '/ɔːlˈredi/', pos: 'adv.', meaning: '已经' },
      { word: 'although', phonetic: '/ɔːlˈðəʊ/', pos: 'conj.', meaning: '虽然' },
      { word: 'among', phonetic: '/əˈmʌŋ/', pos: 'prep.', meaning: '在...之中' },
      { word: 'ancient', phonetic: '/ˈeɪnʃənt/', pos: 'adj.', meaning: '古代的' },
      { word: 'angry', phonetic: '/ˈæŋɡri/', pos: 'adj.', meaning: '生气的' },
    ]
  },

  high: {
    id: 'high',
    name: '高中英语词汇',
    count: 3500,
    category: '国内教育',
    description: '高考大纲词汇，3500词',
    words: [
      { word: 'abandon', phonetic: '/əˈbændən/', pos: 'v.', meaning: '放弃' },
      { word: 'absolute', phonetic: '/ˈæbsəluːt/', pos: 'adj.', meaning: '绝对的' },
      { word: 'academic', phonetic: '/ˌækəˈdemɪk/', pos: 'adj.', meaning: '学术的' },
      { word: 'access', phonetic: '/ˈækses/', pos: 'n.', meaning: '进入，通道' },
      { word: 'accompany', phonetic: '/əˈkʌmpəni/', pos: 'v.', meaning: '陪伴' },
      { word: 'accomplish', phonetic: '/əˈkʌmplɪʃ/', pos: 'v.', meaning: '完成' },
      { word: 'account', phonetic: '/əˈkaʊnt/', pos: 'n.', meaning: '账户' },
      { word: 'accumulate', phonetic: '/əˈkjuːmjəleɪt/', pos: 'v.', meaning: '积累' },
      { word: 'accurate', phonetic: '/ˈækjərət/', pos: 'adj.', meaning: '精确的' },
      { word: 'accuse', phonetic: '/əˈkjuːz/', pos: 'v.', meaning: '指责' },
      { word: 'accustomed', phonetic: '/əˈkʌstəmd/', pos: 'adj.', meaning: '习惯的' },
      { word: 'ache', phonetic: '/eɪk/', pos: 'v.', meaning: '疼痛' },
      { word: 'achieve', phonetic: '/əˈtʃiːv/', pos: 'v.', meaning: '实现' },
      { word: 'achievement', phonetic: '/əˈtʃiːvmənt/', pos: 'n.', meaning: '成就' },
      { word: 'acid', phonetic: '/ˈæsɪd/', pos: 'n.', meaning: '酸' },
      { word: 'acknowledge', phonetic: '/əkˈnɒlɪdʒ/', pos: 'v.', meaning: '承认' },
      { word: 'acquaintance', phonetic: '/əˈkweɪntəns/', pos: 'n.', meaning: '熟人' },
      { word: 'acquire', phonetic: '/əˈkwaɪər/', pos: 'v.', meaning: '获得' },
      { word: 'actual', phonetic: '/ˈæktʃuəl/', pos: 'adj.', meaning: '实际的' },
      { word: 'adapt', phonetic: '/əˈdæpt/', pos: 'v.', meaning: '适应' },
      { word: 'addicted', phonetic: '/əˈdɪktɪd/', pos: 'adj.', meaning: '上瘾的' },
      { word: 'addition', phonetic: '/əˈdɪʃn/', pos: 'n.', meaning: '增加' },
      { word: 'adequate', phonetic: '/ˈædɪkwət/', pos: 'adj.', meaning: '充足的' },
      { word: 'adjust', phonetic: '/əˈdʒʌst/', pos: 'v.', meaning: '调整' },
      { word: 'administration', phonetic: '/ədˌmɪnɪˈstreɪʃn/', pos: 'n.', meaning: '管理' },
      { word: 'admire', phonetic: '/ədˈmaɪər/', pos: 'v.', meaning: '钦佩' },
      { word: 'admit', phonetic: '/ədˈmɪt/', pos: 'v.', meaning: '承认' },
      { word: 'adopt', phonetic: '/əˈdɒpt/', pos: 'v.', meaning: '采纳，收养' },
      { word: 'adorable', phonetic: '/əˈdɔːrəbl/', pos: 'adj.', meaning: '可爱的' },
      { word: 'advance', phonetic: '/ədˈvɑːns/', pos: 'v.', meaning: '前进' },
    ]
  },

  // ========== 国内考试 ==========
  cet4: {
    id: 'cet4',
    name: '四级核心词汇',
    count: 4500,
    category: '国内考试',
    description: '大学英语四级考试核心词汇',
    words: [
      { word: 'abandon', phonetic: '/əˈbændən/', pos: 'v.', meaning: '放弃，遗弃' },
      { word: 'ability', phonetic: '/əˈbɪləti/', pos: 'n.', meaning: '能力' },
      { word: 'abroad', phonetic: '/əˈbrɔːd/', pos: 'adv.', meaning: '在国外' },
      { word: 'absence', phonetic: '/ˈæbsəns/', pos: 'n.', meaning: '缺席' },
      { word: 'absolute', phonetic: '/ˈæbsəluːt/', pos: 'adj.', meaning: '绝对的' },
      { word: 'absorb', phonetic: '/əbˈzɔːb/', pos: 'v.', meaning: '吸收' },
      { word: 'abstract', phonetic: '/ˈæbstrækt/', pos: 'adj.', meaning: '抽象的' },
      { word: 'abundant', phonetic: '/əˈbʌndənt/', pos: 'adj.', meaning: '丰富的' },
      { word: 'abuse', phonetic: '/əˈbjuːs/', pos: 'v.', meaning: '滥用' },
      { word: 'academic', phonetic: '/ˌækəˈdemɪk/', pos: 'adj.', meaning: '学术的' },
      { word: 'academy', phonetic: '/əˈkædəmi/', pos: 'n.', meaning: '学院' },
      { word: 'accelerate', phonetic: '/əkˈseləreɪt/', pos: 'v.', meaning: '加速' },
      { word: 'accent', phonetic: '/ˈæksent/', pos: 'n.', meaning: '口音' },
      { word: 'accept', phonetic: '/əkˈsept/', pos: 'v.', meaning: '接受' },
      { word: 'access', phonetic: '/ˈækses/', pos: 'n.', meaning: '通道，进入' },
      { word: 'accident', phonetic: '/ˈæksɪdənt/', pos: 'n.', meaning: '事故' },
      { word: 'accompany', phonetic: '/əˈkʌmpəni/', pos: 'v.', meaning: '陪伴' },
      { word: 'accomplish', phonetic: '/əˈkʌmplɪʃ/', pos: 'v.', meaning: '完成' },
      { word: 'accord', phonetic: '/əˈkɔːd/', pos: 'v.', meaning: '一致' },
      { word: 'account', phonetic: '/əˈkaʊnt/', pos: 'n.', meaning: '账户' },
      { word: 'accumulate', phonetic: '/əˈkjuːmjəleɪt/', pos: 'v.', meaning: '积累' },
      { word: 'accurate', phonetic: '/ˈækjərət/', pos: 'adj.', meaning: '精确的' },
      { word: 'accuse', phonetic: '/əˈkjuːz/', pos: 'v.', meaning: '指责' },
      { word: 'accustomed', phonetic: '/əˈkʌstəmd/', pos: 'adj.', meaning: '习惯的' },
      { word: 'achieve', phonetic: '/əˈtʃiːv/', pos: 'v.', meaning: '实现，达到' },
      { word: 'achievement', phonetic: '/əˈtʃiːvmənt/', pos: 'n.', meaning: '成就' },
      { word: 'acid', phonetic: '/ˈæsɪd/', pos: 'n.', meaning: '酸' },
      { word: 'acknowledge', phonetic: '/əkˈnɒlɪdʒ/', pos: 'v.', meaning: '承认；致谢' },
      { word: 'acquaintance', phonetic: '/əˈkweɪntəns/', pos: 'n.', meaning: '熟人' },
      { word: 'acquire', phonetic: '/əˈkwaɪər/', pos: 'v.', meaning: '获得，习得' },
    ]
  },

  cet6: {
    id: 'cet6',
    name: '六级核心词汇',
    count: 5500,
    category: '国内考试',
    description: '大学英语六级考试核心词汇',
    words: [
      { word: 'abnormal', phonetic: '/æbˈnɔːml/', pos: 'adj.', meaning: '异常的' },
      { word: 'abolish', phonetic: '/əˈbɒlɪʃ/', pos: 'v.', meaning: '废除，废止' },
      { word: 'absurd', phonetic: '/əbˈsɜːd/', pos: 'adj.', meaning: '荒谬的' },
      { word: 'accelerate', phonetic: '/əkˈseləreɪt/', pos: 'v.', meaning: '加速' },
      { word: 'accomplish', phonetic: '/əˈkʌmplɪʃ/', pos: 'v.', meaning: '完成，实现' },
      { word: 'accumulate', phonetic: '/əˈkjuːmjəleɪt/', pos: 'v.', meaning: '积累，堆积' },
      { word: 'aggressive', phonetic: '/əˈɡresɪv/', pos: 'adj.', meaning: '侵略性的，好斗的' },
      { word: 'allegation', phonetic: '/ˌæləˈɡeɪʃn/', pos: 'n.', meaning: '指控，声称' },
      { word: 'ambitious', phonetic: '/æmˈbɪʃəs/', pos: 'adj.', meaning: '有雄心的' },
      { word: 'anonymous', phonetic: '/əˈnɒnɪməs/', pos: 'adj.', meaning: '匿名的' },
      { word: 'apparatus', phonetic: '/ˌæpəˈreɪtəs/', pos: 'n.', meaning: '器械，装置' },
      { word: 'authentic', phonetic: '/ɔːˈθentɪk/', pos: 'adj.', meaning: '真实的，可靠的' },
      { word: 'autonomous', phonetic: '/ɔːˈtɒnəməs/', pos: 'adj.', meaning: '自治的，自主的' },
      { word: 'breach', phonetic: '/briːtʃ/', pos: 'n.', meaning: '违反，缺口' },
      { word: 'catastrophe', phonetic: '/kəˈtæstrəfi/', pos: 'n.', meaning: '灾难，大祸' },
      { word: 'chronic', phonetic: '/ˈkrɒnɪk/', pos: 'adj.', meaning: '慢性的，长期的' },
      { word: 'coalition', phonetic: '/ˌkəʊəˈlɪʃn/', pos: 'n.', meaning: '联盟，联合' },
      { word: 'compatible', phonetic: '/kəmˈpætəbl/', pos: 'adj.', meaning: '兼容的，合得来的' },
      { word: 'compelling', phonetic: '/kəmˈpelɪŋ/', pos: 'adj.', meaning: '引人注目的，令人信服的' },
      { word: 'compensate', phonetic: '/ˈkɒmpenseɪt/', pos: 'v.', meaning: '补偿，赔偿' },
      { word: 'contemplate', phonetic: '/ˈkɒntəmpleɪt/', pos: 'v.', meaning: '沉思，凝视' },
      { word: 'controversy', phonetic: '/ˈkɒntrəvɜːsi/', pos: 'n.', meaning: '争论，争议' },
      { word: 'dedicate', phonetic: '/ˈdedɪkeɪt/', pos: 'v.', meaning: '致力于，奉献' },
      { word: 'deficiency', phonetic: '/dɪˈfɪʃnsi/', pos: 'n.', meaning: '缺乏，不足' },
      { word: 'deliberate', phonetic: '/dɪˈlɪbərət/', pos: 'adj.', meaning: '故意的，深思熟虑的' },
      { word: 'deprive', phonetic: '/dɪˈpraɪv/', pos: 'v.', meaning: '剥夺，使丧失' },
      { word: 'deteriorate', phonetic: '/dɪˈtɪəriəreɪt/', pos: 'v.', meaning: '恶化，变坏' },
      { word: 'disclose', phonetic: '/dɪsˈkləʊz/', pos: 'v.', meaning: '揭露，公开' },
      { word: 'dispatch', phonetic: '/dɪˈspætʃ/', pos: 'v.', meaning: '派遣，发送' },
      { word: 'elaborate', phonetic: '/ɪˈlæbərət/', pos: 'adj.', meaning: '精心制作的，详尽的' },
    ]
  },

  postgraduate: {
    id: 'postgraduate',
    name: '考研英语词汇',
    count: 5500,
    category: '国内考试',
    description: '考研英语大纲词汇，5500词',
    words: [
      { word: 'abnormal', phonetic: '/æbˈnɔːml/', pos: 'adj.', meaning: '反常的' },
      { word: 'abolish', phonetic: '/əˈbɒlɪʃ/', pos: 'v.', meaning: '废除' },
      { word: 'abrupt', phonetic: '/əˈbrʌpt/', pos: 'adj.', meaning: '突然的' },
      { word: 'absence', phonetic: '/ˈæbsəns/', pos: 'n.', meaning: '缺席' },
      { word: 'absorb', phonetic: '/əbˈzɔːb/', pos: 'v.', meaning: '吸收' },
      { word: 'abstract', phonetic: '/ˈæbstrækt/', pos: 'adj.', meaning: '抽象的' },
      { word: 'abundant', phonetic: '/əˈbʌndənt/', pos: 'adj.', meaning: '丰富的' },
      { word: 'abuse', phonetic: '/əˈbjuːz/', pos: 'v.', meaning: '滥用' },
      { word: 'academic', phonetic: '/ˌækəˈdemɪk/', pos: 'adj.', meaning: '学术的' },
      { word: 'accelerate', phonetic: '/əkˈseləreɪt/', pos: 'v.', meaning: '加速' },
      { word: 'accent', phonetic: '/ˈæksent/', pos: 'n.', meaning: '口音' },
      { word: 'acceptance', phonetic: '/əkˈseptəns/', pos: 'n.', meaning: '接受' },
      { word: 'access', phonetic: '/ˈækses/', pos: 'n.', meaning: '通道' },
      { word: 'accident', phonetic: '/ˈæksɪdənt/', pos: 'n.', meaning: '事故' },
      { word: 'accompany', phonetic: '/əˈkʌmpəni/', pos: 'v.', meaning: '陪伴' },
      { word: 'accomplish', phonetic: '/əˈkʌmplɪʃ/', pos: 'v.', meaning: '完成' },
      { word: 'accord', phonetic: '/əˈkɔːd/', pos: 'v.', meaning: '一致' },
      { word: 'account', phonetic: '/əˈkaʊnt/', pos: 'n.', meaning: '账户' },
      { word: 'accumulate', phonetic: '/əˈkjuːmjəleɪt/', pos: 'v.', meaning: '积累' },
      { word: 'accurate', phonetic: '/ˈækjərət/', pos: 'adj.', meaning: '精确的' },
      { word: 'accuse', phonetic: '/əˈkjuːz/', pos: 'v.', meaning: '指责' },
      { word: 'accustomed', phonetic: '/əˈkʌstəmd/', pos: 'adj.', meaning: '习惯的' },
      { word: 'achievement', phonetic: '/əˈtʃiːvmənt/', pos: 'n.', meaning: '成就' },
      { word: 'acid', phonetic: '/ˈæsɪd/', pos: 'n.', meaning: '酸' },
      { word: 'acknowledge', phonetic: '/əkˈnɒlɪdʒ/', pos: 'v.', meaning: '承认' },
      { word: 'acquaintance', phonetic: '/əˈkweɪntəns/', pos: 'n.', meaning: '熟人' },
      { word: 'acquire', phonetic: '/əˈkwaɪər/', pos: 'v.', meaning: '获得' },
      { word: 'acquisition', phonetic: '/ˌækwɪˈzɪʃn/', pos: 'n.', meaning: '获得' },
      { word: 'acre', phonetic: '/ˈeɪkər/', pos: 'n.', meaning: '英亩' },
      { word: 'adapt', phonetic: '/əˈdæpt/', pos: 'v.', meaning: '适应' },
    ]
  },

  // ========== 出国留学考试 ==========
  ielts: {
    id: 'ielts',
    name: '雅思核心词汇',
    count: 5000,
    category: '出国留学',
    description: '雅思考试核心词汇，4000-5000词',
    words: [
      { word: 'abandon', phonetic: '/əˈbændən/', pos: 'v.', meaning: '放弃，遗弃' },
      { word: 'abstract', phonetic: '/ˈæbstrækt/', pos: 'adj.', meaning: '抽象的' },
      { word: 'accommodate', phonetic: '/əˈkɒmədeɪt/', pos: 'v.', meaning: '容纳；适应' },
      { word: 'acknowledge', phonetic: '/əkˈnɒlɪdʒ/', pos: 'v.', meaning: '承认；致谢' },
      { word: 'acquire', phonetic: '/əˈkwaɪər/', pos: 'v.', meaning: '获得，习得' },
      { word: 'adapt', phonetic: '/əˈdæpt/', pos: 'v.', meaning: '适应，改编' },
      { word: 'adequate', phonetic: '/ˈædɪkwət/', pos: 'adj.', meaning: '充足的，适当的' },
      { word: 'adjust', phonetic: '/əˈdʒʌst/', pos: 'v.', meaning: '调整，适应' },
      { word: 'administration', phonetic: '/ədˌmɪnɪˈstreɪʃn/', pos: 'n.', meaning: '管理，行政' },
      { word: 'advocate', phonetic: '/ˈædvəkeɪt/', pos: 'v.', meaning: '提倡，主张' },
      { word: 'affect', phonetic: '/əˈfekt/', pos: 'v.', meaning: '影响' },
      { word: 'allocate', phonetic: '/ˈæləkeɪt/', pos: 'v.', meaning: '分配，拨出' },
      { word: 'alternative', phonetic: '/ɔːlˈtɜːnətɪv/', pos: 'n.', meaning: '替代方案' },
      { word: 'ambiguous', phonetic: '/æmˈbɪɡjuəs/', pos: 'adj.', meaning: '模棱两可的' },
      { word: 'analyze', phonetic: '/ˈænəlaɪz/', pos: 'v.', meaning: '分析' },
      { word: 'annual', phonetic: '/ˈænjuəl/', pos: 'adj.', meaning: '年度的，每年的' },
      { word: 'anticipate', phonetic: '/ænˈtɪsɪpeɪt/', pos: 'v.', meaning: '预期，预料' },
      { word: 'apparent', phonetic: '/əˈpærənt/', pos: 'adj.', meaning: '明显的，表面上的' },
      { word: 'appropriate', phonetic: '/əˈprəʊpriət/', pos: 'adj.', meaning: '适当的，恰当的' },
      { word: 'approximate', phonetic: '/əˈprɒksɪmət/', pos: 'adj.', meaning: '大约的，近似的' },
      { word: 'arbitrary', phonetic: '/ˈɑːbɪtrəri/', pos: 'adj.', meaning: '任意的，武断的' },
      { word: 'assess', phonetic: '/əˈses/', pos: 'v.', meaning: '评估，评定' },
      { word: 'assume', phonetic: '/əˈsjuːm/', pos: 'v.', meaning: '假设，承担' },
      { word: 'atmosphere', phonetic: '/ˈætməsfɪər/', pos: 'n.', meaning: '气氛，大气层' },
      { word: 'attribute', phonetic: '/əˈtrɪbjuːt/', pos: 'v.', meaning: '归因于' },
      { word: 'authority', phonetic: '/ɔːˈθɒrəti/', pos: 'n.', meaning: '权威，当局' },
      { word: 'available', phonetic: '/əˈveɪləbl/', pos: 'adj.', meaning: '可用的，有空的' },
      { word: 'barrier', phonetic: '/ˈbæriər/', pos: 'n.', meaning: '障碍，屏障' },
      { word: 'benefit', phonetic: '/ˈbenɪfɪt/', pos: 'n.', meaning: '利益，好处' },
      { word: 'bond', phonetic: '/bɒnd/', pos: 'n.', meaning: '纽带，债券' },
    ]
  },

  toefl: {
    id: 'toefl',
    name: '托福核心词汇',
    count: 5000,
    category: '出国留学',
    description: '托福考试核心词汇',
    words: [
      { word: 'abundant', phonetic: '/əˈbʌndənt/', pos: 'adj.', meaning: '丰富的，充裕的' },
      { word: 'accelerate', phonetic: '/əkˈseləreɪt/', pos: 'v.', meaning: '加速' },
      { word: 'accessible', phonetic: '/əkˈsesəbl/', pos: 'adj.', meaning: '可接近的，可使用的' },
      { word: 'accommodate', phonetic: '/əˈkɒmədeɪt/', pos: 'v.', meaning: '容纳；适应' },
      { word: 'accumulate', phonetic: '/əˈkjuːmjəleɪt/', pos: 'v.', meaning: '积累' },
      { word: 'acknowledge', phonetic: '/əkˈnɒlɪdʒ/', pos: 'v.', meaning: '承认' },
      { word: 'adequate', phonetic: '/ˈædɪkwət/', pos: 'adj.', meaning: '充足的' },
      { word: 'advocate', phonetic: '/ˈædvəkeɪt/', pos: 'v.', meaning: '提倡' },
      { word: 'aggregate', phonetic: '/ˈæɡrɪɡeɪt/', pos: 'v.', meaning: '聚集，合计' },
      { word: 'allocate', phonetic: '/ˈæləkeɪt/', pos: 'v.', meaning: '分配' },
      { word: 'ambiguous', phonetic: '/æmˈbɪɡjuəs/', pos: 'adj.', meaning: '模棱两可的' },
      { word: 'amend', phonetic: '/əˈmend/', pos: 'v.', meaning: '修正，改进' },
      { word: 'anticipate', phonetic: '/ænˈtɪsɪpeɪt/', pos: 'v.', meaning: '预期' },
      { word: 'apparent', phonetic: '/əˈpærənt/', pos: 'adj.', meaning: '明显的' },
      { word: 'arbitrary', phonetic: '/ˈɑːbɪtrəri/', pos: 'adj.', meaning: '任意的' },
      { word: 'authentic', phonetic: '/ɔːˈθentɪk/', pos: 'adj.', meaning: '真实的' },
      { word: 'beneficial', phonetic: '/ˌbenɪˈfɪʃl/', pos: 'adj.', meaning: '有益的' },
      { word: 'bulk', phonetic: '/bʌlk/', pos: 'n.', meaning: '大量，体积' },
      { word: 'cease', phonetic: '/siːs/', pos: 'v.', meaning: '停止' },
      { word: 'coherent', phonetic: '/kəʊˈhɪərənt/', pos: 'adj.', meaning: '连贯的，一致的' },
      { word: 'compensate', phonetic: '/ˈkɒmpenseɪt/', pos: 'v.', meaning: '补偿' },
      { word: 'comprehensive', phonetic: '/ˌkɒmprɪˈhensɪv/', pos: 'adj.', meaning: '全面的，综合的' },
      { word: 'conceive', phonetic: '/kənˈsiːv/', pos: 'v.', meaning: '构想，怀孕' },
      { word: 'concurrent', phonetic: '/kənˈkʌrənt/', pos: 'adj.', meaning: '同时发生的' },
      { word: 'confine', phonetic: '/kənˈfaɪn/', pos: 'v.', meaning: '限制，禁闭' },
      { word: 'conform', phonetic: '/kənˈfɔːm/', pos: 'v.', meaning: '符合，遵从' },
      { word: 'consecutive', phonetic: '/kənˈsekjutɪv/', pos: 'adj.', meaning: '连续的' },
      { word: 'consolidate', phonetic: '/kənˈsɒlɪdeɪt/', pos: 'v.', meaning: '巩固，合并' },
      { word: 'constitute', phonetic: '/ˈkɒnstɪtjuːt/', pos: 'v.', meaning: '构成，组成' },
      { word: 'contemplate', phonetic: '/ˈkɒntəmpleɪt/', pos: 'v.', meaning: '沉思' },
    ]
  },

  gre: {
    id: 'gre',
    name: 'GRE核心词汇',
    count: 3000,
    category: '出国留学',
    description: 'GRE考试核心词汇，3000词',
    words: [
      { word: 'aberration', phonetic: '/ˌæbəˈreɪʃn/', pos: 'n.', meaning: '偏差，异常行为' },
      { word: 'abnegate', phonetic: '/ˈæbnɪɡeɪt/', pos: 'v.', meaning: '否认，放弃' },
      { word: 'abstemious', phonetic: '/əbˈstiːmiəs/', pos: 'adj.', meaning: '有节制的，节俭的' },
      { word: 'abstruse', phonetic: '/əbˈstruːs/', pos: 'adj.', meaning: '深奥的，难懂的' },
      { word: 'accede', phonetic: '/əkˈsiːd/', pos: 'v.', meaning: '同意，就任' },
      { word: 'acrimony', phonetic: '/ˈækrɪməni/', pos: 'n.', meaning: '刻薄，尖锐' },
      { word: 'adulterate', phonetic: '/əˈdʌltəreɪt/', pos: 'v.', meaning: '掺假，使不纯' },
      { word: 'aesthetic', phonetic: '/iːsˈθetɪk/', pos: 'adj.', meaning: '审美的，美学的' },
      { word: 'altruistic', phonetic: '/ˌæltruˈɪstɪk/', pos: 'adj.', meaning: '利他的，无私的' },
      { word: 'ambivalent', phonetic: '/æmˈbɪvələnt/', pos: 'adj.', meaning: '矛盾的，犹豫不决的' },
      { word: 'amiable', phonetic: '/ˈeɪmiəbl/', pos: 'adj.', meaning: '和蔼的，友好的' },
      { word: 'anachronism', phonetic: '/əˈnækrənɪzəm/', pos: 'n.', meaning: '时代错误' },
      { word: 'anomalous', phonetic: '/əˈnɒmələs/', pos: 'adj.', meaning: '异常的，不规则的' },
      { word: 'antipathy', phonetic: '/ænˈtɪpəθi/', pos: 'n.', meaning: '反感，厌恶' },
      { word: 'apathy', phonetic: '/ˈæpəθi/', pos: 'n.', meaning: '冷漠，无动于衷' },
      { word: 'appease', phonetic: '/əˈpiːz/', pos: 'v.', meaning: '安抚，平息' },
      { word: 'arduous', phonetic: '/ˈɑːdjuəs/', pos: 'adj.', meaning: '艰苦的，费力的' },
      { word: 'artful', phonetic: '/ˈɑːtfl/', pos: 'adj.', meaning: '巧妙的，狡猾的' },
      { word: 'ascetic', phonetic: '/əˈsetɪk/', pos: 'adj.', meaning: '禁欲的，苦行的' },
      { word: 'assuage', phonetic: '/əˈsweɪdʒ/', pos: 'v.', meaning: '缓和，减轻' },
      { word: 'audacious', phonetic: '/ɔːˈdeɪʃəs/', pos: 'adj.', meaning: '大胆的，鲁莽的' },
      { word: 'auspicious', phonetic: '/ɔːˈspɪʃəs/', pos: 'adj.', meaning: '吉利的，有前途的' },
      { word: 'austere', phonetic: '/ɒˈstɪər/', pos: 'adj.', meaning: '朴素的，严厉的' },
      { word: 'avarice', phonetic: '/ˈævərɪs/', pos: 'n.', meaning: '贪婪，贪财' },
      { word: 'belligerent', phonetic: '/bəˈlɪdʒərənt/', pos: 'adj.', meaning: '好战的，交战的' },
      { word: 'benevolent', phonetic: '/bəˈnevələnt/', pos: 'adj.', meaning: '仁慈的，慈善的' },
      { word: 'bolster', phonetic: '/ˈbəʊlstər/', pos: 'v.', meaning: '支持，增强' },
      { word: 'burgeon', phonetic: '/ˈbɜːdʒən/', pos: 'v.', meaning: '迅速发展，萌芽' },
      { word: 'cacophony', phonetic: '/kəˈkɒfəni/', pos: 'n.', meaning: '刺耳的声音，不和谐' },
      { word: 'capricious', phonetic: '/kəˈprɪʃəs/', pos: 'adj.', meaning: '善变的，反复无常的' },
    ]
  },

  sat: {
    id: 'sat',
    name: 'SAT核心词汇',
    count: 4000,
    category: '出国留学',
    description: 'SAT考试核心词汇，4000词',
    words: [
      { word: 'abhor', phonetic: '/əbˈhɔːr/', pos: 'v.', meaning: '憎恶' },
      { word: 'abide', phonetic: '/əˈbaɪd/', pos: 'v.', meaning: '遵守' },
      { word: 'abolish', phonetic: '/əˈbɒlɪʃ/', pos: 'v.', meaning: '废除' },
      { word: 'absorb', phonetic: '/əbˈzɔːb/', pos: 'v.', meaning: '吸收' },
      { word: 'abstract', phonetic: '/ˈæbstrækt/', pos: 'adj.', meaning: '抽象的' },
      { word: 'abundant', phonetic: '/əˈbʌndənt/', pos: 'adj.', meaning: '丰富的' },
      { word: 'academic', phonetic: '/ˌækəˈdemɪk/', pos: 'adj.', meaning: '学术的' },
      { word: 'accelerate', phonetic: '/əkˈseləreɪt/', pos: 'v.', meaning: '加速' },
      { word: 'accent', phonetic: '/ˈæksent/', pos: 'n.', meaning: '口音' },
      { word: 'accept', phonetic: '/əkˈsept/', pos: 'v.', meaning: '接受' },
      { word: 'access', phonetic: '/ˈækses/', pos: 'n.', meaning: '通道' },
      { word: 'accident', phonetic: '/ˈæksɪdənt/', pos: 'n.', meaning: '事故' },
      { word: 'accompany', phonetic: '/əˈkʌmpəni/', pos: 'v.', meaning: '陪伴' },
      { word: 'accomplish', phonetic: '/əˈkʌmplɪʃ/', pos: 'v.', meaning: '完成' },
      { word: 'accord', phonetic: '/əˈkɔːd/', pos: 'v.', meaning: '一致' },
      { word: 'account', phonetic: '/əˈkaʊnt/', pos: 'n.', meaning: '账户' },
      { word: 'accumulate', phonetic: '/əˈkjuːmjəleɪt/', pos: 'v.', meaning: '积累' },
      { word: 'accurate', phonetic: '/ˈækjərət/', pos: 'adj.', meaning: '精确的' },
      { word: 'accuse', phonetic: '/əˈkjuːz/', pos: 'v.', meaning: '指责' },
      { word: 'accustomed', phonetic: '/əˈkʌstəmd/', pos: 'adj.', meaning: '习惯的' },
      { word: 'ache', phonetic: '/eɪk/', pos: 'v.', meaning: '疼痛' },
      { word: 'achieve', phonetic: '/əˈtʃiːv/', pos: 'v.', meaning: '实现' },
      { word: 'achievement', phonetic: '/əˈtʃiːvmənt/', pos: 'n.', meaning: '成就' },
      { word: 'acid', phonetic: '/ˈæsɪd/', pos: 'n.', meaning: '酸' },
      { word: 'acknowledge', phonetic: '/əkˈnɒlɪdʒ/', pos: 'v.', meaning: '承认' },
      { word: 'acquaintance', phonetic: '/əˈkweɪntəns/', pos: 'n.', meaning: '熟人' },
      { word: 'acquire', phonetic: '/əˈkwaɪər/', pos: 'v.', meaning: '获得' },
      { word: 'acquisition', phonetic: '/ˌækwɪˈzɪʃn/', pos: 'n.', meaning: '获得' },
      { word: 'acre', phonetic: '/ˈeɪkər/', pos: 'n.', meaning: '英亩' },
      { word: 'adapt', phonetic: '/əˈdæpt/', pos: 'v.', meaning: '适应' },
    ]
  },

  pte: {
    id: 'pte',
    name: 'PTE核心词汇',
    count: 2000,
    category: '出国留学',
    description: 'PTE学术英语考试核心词汇，2000词',
    words: [
      { word: 'abandon', phonetic: '/əˈbændən/', pos: 'v.', meaning: '放弃' },
      { word: 'ability', phonetic: '/əˈbɪləti/', pos: 'n.', meaning: '能力' },
      { word: 'abolish', phonetic: '/əˈbɒlɪʃ/', pos: 'v.', meaning: '废除' },
      { word: 'abroad', phonetic: '/əˈbrɔːd/', pos: 'adv.', meaning: '在国外' },
      { word: 'absence', phonetic: '/ˈæbsəns/', pos: 'n.', meaning: '缺席' },
      { word: 'absolute', phonetic: '/ˈæbsəluːt/', pos: 'adj.', meaning: '绝对的' },
      { word: 'absorb', phonetic: '/əbˈzɔːb/', pos: 'v.', meaning: '吸收' },
      { word: 'abstract', phonetic: '/ˈæbstrækt/', pos: 'adj.', meaning: '抽象的' },
      { word: 'abundant', phonetic: '/əˈbʌndənt/', pos: 'adj.', meaning: '丰富的' },
      { word: 'abuse', phonetic: '/əˈbjuːs/', pos: 'v.', meaning: '滥用' },
      { word: 'academic', phonetic: '/ˌækəˈdemɪk/', pos: 'adj.', meaning: '学术的' },
      { word: 'academy', phonetic: '/əˈkædəmi/', pos: 'n.', meaning: '学院' },
      { word: 'accelerate', phonetic: '/əkˈseləreɪt/', pos: 'v.', meaning: '加速' },
      { word: 'accent', phonetic: '/ˈæksent/', pos: 'n.', meaning: '口音' },
      { word: 'accept', phonetic: '/əkˈsept/', pos: 'v.', meaning: '接受' },
      { word: 'access', phonetic: '/ˈækses/', pos: 'n.', meaning: '通道' },
      { word: 'accident', phonetic: '/ˈæksɪdənt/', pos: 'n.', meaning: '事故' },
      { word: 'accompany', phonetic: '/əˈkʌmpəni/', pos: 'v.', meaning: '陪伴' },
      { word: 'accomplish', phonetic: '/əˈkʌmplɪʃ/', pos: 'v.', meaning: '完成' },
      { word: 'accord', phonetic: '/əˈkɔːd/', pos: 'v.', meaning: '一致' },
      { word: 'account', phonetic: '/əˈkaʊnt/', pos: 'n.', meaning: '账户' },
      { word: 'accumulate', phonetic: '/əˈkjuːmjəleɪt/', pos: 'v.', meaning: '积累' },
      { word: 'accurate', phonetic: '/ˈækjərət/', pos: 'adj.', meaning: '精确的' },
      { word: 'accuse', phonetic: '/əˈkjuːz/', pos: 'v.', meaning: '指责' },
      { word: 'accustomed', phonetic: '/əˈkʌstəmd/', pos: 'adj.', meaning: '习惯的' },
      { word: 'achievement', phonetic: '/əˈtʃiːvmənt/', pos: 'n.', meaning: '成就' },
      { word: 'acid', phonetic: '/ˈæsɪd/', pos: 'n.', meaning: '酸' },
      { word: 'acknowledge', phonetic: '/əkˈnɒlɪdʒ/', pos: 'v.', meaning: '承认' },
      { word: 'acquaintance', phonetic: '/əˈkweɪntəns/', pos: 'n.', meaning: '熟人' },
      { word: 'acquire', phonetic: '/əˈkwaɪər/', pos: 'v.', meaning: '获得' },
    ]
  },

  // ========== 商务英语 ==========
  bec: {
    id: 'bec',
    name: 'BEC商务英语',
    count: 3000,
    category: '商务英语',
    description: '剑桥商务英语证书考试核心词汇',
    words: [
      { word: 'ability', phonetic: '/əˈbɪləti/', pos: 'n.', meaning: '能力' },
      { word: 'abroad', phonetic: '/əˈbrɔːd/', pos: 'adv.', meaning: '在国外' },
      { word: 'absence', phonetic: '/ˈæbsəns/', pos: 'n.', meaning: '缺席' },
      { word: 'absolute', phonetic: '/ˈæbsəluːt/', pos: 'adj.', meaning: '绝对的' },
      { word: 'absorb', phonetic: '/əbˈzɔːb/', pos: 'v.', meaning: '吸收' },
      { word: 'abstract', phonetic: '/ˈæbstrækt/', pos: 'adj.', meaning: '抽象的' },
      { word: 'abundant', phonetic: '/əˈbʌndənt/', pos: 'adj.', meaning: '丰富的' },
      { word: 'abuse', phonetic: '/əˈbjuːs/', pos: 'v.', meaning: '滥用' },
      { word: 'academic', phonetic: '/ˌækəˈdemɪk/', pos: 'adj.', meaning: '学术的' },
      { word: 'academy', phonetic: '/əˈkædəmi/', pos: 'n.', meaning: '学院' },
      { word: 'accelerate', phonetic: '/əkˈseləreɪt/', pos: 'v.', meaning: '加速' },
      { word: 'accent', phonetic: '/ˈæksent/', pos: 'n.', meaning: '口音' },
      { word: 'accept', phonetic: '/əkˈsept/', pos: 'v.', meaning: '接受' },
      { word: 'access', phonetic: '/ˈækses/', pos: 'n.', meaning: '通道' },
      { word: 'accident', phonetic: '/ˈæksɪdənt/', pos: 'n.', meaning: '事故' },
      { word: 'accompany', phonetic: '/əˈkʌmpəni/', pos: 'v.', meaning: '陪伴' },
      { word: 'accomplish', phonetic: '/əˈkʌmplɪʃ/', pos: 'v.', meaning: '完成' },
      { word: 'accord', phonetic: '/əˈkɔːd/', pos: 'v.', meaning: '一致' },
      { word: 'account', phonetic: '/əˈkaʊnt/', pos: 'n.', meaning: '账户' },
      { word: 'accumulate', phonetic: '/əˈkjuːmjəleɪt/', pos: 'v.', meaning: '积累' },
      { word: 'accurate', phonetic: '/ˈækjərət/', pos: 'adj.', meaning: '精确的' },
      { word: 'accuse', phonetic: '/əˈkjuːz/', pos: 'v.', meaning: '指责' },
      { word: 'accustomed', phonetic: '/əˈkʌstəmd/', pos: 'adj.', meaning: '习惯的' },
      { word: 'achievement', phonetic: '/əˈtʃiːvmənt/', pos: 'n.', meaning: '成就' },
      { word: 'acid', phonetic: '/ˈæsɪd/', pos: 'n.', meaning: '酸' },
      { word: 'acknowledge', phonetic: '/əkˈnɒlɪdʒ/', pos: 'v.', meaning: '承认' },
      { word: 'acquaintance', phonetic: '/əˈkweɪntəns/', pos: 'n.', meaning: '熟人' },
      { word: 'acquire', phonetic: '/əˈkwaɪər/', pos: 'v.', meaning: '获得' },
      { word: 'acquisition', phonetic: '/ˌækwɪˈzɪʃn/', pos: 'n.', meaning: '获得' },
      { word: 'acre', phonetic: '/ˈeɪkər/', pos: 'n.', meaning: '英亩' },
    ]
  },
};

// 获取所有词库列表（用于 /api/wordbanks）
export function getWordbanksList() {
  return Object.values(wordbanks).map(bank => ({
    id: bank.id,
    name: bank.name,
    count: bank.count,
    category: bank.category,
    description: bank.description
  }));
}

// 获取指定词库的单词
export function getWordbankWords(id) {
  const bank = wordbanks[id];
  if (!bank) return null;
  return bank.words;
}

// 获取词库分类
export function getCategories() {
  const categories = new Set();
  Object.values(wordbanks).forEach(bank => {
    categories.add(bank.category);
  });
  return Array.from(categories);
}

// 按分类获取词库
export function getWordbanksByCategory(category) {
  return Object.values(wordbanks)
    .filter(bank => bank.category === category)
    .map(bank => ({
      id: bank.id,
      name: bank.name,
      count: bank.count,
      description: bank.description
    }));
}

// 获取单词按字母分组
export function getWordsByLetter(id) {
  const words = getWordbankWords(id);
  if (!words) return null;
  
  const grouped = {};
  words.forEach((word, index) => {
    const firstLetter = word.word.charAt(0).toUpperCase();
    if (!grouped[firstLetter]) {
      grouped[firstLetter] = [];
    }
    grouped[firstLetter].push({ ...word, index: index + 1 });
  });
  
  // 按字母顺序排序
  const sorted = {};
  Object.keys(grouped).sort().forEach(letter => {
    sorted[letter] = grouped[letter];
  });
  
  return sorted;
}

export default wordbanks;
