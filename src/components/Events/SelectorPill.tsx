import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";

interface SelectorPillProps {
  icon: LucideIcon;
  label: string;
  value: string;
  onClick?: () => void;
}

const SelectorPill = ({ icon: Icon, label, value, onClick }: SelectorPillProps) => {
  return (
    <Button 
      variant="outline" 
      className="gap-2 hover:bg-muted font-normal"
      onClick={onClick}
    >
      <Icon className="h-4 w-4" />
      <span className="text-xs text-muted-foreground">{label}:</span>
      <span className="font-medium">{value}</span>
      <ChevronDown className="h-4 w-4 ml-1" />
    </Button>
  );
};

export default SelectorPill;
