import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import useAuthStore from "@/hooks/use-auth"
import Header from "@/components/Header"
import { useBookmarkStore } from "@/hooks/use-bookmark"


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
    const {bookmarks} = useBookmarkStore();
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
                                <h2 className="text-lg font-semibold text-center">
                                    Community and Events (social media feed)
                                </h2>

                                {bookmarks.length === 0 ? (
                                    <p className="text-center text-muted-foreground text-sm">
                                        No items yet — bookmark something to see it here!
                                    </p>
                                ) : (
                                    <div
                                        className={`space-y-4 ${bookmarks.length > 3 ? "max-h-72 overflow-y-auto pr-2" : ""
                                            }`}
                                    >
                                        {bookmarks.map((item, index) => (
                                            <div
                                                key={index}
                                                className="p-4 border border-border rounded-lg"
                                            >
                                                <div className="flex items-center justify-between mb-2">
                                                    <div className="font-medium text-sm">{item.title}</div>
                                                    <span className="text-xs bg-muted px-2 py-0.5 rounded">
                                                        {item.itemType}
                                                    </span>
                                                </div>

                                                {item.tags?.length > 0 && (
                                                    <div className="flex flex-wrap gap-2 mb-2">
                                                        {item.tags.map((tag, i) => (
                                                            <span
                                                                key={i}
                                                                className="text-xs bg-secondary text-secondary-foreground px-2 py-0.5 rounded-full"
                                                            >
                                                                #{tag}
                                                            </span>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}
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
