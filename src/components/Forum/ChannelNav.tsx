import { channels } from './mockData';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ChannelNavProps {
  activeChannel?: string;
  onChannelChange?: (channelId: string) => void;
}

export const ChannelNav = ({ activeChannel = 'all', onChannelChange }: ChannelNavProps) => {
  return (
    <div className="border-b border-border bg-card/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-2 overflow-x-auto py-3 scrollbar-hide">
          <Button
            variant="ghost"
            onClick={() => onChannelChange?.('all')}
            className={cn(
              "rounded-full transition-smooth",
              activeChannel === 'all' 
                ? "bg-bitcoin-orange text-bitcoin-dark hover:bg-bitcoin-orange/90" 
                : "hover:bg-surface-bright"
            )}
          >
            All Channels
          </Button>
          {channels.map((channel) => (
            <Button
              key={channel.id}
              variant="ghost"
              onClick={() => onChannelChange?.(channel.id)}
              className={cn(
                "rounded-full transition-smooth",
                activeChannel === channel.id
                  ? "bg-bitcoin-orange text-bitcoin-dark hover:bg-bitcoin-orange/90"
                  : "hover:bg-surface-bright"
              )}
            >
              <span className="mr-2">{channel.icon}</span>
              {channel.name}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};
