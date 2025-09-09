import { useState, useEffect } from "react";
import "./waitlist.css"
const CountdownTimer = () => {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    useEffect(() => {
        // Set target date to 30 days from now
        const targetDate = new Date();
        targetDate.setDate(targetDate.getDate() + 14);

        const timer = setInterval(() => {
            const now = new Date().getTime();
            const distance = targetDate.getTime() - now;

            if (distance > 0) {
                const days = Math.floor(distance / (1000 * 60 * 60 * 24));
                const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((distance % (1000 * 60)) / 1000);

                setTimeLeft({ days, hours, minutes, seconds });
            }
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <div className="flex gap-4 justify-center text-center">
            <div className="bg-card rounded-lg p-4 border-2 border-bitcoin-orange shadow-card">
                <div className="text-2xl font-bold text-bitcoin-orange">{timeLeft.days}</div>
                <div className="text-sm text-foreground/70">Days</div>
            </div>
            <div className="bg-card rounded-lg p-4 border-2 border-bitcoin-orange shadow-card">
                <div className="text-2xl font-bold text-bitcoin-orange">{timeLeft.hours}</div>
                <div className="text-sm text-foreground/70">Hours</div>
            </div>
            <div className="bg-card rounded-lg p-4 border-2 border-bitcoin-orange shadow-card">
                <div className="text-2xl font-bold text-bitcoin-orange">{timeLeft.minutes}</div>
                <div className="text-sm text-foreground/70">Minutes</div>
            </div>
            <div className="bg-card rounded-lg p-4 border-2 border-bitcoin-orange shadow-card">
                <div className="text-2xl font-bold text-bitcoin-orange">{timeLeft.seconds}</div>
                <div className="text-sm text-foreground/70">Seconds</div>
            </div>
        </div>
    );
};

export default CountdownTimer;