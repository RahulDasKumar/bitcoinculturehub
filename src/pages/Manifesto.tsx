import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Manifesto = () => {
  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Header />
      
      {/* Hero Section */}
      <header className="bg-gradient-primary text-primary-foreground py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Our Manifesto
            </h1>
            <p className="text-xl md:text-2xl opacity-90 leading-relaxed">
              The principles and vision that guide our Bitcoin sovereignty movement.
            </p>
          </div>
        </div>
      </header>

      {/* Content Area */}
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center text-muted-foreground text-lg">
            <p>Manifesto content coming soon...</p>
            <p className="mt-4">This page will contain our core principles and vision for Bitcoin culture.</p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Manifesto;