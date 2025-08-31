import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  MessageCircle, 
  X, 
  Send, 
  Bot, 
  User, 
  Minimize2, 
  Maximize2,
  Leaf
} from "lucide-react";

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

export const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: 'Hello! I\'m your AgriTrust assistant. I can help you with crop advice, blockchain verification, market prices, and agricultural guidance. How can I assist you today?',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const predefinedResponses = {
    greeting: [
      "hello", "hi", "hey", "good morning", "good afternoon", "good evening"
    ],
    crops: [
      "crop", "crops", "farming", "agriculture", "cultivation", "plant", "grow"
    ],
    blockchain: [
      "blockchain", "verify", "verification", "transparent", "ledger", "trust"
    ],
    market: [
      "price", "market", "sell", "buy", "rates", "cost"
    ],
    weather: [
      "weather", "rain", "temperature", "climate", "season"
    ]
  };

  const getResponse = (message: string): string => {
    const lowerMessage = message.toLowerCase();
    
    if (predefinedResponses.greeting.some(word => lowerMessage.includes(word))) {
      return "Hello! Welcome to AgriTrust. I'm here to help you with all your agricultural needs. Whether you need crop advice, want to verify produce authenticity, or get market information, I'm at your service!";
    }
    
    if (predefinedResponses.crops.some(word => lowerMessage.includes(word))) {
      return "I'd be happy to help with crop-related questions! Our AI system can provide personalized recommendations based on your soil type, location, and weather conditions. You can also visit our 'Get Advice' section for detailed crop advisory. What specific crop information do you need?";
    }
    
    if (predefinedResponses.blockchain.some(word => lowerMessage.includes(word))) {
      return "Great question about blockchain! AgriTrust uses blockchain technology to create an immutable record of every product from farm to consumer. You can verify any produce by scanning its QR code or entering the product ID in our 'View Ledger' section. This ensures complete transparency and prevents fraud.";
    }
    
    if (predefinedResponses.market.some(word => lowerMessage.includes(word))) {
      return "For current market prices and trends, our system provides real-time data to help farmers get fair prices. The blockchain ledger also records all transaction prices for transparency. Current rice prices are around ₹2,850 per quintal. Would you like information about specific crop prices?";
    }
    
    if (predefinedResponses.weather.some(word => lowerMessage.includes(word))) {
      return "Weather conditions are crucial for farming decisions! Our system monitors real-time weather data including temperature, humidity, rainfall, and soil moisture. Current conditions show 28°C temperature with 75% humidity - suitable for most kharif crops. Do you need weather advice for a specific crop?";
    }
    
    return "Thank you for your question! As an AgriTrust assistant, I can help you with crop advisory, blockchain verification, market prices, and general agricultural guidance. Could you please be more specific about what you'd like to know? You can also explore our different sections: 'Get Advice' for crop recommendations or 'View Ledger' for product verification.";
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: getResponse(inputMessage),
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-primary hover:bg-primary/90 shadow-lg"
        size="icon"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>
    );
  }

  return (
    <Card className={`fixed bottom-6 right-6 z-50 w-96 shadow-2xl transition-all duration-300 ${
      isMinimized ? 'h-16' : 'h-[500px]'
    }`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-primary text-primary-foreground rounded-t-lg">
        <div className="flex items-center space-x-2">
          <div className="bg-primary-foreground/20 rounded-full p-1">
            <Leaf className="h-4 w-4" />
          </div>
          <div>
            <CardTitle className="text-sm">AgriTrust Assistant</CardTitle>
            <p className="text-xs opacity-80">Online now</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMinimized(!isMinimized)}
            className="h-8 w-8 text-primary-foreground hover:bg-primary-foreground/20"
          >
            {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(false)}
            className="h-8 w-8 text-primary-foreground hover:bg-primary-foreground/20"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>

      {!isMinimized && (
        <>
          <CardContent className="flex-1 overflow-y-auto p-4 space-y-4 h-80">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex items-start space-x-2 max-w-[80%] ${
                  message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                }`}>
                  <div className={`rounded-full p-2 ${
                    message.type === 'user' 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-muted'
                  }`}>
                    {message.type === 'user' ? 
                      <User className="h-4 w-4" /> : 
                      <Bot className="h-4 w-4" />
                    }
                  </div>
                  <div className={`rounded-lg p-3 ${
                    message.type === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted'
                  }`}>
                    <p className="text-sm">{message.content}</p>
                    <p className={`text-xs mt-1 ${
                      message.type === 'user' 
                        ? 'text-primary-foreground/70' 
                        : 'text-muted-foreground'
                    }`}>
                      {message.timestamp.toLocaleTimeString([], { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex items-start space-x-2">
                  <div className="rounded-full p-2 bg-muted">
                    <Bot className="h-4 w-4" />
                  </div>
                  <div className="rounded-lg p-3 bg-muted">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce delay-75" />
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce delay-150" />
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </CardContent>

          <div className="p-4 border-t">
            <div className="flex space-x-2">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about crops, blockchain, prices..."
                className="flex-1"
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim()}
                size="icon"
                className="bg-primary hover:bg-primary/90"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2 text-center">
              Powered by AgriTrust AI • Blockchain Verified
            </p>
          </div>
        </>
      )}
    </Card>
  );
};