import { MouseEventHandler, ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface FeatureCardProps {
  description: string;
  icon?: ReactNode;
  className:string;
}

export function QuestionCard({ description,className }: FeatureCardProps) {
  return (
    <Card className={`group hover:shadow-orange transition-all duration-300 hover:-translate-y-1 border-primary/20 ${className}`}>
      <CardContent>
        <p className="text-muted-foreground leading-relaxed">
          {description}
        </p>
      </CardContent>
    </Card>
  );
}