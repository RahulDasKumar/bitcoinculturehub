import { cn } from "@/lib/utils";

interface QuickTimeTogglesProps {
  selected: "now" | "tonight" | "weekend" | "week" | "month";
  onSelect: (value: "now" | "tonight" | "weekend" | "week" | "month") => void;
}

const QuickTimeToggles = ({ selected, onSelect }: QuickTimeTogglesProps) => {
  const toggles = [
    { id: "now" as const, label: "Now" },
    { id: "tonight" as const, label: "Tonight" },
    { id: "weekend" as const, label: "This weekend" },
    { id: "week" as const, label: "This week" },
    { id: "month" as const, label: "This month" },
  ];

  return (
    <div className="inline-flex items-center gap-1 p-1 bg-muted/30 rounded-lg">
      {toggles.map((toggle) => (
        <button
          key={toggle.id}
          onClick={() => onSelect(toggle.id)}
          className={cn(
            "px-4 py-2 text-sm font-medium rounded-md transition-all",
            selected === toggle.id
              ? "bg-background text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          {toggle.label}
        </button>
      ))}
    </div>
  );
};

export default QuickTimeToggles;
