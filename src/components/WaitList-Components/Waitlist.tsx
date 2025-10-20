import BitcoinIcon from "./Bitcoin";
import SignupForm from "./SignupForm";
import CountdownTimer from "./CountdownTimer";
import "./waitlist.css";
import Footer from "@/components/Layouts/Footer";
import Header from "@/components/Layouts/Header";

const HeaderBitcoinIcon = () => <BitcoinIcon />;

const DiscordButton = () => {
  const handleDiscordClick = () => {
    const discordUrl = "https://t.co/Ny9NCfuK9F";
    window.open(discordUrl, "_blank");
  };

  return (
    <button
      className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded transition-colors duration-200 ease-in-out"
      onClick={handleDiscordClick}
    >
      Join Discord
    </button>
  );
};

const Waitlist = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background via-background to-background relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,hsl(var(--bitcoin-orange)/0.08),transparent_70%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,hsl(var(--bitcoin-gold)/0.05),transparent_70%)] pointer-events-none" />

      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="relative z-10 flex-grow flex items-start justify-center px-4">
        <div className="text-center max-w-4xl mx-auto">
          {/* Bitcoin Icon */}
          <div className="flex justify-center mt-8 mb-8">
            <img
              src="/images/08fc4c04-8697-4208-88bd-114b9a0d94cb.png"
              alt="Bitcoin Culture Hub Logo"
              className="w-12 h-12 rounded-full transition-transform duration-300"
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
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch mt-20 mb-24">
            {/* Card 1 - Social Network */}
            <div className="group flex">
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-orange-200 relative overflow-hidden flex flex-col justify-between w-full">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-orange-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10 text-center space-y-6 flex-grow">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <span className="text-white text-3xl">⚡</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Social Network</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Find friends and increase your social network
                    </p>
                  </div>
                </div>
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-orange-400/20 to-orange-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl -z-10"></div>
              </div>
            </div>

            {/* Card 2 - Identity */}
            <div className="group flex">
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-orange-200 relative overflow-hidden flex flex-col justify-between w-full">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-orange-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10 text-center space-y-6 flex-grow">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <span className="text-white text-3xl">👯‍♂️</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Identity</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Find your identity within the cryptoworld
                    </p>
                  </div>
                </div>
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-orange-400/20 to-orange-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl -z-10"></div>
              </div>
            </div>

            {/* Card 3 - Global Access */}
            <div className="group flex">
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-orange-200 relative overflow-hidden flex flex-col justify-between w-full">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-orange-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10 text-center space-y-6 flex-grow">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <span className="text-white text-3xl">🌍</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Global Access</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Join a Global Community
                    </p>
                  </div>
                </div>
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-orange-400/20 to-orange-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl -z-10"></div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Waitlist;
