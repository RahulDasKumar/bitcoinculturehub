import { Calendar, MapPin, Sparkles, Grid3x3 } from "lucide-react";
import { cn } from "@/lib/utils";

interface ViewTabsProps {
  activeView: "calendar" | "map";
  onViewChange: (view: "calendar" | "map") => void;
}

const ViewTabs = ({ activeView, onViewChange }: ViewTabsProps) => {
  const tabs = [
    { id: "calendar" as const, label: "Calendar", icon: Calendar },
    { id: "map" as const, label: "Map", icon: MapPin },
  ];

  return (
    <div className="flex gap-1 border-b border-border">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeView === tab.id;
        
        return (
          <button
            key={tab.id}
            onClick={() => onViewChange(tab.id)}
            className={cn(
              "flex items-center gap-2 px-5 py-3 text-sm font-medium transition-all relative",
              isActive
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <Icon className="h-4 w-4" />
            {tab.label}
            {isActive && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-t-full" />
            )}
          </button>
        );
      })}
    </div>
  );
};

export default ViewTabs;
