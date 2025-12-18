
import React, { useState, useEffect } from 'react';
import Header from '../Header';

// --- Types ---
interface Leader {
    name: string;
    role: string;
    image: string;
}

interface Partner {
    id: string;
    name: string;
    description: string;
    link: string;
    color: string;
}

interface ManifestoWord {
    index: number;
    word: string;
}

// --- Constants ---
const LEADERS: Leader[] = [
    {
        name: "Kyle Knight",
        role: "Founder CEO",
        image: "images/TeamPhotos/kyle.png"
    },
    {
        name: "Sean Mihlich",
        role: "Head of Business Development",
        image: "images/TeamPhotos/sean.jpg"
    },
    {
        name: "Rahul Das",
        role: "Head of Engineering",
        image: "images/TeamPhotos/rahul.jpg"
    }
];

const PARTNERS: Partner[] = [
    {
        id: "BSN",
        name: "Bitcoin Students Network",
        description: "Empowering the next generation of Bitcoin advocates through education and community building on college campuses worldwide.",
        link: "#",
        color: "bg-orange-500"
    },
    {
        id: "BMA",
        name: "Bitcoin Marketing Association",
        description: "A collective of marketing professionals dedicated to advancing Bitcoin adoption through strategic communication and brand development.",
        link: "#",
        color: "bg-orange-600"
    },
    {
        id: "MBS",
        name: "Midwest Bitcoin Summit",
        description: "The premier Bitcoin conference in the heartland, bringing together thought leaders, builders, and enthusiasts for meaningful discourse.",
        link: "#",
        color: "bg-orange-400"
    }
];

const MANIFESTO_WORDS: ManifestoWord[] = [
    { index: 1, word: "Safe" }, { index: 2, word: "Welcoming" }, { index: 3, word: "Accessible" },
    { index: 4, word: "Integrity" }, { index: 5, word: "Accountability" }, { index: 6, word: "Experimentation" },
    { index: 7, word: "Limitless" }, { index: 8, word: "Purpose" }, { index: 9, word: "Education" },
    { index: 10, word: "Play" }, { index: 11, word: "Proof" }, { index: 12, word: "Courage" },
    { index: 13, word: "Collaboration" }, { index: 14, word: "Community" }, { index: 15, word: "Determination" },
    { index: 16, word: "Sovereignty" }, { index: 17, word: "Joy" }, { index: 18, word: "Original" },
    { index: 19, word: "Initiative" }, { index: 20, word: "Intention" }, { index: 21, word: "Transparency" },
    { index: 22, word: "Permissionless" }, { index: 23, word: "Visionary" }, { index: 24, word: "Gratitude" }
];

// // --- Gemini Service ---
// const interpretManifestoWord = async (word: string): Promise<string> => {
//     try {
//         const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
//         const response = await ai.models.generateContent({
//             model: 'gemini-3-flash-preview',
//             contents: `Explain in one short, inspiring paragraph (max 3 sentences) why the value "${word}" is critical to Bitcoin culture and decentralized finance. Use an authoritative yet welcoming tone.`,
//             config: {
//                 temperature: 0.7,
//                 topP: 0.9,
//             }
//         });

//         return response.text || "Could not generate interpretation.";
//     } catch (error) {
//         console.error("Gemini Error:", error);
//         return "The culture interpreter is temporarily offline. This value remains a pillar of our manifesto.";
//     }
// };

// --- Sub-Components ---
const SectionHeader: React.FC<{ title: string }> = ({ title }) => (
    <div className="md:w-1/4 mb-8 md:mb-0">
        <h2 className="text-3xl font-bold text-gray-900 border-l-4 border-bitcoin pl-4 uppercase tracking-tight">
            {title}
        </h2>
    </div>
);

const Hero: React.FC = () => (
    <section className="bg-black text-white py-24 md:py-40 px-6">
        <div className="max-w-6xl mx-auto">
            <h1 className="text-7xl md:text-[10rem] font-black uppercase tracking-tighter leading-[0.8] mb-12">
                We Serve<br />
                Bitcoiners*
            </h1>
            <p className="text-xl md:text-3xl font-light italic text-gray-500">
                *if you are human, you're a Bitcoiner
            </p>
        </div>
    </section>
);

const FounderStory: React.FC = () => (
    <section id="story" className="py-24 px-6 max-w-6xl mx-auto border-b border-gray-100">
        <div className="flex flex-col md:flex-row gap-12">
            <SectionHeader title="Our Story" />
            <div className="md:w-3/4 space-y-6 text-gray-700 leading-relaxed text-lg">
                <p>The Bitcoin Culture Hub emerged from a simple belief: culture drives adoption. Before people understand the technical brilliance of Bitcoin, they need to feel connected to its story, its values, and its community.</p>
                <p className="font-bold text-gray-900">Our mission is to preserve the art, ideas, and innovations that make this movement unique, and to empower the next generation with the tools they need to carry Bitcoin forward.</p>
            </div>
        </div>
    </section>
);

