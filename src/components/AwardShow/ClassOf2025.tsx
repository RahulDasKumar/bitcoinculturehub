import { motion } from "framer-motion";

interface Inductee {
  id: string;
  name: string;
  title: string;
  house: string;
  image?: string;
}

const inductees: Inductee[] = [
  { id: "1", name: "Satoshi Nakamoto", title: "The Creator", house: "House of Signal" },
  { id: "2", name: "Hal Finney", title: "The Pioneer", house: "House of Builders" },
  { id: "3", name: "Nick Szabo", title: "The Visionary", house: "House of Signal" },
  { id: "4", name: "Ross Ulbricht", title: "The Liberator", house: "House of Freedom" },
  { id: "5", name: "Laszlo Hanyecz", title: "The Pioneer", house: "House of Builders" },
  { id: "6", name: "Adam Back", title: "The Innovator", house: "House of Builders" },
  { id: "7", name: "Jack Dorsey", title: "The Amplifier", house: "House of Signal" },
  { id: "8", name: "Wei Dai", title: "The Architect", house: "House of Signal" },
  { id: "9", name: "David Chaum", title: "The Godfather", house: "House of Signal" },
  { id: "10", name: "Andreas Antonopoulos", title: "The Educator", house: "House of Signal" },
];

export const ClassOf2025 = () => {
  return (
    <section className="bg-background py-16 md:py-24">
      <div className="container mx-auto max-w-7xl px-4">
        {/* Intro Text */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
            The Bitcoin Culture Hall of Fame celebrates the visionaries, builders, and pioneers whose proof-of-work laid the foundation for a decentralized future. Each inductee represents an indelible contribution to Bitcoin's technology, philosophy, or cultural impact.
          </p>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-display uppercase tracking-tight">
            Class of 2025
          </h2>
        </div>

        <div className="border-t border-border mb-12" />

        {/* Inductee Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {inductees.map((inductee, index) => (
            <motion.div
              key={inductee.id}
              className="group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              {/* Portrait Placeholder */}
              <div className="aspect-[3/4] rounded-lg bg-gradient-to-b from-primary/20 to-primary/5 border-2 border-primary/30 mb-3 overflow-hidden relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-2xl font-display text-primary/60">
                      {inductee.name.charAt(0)}
                    </span>
                  </div>
                </div>
                {/* Decorative frame corners */}
                <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-primary/40" />
                <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-primary/40" />
                <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-primary/40" />
                <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-primary/40" />
              </div>

              {/* Info */}
              <h3 className="font-display text-sm uppercase tracking-wide text-foreground mb-0.5">
                {inductee.name}
              </h3>
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">
                {inductee.title}
              </p>
              <div className="border-t border-border pt-2">
                <p className="text-xs text-muted-foreground">
                  2025 · {inductee.house}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* 2026 Announcement */}
        <div className="text-center mt-12">
          <p className="text-sm uppercase tracking-wider text-muted-foreground">
            Nominations for Class of 2026 Open on January 1st
          </p>
        </div>
      </div>
    </section>
  );
};
