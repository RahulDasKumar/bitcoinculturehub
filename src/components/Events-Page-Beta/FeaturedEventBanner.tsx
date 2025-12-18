import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const FeaturedEventBanner = () => {
    return (
        <div className="bg-black text-white p-8 md:p-12 mb-10">
            <div className="max-w-5xl mx-auto">
                <span className="inline-block bg-orange-500 text-white text-xs font-heading uppercase tracking-wider px-3 py-1 mb-4">
                    Featured This Week
                </span>

                <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl uppercase mb-3">
                    Midwest Bitcoin Summit
                </h2>

                <p className="text-gray-300 mb-6">
                    Columbus, Ohio 2026 • Regional gathering • Community focused
                </p>

                <Button
                    className="bg-orange-500 hover:bg-orange-600 text-white font-heading uppercase tracking-wide px-6"
                >
                    View Details
                    <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
            </div>
        </div>
    );
};

export default FeaturedEventBanner;