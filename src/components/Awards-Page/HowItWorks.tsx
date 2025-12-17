import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How were winners selected in 2025?",
    answer: "In 2025, the community submitted nominees across 21 categories. Kyle reviewed all nominations and cast the final votes to determine winners. This single-gatekeeper model ensured quality curation while the community drove the nomination process.",
  },
  {
    question: "What does 2026 look like?",
    answer: "The 2026 Permissionless PoW Awards will be fully run by the global community. We're transitioning from a single-gatekeeper model to a decentralized voting system where the community decides the winners.",
  },
  {
    question: "Why was the Proof of Work Awards created?",
    answer: "The Proof of Work Awards was created to recognize the builders, creators, and contributors who are shaping Bitcoin culture. It celebrates those whose work—whether technical, artistic, educational, or cultural—has made a lasting impact on the Bitcoin ecosystem.",
  },
  {
    question: "Who can submit nominations?",
    answer: "Anyone can submit nominations across all 21 categories. You can nominate projects, people, or cultural moments that have contributed to Bitcoin's growth and adoption.",
  },
  {
    question: "When and where are winners announced?",
    answer: "Winners are revealed and celebrated at Permissionless, bringing together the Bitcoin community to honor the year's most impactful contributors.",
  },
];

export const HowItWorks = () => {
  return (
    <section id="how-it-works" className="bg-muted py-16 md:py-24">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="mb-12">
          <h2 className="text-4xl md:text-5xl font-display uppercase mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-base text-muted-foreground max-w-2xl">
            Everything you need to know about the Proof of Work Awards.
          </p>
        </div>

        <Accordion type="single" collapsible className="max-w-3xl">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="border-border">
              <AccordionTrigger className="text-left font-display text-lg uppercase hover:no-underline py-5">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed pb-6">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};
