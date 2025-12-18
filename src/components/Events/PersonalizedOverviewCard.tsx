import { ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface PersonalizedOverviewCardProps {
  title: string;
  description: string;
  onClick?: () => void;
  variant?: "default" | "highlight";
}

const PersonalizedOverviewCard = ({ 
  title, 
  description, 
  onClick,
  variant = "default" 
}: PersonalizedOverviewCardProps) => {
  return (
    <Card 
      className={cn(
        "p-5 cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:shadow-[var(--shadow-md)] group",
        variant === "highlight" && "border-primary/30 bg-primary/5"
      )}
      onClick={onClick}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <h3 className="text-base font-semibold text-foreground mb-1.5">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground">
            {description}
          </p>
        </div>
        <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-accent group-hover:translate-x-1 transition-all flex-shrink-0" />
      </div>
    </Card>
  );
};

export default PersonalizedOverviewCard;
