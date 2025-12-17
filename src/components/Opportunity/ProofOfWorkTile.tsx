import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ExternalLink, Calendar } from "lucide-react";

interface ProofOfWorkTileProps {
  type: string;
  title: string;
  date: string;
  link?: string;
  skills: string[];
  notes?: string;
}

export function ProofOfWorkTile({
  type,
  title,
  date,
  link,
  skills,
  notes,
}: ProofOfWorkTileProps) {
  const typeColors: Record<string, string> = {
    meetup: "bg-primary/10 text-primary border-primary/20",
    volunteer: "bg-success/10 text-success border-success/20",
    talk: "bg-accent/10 text-accent border-accent/20",
    project: "bg-warning/10 text-warning border-warning/20",
  };

  return (
    <Card className="p-4 hover:shadow-[var(--shadow-card)] transition-all">
      <div className="flex flex-col gap-2">
        <div className="flex items-start justify-between gap-2">
          <Badge
            className={`${
              typeColors[type] || "bg-muted text-muted-foreground"
            } font-semibold shrink-0`}
            variant="outline"
          >
            {type}
          </Badge>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Calendar className="w-3 h-3" />
            <span>{date}</span>
          </div>
        </div>

        <h4 className="font-semibold text-sm leading-tight">{title}</h4>

        {notes && (
          <p className="text-xs text-muted-foreground line-clamp-2">{notes}</p>
        )}

        <div className="flex flex-wrap gap-1">
          {skills.map((skill) => (
            <Badge key={skill} variant="secondary" className="text-xs">
              {skill}
            </Badge>
          ))}
        </div>

        {link && (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-primary hover:underline flex items-center gap-1 mt-1"
          >
            View proof
            <ExternalLink className="w-3 h-3" />
          </a>
        )}
      </div>
    </Card>
  );
}
