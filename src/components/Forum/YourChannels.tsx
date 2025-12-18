import { channels } from '@/data/mockData';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TrendingUp } from 'lucide-react';

export const YourChannels = () => {
  // Mock "followed" channels - first 3 channels
  const followedChannels = channels.slice(0, 3);

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold">Your Channels</h3>
        <Button variant="ghost" size="sm" className="text-xs">
          Manage
        </Button>
      </div>

      <div className="space-y-3">
        {followedChannels.map((channel) => (
          <div 
            key={channel.id}
            className="flex items-center justify-between p-3 rounded-lg hover:bg-surface transition-smooth cursor-pointer group"
          >
            <div className="flex items-center gap-3">
              <div className="text-2xl">{channel.icon}</div>
              <div>
                <div className="font-semibold text-sm group-hover:text-bitcoin-orange transition-colors">
                  {channel.name}
                </div>
                <div className="text-xs text-muted-foreground">
                  {channel.threadCount.toLocaleString()} threads
                </div>
              </div>
            </div>
            <Badge variant="secondary" className="gap-1">
              <TrendingUp className="h-3 w-3" />
              {Math.floor(Math.random() * 50) + 10}
            </Badge>
          </div>
        ))}
      </div>

      <Button 
        variant="outline" 
        className="w-full mt-4 border-dashed"
      >
        + Follow More Channels
      </Button>
    </Card>
  );
};
