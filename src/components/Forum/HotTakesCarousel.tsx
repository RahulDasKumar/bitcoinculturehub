import { hotTakes } from './mockData';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ArrowUp, Quote } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const HotTakesCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const next = () => setCurrentIndex((i) => (i + 1) % hotTakes.length);
  const prev = () => setCurrentIndex((i) => (i - 1 + hotTakes.length) % hotTakes.length);
  
  const take = hotTakes[currentIndex];
  const timeAgo = getTimeAgo(take.timestamp);

  return (
    <Card className="relative overflow-hidden border-accent/20 bg-gradient-to-br from-card to-surface-bright shadow-glow">
      <div className="absolute top-0 right-0 h-40 w-40 bg-bitcoin-orange/5 blur-3xl" />
      
      <div className="relative p-6">
        <div className="flex items-start justify-between mb-4">
          <Badge className="bg-accent/10 text-accent border-accent/20">
            🔥 Hot Take
          </Badge>
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8"
              onClick={prev}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-xs text-muted-foreground">
              {currentIndex + 1} / {hotTakes.length}
            </span>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8"
              onClick={next}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex gap-4 mb-4">
          <Quote className="h-6 w-6 text-bitcoin-gold flex-shrink-0 mt-1" />
          <p className="text-lg leading-relaxed">{take.content}</p>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-bitcoin-orange/10 text-bitcoin-orange text-xs font-bold">
                {take.author.username.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="font-semibold text-sm">{take.author.username}</div>
              <div className="text-xs text-muted-foreground">
                in "{take.threadTitle}" • {timeAgo}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <ArrowUp className="h-4 w-4 text-bitcoin-orange" />
            <span className="font-bold">{take.upvotes}</span>
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
