import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { UserBadges } from './UserBadges';
import { mockUsers } from './mockData';
import { Trophy, Coins, TrendingUp, Flame } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export const Leaderboard = () => {
  const usersList = Object.values(mockUsers);
  
  const topByKarma = [...usersList].sort((a, b) => b.karma - a.karma).slice(0, 10);
  const topBySatsEarned = [...usersList].sort((a, b) => b.satsEarned - a.satsEarned).slice(0, 10);
  const topByStreak = [...usersList]
    .filter(u => u.streak && u.streak > 0)
    .sort((a, b) => (b.streak || 0) - (a.streak || 0))
    .slice(0, 10);

  const LeaderboardList = ({ 
    users, 
    metric, 
    icon: Icon 
  }: { 
    users: typeof usersList; 
    metric: 'karma' | 'satsEarned' | 'streak';
    icon: typeof Trophy;
  }) => (
    <div className="space-y-2">
      {users.map((user, index) => {
        const isTop3 = index < 3;
        const rankColors = ['text-bitcoin-gold', 'text-muted-foreground', 'text-[#CD7F32]'];
        
        return (
          <Card 
            key={user.id}
            className={`p-4 hover:border-bitcoin-orange/30 transition-all cursor-pointer ${
              isTop3 ? 'border-bitcoin-orange/20' : ''
            }`}
          >
            <div className="flex items-center gap-3">
              {/* Rank */}
              <div className={`flex h-8 w-8 items-center justify-center rounded-full font-bold text-sm ${
                isTop3 
                  ? 'bg-bitcoin-orange/10 ' + rankColors[index]
                  : 'bg-muted text-muted-foreground'
              }`}>
                {index + 1}
              </div>

              {/* Avatar */}
              <Avatar className="h-10 w-10">
                <AvatarFallback className={`${
                  isTop3 ? 'bg-bitcoin-orange/10 text-bitcoin-orange' : 'bg-muted'
                } font-bold`}>
                  {user.username.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>

              {/* User Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-sm hover:text-bitcoin-orange transition-colors truncate">
                    {user.username}
                  </span>
                  <UserBadges user={user} size="sm" />
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Icon className="h-3 w-3" />
                  {metric === 'karma' && (
                    <span className="font-semibold">{user.karma.toLocaleString()} karma</span>
                  )}
                  {metric === 'satsEarned' && (
                    <span className="font-semibold text-bitcoin-gold">{user.satsEarned.toLocaleString()} sats earned</span>
                  )}
                  {metric === 'streak' && (
                    <span className="font-semibold text-bitcoin-orange">{user.streak} day streak 🔥</span>
                  )}
                </div>
              </div>

              {/* Trophy for top 3 */}
              {isTop3 && (
                <Trophy className={`h-5 w-5 ${rankColors[index]}`} />
              )}
            </div>
          </Card>
        );
      })}
    </div>
  );

  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <Trophy className="h-6 w-6 text-bitcoin-gold" />
        Leaderboard
      </h2>
      
      <Tabs defaultValue="karma" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="karma" className="flex items-center gap-1">
            <TrendingUp className="h-3 w-3" />
            Karma
          </TabsTrigger>
          <TabsTrigger value="sats" className="flex items-center gap-1">
            <Coins className="h-3 w-3" />
            Sats Earned
          </TabsTrigger>
          <TabsTrigger value="streak" className="flex items-center gap-1">
            <Flame className="h-3 w-3" />
            Streak
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="karma" className="mt-4">
          <LeaderboardList users={topByKarma} metric="karma" icon={TrendingUp} />
        </TabsContent>
        
        <TabsContent value="sats" className="mt-4">
          <LeaderboardList users={topBySatsEarned} metric="satsEarned" icon={Coins} />
        </TabsContent>
        
        <TabsContent value="streak" className="mt-4">
          <LeaderboardList users={topByStreak} metric="streak" icon={Flame} />
        </TabsContent>
      </Tabs>
    </Card>
  );
};
