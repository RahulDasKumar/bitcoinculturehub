import React from 'react';

interface Prompt {
  prompt_key: string;
  custom_text: string;
}

interface AboutSectionProps {
  orgName: string;
  orgPrompts: Prompt[];
}

const AboutSection: React.FC<AboutSectionProps> = ({ orgName, orgPrompts }) => {

  const pillars = orgPrompts.length
    ? orgPrompts
    : [
      { prompt_key: 'what_it_is', custom_text: 'A decentralized network of student-led Bitcoin clubs, educators, and builders working to bring Bitcoin education to every campus worldwide.' },
      { prompt_key: 'who_its_for', custom_text: 'University students, campus organizers, educators, and young builders interested in Bitcoin technology, economics, and culture.' },
      { prompt_key: 'why_it_exists', custom_text: 'To give the next generation of builders access to Bitcoin knowledge, mentorship, and real-world opportunities before they graduate.' },
      { prompt_key: 'how_it_operates', custom_text: 'Through regional coordinators, shared resources, virtual collaboration, and an open-source approach to education and community building.' },
    ];

  return (
    <section>
      <h2 className="text-3xl font-extrabold text-black mb-10">About {orgName}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-0">
        {pillars.map((pillar, idx) => (
          <div
            key={idx}
            className={`p-8 border-2 ${idx < 2 ? 'border-black' : 'border-gray-300'
              } flex flex-col gap-6 bg-white min-h-[280px]`}
          >
            <h3 className="text-xl font-bold text-black">{pillar.prompt_key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</h3>
            <p className="text-sm text-black leading-relaxed font-semibold">
              {pillar.custom_text}
            </p>
          </div>
        ))}
      </div>
      <button className="mt-8 text-sm font-bold text-black uppercase tracking-widest hover:underline transition-colors flex items-center gap-2">
        <svg
          className="w-3.5 h-3.5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
        Learn More
      </button>
    </section>
  );
};

export default AboutSection;
