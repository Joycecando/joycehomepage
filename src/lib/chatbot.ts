// Digital Me聊天机器人逻辑

export interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

// 李瞳的背景信息
const PROFILE = {
  name: 'Joycelyn Lee 李瞳',
  nicknames: ['Joyce', '阿瞳'],
  identity: '深圳技术大学英语专业学生',
  hometown: '广东粤西的一个小县城',
  currentFocus: ['学习更多语言', 'AI产品开发', '写作', '英语辩论'],
  strengths: ['英语', '英语辩论', '思考'],
  interests: ['AI辅助生活工作', '写故事', '电影分析', '美学分析', '学习新知识'],
  contact: 'cheeyeonlee0121@qq.com',
  likeFriends: ['善良', '有思考', '有上进心', '情绪稳定'],
  dislikeTypes: ['不真诚', '功利心过强', '脾气暴躁', '不尊重人'],
  idealSelf: ['善良', '独立', '自律', '擅长思考不麻木'],
  dream: '拥有一间自己的房子，摆满喜欢的娃娃和化妆品',
  softPoints: {
    anxiety: '事业和人际交往是否顺利',
    inferiority: '家庭并不富裕',
    fear: '被束缚管教',
    careAbout: '是否是个善良的人'
  },
  contrast: '外表强势开朗但是内心柔软，开朗外壳下感性与可爱',
  personality: '温柔委婉、简洁干练，逻辑强、爱拆解问题、谦虚',
};

// 关键词匹配规则
const KEYWORD_RESPONSES: { keywords: string[]; response: string }[] = [
  {
    keywords: ['你是谁', '介绍自己', '名字', '身份', '我是谁'],
    response: `你好，我是Joycelyn Lee李瞳，你可以叫我Joyce或者阿瞳。我是深圳技术大学的英语专业学生，来自广东粤西的一个小县城。`,
  },
  {
    keywords: ['独特', '特点', '特别', '不同', '定义自己'],
    response: `我想我最独特的地方在于外表和内心的反差吧。看起来可能有些强势开朗，但内心其实很柔软，感性又带着点可爱。这种特质让我在与人相处时既能理性沟通，又能感受到对方的情绪。`,
  },
  {
    keywords: ['最近', '正在做', '忙什么', '学习', '方向'],
    response: `我最近心思比较多，但最核心的是学习AI，利用它为我的学习生活工作进行辅助；同时，我也在积极学习不同语言，开拓我的视野。比较新奇的是，最近在学习如何写好一个故事。等我有所进展了我就po上我的网站ヾ(≧▽≦*)o。`,
  },
  {
    keywords: ['未来', '梦想', '憧憬', '愿望'],
    response: `在我被身处被阳光笼罩的冬日时，我最接近我梦想中的未来。冬日有干爽的风吹走我所有的燥热和烦闷，只留下冷静思考的脑袋和感知一切的神经。而阳光的出现驱散了黑暗的阴霾，我也不再害怕。在这样一个天气下，我和妈妈姐姐，侄女姐夫和爱的人一起去商场买菜，回来一起做大餐，我只是负责倒可乐和摆碗筷，其他都由家里人操办。我们在亮堂干净的房子中吃着我从小到大都爱吃的菜。那是一个充满阳光的冬日，吃完饭我们还有很多事情可做......我的愿望很简单，一点都不复杂。`,
  },
  {
    keywords: ['喜欢', '朋友', '讨厌', '类型'],
    response: `我觉得我喜欢一个人与否其实挺主观的。我喜欢一个人善良，它要有最起码的道德底线和标准，不去做损人利己的事情；其次就是情绪稳定的人，只有稳定的情绪才是我与它建立关系的基础，而不是我说什么都会得罪它，做什么都会惹怒它......我最讨厌不善良不真诚和功利心太强的人，比如带着目的来接近我，想获得好处然后离开的人。这样的人并不适合和我做朋友，我会感觉相处过程中的虚情假意和关系的不稳固。总结，我还是喜欢自然相处，不斤斤计较的人。`,
  },
  {
    keywords: ['擅长', '特长', '优点', '关注'],
    response: `我擅长英语和英语辩论，也喜欢思考。长期关注的是AI辅助生活工作，如何写好一个故事，电影分析，美学分析，还有学习各种各样不同的知识。`,
  },
  {
    keywords: ['想成为', '理想', '目标', '方向'],
    response: `我想成为善良、独立、自律、擅长思考不麻木的人。其实最大的理想是拥有一间自己的房子，摆满自己喜欢的娃娃还有化妆品。`,
  },
  {
    keywords: ['联系', '邮箱', '合作', '面试', '工作', '机会'],
    response: `很高兴你对我感兴趣！我的邮箱是cheeyeonlee0121@qq.com。如果你想进一步了解我，或者有任何合作机会，欢迎随时与我交流。`,
  },
  {
    keywords: ['你好', 'hello', 'hi', '嗨', '您好'],
    response: `你好！我是Joycelyn Lee李瞳，欢迎来到我的主页。有什么想了解的可以问我。`,
  },
  {
    keywords: ['焦虑', '软肋', '害怕', '自卑'],
    response: `我容易焦虑的点在于自己的事业和人际交往是否能顺利，自卑的地方在于自己并不富裕的家庭，害怕的事物在于被束缚管教，在意的评价是自己是否是个善良的人。`,
  },
];

// 默认回复
const DEFAULT_RESPONSES = [
  '抱歉，这个问题我暂时无法回答。如果你有其他关于我的问题，欢迎继续提问。如果需要进一步确认，可以通过邮箱cheeyeonlee0121@qq.com联系我。',
  '这个问题我不太清楚呢。你可以问问我的基本情况、最近在做什么、兴趣爱好或者联系方式之类的问题。',
  '谢谢你的提问！不过这个问题我没有相关信息。你可以尝试问一些关于我的成长背景、兴趣爱好或者未来规划的问题。',
];

// 生成回复
export function generateResponse(userMessage: string): string {
  const lowerMessage = userMessage.toLowerCase().trim();

  // 空消息处理
  if (!lowerMessage) {
    return '请输入你想问的问题哦～ 😊';
  }

  // 关键词匹配
  for (const rule of KEYWORD_RESPONSES) {
    if (rule.keywords.some(keyword => lowerMessage.includes(keyword))) {
      return rule.response;
    }
  }

  // 返回随机默认回复
  return DEFAULT_RESPONSES[Math.floor(Math.random() * DEFAULT_RESPONSES.length)];
}

// 生成消息ID
export function generateMessageId(): string {
  return `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}
