import { ProfileHero } from "./ProfileHero";
import { ReputationStrip } from "./ReputationStrip";
import { LinksStrip } from "./LinksStrip";
import { ProfileTabs } from "./ProfileTabs";
import { TipCard } from "./TipCard";
import { ContactCard } from "./ContactCard";
import Header from "../Header";
import useAuthStore from "@/hooks/use-auth";
const ProfilePage = () => {
    const {user} = useAuthStore()

    const profileData = {
        name: user.username,
        handle: user.username,
        bio: user.bio,
        location: user.location,
        coverImage: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=1600&h=400&fit=crop",
        avatar: user.avatar,
    };

    const reputationData = {
        level: 8,
        currentKarma: 2450,
        nextLevelKarma: 3000,
        dayStreak: 12,
        satsEarned: 250000,
        completedOpportunities: 18,
        badges: [
            { name: "Starter Path", icon: "🚀" },
            { name: "Campus Speaker", icon: "🎓" },
            { name: "Bitcoin Park Volunteer", icon: "🏛️" },
            { name: "Verified Organizer", icon: "✓" },
            { name: "Artist", icon: "🎨" },
            { name: "Sat Stacker", icon: "₿" },
        ],
    };

    const links = [
        { name: "Personal Site", url: "#", icon: "🌐" },
        { name: "Twitter", url: "#", icon: "𝕏" },
        { name: "Nostr", url: "#", icon: "⚡" },
        { name: "GitHub", url: "#", icon: "💻" },
    ];

    return <>
    <Header/>
        <div className="min-h-screen bg-background">
            {/* Hero */}
            <ProfileHero roles={[]} {...profileData} isOwner={false} />

            {/* Main Content */}
            <div className="container mx-auto px-4 md:px-8 py-8 space-y-8">
                {/* Reputation Strip */}
                <ReputationStrip {...reputationData} />

                {/* Links Strip */}
                <LinksStrip links={links} />

                {/* Two Column Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Main Content - Tabs */}
                    <div className="lg:col-span-8">
                        <ProfileTabs />
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-4 space-y-4">
                        <TipCard />
                        <ContactCard />
                    </div>
                </div>
            </div>
        </div>
    </>
};

export default ProfilePage;
