import "./waitlist.css"
const BitcoinIcon = ({ className = "w-12 h-12" }: { className?: string }) => {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={`${className} animate-float`}
        >
            <circle
                cx="12"
                cy="12"
                r="11"
                fill="url(#bitcoinGradient)"
                stroke="hsl(var(--bitcoin-gold))"
                strokeWidth="1"
            />
            <path
                d="M13.5 9.5V8h-1v1.5h-1V8h-1v1.5H9v1h1v3H9v1h1.5V16h1v-1.5h1V16h1v-1.5h1.5v-1H15v-.5h1v-1h-1V11h-1.5v-1.5zm-1 1.5v3h-1v-3h1zm2 0v3h-1v-3h1z"
                fill="hsl(var(--primary-foreground))"
            />
            <defs>
                <linearGradient id="bitcoinGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="hsl(var(--bitcoin-orange))" />
                    <stop offset="100%" stopColor="hsl(var(--bitcoin-gold))" />
                </linearGradient>
            </defs>
        </svg>
    );
};

export default BitcoinIcon;