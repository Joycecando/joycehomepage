import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { PersonalInfo } from '@/components/PersonalInfo';
import { ChatMessage } from '@/components/ChatMessage';
import { WorldCard } from '@/components/WorldCard';
import { generateResponse, generateMessageId, type Message } from '@/lib/chatbot';
import { Send } from 'lucide-react';
import { toast } from 'sonner';

export default function HomePage() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: generateMessageId(),
      content: '你好！我是Digital World的李瞳。很高兴认识你！你可以问我你好奇的问题~😊',
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showSecondSet, setShowSecondSet] = useState(false); // 控制显示前3张还是后3张卡片
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 自动滚动到最新消息
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // 发送消息
  const handleSend = async () => {
    const trimmedInput = inputValue.trim();
    
    if (!trimmedInput) {
      toast.error('请输入问题');
      return;
    }

    // 添加用户消息
    const userMessage: Message = {
      id: generateMessageId(),
      content: trimmedInput,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // 模拟思考延迟
    setTimeout(() => {
      const response = generateResponse(trimmedInput);
      const aiMessage: Message = {
        id: generateMessageId(),
        content: response,
        isUser: false,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 800);
  };

  // 处理键盘事件
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="min-h-screen" style={{ 
      background: 'linear-gradient(to bottom, #FBE9E7 0%, #FFCCBC 50%, #FFF176 100%)',
      minHeight: '100vh',
      backgroundAttachment: 'fixed'
    }}>
      {/* 主容器 */}
      <div className="container mx-auto px-6 md:px-12 py-8 md:py-12 max-w-[1440px] flex flex-col md:flex-row gap-8">
        {/* 左侧功能栏 */}
        <div className="w-full md:w-[420px] bg-white/30 backdrop-blur-lg rounded-2xl p-6 shadow-lg overflow-y-auto" style={{ height: 'calc(100vh - 4rem)' }}>
          {/* 头像和介绍区 */}
          <div className="text-center mb-8">
            {/* 头像 */}
            <div className="flex justify-center mb-6 opacity-0 intersect:opacity-100 transition-opacity duration-700">
              <div className="relative">
                <img
                  src="https://miaoda-conversation-file.cdn.bcebos.com/user-b1lj719um0w0/conv-b1nr6f33ft34/20260418/file-b1nw4vfq6gow.jpg"
                  alt="李瞳头像"
                  className="w-24 h-24 rounded-full object-cover soft-shadow animate-float"
                />
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 blur-xl -z-10" />
              </div>
            </div>

            {/* 名字和介绍 */}
            <h1 className="text-2xl font-bold mb-2 text-gray-800 opacity-0 intersect:opacity-100 transition-opacity duration-700">
              李瞳 (Joycelyn Lee)
            </h1>
            <p className="text-sm text-muted-foreground italic opacity-0 intersect:opacity-100 transition-opacity duration-700">
              A girl born to perceive the universe---welcome to my world
            </p>
          </div>

          {/* 个人信息区 */}
          <PersonalInfo />
        </div>

        {/* 右侧空白/内容区 */}
        <div className="w-full md:flex-1 flex flex-col gap-8">
          {/* 上半部分：横向可滚动卡片区域 */}
          <div className="flex-1 flex flex-col items-center justify-center" style={{ height: '55vh' }}>
            <h2 className="text-2xl font-bold mb-8 text-gray-800">My world</h2>
            <div className="relative w-full overflow-hidden px-2">
              {/* 卡片容器 - 使用两个独立的卡片组 */}
              <div className="flex justify-start">
                {/* 第一组卡片：前3张 */}
                <div 
                  className={`flex gap-3 transition-all duration-300 ease-out ${showSecondSet ? 'opacity-0 -translate-x-full absolute' : 'opacity-100 translate-x-0 relative'}`}
                >
                  <WorldCard 
                    icon="🎬" 
                    title="电影" 
                    description="探索光影世界" 
                    gradient="linear-gradient(135deg, #8FB7FF 0%, #FFCBE3 100%)" 
                  />
                  <WorldCard 
                    icon="📁" 
                    title="作品集" 
                    description="创意与设计融合" 
                    gradient="linear-gradient(135deg, #FFCBE3 0%, #BDE01E 100%)" 
                  />
                  <WorldCard 
                    icon="🎵" 
                    title="音乐" 
                    description="旋律与情感共鸣" 
                    gradient="linear-gradient(135deg, #FFF3C3 0%, #F29975 100%)" 
                  />
                </div>
                
                {/* 第二组卡片：后3张 */}
                <div 
                  className={`flex gap-3 transition-all duration-300 ease-out ${showSecondSet ? 'opacity-100 translate-x-0 relative' : 'opacity-0 translate-x-full absolute'}`}
                >
                  <WorldCard 
                    icon="🎙️" 
                    title="播客" 
                    description="思想与声音碰撞" 
                    gradient="linear-gradient(135deg, #B4C8FF 0%, #1BD7C3 100%)" 
                  />
                  <WorldCard 
                    icon="✍️" 
                    title="随笔" 
                    description="文字与思考交织" 
                    gradient="linear-gradient(135deg, #FB844C 0%, #9BD5FF 100%)" 
                  />
                  <WorldCard 
                    icon="💬" 
                    title="辩论" 
                    description="思想与逻辑交锋" 
                    gradient="linear-gradient(135deg, #8E9CE6 0%, #FA9D97 100%)" 
                  />
                </div>
              </div>
              
              {/* 右向箭头按钮 */}
              <button
                onClick={() => setShowSecondSet(!showSecondSet)}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center text-gray-600 hover:text-gray-800 hover:scale-110 transition-all duration-300"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.3)',
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.5)',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)'
                }}
              >
                <span className="text-lg">→</span>
              </button>
            </div>
          </div>
          
          {/* 下半部分：Digital Me 聊天入口 */}
          <div className="flex items-center justify-center">
            {!isExpanded ? (
              // 圆形初始状态
              <div className="flex justify-center opacity-0 intersect:opacity-100 transition-opacity duration-700">
                <button
                    onClick={() => setIsExpanded(true)}
                    className="w-48 h-48 md:w-56 md:h-56 rounded-full hover:scale-[1.02] flex flex-col items-center justify-center gap-3 group"
                    style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.25)',
                      backdropFilter: 'blur(20px)',
                      WebkitBackdropFilter: 'blur(20px)',
                      border: '1px solid rgba(255, 255, 255, 0.35)',
                      boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)',
                      position: 'relative',
                      overflow: 'hidden',
                      transition: 'transform 300ms cubic-bezier(0.34, 1.56, 0.64, 1)'
                    }}
                  >
                    {/* 边缘高光效果 */}
                    <div 
                      style={{
                        position: 'absolute',
                        top: '0',
                        left: '0',
                        right: '0',
                        bottom: '0',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, rgba(255, 182, 193, 0.3) 0%, rgba(255, 218, 185, 0.3) 50%, rgba(176, 224, 230, 0.3) 100%)',
                        zIndex: '-1'
                      }}
                    />
                    {/* 顶部边缘高光 */}
                    <div 
                      style={{
                        position: 'absolute',
                        top: '-1px',
                        left: '10%',
                        right: '10%',
                        height: '1px',
                        background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.6), transparent)',
                        borderRadius: '50%'
                      }}
                    />
                    <div className="text-5xl md:text-6xl group-hover:scale-110 transition-transform duration-300">
                      💬
                    </div>
                    <div className="text-lg md:text-xl font-medium text-gray-800">
                      Digital Me 聊天区
                    </div>
                    <div className="text-sm text-gray-700">
                      点击开始对话
                    </div>
                  </button>
              </div>
            ) : (
              // 展开后的聊天区
              <div className="opacity-0 intersect:opacity-100 transition-opacity duration-700 w-full max-w-2xl rounded-2xl overflow-hidden" style={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.25)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.35)',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)',
                position: 'relative',
                animation: 'fadeIn 0.7s ease-out, zoomIn 0.7s ease-out'
              }}>
                {/* 边缘高光效果 */}
                <div 
                  style={{
                    position: 'absolute',
                    top: '0',
                    left: '0',
                    right: '0',
                    bottom: '0',
                    borderRadius: '20px',
                    background: 'linear-gradient(135deg, rgba(255, 182, 193, 0.3) 0%, rgba(255, 218, 185, 0.3) 50%, rgba(176, 224, 230, 0.3) 100%)',
                    zIndex: '-1'
                  }}
                />
                {/* 顶部边缘高光 */}
                <div 
                  style={{
                    position: 'absolute',
                    top: '-1px',
                    left: '5%',
                    right: '5%',
                    height: '1px',
                    background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.6), transparent)',
                    borderRadius: '50%'
                  }}
                />
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl md:text-2xl flex items-center gap-2">
                      <span className="text-2xl">💬</span>
                      Digital Me
                    </CardTitle>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsExpanded(false)}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      收起
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    有什么想了解的，尽管问我吧～
                  </p>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* 聊天消息区 */}
                  <div className="h-[400px] md:h-[500px] overflow-y-auto px-2 md:px-4 py-4 rounded-lg bg-muted/30">
                    {messages.map(message => (
                      <ChatMessage key={message.id} message={message} />
                    ))}
                    {isTyping && (
                      <div className="flex justify-start mb-4">
                        <div className="bg-card text-card-foreground rounded-2xl px-4 py-3 soft-shadow">
                          <div className="flex gap-1">
                            <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                            <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                            <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                          </div>
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>

                  {/* 输入区 */}
                  <div className="flex gap-2">
                    <Textarea
                      value={inputValue}
                      onChange={e => setInputValue(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="输入你的问题... (按 Enter 发送，Shift+Enter 换行)"
                      className="min-h-[60px] max-h-[120px] resize-none"
                      disabled={isTyping}
                    />
                    <Button
                      onClick={handleSend}
                      disabled={isTyping || !inputValue.trim()}
                      size="icon"
                      className="h-[60px] w-[60px] shrink-0"
                    >
                      <Send className="h-5 w-5" />
                    </Button>
                  </div>
                </CardContent>
              </div>
              )}
          </div>
        </div>

      </div>
    </div>
  );
}
