import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Clock, MapPin, Zap, Coins } from "lucide-react";

interface OpportunityCardProps {
  title: string;
  org: string;
  type: string;
  whyFit: string;
  timeCommit: string;
  location: string;
  pay?: string;
  perks?: string[];
  skills: string[];
  sponsored?: boolean;
  onClaim: () => void;
}

export function OpportunityCard({
  title,
  org,
  type,
  whyFit,
  timeCommit,
  location,
  pay,
  perks,
  skills,
  sponsored = false,
  onClaim,
}: OpportunityCardProps) {
  return (
    <Card className="p-5 hover:shadow-[var(--shadow-elevated)] transition-all hover:border-primary/20 group relative overflow-hidden">
      <div className="flex flex-col gap-4">
        {/* Header with Org & Type */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-lg leading-tight mb-1 group-hover:text-primary transition-colors">
              {title}
            </h3>
            <p className="text-sm text-muted-foreground flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center text-xs font-bold">
                {org[0]}
              </span>
              {org}
            </p>
          </div>
          <div className="flex flex-col gap-2 shrink-0">
            <Badge variant="secondary" className="font-semibold capitalize">
              {type.replace("_", " ")}
            </Badge>
            {sponsored && (
              <Badge className="bg-amber-500 hover:bg-amber-600 text-white font-semibold">
                Sponsored
              </Badge>
            )}
          </div>
        </div>

        {/* Why Matched - More Prominent
        <div className="bg-gradient-to-r from-accent/10 to-primary/10 border border-accent/30 rounded-lg p-3 relative">
          <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center">
            <Zap className="w-3 h-3 text-accent" fill="currentColor" />
          </div>
          <p className="text-sm font-medium text-foreground pr-8">
            {whyFit}
          </p>
        </div> */}

        {/* Details Row */}
        <div className="flex flex-wrap gap-3 text-xs">
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span>{timeCommit}</span>
          </div>
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <MapPin className="w-4 h-4" />
            <span className="capitalize">{location}</span>
          </div>
          {pay && (
            <div className="flex items-center gap-1.5 text-primary font-semibold">
              <Coins className="w-4 h-4" />
              <span>{pay}</span>
            </div>
          )}
        </div>

        {/* Skills Tags */}
        {skills.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {skills.slice(0, 4).map((skill) => (
              <Badge key={skill} variant="outline" className="text-xs capitalize">
                {skill}
              </Badge>
            ))}
            {skills.length > 4 && (
              <Badge variant="outline" className="text-xs">
                +{skills.length - 4}
              </Badge>
            )}
          </div>
        )}

        {/* Action Button with Helper Text */}
        <div className="space-y-2 mt-1">
          <Button 
            onClick={onClaim} 
            className="w-full group/btn" 
            size="lg"
          >
            Claim This
          </Button>
          <p className="text-[10px] text-center text-muted-foreground leading-tight">
            Claiming introduces you directly to the organizer
          </p>
        </div>
      </div>
    </Card>
  );
}