const Leadership: React.FC = () => (
    <section id="leadership" className="py-24 px-6 max-w-6xl mx-auto border-b border-gray-100">
        <div className="flex flex-col md:flex-row gap-12">
            <SectionHeader title="Leadership" />
            <div className="md:w-3/4 grid grid-cols-1 md:grid-cols-3 gap-12">
                {LEADERS.map((leader, index) => (
                    <div key={index} className="group">
                        <div className="relative overflow-hidden mb-6 aspect-[4/5] bg-gray-100 rounded-lg">
                            <img src={leader.image} alt={leader.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0" />
                        </div>
                        <h3 className="text-2xl font-black text-gray-900 mb-1">{leader.name}</h3>
                        <p className="text-bitcoin text-xs font-black uppercase tracking-widest">{leader.role}</p>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

const Manifesto: React.FC = () => {
    const [interpreting, setInterpreting] = useState<number | null>(null);
    const [explanation, setExplanation] = useState<{ [key: number]: string }>({});

    const handleInterpret = async (id: number, word: string) => {
        if (explanation[id]) return;
        setInterpreting(id);

        setInterpreting(null);
    };

    return (
        <section id="manifesto" className="py-24 px-6 max-w-6xl mx-auto border-b border-gray-100">
            <div className="flex flex-col md:flex-row gap-12">
                <SectionHeader title="Manifesto" />
                <div className="md:w-3/4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-6">
                        {MANIFESTO_WORDS.map((item) => (
                            <div key={item.index} className="group py-2">
                                <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                                    <div className="flex items-center gap-4">
                                        <span className="text-[10px] font-black text-gray-300 tabular-nums">
                                            {String(item.index).padStart(2, '0')}
                                        </span>
                                        <span className="text-xl font-bold text-gray-800 tracking-tight group-hover:text-bitcoin transition-colors">
                                            {item.word}
                                        </span>
                                    </div>
                                    <button
                                        onClick={() => handleInterpret(item.index, item.word)}
                                        disabled={interpreting === item.index}
                                        className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-400 hover:text-bitcoin disabled:opacity-30 transition-all"
                                    >
                                        {interpreting === item.index ? 'Reading...' : explanation[item.index] ? 'Done' : 'Decode'}
                                    </button>
                                </div>
                                {explanation[item.index] && (
                                    <p className="mt-3 text-sm text-gray-500 leading-relaxed italic animate-in fade-in slide-in-from-top-2 duration-500">
                                        {explanation[item.index]}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

const Partners: React.FC = () => (
    <section id="partners" className="py-24 px-6 max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row gap-12">
            <SectionHeader title="Partners" />
            <div className="md:w-3/4 grid grid-cols-1 md:grid-cols-2 gap-12">
                {PARTNERS.map((partner) => (
                    <div key={partner.id} className="group p-8 border border-gray-100 rounded-2xl hover:border-bitcoin/20 transition-all hover:shadow-xl hover:shadow-bitcoin/5">
                        <div className={`w-12 h-12 ${partner.color} rounded-xl mb-6 flex items-center justify-center text-white font-black text-xs`}>
                            {partner.id}
                        </div>
                        <h3 className="text-xl font-black text-gray-900 mb-2">{partner.name}</h3>
                        <p className="text-gray-500 text-sm leading-relaxed mb-6">{partner.description}</p>
                        <a href={partner.link} className="text-bitcoin text-[10px] font-black uppercase tracking-[0.3em] hover:opacity-70 transition-opacity flex items-center">
                            Explore Partner
                            <svg className="ml-2 w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                        </a>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

// --- Main App ---
const AboutUs: React.FC = () => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="min-h-screen selection:bg-bitcoin selection:text-white antialiased">   
            <Header/>

            <main>
                <Hero />
                <FounderStory />
                <Leadership />
                <Manifesto />
                <Partners />
            </main>

            <footer className="bg-black text-white py-32 px-6">
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-16">
                    <div className="md:col-span-2">
                        <div className="text-4xl font-black tracking-tighter mb-8">
                            BTC<span className="text-bitcoin">CULTURE</span>
                        </div>
                        <p className="text-gray-500 max-w-sm text-lg font-light leading-relaxed">
                            We build the cultural layer of the most important monetary revolution in human history.
                        </p>
                    </div>
                    <div>
                        <h4 className="text-bitcoin text-[10px] font-black uppercase tracking-widest mb-8">Connect</h4>
                        <ul className="space-y-4 text-sm font-medium text-gray-400">
                            <li><a href="#" className="hover:text-white transition-colors">Twitter (X)</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Nostr</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Discord</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-bitcoin text-[10px] font-black uppercase tracking-widest mb-8">Ecosystem</h4>
                        <ul className="space-y-4 text-sm font-medium text-gray-400">
                            <li><a href="#" className="hover:text-white transition-colors">Grant Program</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Cultural Assets</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Education</a></li>
                        </ul>
                    </div>
                </div>
                <div className="max-w-6xl mx-auto mt-32 pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-[10px] font-black text-gray-600 uppercase tracking-widest gap-6">
                    <p>© {new Date().getFullYear()} Bitcoin Culture Hub. Public Domain.</p>
                    <div className="flex gap-12">
                        <p>100M SATS = 1 BTC</p>
                        <p>Verify, Don't Trust</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default AboutUs;
