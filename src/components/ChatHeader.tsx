import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bot, Settings, MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ChatHeaderProps {
  isOnline: boolean;
  messageCount: number;
}

export function ChatHeader({ isOnline, messageCount }: ChatHeaderProps) {
  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container max-w-4xl mx-auto flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="p-2 bg-gradient-to-br from-accent to-accent-light rounded-xl">
              <Bot className="h-6 w-6 text-accent-foreground" />
            </div>
            <div
              className={`absolute -bottom-1 -right-1 h-3 w-3 rounded-full border-2 border-background ${
                isOnline ? "bg-green-500" : "bg-muted-foreground"
              }`}
            />
          </div>
          
          <div>
            <h1 className="font-semibold text-lg">AI Assistant</h1>
            <div className="flex items-center gap-2">
              <Badge variant={isOnline ? "default" : "secondary"} className="text-xs">
                {isOnline ? "Online" : "Offline"}
              </Badge>
              <span className="text-sm text-muted-foreground">
                {messageCount} messages
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm">
            <Settings className="h-4 w-4" />
            <span className="sr-only">Settings</span>
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <MoreVertical className="h-4 w-4" />
                <span className="sr-only">More options</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Clear Chat</DropdownMenuItem>
              <DropdownMenuItem>Export Chat</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}