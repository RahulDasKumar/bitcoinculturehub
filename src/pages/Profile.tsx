import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import useAuthStore from "@/hooks/use-auth"
import Header from "@/components/Header"


const archetypes = [
    {
        emoji: "🌟",
        name: "Luminary",
        subtitle: "The Guide",
        description: "Inspires clarity and direction; shines light through truth and education, not control.",
        percentage: 35,
    },
    {
        emoji: "🔨",
        name: "Forger",
        subtitle: "The Maker",
        description: "Builds and iterates; progress comes from trial, proof-of-work, and artifacts that shape the future.",
        percentage: 28,
    },
    {
        emoji: "🛡",
        name: "Sentinel",
        subtitle: "The Protector",
        description:
            "Safeguards freedom through vigilance; upholds security, resilience, and decentralization against threats.",
        percentage: 22,
    },
    {
        emoji: "🧭",
        name: "Voyager",
        subtitle: "The Seeker",
        description: "Explores and connects; expands horizons by seeking knowledge, stories, and new cultural frontiers.",
        percentage: 15,
    },
]

export default function Profile() {
    const { user, isLoggedIn, login, logout, updateProfile } = useAuthStore();

    return <>
        <Header></Header>
        <div className="min-h-screen bg-background">
            <div className="max-w-6xl mx-auto px-6 py-12">
                <div className="space-y-8">
                    {/* Top section: Profile card and Community feed */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Profile Card */}
                        <Card className="p-8">
                            <div className="flex flex-col items-center text-center space-y-6">
                                {/* Profile Picture */}
                                <div className="w-32 h-40 border-2 border-border rounded-lg flex items-center justify-center bg-muted">
                                    <Avatar className="w-28 h-28">
                                        <AvatarImage src="/bitcoin-enthusiast-profile-picture.jpg" alt="Profile" />
                                        <AvatarFallback className="text-2xl font-semibold bg-primary text-primary-foreground">
                                        </AvatarFallback>
                                    </Avatar>
                                </div>

                                {/* Name */}
                                <div className="space-y-1">
                                    <h1 className="text-xl font-semibold text-balance">{user.username}</h1>
                                </div>
                            </div>
                        </Card>

                        {/* Community Feed */}
                        <Card className="p-8">
                            <div className="space-y-6">
                                <h2 className="text-lg font-semibold text-center">Community and Events (social media feed)</h2>

                                <div className="space-y-4">
                                    <div className="p-4 border border-border rounded-lg">
                                        <div className="flex items-center gap-3 mb-2">
                                            <div className="w-8 h-8 bg-primary rounded-full"></div>
                                            <div>
                                                <div className="font-medium text-sm">Bitcoin Conference 2024</div>
                                                <div className="text-xs text-muted-foreground">2 hours ago</div>
                                            </div>
                                        </div>
                                        <p className="text-sm text-foreground">
                                            Join us for the biggest Bitcoin event of the year! Speakers include industry leaders discussing
                                            the future of decentralized finance.
                                        </p>
                                    </div>

                                    <div className="p-4 border border-border rounded-lg">
                                        <div className="flex items-center gap-3 mb-2">
                                            <div className="w-8 h-8 bg-accent rounded-full"></div>
                                            <div>
                                                <div className="font-medium text-sm">Lightning Network Update</div>
                                                <div className="text-xs text-muted-foreground">5 hours ago</div>
                                            </div>
                                        </div>
                                        <p className="text-sm text-foreground">
                                            New Lightning Network improvements are rolling out, making Bitcoin transactions faster and cheaper
                                            than ever.
                                        </p>
                                    </div>

                                    <div className="p-4 border border-border rounded-lg">
                                        <div className="flex items-center gap-3 mb-2">
                                            <div className="w-8 h-8 bg-secondary rounded-full"></div>
                                            <div>
                                                <div className="font-medium text-sm">Weekly Meetup</div>
                                                <div className="text-xs text-muted-foreground">1 day ago</div>
                                            </div>
                                        </div>
                                        <p className="text-sm text-foreground">
                                            This week's Bitcoin meetup will focus on self-custody best practices and hardware wallet security.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>

                    {/* Bottom section: Archetypes spanning full width */}
                    <Card className="p-8">
                        <div className="space-y-6">
                            <div className="text-center space-y-2">
                                <h2 className="text-xl font-semibold">Bitcoin Archetypes</h2>
                                <p className="text-muted-foreground text-sm">
                                    {"Your personality breakdown within the Bitcoin community"}
                                </p>
                            </div>

                            <div className="space-y-6">
                                {archetypes.map((archetype) => (
                                    <div key={archetype.name} className="space-y-3">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <span className="text-2xl">{archetype.emoji}</span>
                                                <div>
                                                    <div className="font-medium">
                                                        {archetype.name} — {archetype.subtitle}
                                                    </div>
                                                    <div className="text-sm text-muted-foreground text-pretty">{archetype.description}</div>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="font-semibold text-lg">{archetype.percentage}%</div>
                                            </div>
                                        </div>
                                        <Progress value={archetype.percentage} className="h-2" />
                                    </div>
                                ))}
                            </div>

                            <div className="pt-4 border-t border-border">
                                <div className="text-center text-sm text-muted-foreground">
                                    {"Based on your activity, posts, and interactions within the Bitcoin community"}
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    </>
}
