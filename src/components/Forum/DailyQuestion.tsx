import { dailyQuestion } from './mockData';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageSquare, Coins } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export const DailyQuestion = () => {
  const hoursLeft = Math.floor((dailyQuestion.deadline.getTime() - Date.now()) / (1000 * 60 * 60));

  return (
    <Card className="relative overflow-hidden border-bitcoin-orange/20 bg-gradient-to-br from-card to-surface shadow-orange">
      <div className="absolute top-0 right-0 h-32 w-32 bg-bitcoin-orange/10 blur-3xl" />
      <div className="relative p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <Badge className="mb-2 bg-bitcoin-orange/10 text-bitcoin-orange border-bitcoin-orange/20">
              ⚡ Daily Question
            </Badge>
            <h3 className="text-xl font-bold mb-2">{dailyQuestion.question}</h3>
            <p className="text-muted-foreground text-sm">{dailyQuestion.description}</p>
          </div>
          <div className="flex flex-col items-end gap-2">
            <div className="flex items-center gap-1 text-bitcoin-gold font-bold text-lg">
              <Coins className="h-5 w-5" />
              {dailyQuestion.bounty.toLocaleString()}
            </div>
            <span className="text-xs text-muted-foreground">{hoursLeft}h left</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Button className="bg-bitcoin-orange hover:bg-bitcoin-orange/90 text-bitcoin-dark font-semibold transition-smooth">
            Submit Answer
          </Button>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MessageSquare className="h-4 w-4" />
            {dailyQuestion.responses} responses
          </div>
        </div>
      </div>
    </Card>
  );
};
