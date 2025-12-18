import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, MapPin, Coins, Zap, Bookmark } from "lucide-react";

interface OpportunityListItemProps {
  title: string;
  org: string;
  type: string;
  whyFit: string;
  timeCommit: string;
  location: string;
  pay?: string;
  skills: string[];
  sponsored?: boolean;
  onClaim: () => void;
}

export function OpportunityListItem({
  title,
  org,
  type,
  whyFit,
  timeCommit,
  location,
  pay,
  skills,
  sponsored = false,
  onClaim,
}: OpportunityListItemProps) {
  return (
    <div className="group hover:bg-accent/5 border-b border-border last:border-0 transition-all hover:border-l-4 hover:border-l-primary">
      <div className="grid grid-cols-1 lg:grid-cols-[2fr,2fr,auto] gap-4 p-4 lg:p-5 items-center">
        {/* Left Block - Identity & Personalization */}
        <div className="flex flex-col gap-2 min-w-0">
          <div className="flex items-start gap-3">
            <div className="flex items-center gap-1.5">
              <Badge 
                variant="secondary" 
                className="shrink-0 font-semibold capitalize text-xs"
              >
                {type.replace("_", " ")}
              </Badge>
              {sponsored && (
                <Badge className="bg-amber-500 hover:bg-amber-600 text-white font-semibold text-xs shrink-0">
                  Sponsored
                </Badge>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-base leading-tight mb-1 group-hover:text-primary transition-colors truncate">
                {title}
              </h3>
              <p className="text-sm text-muted-foreground flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center text-[10px] font-bold shrink-0">
                  {org[0]}
                </span>
                <span className="truncate">{org}</span>
              </p>
            </div>
          </div>
          
          {/* Why Matched - Compact */}
          {/* <div className="flex items-start gap-1.5 text-xs text-muted-foreground ml-0 lg:ml-1">
            <Zap className="w-3 h-3 text-accent shrink-0 mt-0.5" fill="currentColor" />
            <span className="line-clamp-1">{whyFit}</span>
          </div> */}

          {/* Skills Tags */}
          <div className="flex flex-wrap gap-1.5 lg:ml-1">
            {skills.slice(0, 3).map((skill) => (
              <Badge key={skill} variant="outline" className="text-[10px] capitalize py-0 h-5">
                {skill}
              </Badge>
            ))}
            {skills.length > 3 && (
              <Badge variant="outline" className="text-[10px] py-0 h-5">
                +{skills.length - 3}
              </Badge>
            )}
          </div>
        </div>

        {/* Middle Block - Key Specs */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs lg:justify-center">
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Clock className="w-4 h-4 shrink-0" />
            <span className="whitespace-nowrap">{timeCommit}</span>
          </div>
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <MapPin className="w-4 h-4 shrink-0" />
            <span className="capitalize whitespace-nowrap">{location}</span>
          </div>
          {pay && (
            <div className="flex items-center gap-1.5 text-primary font-semibold">
              <Coins className="w-4 h-4 shrink-0" />
              <span className="whitespace-nowrap">{pay}</span>
            </div>
          )}
        </div>

        {/* Right Block - CTA */}
        <div className="flex flex-col items-stretch lg:items-end gap-1.5">
          <Button 
            onClick={onClaim} 
            className="w-full lg:w-32" 
            size="default"
          >
            Claim
          </Button>
          <p className="text-[9px] text-center lg:text-right text-muted-foreground leading-tight max-w-[140px] hidden lg:block">
            Introduces you directly
          </p>
          <button 
            className="lg:hidden flex items-center justify-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors mt-1"
            onClick={(e) => e.stopPropagation()}
          >
            <Bookmark className="w-3.5 h-3.5" />
            <span>Save</span>
          </button>
        </div>
      </div>
    </div>
  );
}
