import { cn } from "@/lib/utils";

interface FilterChipProps {
  label: string;
  active?: boolean;
  onClick?: () => void;
  variant?: "primary" | "secondary";
}

const FilterChip = ({ label, active = false, onClick, variant = "primary" }: FilterChipProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap",
        variant === "primary" && (
          active
            ? "bg-primary text-primary-foreground shadow-sm border border-primary"
            : "bg-transparent text-muted-foreground border border-border/50 hover:border-border hover:text-foreground hover:bg-muted/30"
        ),
        variant === "secondary" && (
          active
            ? "bg-accent/20 text-accent border border-accent/30"
            : "bg-transparent text-muted-foreground border border-border/30 hover:border-border hover:text-foreground hover:bg-muted/20"
        )
      )}
    >
      {label}
    </button>
  );
};

export default FilterChip;
