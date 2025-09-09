import { Archtypes } from "./QuizContext";

type QuestionType = {
    id: number;
    question: string;
    options: [string,string][];
};



const bitcoinQBank : QuestionType[] = [
    {
        id: 1,
        question: "What draws you to Bitcoin?",
        options: [
            ["Its long-term value and historical significance", "HODLer"],
            ["The chance to create art or memes, Bitcoin Ordinals, trading cards, or digital art", "Creator"],
            ["Curiosity about its culture and basics", "Explorer"],
            ["Belief in its exclusive superiority and ability to revolutionize finance into sound money", "Maximalist"],
        ],
    },
    {
        id: 2,
        question: "How do you engage with Bitcoin?",
        options: [
            ["Buy and HODL with no intention to sell", "HODLer"],
            ["Produce NFTs, share content, or create Bitcoin-inspired art", "Creator"],
            ["Connect with like-minded Bitcoiners, attend conferences, listen to podcasts", "Explorer"],
            ["Run a node, share educational content, or advocate Bitcoin purity online", "Maximalist"],
        ],
    },
    {
        id: 3,
        question: "What excites you about Bitcoin’s culture?",
        options: [
            ["Its enduring legacy and milestones", "HODLer"],
            ["Artistic innovations like Ordinals", "Creator"],
            ["Discovering its origins and stories", "Explorer"],
            ["Its unmatched ideological strength", "Maximalist"],
        ],
    },
    {
        id: 4,
        question: "How do you approach Bitcoin’s technology?",
        options: [
            ["Master cold storage for safety", "HODLer"],
            ["Use tools to craft digital works", "Creator"],
            ["Learn the fundamentals step-by-step", "Explorer"],
            ["Optimize nodes for network health", "Maximalist"],
        ],
    },
    {
        id: 5,
        question: "What’s your Bitcoin goal?",
        options: [
            ["Preserve its cultural heritage", "HODLer"],
            ["Earn through creative output", "Creator"],
            ["Understand and join the community", "Explorer"],
            ["Champion it as the only crypto", "Maximalist"],
        ],
    },
    {
        id: 6,
        question: "How do you share Bitcoin’s story?",
        options: [
            ["Teach others about its history", "HODLer"],
            ["Showcase art or memes online", "Creator"],
            ["Ask questions in forums", "Explorer"],
            ["Advocate Bitcoin dominance, debate its supremacy, and orange pill others", "Maximalist"],
        ],
    },
    {
        id: 7,
        question: "What defines your Bitcoin identity?",
        options: [
            ["A guardian of its past", "HODLer"],
            ["An innovator of its culture", "Creator"],
            ["A seeker of its future", "Explorer"],
            ["A defender of its truth", "Maximalist"],
        ],
    },
];

export default bitcoinQBank;


