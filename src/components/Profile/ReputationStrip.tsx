import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Zap, Award, Calendar, TrendingUp } from "lucide-react";

interface ReputationStripProps {
  level: number;
  currentKarma: number;
  nextLevelKarma: number;
  dayStreak: number;
  satsEarned: number;
  completedOpportunities: number;
  badges: Array<{ name: string; icon: string }>;
}

export const ReputationStrip = ({
  level,
  currentKarma,
  nextLevelKarma,
  dayStreak,
  satsEarned,
  completedOpportunities,
  badges,
}: ReputationStripProps) => {
  const progress = (currentKarma / nextLevelKarma) * 100;

  return (
    <div className="w-full bg-surface rounded-2xl border border-border p-6 shadow-card">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Level & Progress */}
        <div className="space-y-3">
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-bitcoin-orange">
              Level {level}
            </span>
            <TrendingUp className="w-5 h-5 text-bitcoin-orange" />
          </div>
          <div className="space-y-2">
            <Progress value={progress} className="h-2" />
            <p className="text-xs text-muted-foreground">
              {currentKarma.toLocaleString()} / {nextLevelKarma.toLocaleString()} karma
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:col-span-2">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Calendar className="w-4 h-4" />
              <span className="text-xs uppercase tracking-wide">Streak</span>
            </div>
            <span className="text-2xl font-bold text-foreground">
              {dayStreak}
            </span>
          </div>

          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Zap className="w-4 h-4 text-bitcoin-orange" />
              <span className="text-xs uppercase tracking-wide">Sats Earned</span>
            </div>
            <span className="text-2xl font-bold text-bitcoin-orange">
              {satsEarned.toLocaleString()}
            </span>
          </div>

          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Award className="w-4 h-4" />
              <span className="text-xs uppercase tracking-wide">Completed</span>
            </div>
            <span className="text-2xl font-bold text-foreground">
              {completedOpportunities}
            </span>
          </div>
        </div>

        {/* Badges */}
        <div className="space-y-2">
          <div className="flex items-center gap-1.5 text-muted-foreground mb-3">
            <Award className="w-4 h-4" />
            <span className="text-xs uppercase tracking-wide">Badges</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {badges.slice(0, 6).map((badge, index) => (
              <div
                key={index}
                className="w-10 h-10 rounded-lg bg-surface-elevated border border-border flex items-center justify-center text-xl hover:scale-110 hover:border-bitcoin-orange transition-all cursor-pointer"
                title={badge.name}
              >
                {badge.icon}
              </div>
            ))}
            {badges.length > 6 && (
              <div className="w-10 h-10 rounded-lg bg-surface-elevated border border-border flex items-center justify-center text-xs text-muted-foreground">
                +{badges.length - 6}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
