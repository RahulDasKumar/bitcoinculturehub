import { opportunities } from './mockData';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Briefcase, Coins, Calendar, Gift, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

const typeConfig = {
  job: { icon: Briefcase, label: 'Job', color: 'text-blue-500' },
  bounty: { icon: Coins, label: 'Bounty', color: 'text-bitcoin-gold' },
  event: { icon: Calendar, label: 'Event', color: 'text-purple-500' },
  grant: { icon: Gift, label: 'Grant', color: 'text-green-500' },
};

export const OpportunitiesEvents = () => {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold">Opportunities & Events</h3>
        <Button variant="ghost" size="sm" className="text-xs">
          View All
        </Button>
      </div>

      <div className="space-y-3">
        {opportunities.map((opp) => {
          const config = typeConfig[opp.type as keyof typeof typeConfig];
          const Icon = config.icon;

          return (
            <div
              key={opp.id}
              className="flex items-start gap-3 p-3 rounded-lg hover:bg-surface transition-smooth cursor-pointer group"
            >
              <div className={`${config.color} mt-0.5`}>
                <Icon className="h-5 w-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h4 className="font-semibold text-sm group-hover:text-bitcoin-orange transition-colors">
                    {opp.title}
                  </h4>
                  <ExternalLink className="h-3 w-3 text-muted-foreground flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge variant="secondary" className="text-xs">
                    {config.label}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {opp.organization}
                  </span>
                  {opp.sats > 0 && (
                    <span className="text-xs text-bitcoin-gold font-semibold">
                      {opp.sats.toLocaleString()} sats
                    </span>
                  )}
                  {opp.location && (
                    <span className="text-xs text-muted-foreground">
                      • {opp.location}
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};
