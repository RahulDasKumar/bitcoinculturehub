
import React from 'react';

const AboutSection: React.FC = () => {
  const pillars = [
    {
      title: 'What It Is',
      content: 'A decentralized network of student-led Bitcoin clubs, educators, and builders working to bring Bitcoin education to every campus worldwide.',
      border: 'border-black'
    },
    {
      title: "Who It's For",
      content: 'University students, campus organizers, educators, and young builders interested in Bitcoin technology, economics, and culture.',
      border: 'border-black'
    },
    {
      title: 'Why It Exists',
      content: 'To give the next generation of builders access to Bitcoin knowledge, mentorship, and real-world opportunities before they graduate.',
      border: 'border-gray-300'
    },
    {
      title: 'How It Operates',
      content: 'Through regional coordinators, shared resources, virtual collaboration, and an open-source approach to education and community building.',
      border: 'border-gray-300'
    }
  ];

  return (
    <section>
      <h2 className="text-3xl font-extrabold text-black mb-10">About BSN</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-0">
        {pillars.map((pillar, idx) => (
          <div key={idx} className={`p-8 border-2 ${pillar.border} flex flex-col gap-6 bg-white min-h-[280px]`}>
            <h3 className="text-xl font-bold text-black">{pillar.title}</h3>
            <p className="text-sm text-black leading-relaxed font-semibold">
              {pillar.content}
            </p>
          </div>
        ))}
      </div>
      <button className="mt-8 text-sm font-bold text-black uppercase tracking-widest hover:underline transition-colors flex items-center gap-2">
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
        Learn More
      </button>
    </section>
  );
};

export default AboutSection;
