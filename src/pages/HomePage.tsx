import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { PersonalInfo } from '@/components/PersonalInfo';
import { ChatMessage } from '@/components/ChatMessage';
import { generateResponse, generateMessageId, type Message } from '@/lib/chatbot';
import { Send } from 'lucide-react';
import { toast } from 'sonner';

export default function HomePage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: generateMessageId(),
      content: '你好呀！我是李瞳的数字分身。很高兴认识你！你可以问我关于李瞳的任何问题～ 😊',
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
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
    <div className="min-h-screen bg-background">
      {/* 主容器 */}
      <div className="container mx-auto px-6 md:px-12 py-8 md:py-12 max-w-[1440px]">
        {/* 头像和介绍区 */}
        <div className="text-center mb-8 md:mb-12">
          {/* 头像 */}
          <div className="flex justify-center mb-6 opacity-0 intersect:opacity-100 transition-opacity duration-700">
            <div className="relative">
              <img
                src="https://miaoda-conversation-file.cdn.bcebos.com/user-b1lj719um0w0/conv-b1nr6f33ft34/20260418/file-b1nw4vfq6gow.jpg"
                alt="李瞳头像"
                className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover soft-shadow animate-float"
              />
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 blur-xl -z-10" />
            </div>
          </div>

          {/* 名字和介绍 */}
          <h1 className="text-3xl md:text-4xl font-bold mb-3 gradient-text opacity-0 intersect:opacity-100 transition-opacity duration-700">
            李瞳 (Joycelyn Lee)
          </h1>
          <p className="text-base md:text-lg text-muted-foreground italic opacity-0 intersect:opacity-100 transition-opacity duration-700">
            A girl born to perceive the universe---welcome to my world
          </p>
        </div>

        {/* 个人信息区 */}
        <div className="mb-8 md:mb-12 opacity-0 intersect:opacity-100 transition-opacity duration-700">
          <PersonalInfo />
        </div>

        {/* 数字分身聊天区 */}
        <Card className="soft-shadow border-border/50 glass-effect wavy-border opacity-0 intersect:opacity-100 transition-opacity duration-700">
          <CardHeader>
            <CardTitle className="text-xl md:text-2xl flex items-center gap-2">
              <span className="text-2xl">💬</span>
              数字分身聊天区
            </CardTitle>
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
        </Card>

        {/* 页脚 */}
        <div className="text-center mt-8 text-sm text-muted-foreground opacity-0 intersect:opacity-100 transition-opacity duration-700">
          <p>© 2026 李瞳 (Joycelyn Lee) · 用心感知世界 ✨</p>
        </div>
      </div>
    </div>
  );
}
