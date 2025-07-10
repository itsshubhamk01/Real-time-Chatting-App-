import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Bot, User } from "lucide-react";

interface ChatMessageProps {
  message: string;
  isUser: boolean;
  timestamp: Date;
  isTyping?: boolean;
}

export function ChatMessage({ message, isUser, timestamp, isTyping }: ChatMessageProps) {
  return (
    <div
      className={cn(
        "flex gap-3 p-4 animate-message-in",
        isUser ? "flex-row-reverse" : "flex-row"
      )}
    >
      <Avatar className="h-8 w-8 shrink-0">
        <AvatarFallback className={cn(
          "text-xs font-medium",
          isUser 
            ? "bg-user-message text-user-message-foreground" 
            : "bg-accent text-accent-foreground"
        )}>
          {isUser ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
        </AvatarFallback>
      </Avatar>

      <div className={cn(
        "flex flex-col max-w-[75%]",
        isUser ? "items-end" : "items-start"
      )}>
        <div
          className={cn(
            "rounded-2xl px-4 py-2 shadow-sm",
            "transition-colors duration-200",
            isUser
              ? "bg-user-message text-user-message-foreground rounded-br-md"
              : "bg-ai-message text-ai-message-foreground rounded-bl-md",
            "hover:shadow-md"
          )}
        >
          {isTyping ? (
            <div className="flex items-center gap-1 py-1">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-typing-indicator rounded-full animate-typing-pulse" 
                     style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 bg-typing-indicator rounded-full animate-typing-pulse" 
                     style={{ animationDelay: '200ms' }} />
                <div className="w-2 h-2 bg-typing-indicator rounded-full animate-typing-pulse" 
                     style={{ animationDelay: '400ms' }} />
              </div>
              <span className="text-sm text-muted-foreground ml-2">AI is typing...</span>
            </div>
          ) : (
            <p className="text-sm leading-relaxed whitespace-pre-wrap">{message}</p>
          )}
        </div>
        
        <span className="text-xs text-muted-foreground mt-1 px-1">
          {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
    </div>
  );
}