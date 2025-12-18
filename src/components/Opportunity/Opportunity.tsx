import { Navigation } from "./Navigation";
import { OpportunityCard } from "./OpportunityCard";
import { OpportunityListItem } from "./OpportunityListItem";
import { FilterSidebar } from "./FilterSidebar";
import { FilterSheet } from "./FilterSheet";
import { ActiveFilterChips } from "./ActiveFilterChips";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sparkles, TrendingUp, Target, Search, Filter, Zap, CheckCircle2, Calendar, HelpCircle, ArrowUpDown, Grid3x3, List } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import { Opportunity } from "../types";
import { useOrganizationStore } from "@/hooks/use-organization";
import useAuthStore from "@/hooks/use-auth";
import { title } from "process";
import Header from "@/components/Header";
const OpportunityEngine = () => {
    const { toast } = useToast();
    const [activeView, setActiveView] = useState<"for-you" | "all" | "saved" | "history">("for-you");
    const [searchQuery, setSearchQuery] = useState("");
    const [sortBy, setSortBy] = useState("best-match");
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
    const [viewMode, setViewMode] = useState<"grid" | "list">("list");

    // Filter states
    const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
    const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
    const [selectedTimeCommit, setSelectedTimeCommit] = useState<string[]>([]);
    const [selectedCompensation, setSelectedCompensation] = useState<string[]>([]);
    const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
    const [selectedExperience, setSelectedExperience] = useState<string[]>([]);
    const [selectedPersona, setSelectedPersona] = useState<string[]>([]);
    const [selectedOrgType, setSelectedOrgType] = useState<string[]>([]);
    const [verifiedOnly, setVerifiedOnly] = useState(false);
    const [starterPathRequired, setStarterPathRequired] = useState(false);
    const [opportunities, setOpportunities] = useState<Opportunity>(null);
    const { all_opportunities, fetchAllOpportunity , applyToOpportunity,applicants} = useOrganizationStore()
    const {user,token} = useAuthStore()
    const handleClaim = async (applyBody) => {
        try {
            await applyToOpportunity(token, applyBody) 
            toast({
                title: "Applied!",
                variant: "default",
            })
        } catch (error) {
            toast({
                title: "Already Applied!",
                variant: "destructive", 
            })
        }
       
    };

    const removeFilter = (category: string[], setter: (val: string[]) => void, value: string) => {
        setter(category.filter(v => v !== value));
    };
    useEffect(()=>{
        fetchAllOpportunity()
        console.log(all_opportunities)
    },[])
    const clearAllFilters = () => {
        setSelectedTypes([]);
        setSelectedLocations([]);
        setSelectedTimeCommit([]);
        setSelectedCompensation([]);
        setSelectedSkills([]);
        setSelectedExperience([]);
        setSelectedPersona([]);
        setSelectedOrgType([]);
        setVerifiedOnly(false);
        setStarterPathRequired(false);
    };

    const totalActiveFilters =
        selectedTypes.length +
        selectedLocations.length +
        selectedTimeCommit.length +
        selectedCompensation.length +
        selectedSkills.length +
        selectedExperience.length +
        selectedPersona.length +
        selectedOrgType.length +
        (verifiedOnly ? 1 : 0) +
        (starterPathRequired ? 1 : 0);

    const filteredOpportunities = all_opportunities.filter(opp => {
        // Type filter
        if (selectedTypes.length > 0 && !selectedTypes.includes(opp.type)) return false;

        // Location filter
        if (selectedLocations.length > 0) {
            const isRemote = opp.location === "remote";
            const hasRemote = selectedLocations.includes("remote");
            const hasInPerson = selectedLocations.includes("in-person");
            if (hasRemote && !isRemote) return false;
            if (hasInPerson && isRemote) return false;
        }

        // Time commitment filter
        if (selectedTimeCommit.length > 0 && !selectedTimeCommit.includes(opp.timeCommitment)) return false;

        // Search query
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            return (
                opp.title.toLowerCase().includes(query) ||
                opp.type.toLowerCase().includes(query) ||
                opp.location.toLowerCase().includes(query) ||
                opp.categories.some(s => s.toLowerCase().includes(query))
            );
        }

        return true;
    });

    const matchedOpportunities = all_opportunities.slice(0, 3);
    const browseOpportunities = filteredOpportunities;
    console.log(browseOpportunities)
    return (
        <div className="min-h-screen bg-background">
            <Header/>

            <main className="container mx-auto px-4 pt-20 pb-16">
                {/* Hero Section with Starter Path */}
                <div className="mb-8 lg:mb-12">
                    <div className="grid lg:grid-cols-[1fr,400px] gap-8 items-start">
                        {/* Left: Hero Content */}
                        <div>
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary border border-primary/20 mb-6">
                                <Sparkles className="w-4 h-4" />
                                <span className="text-sm font-semibold">Your personalized feed</span>
                            </div>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
                                Stop Applying. <br />Start Participating.
                            </h1>
                            <p className="text-lg md:text-xl text-muted-foreground mb-3">
                                Show proof-of-work. Claim real opportunities. Earn your place in Bitcoin.
                            </p>
                            <p className="text-sm text-muted-foreground">
                                Claiming connects you directly with the organizer—no resumes, no cover letters.
                            </p>
                        </div>

                        {/* Right: Starter Path Widget */}
                        <Card className="p-6 bg-gradient-to-br from-accent/5 to-primary/5 border-accent/20 shadow-lg">
                            <div className="flex items-start gap-3 mb-4">
                                <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center shrink-0">
                                    <Target className="w-5 h-5 text-accent" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-bold text-base mb-1">
                                        Earn your "Starter Path" badge
                                    </h3>
                                    <p className="text-xs text-muted-foreground">
                                        Complete 3 actions to boost your matches and unlock advanced opportunities.
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-3 mb-4">
                                <div className="flex items-center gap-2 text-sm">
                                    <CheckCircle2 className="w-4 h-4 text-success shrink-0" />
                                    <span className="text-muted-foreground line-through">Add 2 proof-of-work items</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <div className="w-4 h-4 rounded-full border-2 border-border shrink-0" />
                                    <span className="text-foreground">Claim 1 opportunity</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <div className="w-4 h-4 rounded-full border-2 border-border shrink-0" />
                                    <span className="text-foreground">Complete your profile</span>
                                </div>
                            </div>

                            <Progress value={33} className="h-2 mb-2" />
                            <p className="text-xs text-muted-foreground mb-4">33% complete</p>

                            <Button variant="outline" size="sm" className="w-full">
                                Boost my matches
                            </Button>
                        </Card>
                    </div>
                </div>

                {/* Mobile: Filters & Sort Bar */}
                <div className="lg:hidden mb-6 flex items-center gap-3">
                    <Button
                        variant="outline"
                        onClick={() => setMobileFiltersOpen(true)}
                        className="flex-1"
                    >
                        <Filter className="w-4 h-4 mr-2" />
                        Filters {totalActiveFilters > 0 && `(${totalActiveFilters})`}
                    </Button>
                    <Select value={sortBy} onValueChange={setSortBy}>
                        <SelectTrigger className="flex-1">
                            <ArrowUpDown className="w-4 h-4 mr-2" />
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="best-match">Best match</SelectItem>
                            <SelectItem value="newest">Newest</SelectItem>
                            <SelectItem value="closing-soon">Closing soon</SelectItem>
                            <SelectItem value="highest-sats">Highest sats</SelectItem>
                            <SelectItem value="most-popular">Most popular</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* Desktop: Search & Sort Bar */}
                <div className="hidden lg:flex items-center gap-4 mb-6">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                            placeholder="Search opportunities (city, org, skill…)"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10"
                        />
                    </div>
                    <Select value={sortBy} onValueChange={setSortBy}>
                        <SelectTrigger className="w-[200px]">
                            <ArrowUpDown className="w-4 h-4 mr-2" />
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="best-match">Best match</SelectItem>
                            <SelectItem value="newest">Newest</SelectItem>
                            <SelectItem value="closing-soon">Closing soon</SelectItem>
                            <SelectItem value="highest-sats">Highest sats</SelectItem>
                            <SelectItem value="most-popular">Most popular</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* Active Filter Chips */}
                {totalActiveFilters > 0 && (
                    <div className="mb-6">
                        <ActiveFilterChips
                            selectedTypes={selectedTypes}
                            selectedLocations={selectedLocations}
                            selectedTimeCommit={selectedTimeCommit}
                            selectedCompensation={selectedCompensation}
                            selectedSkills={selectedSkills}
                            selectedExperience={selectedExperience}
                            selectedPersona={selectedPersona}
                            selectedOrgType={selectedOrgType}
                            verifiedOnly={verifiedOnly}
                            starterPathRequired={starterPathRequired}
                            onRemoveType={(type) => removeFilter(selectedTypes, setSelectedTypes, type)}
                            onRemoveLocation={(loc) => removeFilter(selectedLocations, setSelectedLocations, loc)}
                            onRemoveTimeCommit={(time) => removeFilter(selectedTimeCommit, setSelectedTimeCommit, time)}
                            onRemoveCompensation={(comp) => removeFilter(selectedCompensation, setSelectedCompensation, comp)}
                            onRemoveSkill={(skill) => removeFilter(selectedSkills, setSelectedSkills, skill)}
                            onRemoveExperience={(exp) => removeFilter(selectedExperience, setSelectedExperience, exp)}
                            onRemovePersona={(persona) => removeFilter(selectedPersona, setSelectedPersona, persona)}
                            onRemoveOrgType={(org) => removeFilter(selectedOrgType, setSelectedOrgType, org)}
                            onToggleVerified={() => setVerifiedOnly(false)}
                            onToggleStarterPath={() => setStarterPathRequired(false)}
                            onClearAll={clearAllFilters}
                        />
                    </div>
                )}

                {/* Main Content with Filter Sidebar */}
                <div className="grid lg:grid-cols-[320px,1fr] gap-8">
                    {/* Left Rail: Filter Sidebar + Stats (Desktop Only) */}
                    <aside className="hidden lg:block space-y-6">
                        <FilterSidebar
                            selectedTypes={selectedTypes}
                            selectedLocations={selectedLocations}
                            selectedTimeCommit={selectedTimeCommit}
                            selectedCompensation={selectedCompensation}
                            selectedSkills={selectedSkills}
                            selectedExperience={selectedExperience}
                            selectedPersona={selectedPersona}
                            selectedOrgType={selectedOrgType}
                            verifiedOnly={verifiedOnly}
                            starterPathRequired={starterPathRequired}
                            onTypeChange={setSelectedTypes}
                            onLocationChange={setSelectedLocations}
                            onTimeCommitChange={setSelectedTimeCommit}
                            onCompensationChange={setSelectedCompensation}
                            onSkillsChange={setSelectedSkills}
                            onExperienceChange={setSelectedExperience}
                            onPersonaChange={setSelectedPersona}
                            onOrgTypeChange={setSelectedOrgType}
                            onVerifiedChange={setVerifiedOnly}
                            onStarterPathChange={setStarterPathRequired}
                        />

                        {/* Your Stats & Progress */}
                        <Card className="p-5">
                            <h3 className="font-bold mb-4 flex items-center gap-2">
                                <TrendingUp className="w-4 h-4 text-primary" />
                                Your Stats & Progress
                            </h3>
                            <div className="space-y-3 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Opportunities claimed:</span>
                                    <span className="font-semibold">3</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Starter Path:</span>
                                    <span className="font-semibold text-accent">33% complete</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Next badge:</span>
                                    <Badge variant="outline" className="text-xs">Organizer</Badge>
                                </div>
                            </div>
                        </Card>

                        {/* Active Commitments */}
                        <Card className="p-5">
                            <h3 className="font-bold mb-4 flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-primary" />
                                Active Commitments
                            </h3>
                            <div className="space-y-3">
                                <div className="p-3 rounded-lg bg-accent/5 border border-accent/20">
                                    <p className="font-semibold text-sm mb-1">Stage Runner @ Nashville</p>
                                    <p className="text-xs text-muted-foreground mb-2">May 15, 2025 • 4-10h</p>
                                    <Badge variant="outline" className="text-xs bg-success/10 text-success border-success/20">
                                        Confirmed
                                    </Badge>
                                </div>
                            </div>
                        </Card>

                        {/* Help & Support */}
                        <Card className="p-4 bg-muted/30">
                            <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                                <HelpCircle className="w-4 h-4" />
                                How does claiming work?
                            </button>
                        </Card>
                    </aside>

                    {/* Main Content: Opportunity Lists */}
                    <div className="space-y-8">
                        {/* Matched for You Section */}
                        <section>
                            <div className="flex items-center gap-2 mb-4">
                                <div className="flex items-center gap-2 text-primary">
                                    <Zap className="w-5 h-5" fill="currentColor" />
                                    <h2 className="text-2xl font-bold">Matched For You</h2>
                                </div>
                                <Badge variant="secondary" className="ml-auto">
                                    Top 3 picks
                                </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-6">
                                Based on your proof-of-work, interests, and activity.
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {matchedOpportunities.map((opp, idx) => (
                                    <OpportunityCard
                                        org={""} whyFit={""} timeCommit={""} skills={[]} key={idx}
                                        {...opp}
                                        onClaim={() => handleClaim({"email":user.email,
                                            "username":user.username,
                                            "opportunity_id":opp.id,
                                            "avatar":user.avatar,
                                            "location":user.location,
                                            "org_id":opp.org_id,
                                            "opp_id":opp.id
                                        })}                                    />
                                ))}
                            </div>
                        </section>

                        {/* Opportunity of the Week Banner */}
                        <Card className="p-6 lg:p-8 bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20 shadow-lg">
                            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-3">
                                        <Sparkles className="w-5 h-5 text-primary" />
                                        <h3 className="font-bold text-lg">Opportunity of the Week</h3>
                                    </div>
                                    <p className="font-bold text-2xl mb-2">Bitcoin Conference Host</p>
                                    <p className="text-sm text-muted-foreground">
                                        Premium opportunity with travel + ticket included
                                    </p>
                                </div>
                                <Button size="lg" variant="default" className="lg:w-48">
                                    View Details
                                </Button>
                            </div>
                        </Card>

                        {/* Browse All Opportunities Section */}
                        <section>
                            <div className="mb-6 flex items-end justify-between gap-4">
                                <div>
                                    <h2 className="text-2xl font-bold mb-2">Browse All Opportunities</h2>
                                    <p className="text-sm text-muted-foreground">
                                        {browseOpportunities.length} opportunities available
                                    </p>
                                </div>

                                {/* View Toggle */}
                                <div className="flex items-center gap-1 bg-muted/50 p-1 rounded-lg">
                                    <Button
                                        variant={viewMode === "grid" ? "secondary" : "ghost"}
                                        size="sm"
                                        onClick={() => setViewMode("grid")}
                                        className="gap-2"
                                    >
                                        <Grid3x3 className="w-4 h-4" />
                                        <span className="hidden sm:inline">Grid</span>
                                    </Button>
                                    <Button
                                        variant={viewMode === "list" ? "secondary" : "ghost"}
                                        size="sm"
                                        onClick={() => setViewMode("list")}
                                        className="gap-2"
                                    >
                                        <List className="w-4 h-4" />
                                        <span className="hidden sm:inline">List</span>
                                    </Button>
                                </div>
                            </div>

                            {browseOpportunities.length > 0 ? (
                                viewMode === "grid" ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {browseOpportunities.map((opp, idx) => (
                                            <OpportunityCard
                                                org={opp.title} whyFit={""} timeCommit={opp.timeCommitment} skills={opp.categories} key={idx}
                                                {...opp}
                                                onClaim={() => handleClaim({
                                                    "email": user.email,
                                                    "username": user.username,
                                                    "opportunity_id": opp.id,
                                                    "avatar": user.avatar,
                                                    "location": user.location,
                                                    'org_id':opp.org_id,
                                                    "opp_id": opp.id
                                                })} />
                                        ))}
                                    </div>
                                ) : (
                                    <div className="bg-card border border-border rounded-xl overflow-hidden">
                                        {browseOpportunities.map((opp, idx) => (
                                            <OpportunityListItem
                                                org={opp.title} whyFit={""} timeCommit={opp.timeCommitment} skills={opp.categories} key={idx}
                                                {...opp}
                                                onClaim={() => handleClaim({
                                                    "email": user.email,
                                                    "username": user.username,
                                                    "opportunity_id": opp.id,
                                                    "avatar": user.avatar,
                                                    "location": user.location,
                                                    "org_id":opp.org_id,
                                                    "opp_id": opp.id

                                                })}                                            />
                                        ))}
                                    </div>
                                )
                            ) : (
                                <div className="text-center p-12 rounded-xl border-2 border-dashed border-border">
                                    <p className="text-muted-foreground mb-2">No opportunities match your filters</p>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={clearAllFilters}
                                    >
                                        Clear filters
                                    </Button>
                                </div>
                            )}
                        </section>
                    </div>
                </div>

                {/* Mobile Filter Sheet */}
                <FilterSheet
                    open={mobileFiltersOpen}
                    onOpenChange={setMobileFiltersOpen}
                    selectedTypes={selectedTypes}
                    selectedLocations={selectedLocations}
                    selectedTimeCommit={selectedTimeCommit}
                    selectedCompensation={selectedCompensation}
                    selectedSkills={selectedSkills}
                    selectedExperience={selectedExperience}
                    selectedPersona={selectedPersona}
                    selectedOrgType={selectedOrgType}
                    verifiedOnly={verifiedOnly}
                    starterPathRequired={starterPathRequired}
                    onTypeChange={setSelectedTypes}
                    onLocationChange={setSelectedLocations}
                    onTimeCommitChange={setSelectedTimeCommit}
                    onCompensationChange={setSelectedCompensation}
                    onSkillsChange={setSelectedSkills}
                    onExperienceChange={setSelectedExperience}
                    onPersonaChange={setSelectedPersona}
                    onOrgTypeChange={setSelectedOrgType}
                    onVerifiedChange={setVerifiedOnly}
                    onStarterPathChange={setStarterPathRequired}
                    onClearAll={clearAllFilters}
                />
            </main>
        </div>
    );
};

export default OpportunityEngine;
