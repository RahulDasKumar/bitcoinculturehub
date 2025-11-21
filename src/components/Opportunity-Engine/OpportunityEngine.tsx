import { Navigation } from "./Navigation";
import { OpportunityCard } from "./OpportunityCard";
import { CategoryFilter } from "./CategoryFilter";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import useAuthStore from "@/hooks/use-auth";
import Header from "@/components/Header";
import { useNavigate } from "react-router-dom"; 
import { useEffect } from "react";
import { Button } from "../ui/button";
import { useState } from "react";

const ADMIN_EMAIL = "dasrkd3@gmail.com"; 

const OpportunityEngine = () => {
    const { user, isLoggedIn, logout } = useAuthStore();
    const isAdmin = isLoggedIn && user?.email === ADMIN_EMAIL;
    const navigate = useNavigate(); 
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchJobs() {
            try {
                const response = await fetch("https://bch-backend-7vjs.onrender.com/jobs/");
                const data = await response.json();
                setJobs(data);
            } catch (error) {
                console.error("Error fetching jobs:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchJobs();
    }, []);

    


    return (
        <div className="min-h-screen bg-background">
           <Header/>
            {/* Hero Section */}
            <section className="border-b border-border bg-gradient-to-b from-secondary/30 to-background">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
                    <div className="max-w-3xl mx-auto text-center space-y-6">
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground tracking-tight">
                            Find Your Bitcoin Opportunity
                        </h1>
                        <p className="text-lg sm:text-xl text-muted-foreground">
                            Connect with jobs, internships, and volunteer opportunities in the Bitcoin ecosystem
                        </p>
                        {isAdmin && (<Button className="bg-primary text-primary-foreground hover:bg-primary/90 shrink-0" onClick={() => navigate("/submit-opportunity")}>
                            Add Opportunity
                        </Button>)}
                        
                    </div>
                </div>
            </section>

            {/* Search and Filter Section */}
            <section className="border-b border-border bg-card">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="max-w-4xl mx-auto space-y-6">
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                            <Input
                                type="search"
                                placeholder="Search opportunities..."
                                className="pl-12 h-12 text-base bg-background"
                            />
                        </div>

                        <CategoryFilter />
                    </div>
                </div>
            </section>

            {/* Opportunities List */}
            <section className="py-12">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto space-y-4">
                        {jobs.map((opportunity, index) => (
                            <OpportunityCard key={index} {...opportunity} />
                        ))}
                    </div>
                </div>
            </section>
            <div
                className="w-full h-full bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:16px_16px]"
            >
                {/* content here */}
            </div>

        </div>
    );
};

export default OpportunityEngine;
