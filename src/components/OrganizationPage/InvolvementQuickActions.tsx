
import React from 'react';

const InvolvementQuickActions: React.FC = () => {
  const cards = [
    {
      title: 'Learn Bitcoin',
      desc: 'Access curated resources, courses, and educational programs for all levels.',
      icon: (
        <svg className="w-8 h-8 text-[#f7931a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path d="M12 14l9-5-9-5-9 5 9 5z" />
          <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
        </svg>
      )
    },
    {
      title: 'Build & Contribute',
      desc: 'Find volunteer roles, internships, bounties, and opportunities to make an impact.',
      icon: (
        <svg className="w-8 h-8 text-[#f7931a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
        </svg>
      )
    },
    {
      title: 'Start or Join a Club',
      desc: 'Launch a chapter at your university or connect with an existing student community.',
      icon: (
        <svg className="w-8 h-8 text-[#f7931a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9" />
        </svg>
      )
    }
  ];

  return (
    <section>
      <h2 className="text-2xl font-bold text-black text-center mb-10">How Would You Like to Get Involved?</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-t border-l border-gray-200">
        {cards.map((card, idx) => (
          <div 
            key={idx} 
            className="p-10 border-b border-r border-gray-200 hover:bg-gray-50 transition-all cursor-pointer flex flex-col items-start gap-4"
          >
            <div className="mb-2">
              {card.icon}
            </div>
            <h3 className="text-xl font-bold">{card.title}</h3>
            <p className="text-sm text-black font-medium leading-relaxed">{card.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default InvolvementQuickActions;
