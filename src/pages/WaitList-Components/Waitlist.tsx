import BitcoinIcon from "./Bitcoin";
import SignupForm from "./SignupForm";
import CountdownTimer from "./CountdownTimer";
import "./waitlist.css"
import Footer from "@/components/Footer";
import Header from "@/components/Header";
const HeaderBitcoinIcon = () => <BitcoinIcon />; // Importing the missing component

const DiscordButton = () => {
    const handleDiscordClick = () => {
      const discordUrl = "https://t.co/Ny9NCfuK9F";
      window.open(discordUrl, "_blank");
    };
  
    return (
      <button
        className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded transition-colors duration-200 ease-in-out"
        onClick={handleDiscordClick}
      >
        Join Discord
      </button>
    );
  };

const Waitlist = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-background via-background to-background relative overflow-hidden">
            {/* Background elements */}
            <Header/>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,hsl(var(--bitcoin-orange)/0.08),transparent_70%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,hsl(var(--bitcoin-gold)/0.05),transparent_70%)]" />

            <div className="relative z-10 flex min-h-screen items-center justify-center px-4">
                <div className="text-center max-w-4xl mx-auto">
                    {/* Bitcoin Icon */}
                    <div className="flex justify-center mb-8">
                        <img
                        src="/images/08fc4c04-8697-4208-88bd-114b9a0d94cb.png"
                        alt="Bitcoin Culture Hub Logo"
                        className="w-12 h-12 rounded-full transition-transform duration-300 hover:scale-110 hover:cursor-pointer"
                        />
                    </div>

                    {/* Main heading */}
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
                        The Future of Finance
                    </h1>

                    {/* Subtitle */}
                    <p className="text-xl md:text-2xl text-foreground/70 mb-4 max-w-2xl mx-auto">
                        Revolutionary bitcoin-powered platform launching soon...
                    </p>






                    {/* Countdown */}
                    <div className="mb-8">
                        <p className="text-lg text-foreground/80 mb-4">Launch countdown</p>
                        <CountdownTimer />
                    </div>

                    {/* Signup form */}
                    <div className="mb-8">
                        <p className="text-lg text-foreground/80 mb-6">
                            Sign up & join the Discord to get notified when we go live
                        </p>
                        <div className="flex justify-center">
                            <SignupForm />
                        </div>
                    </div>
                        {/* Discord Button */}
                        <DiscordButton />
                    {/* Features preview */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 max-w-3xl mx-auto">
                        <div className="bg-card rounded-lg p-6 border-2 border-bitcoin-orange shadow-card">
                            <div className="text-bitcoin-orange text-2xl mb-3">⚡</div>
                            <h3 className="font-semibold text-foreground mb-2">Social Network</h3>
                            <p className="text-sm text-foreground/70">Find friends and increase your social network</p>
                        </div>

                        <div className="bg-card rounded-lg p-6 border-2 border-bitcoin-orange shadow-card">
                            <div className="text-bitcoin-orange text-2xl mb-3">👨‍👨</div>
                            <h3 className="font-semibold text-foreground mb-2">Identity</h3>
                            <p className="text-sm text-foreground/70">Find your identity within the cryptoworld</p>
                        </div>

                        <div className="bg-card rounded-lg p-6 border-2 border-bitcoin-orange shadow-card">
                            <div className="text-bitcoin-orange text-2xl mb-3">🌍</div>
                            <h3 className="font-semibold text-foreground mb-2">Global Access</h3>
                            <p className="text-sm text-foreground/70">Join a Global Community</p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
};

export default Waitlist;
