import React from 'react';
import ComingSoonBanner from './CommingSoonBanner';

interface ComingSoonOverlayProps {
    children: React.ReactNode;
    active?: boolean;
    bannerRotation?: string;
}

const ComingSoonOverlay: React.FC<ComingSoonOverlayProps> = ({
    children,
    active = true,
    bannerRotation
}) => {
    if (!active) return <>{children}</>;

    return (
        <div className="relative group overflow-hidden">
            {/* Overlay Banner */}
            <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
                <ComingSoonBanner rotation={bannerRotation} />
            </div>

            {/* Obscured Content */}
            <div className="grayscale opacity-40 pointer-events-none select-none filter blur-[1px]">
                {children}
            </div>
        </div>
    );
};

export default ComingSoonOverlay;