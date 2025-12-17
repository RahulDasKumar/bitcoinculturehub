import { Thread } from '../types';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { UserBadges } from './UserBadges';
import { ArrowUp, MessageSquare, Coins, Pin, Flame } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ThreadCardProps {
  thread: Thread;
  onClick?: () => void;
}

export const ThreadCard = ({ thread, onClick }: ThreadCardProps) => {
  const timeAgo = getTimeAgo(thread.timestamp);

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <Card
      className="group p-6 hover:border-bitcoin-orange/30 cursor-pointer transition-all duration-300 hover:shadow-orange"
      onClick={handleClick}
    >
      <div className="flex gap-4">
        {/* Vote Section */}
        <div className="flex flex-col items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 hover:bg-bitcoin-orange/10 hover:text-bitcoin-orange transition-smooth"
          >
            <ArrowUp className="h-4 w-4" />
          </Button>
          <span className="text-sm font-bold text-foreground">
            {thread.upvotes - thread.downvotes}
          </span>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 hover:bg-destructive/10 hover:text-destructive transition-smooth rotate-180"
          >
            <ArrowUp className="h-4 w-4" />
          </Button>
        </div>

        {/* Content Section */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start gap-3 mb-2">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-bitcoin-orange/10 text-bitcoin-orange text-xs font-bold">
                {thread.author.username.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <span className="font-semibold text-sm hover:text-bitcoin-orange transition-colors">
                  {thread.author.username}
                </span>
                <UserBadges user={thread.author} />
                <span className="text-xs text-muted-foreground">• {timeAgo}</span>
                <Badge variant="outline" className="text-xs">
                  {thread.channel}
                </Badge>
                {thread.isPinned && (
                  <Pin className="h-3 w-3 text-bitcoin-gold" />
                )}
                {thread.isHot && (
                  <Flame className="h-3 w-3 text-bitcoin-orange" />
                )}
              </div>
              <h3 className="text-lg font-bold mb-2 group-hover:text-bitcoin-orange transition-colors">
                {thread.title}
              </h3>
              <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                {thread.content}
              </p>
              <div className="flex items-center gap-4 flex-wrap">
                {thread.tags.map((tag) => (
                  <span key={tag} className="text-xs text-muted-foreground hover:text-bitcoin-orange transition-colors cursor-pointer">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="flex items-center gap-4 mt-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <MessageSquare className="h-4 w-4" />
              <span>{thread.replyCount}</span>
            </div>
            <div className="flex items-center gap-1 text-bitcoin-gold">
              <Coins className="h-4 w-4" />
              <span className="font-semibold">{thread.sats.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

function getTimeAgo(date: Date): string {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);

  if (seconds < 60) return `${seconds}s ago`;
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  return `${Math.floor(seconds / 86400)}d ago`;
}
