import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ContentSectionProps {
  id: string;
  title: string;
  children: ReactNode;
  className?: string;
}

export function ContentSection({ id, title, children, className }: ContentSectionProps) {
  return (
    <section id={id} className={cn("scroll-mt-8 mb-16", className)}>
      <div className="mb-8">
        <h2 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-4">
          {title}
        </h2>
        <div className="h-1 w-20 bg-gradient-primary rounded-full"></div>
      </div>
      <div className="prose prose-lg max-w-none">
        {children}
      </div>
    </section>
  );
}