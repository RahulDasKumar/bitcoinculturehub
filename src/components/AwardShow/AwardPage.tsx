import { useState, useEffect } from "react";
import { Hero } from "@/components/AwardShow/Hero";
import { CategoryGrid } from "@/components/AwardShow/CategoryGrid";
import { NominationModal } from "@/components/AwardShow/NominationModal";
import { KarmaDrawer } from "@/components/AwardShow/KarmaDrawer";
import { HowItWorks } from "@/components/AwardShow/HowItWorks";
import { ClassOf2025 } from "@/components/AwardShow/ClassOf2025";
import { NomineesModal } from "@/components/AwardShow/NomineesModal";
import { Button } from "@/components/ui/button";
import Header from "../Layouts/Header";

const AwardPage = () => {
    const [userKarma] = useState(1240);
    const [nominationModalOpen, setNominationModalOpen] = useState(false);
    const [nominationCategoryId, setNominationCategoryId] = useState<string | undefined>();
    const [karmaDrawerOpen, setKarmaDrawerOpen] = useState(false);
    const [nomineesModalOpen, setNomineesModalOpen] = useState(false);

    useEffect(() => {
        const handleOpenKarma = () => setKarmaDrawerOpen(true);
        window.addEventListener("open-karma-drawer", handleOpenKarma);
        return () => window.removeEventListener("open-karma-drawer", handleOpenKarma);
    }, []);

    const handleNominateClick = (categoryId?: string) => {
        setNominationCategoryId(categoryId);
        setNominationModalOpen(true);
    };

    const handleStartVoting = () => {
        const categoriesSection = document.getElementById("categories");
        categoriesSection?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <div className="min-h-screen bg-background">
            <Header/>
            <Hero
                onStartVoting={handleStartVoting}
                onNominate={() => handleNominateClick()}
            />

            <ClassOf2025 />

            {/* Proof of Work Awards Section Divider */}
            <section className="bg-accent text-white py-10 md:py-12">
                <div className="container mx-auto max-w-7xl px-4">
                    <h2 className="text-4xl md:text-6xl lg:text-7xl font-display leading-[0.85] tracking-tighter mb-1">
                        PROOF OF WORK AWARDS*
                    </h2>
                    <p className="text-sm text-white/70 mb-6">*You Decide the Winners</p>
                    <div className="border-t border-white/20 pt-6">
                        <div className="grid grid-cols-3 gap-6 md:gap-12 items-center">
                            <div>
                                <div className="text-3xl md:text-5xl font-display leading-none mb-1">21</div>
                                <div className="text-xs uppercase tracking-wider text-white/60">Categories</div>
                            </div>
                            <div>
                                <div className="text-3xl md:text-5xl font-display leading-none mb-1">350</div>
                                <div className="text-xs uppercase tracking-wider text-white/60">Nominees</div>
                            </div>
                            <div className="flex justify-end">
                                <Button
                                    onClick={() => setNomineesModalOpen(true)}
                                    className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium uppercase tracking-wider px-6 py-5 text-sm"
                                >
                                    See All Nominees
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <CategoryGrid />

            <HowItWorks />

            <NominationModal
                open={nominationModalOpen}
                onClose={() => {
                    setNominationModalOpen(false);
                    setNominationCategoryId(undefined);
                }}
                initialCategoryId={nominationCategoryId}
            />

            <KarmaDrawer
                open={karmaDrawerOpen}
                onClose={() => setKarmaDrawerOpen(false)}
                userKarma={userKarma}
            />

            <NomineesModal
                open={nomineesModalOpen}
                onClose={() => setNomineesModalOpen(false)}
            />

            <footer className="border-t border-border py-8 mt-16">
                <div className="container mx-auto max-w-7xl px-4 text-center text-sm text-muted-foreground">
                    <p>Proof of Work Awards © 2025 • Powered by the Community</p>
                </div>
            </footer>
        </div>
    );
};

export default AwardPage;