import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  items: FAQItem[];
}

export function FAQ({ items }: FAQProps) {
  return (
    <div className="space-y-4">
      <Accordion type="single" collapsible className="w-full">
        {items.map((item, index) => (
          <AccordionItem 
            key={index} 
            value={`item-${index}`}
            className="border-primary/20"
          >
            <AccordionTrigger className="text-left hover:text-primary transition-colors">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground leading-relaxed">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}