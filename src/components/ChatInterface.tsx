import { useState, useEffect, useRef } from "react";
import { ChatMessage } from "./ChatMessage";
import { ChatInput } from "./ChatInput";
import { ChatHeader } from "./ChatHeader";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

// Simulate AI responses
const getAIResponse = (userMessage: string): string => {
  const responses = [
    "That's an interesting point! Let me think about that...",
    "I understand what you're asking. Here's my perspective:",
    "Thanks for sharing that with me. I'd like to add:",
    "That's a great question! Based on what you've told me:",
    "I appreciate you bringing that up. My thoughts are:",
  ];
  
  const contextualResponses: Record<string, string> = {
    hello: "Hello! I'm your AI assistant. How can I help you today?",
    hi: "Hi there! What would you like to chat about?",
    help: "I'm here to help! You can ask me questions, have a conversation, or just chat about anything on your mind.",
    weather: "I don't have access to real-time weather data, but I'd be happy to discuss weather patterns or help you plan for different conditions!",
    time: `The current time is ${new Date().toLocaleTimeString()}. Is there something time-sensitive I can help you with?`,
  };

  const lowerMessage = userMessage.toLowerCase();
  
  for (const [key, response] of Object.entries(contextualResponses)) {
    if (lowerMessage.includes(key)) {
      return response;
    }
  }
  
  const randomResponse = responses[Math.floor(Math.random() * responses.length)];
  return `${randomResponse} "${userMessage}" is something I find quite fascinating to discuss!`;
};

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! I'm your AI assistant. I'm here to help with questions, have conversations, and provide contextual responses. What would you like to talk about?",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [isOnline] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = async (messageText: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      text: messageText,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    // Simulate network delay and AI processing
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000 + Math.random() * 2000));
      
      const aiResponse = getAIResponse(messageText);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponse,
        isUser: false,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to get AI response. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      <ChatHeader isOnline={isOnline} messageCount={messages.length} />
      
      <div className="flex-1 flex flex-col min-h-0">
        <ScrollArea className="flex-1 px-4">
          <div className="container max-w-4xl mx-auto py-4">
            <div className="space-y-2">
              {messages.map((message) => (
                <ChatMessage
                  key={message.id}
                  message={message.text}
                  isUser={message.isUser}
                  timestamp={message.timestamp}
                />
              ))}
              
              {isTyping && (
                <ChatMessage
                  message=""
                  isUser={false}
                  timestamp={new Date()}
                  isTyping={true}
                />
              )}
            </div>
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
        
        <ChatInput onSendMessage={handleSendMessage} disabled={isTyping} />
      </div>
    </div>
  );
}