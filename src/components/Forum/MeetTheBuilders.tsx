import { mockUsers } from './mockData';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Zap } from 'lucide-react';

export const MeetTheBuilders = () => {
  // Convert users object to array and sort by karma
  const topUsers = Object.values(mockUsers)
    .sort((a, b) => b.karma - a.karma)
    .slice(0, 5);

  const getRankColor = (index: number) => {
    if (index === 0) return 'text-bitcoin-gold';
    if (index === 1) return 'text-gray-400';
    if (index === 2) return 'text-amber-700';
    return 'text-muted-foreground';
  };

  const getRankBg = (index: number) => {
    if (index === 0) return 'bg-bitcoin-gold/10 border-bitcoin-gold/20';
    if (index === 1) return 'bg-gray-400/10 border-gray-400/20';
    if (index === 2) return 'bg-amber-700/10 border-amber-700/20';
    return 'bg-muted/50 border-border';
  };

  return (
    <Card className="p-6 bg-gradient-to-br from-card to-surface">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold flex items-center gap-2">
          <Zap className="h-5 w-5 text-bitcoin-orange" />
          Meet the Builders
        </h3>
        <Badge variant="secondary" className="text-xs">
          This Week
        </Badge>
      </div>

      <div className="space-y-3">
        {topUsers.map((user, index) => (
          <div
            key={user.id}
            className={`flex items-center gap-3 p-3 rounded-lg border transition-smooth cursor-pointer hover:shadow-md ${getRankBg(index)}`}
          >
            <div className={`text-2xl font-bold w-8 text-center ${getRankColor(index)}`}>
              #{index + 1}
            </div>
            <Avatar className="h-10 w-10">
              <AvatarFallback className="bg-bitcoin-orange/10 text-bitcoin-orange font-bold">
                {user.username.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-sm truncate">
                {user.username}
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                {user.badges.slice(0, 2).map((badge) => (
                  <Badge key={badge} variant="outline" className="text-xs py-0 px-1.5 h-4">
                    {badge}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="text-right">
              <div className="font-bold text-sm text-bitcoin-orange">
                {user.karma.toLocaleString()}
              </div>
              <div className="text-xs text-muted-foreground flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                +{Math.floor(user.karma * 0.1)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
