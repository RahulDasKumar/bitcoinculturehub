import { Badge } from "@/components/ui/badge";
import { Award, Zap, Target, Star } from "lucide-react";

interface BadgeDisplayProps {
  badge: string;
  earned?: boolean;
  progress?: number;
}

export function BadgeDisplay({ badge, earned = false, progress }: BadgeDisplayProps) {
  const badgeIcons: Record<string, any> = {
    Consistent: Award,
    "Campus Speaker": Zap,
    "Starter Path": Target,
    Featured: Star,
  };

  const Icon = badgeIcons[badge] || Award;

  return (
    <div
      className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition-all ${
        earned
          ? "bg-primary/10 border-primary/20 text-primary"
          : "bg-muted border-border text-muted-foreground"
      }`}
    >
      <Icon className="w-4 h-4" />
      <div className="flex-1 min-w-0">
        <div className="font-semibold text-sm">{badge}</div>
        {!earned && progress !== undefined && (
          <div className="text-xs opacity-75">{progress}% complete</div>
        )}
      </div>
    </div>
  );
}
