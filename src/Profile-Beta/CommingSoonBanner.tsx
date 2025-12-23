import React from 'react';

interface ComingSoonBannerProps {
    rotation?: string;
}

const ComingSoonBanner: React.FC<ComingSoonBannerProps> = ({ rotation = "rotate-[-2deg]" }) => {
    return (
        <div className={`bg-black text-white font-display text-4xl px-8 py-4 border-4 border-bitcoin ${rotation} shadow-[8px_8px_0px_0px_rgba(247,147,26,1)] uppercase tracking-widest z-20 whitespace-nowrap`}>
            Coming Soon
        </div>
    );
};

export default ComingSoonBanner;