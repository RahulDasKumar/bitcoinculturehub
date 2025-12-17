import { motion } from "framer-motion";

export interface Category {
  id: string;
  title: string;
  description: string;
  nominationCount: number;
  totalKarmaBurned: number;
  phase: "nominations" | "voting" | "closed";
  icon: string;
  userVotes?: number;
}

export const categories: Category[] = [
  {
    id: "builder",
    title: "Builder of the Year",
    description: "Most impactful developer, designer, or creator in Bitcoin",
    nominationCount: 42,
    totalKarmaBurned: 15420,
    phase: "voting",
    icon: "⚒️"
  },
  {
    id: "project",
    title: "Project of the Year",
    description: "Most innovative Bitcoin project or protocol",
    nominationCount: 38,
    totalKarmaBurned: 12890,
    phase: "voting",
    icon: "🚀"
  },
  {
    id: "podcast",
    title: "Podcast of the Year",
    description: "Best Bitcoin-focused podcast or audio content",
    nominationCount: 31,
    totalKarmaBurned: 9340,
    phase: "voting",
    icon: "🎙️"
  },
  {
    id: "educator",
    title: "Educator of the Year",
    description: "Best teacher, explainer, or educational content creator",
    nominationCount: 28,
    totalKarmaBurned: 8120,
    phase: "voting",
    icon: "📚"
  },
  {
    id: "artist",
    title: "Artist of the Year",
    description: "Most creative visual artist in Bitcoin culture",
    nominationCount: 35,
    totalKarmaBurned: 10250,
    phase: "voting",
    icon: "🎨"
  },
  {
    id: "writer",
    title: "Writer of the Year",
    description: "Best long-form content, essays, or journalism",
    nominationCount: 24,
    totalKarmaBurned: 7680,
    phase: "voting",
    icon: "✍️"
  },
  {
    id: "meme",
    title: "Meme of the Year",
    description: "Most viral or culturally significant Bitcoin meme",
    nominationCount: 51,
    totalKarmaBurned: 18790,
    phase: "voting",
    icon: "😂"
  },
  {
    id: "event",
    title: "Event of the Year",
    description: "Best conference, meetup, or community gathering",
    nominationCount: 19,
    totalKarmaBurned: 5430,
    phase: "voting",
    icon: "🎪"
  },
  {
    id: "tool",
    title: "Tool of the Year",
    description: "Most useful application, wallet, or developer tool",
    nominationCount: 33,
    totalKarmaBurned: 11240,
    phase: "voting",
    icon: "🛠️"
  },
  {
    id: "community",
    title: "Community of the Year",
    description: "Most vibrant online or local Bitcoin community",
    nominationCount: 26,
    totalKarmaBurned: 8950,
    phase: "voting",
    icon: "🤝"
  },
  {
    id: "influencer",
    title: "Influencer of the Year",
    description: "Most impactful voice on social media",
    nominationCount: 44,
    totalKarmaBurned: 16230,
    phase: "voting",
    icon: "📱"
  },
  {
    id: "research",
    title: "Research of the Year",
    description: "Best technical research or whitepaper",
    nominationCount: 15,
    totalKarmaBurned: 4820,
    phase: "voting",
    icon: "🔬"
  },
  {
    id: "video",
    title: "Video of the Year",
    description: "Best video content or documentary",
    nominationCount: 29,
    totalKarmaBurned: 9870,
    phase: "voting",
    icon: "🎬"
  },
  {
    id: "lightning",
    title: "Lightning Innovation",
    description: "Best Lightning Network project or innovation",
    nominationCount: 21,
    totalKarmaBurned: 6540,
    phase: "voting",
    icon: "⚡"
  },
  {
    id: "security",
    title: "Security Champion",
    description: "Outstanding work in Bitcoin security or privacy",
    nominationCount: 17,
    totalKarmaBurned: 5210,
    phase: "voting",
    icon: "🔒"
  },
  {
    id: "design",
    title: "Design Excellence",
    description: "Best UX/UI design in Bitcoin applications",
    nominationCount: 23,
    totalKarmaBurned: 7340,
    phase: "voting",
    icon: "✨"
  },
  {
    id: "business",
    title: "Business of the Year",
    description: "Most successful Bitcoin-focused company",
    nominationCount: 20,
    totalKarmaBurned: 6890,
    phase: "voting",
    icon: "💼"
  },
  {
    id: "activism",
    title: "Activist of the Year",
    description: "Best advocacy for Bitcoin adoption or freedom",
    nominationCount: 18,
    totalKarmaBurned: 5780,
    phase: "voting",
    icon: "📢"
  },
  {
    id: "newcomer",
    title: "Newcomer of the Year",
    description: "Most promising new voice or project",
    nominationCount: 36,
    totalKarmaBurned: 12100,
    phase: "voting",
    icon: "🌟"
  },
  {
    id: "technical",
    title: "Technical Achievement",
    description: "Outstanding technical contribution to Bitcoin",
    nominationCount: 14,
    totalKarmaBurned: 4560,
    phase: "voting",
    icon: "⚙️"
  },
  {
    id: "moment",
    title: "Moment of the Year",
    description: "Most significant cultural or historical Bitcoin moment",
    nominationCount: 47,
    totalKarmaBurned: 17650,
    phase: "voting",
    icon: "💫"
  }
];

export interface Nominee {
  id: string;
  categoryId: string;
  name: string;
  subtitle: string;
  description: string;
  totalKarma: number;
  totalVoters: number;
  rank?: number;
  imageUrl?: string;
  proofUrl?: string;
}

export const mockNominees: Nominee[] = [
  {
    id: "nom1",
    categoryId: "builder",
    name: "Satoshi Nakamoto Jr.",
    subtitle: "Lightning Protocol Developer",
    description: "Pioneered new scaling solutions for Bitcoin",
    totalKarma: 5420,
    totalVoters: 142,
    rank: 1,
  },
  {
    id: "nom2",
    categoryId: "builder",
    name: "Alice Chain",
    subtitle: "Bitcoin Core Contributor",
    description: "Major improvements to consensus code",
    totalKarma: 4230,
    totalVoters: 118,
    rank: 2,
  },
  {
    id: "nom3",
    categoryId: "builder",
    name: "Bob Hodler",
    subtitle: "Wallet Developer",
    description: "Created most user-friendly Bitcoin wallet",
    totalKarma: 3890,
    totalVoters: 95,
    rank: 3,
  },
];

interface CategoryCardProps {
  category: Category;
}

export const CategoryCard = ({ category }: CategoryCardProps) => {
  return (
    <motion.div
      className="group relative bg-card rounded-lg border border-border overflow-hidden shadow-subtle hover:shadow-card transition-all duration-300"
      whileHover={{ y: -4 }}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="p-5">
        {/* Header */}
        <div className="mb-3">
          <h3 className="text-lg font-display uppercase tracking-wide text-foreground group-hover:text-primary transition-colors leading-tight">
            {category.title}
          </h3>
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
          {category.description}
        </p>
      </div>
    </motion.div>
  );
};
