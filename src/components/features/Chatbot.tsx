import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  MessageCircle, 
  X, 
  Send, 
  Bot, 
  User, 
  Minimize2, 
  Maximize2,
  Leaf,
  Globe
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
  const [selectedLanguage, setSelectedLanguage] = useState('en');
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

  const languages = [
    { code: 'en', name: 'English', native: 'English' },
    { code: 'hi', name: 'Hindi', native: 'हिंदी' },
    { code: 'bn', name: 'Bengali', native: 'বাংলা' },
    { code: 'te', name: 'Telugu', native: 'తెలుగు' },
    { code: 'mr', name: 'Marathi', native: 'मराठी' },
    { code: 'ta', name: 'Tamil', native: 'தமிழ்' },
    { code: 'gu', name: 'Gujarati', native: 'ગુજરાતી' },
    { code: 'kn', name: 'Kannada', native: 'ಕನ್ನಡ' },
    { code: 'ml', name: 'Malayalam', native: 'മലയാളം' },
    { code: 'or', name: 'Odia', native: 'ଓଡ଼ିଆ' }
  ];

  const getCurrentLanguage = () => {
    return languages.find(lang => lang.code === selectedLanguage) || languages[0];
  };

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
    
    const responses = {
      en: {
        greeting: "Hello! Welcome to AgriTrust. I'm here to help you with all your agricultural needs. Whether you need crop advice, want to verify produce authenticity, or get market information, I'm at your service!",
        crops: "I'd be happy to help with crop-related questions! Our AI system can provide personalized recommendations based on your soil type, location, and weather conditions. You can also visit our 'Get Advice' section for detailed crop advisory. What specific crop information do you need?",
        blockchain: "Great question about blockchain! AgriTrust uses blockchain technology to create an immutable record of every product from farm to consumer. You can verify any produce by scanning its QR code or entering the product ID in our 'View Ledger' section. This ensures complete transparency and prevents fraud.",
        market: "For current market prices and trends, our system provides real-time data to help farmers get fair prices. The blockchain ledger also records all transaction prices for transparency. Current rice prices are around ₹2,850 per quintal. Would you like information about specific crop prices?",
        weather: "Weather conditions are crucial for farming decisions! Our system monitors real-time weather data including temperature, humidity, rainfall, and soil moisture. Current conditions show 28°C temperature with 75% humidity - suitable for most kharif crops. Do you need weather advice for a specific crop?",
        default: "Thank you for your question! As an AgriTrust assistant, I can help you with crop advisory, blockchain verification, market prices, and general agricultural guidance. Could you please be more specific about what you'd like to know? You can also explore our different sections: 'Get Advice' for crop recommendations or 'View Ledger' for product verification."
      },
      hi: {
        greeting: "नमस्ते! AgriTrust में आपका स्वागत है। मैं आपकी कृषि संबंधी सभी आवश्यकताओं में सहायता के लिए यहाँ हूँ। चाहे आपको फसल की सलाह चाहिए, उत्पाद की प्रामाणिकता जाँचनी हो, या बाज़ार की जानकारी चाहिए, मैं आपकी सेवा में हूँ!",
        crops: "मुझे फसल संबंधी प्रश्नों में आपकी सहायता करके खुशी होगी! हमारी AI प्रणाली आपकी मिट्टी के प्रकार, स्थान और मौसम की स्थिति के आधार पर व्यक्तिगत सिफारिशें प्रदान कर सकती है। विस्तृत फसल सलाह के लिए आप हमारे 'सलाह प्राप्त करें' अनुभाग पर भी जा सकते हैं।",
        blockchain: "ब्लॉकचेन के बारे में बढ़िया सवाल! AgriTrust ब्लॉकचेन तकनीक का उपयोग करके खेत से उपभोक्ता तक हर उत्पाद का अपरिवर्तनीय रिकॉर्ड बनाता है। आप किसी भी उत्पाद को QR कोड स्कैन करके या हमारे 'लेज़र देखें' अनुभाग में उत्पाद ID दर्ज करके सत्यापित कर सकते हैं।",
        market: "वर्तमान बाज़ार दरों और रुझानों के लिए, हमारी प्रणाली किसानों को उचित दाम दिलाने में मदद करने के लिए रीयल-टाइम डेटा प्रदान करती है। वर्तमान में चावल की कीमत लगभग ₹2,850 प्रति क्विंटल है।",
        weather: "कृषि निर्णयों के लिए मौसम की स्थिति महत्वपूर्ण है! हमारी प्रणाली तापमान, आर्द्रता, वर्षा और मिट्टी की नमी सहित रीयल-टाइम मौसम डेटा की निगरानी करती है। वर्तमान स्थिति 28°C तापमान के साथ 75% आर्द्रता दिखाती है।",
        default: "आपके प्रश्न के लिए धन्यवाद! AgriTrust सहायक के रूप में, मैं फसल सलाह, ब्लॉकचेन सत्यापन, बाज़ार की कीमतों और सामान्य कृषि मार्गदर्शन में आपकी सहायता कर सकता हूँ।"
      }
    };

    const currentLangResponses = responses[selectedLanguage as keyof typeof responses] || responses.en;
    
    if (predefinedResponses.greeting.some(word => lowerMessage.includes(word))) {
      return currentLangResponses.greeting;
    }
    
    if (predefinedResponses.crops.some(word => lowerMessage.includes(word))) {
      return currentLangResponses.crops;
    }
    
    if (predefinedResponses.blockchain.some(word => lowerMessage.includes(word))) {
      return currentLangResponses.blockchain;
    }
    
    if (predefinedResponses.market.some(word => lowerMessage.includes(word))) {
      return currentLangResponses.market;
    }
    
    if (predefinedResponses.weather.some(word => lowerMessage.includes(word))) {
      return currentLangResponses.weather;
    }
    
    return currentLangResponses.default;
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
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-primary-foreground hover:bg-primary-foreground/20"
              >
                <Globe className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-32 bg-background">
              {languages.slice(0, 5).map((lang) => (
                <DropdownMenuItem 
                  key={lang.code} 
                  className="text-xs cursor-pointer"
                  onClick={() => setSelectedLanguage(lang.code)}
                >
                  {lang.native}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
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