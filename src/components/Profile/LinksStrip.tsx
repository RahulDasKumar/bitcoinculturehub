import { ExternalLink } from "lucide-react";

interface Link {
  name: string;
  url: string;
  icon: string;
}

interface LinksStripProps {
  links: Link[];
}

export const LinksStrip = ({ links }: LinksStripProps) => {
  return (
    <div className="bg-surface rounded-xl p-6 border border-border">
      <h2 className="text-xl font-bold mb-4">Links</h2>
      <div className="flex flex-wrap gap-3 justify-center md:justify-start">
        {links.map((link) => (
          <a
            key={link.name}
            href={link.url}
            className="flex items-center gap-2 px-4 py-2 bg-background rounded-lg border border-border hover:border-bitcoin-orange transition-colors group"
          >
            <span className="text-xl">{link.icon}</span>
            <span className="text-sm font-medium group-hover:text-bitcoin-orange transition-colors">
              {link.name}
            </span>
            <ExternalLink className="w-3.5 h-3.5 text-muted-foreground group-hover:text-bitcoin-orange transition-colors" />
          </a>
        ))}
      </div>
    </div>
  );
};
