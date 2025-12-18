import { Card } from '@/components/ui/card';
import { TrendingUp, Users } from 'lucide-react';

export const Sidebar = () => {
  const topContributors = [
    { username: 'satoshi_nakamoto', sats: 210000, streak: 365 },
    { username: 'alice_lightning', sats: 150000, streak: 120 },
    { username: 'bob_hodler', sats: 95000, streak: 89 },
  ];

  return (
    <div className="space-y-4">
      {/* Top Contributors */}
      <Card className="p-4">
        <h3 className="font-bold mb-3 flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-bitcoin-gold" />
          Top Contributors
        </h3>
        <div className="space-y-3">
          {topContributors.map((contributor, index) => (
            <div key={contributor.username} className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-bitcoin-orange/10 text-bitcoin-orange font-bold text-sm">
                {index + 1}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium truncate">
                  {contributor.username}
                </div>
                <div className="text-xs text-muted-foreground">
                  {contributor.sats.toLocaleString()} sats • {contributor.streak} day streak
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Community Stats */}
      <Card className="p-4">
        <h3 className="font-bold mb-3 flex items-center gap-2">
          <Users className="h-4 w-4 text-bitcoin-orange" />
          Community
        </h3>
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Active Users</span>
            <span className="font-semibold">12,847</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Total Threads</span>
            <span className="font-semibold">45,921</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Sats Tipped Today</span>
            <span className="font-semibold text-bitcoin-gold">1.2M</span>
          </div>
        </div>
      </Card>
    </div>
  );
};
