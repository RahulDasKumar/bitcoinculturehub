import { channels } from './mockData';
import { Button } from '@/components/ui/button';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

interface ChannelFilterProps {
  activeChannel: string;
  onChannelChange: (channelId: string) => void;
}

export const ChannelFilter = ({ activeChannel, onChannelChange }: ChannelFilterProps) => {
  const allChannels = [
    { id: 'all', name: 'All Channels', icon: '🔥', threadCount: channels.reduce((sum, c) => sum + c.threadCount, 0) },
    ...channels.map(c => ({ id: c.id, name: c.name, icon: c.icon, threadCount: c.threadCount }))
  ];

  return (
    <ScrollArea className="w-full whitespace-nowrap">
      <div className="flex gap-2 pb-4">
        {allChannels.map((channel) => {
          const isActive = activeChannel === channel.id;
          return (
            <Button
              key={channel.id}
              variant={isActive ? "default" : "outline"}
              className={`flex items-center gap-2 ${
                isActive 
                  ? 'bg-bitcoin-orange hover:bg-bitcoin-orange/90 text-bitcoin-dark border-bitcoin-orange' 
                  : 'hover:border-bitcoin-orange/30 hover:text-bitcoin-orange'
              }`}
              onClick={() => onChannelChange(channel.id)}
            >
              <span>{channel.icon}</span>
              <span className="font-semibold">{channel.name}</span>
              <span className={`text-xs ${isActive ? 'text-bitcoin-dark/70' : 'text-muted-foreground'}`}>
                {channel.threadCount.toLocaleString()}
              </span>
            </Button>
          );
        })}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};
