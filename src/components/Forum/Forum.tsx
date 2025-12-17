import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from './Header';
import { DailyQuestion } from './DailyQuestion';
import { HotTakesCarousel } from './HotTakesCarousel';
import { ChannelFilter } from './ChannelFilter';
import { ThreadCard } from './ThreadCard';
import { Leaderboard } from './Leaderboard';
import { mockThreads } from './mockData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Filter, Search, TrendingUp, Users } from 'lucide-react';

const Forum = () => {
    const navigate = useNavigate();
    const [activeChannel, setActiveChannel] = useState('all');
    const [sortBy, setSortBy] = useState<'hot' | 'new' | 'top'>('hot');
    const [searchQuery, setSearchQuery] = useState('');

    const filteredThreads = mockThreads
        .filter(thread => {
            // Filter by channel
            const channelMatch = activeChannel === 'all' || thread.channel === activeChannel;

            // Filter by search query
            const searchMatch = searchQuery === '' ||
                thread.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                thread.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                thread.author.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
                thread.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

            return channelMatch && searchMatch;
        })
        .sort((a, b) => {
            // Sort by selected criteria
            if (sortBy === 'hot') {
                // Hot: combination of replies, upvotes and sats (engagement)
                const aScore = a.replyCount * 2 + a.upvotes + (a.sats / 1000);
                const bScore = b.replyCount * 2 + b.upvotes + (b.sats / 1000);
                return bScore - aScore;
            } else if (sortBy === 'new') {
                // New: most recent first
                return b.timestamp.getTime() - a.timestamp.getTime();
            } else if (sortBy === 'top') {
                // Top: highest sats
                return b.sats - a.sats;
            }
            return 0;
        });

    return (
        <div className="min-h-screen bg-gradient-subtle">
            <Header />

            <div className="container mx-auto px-4 py-8">
                <div className="space-y-6">
                    {/* Hero Modules */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <DailyQuestion />
                        <HotTakesCarousel />
                    </div>

                    {/* Top Contributors & Community */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Top Contributors */}
                        <Card className="p-4">
                            <h3 className="font-bold mb-3 flex items-center gap-2">
                                <TrendingUp className="h-4 w-4 text-bitcoin-gold" />
                                Top Contributors
                            </h3>
                            <div className="space-y-3">
                                {[
                                    { username: 'satoshi_nakamoto', sats: 210000, streak: 365 },
                                    { username: 'alice_lightning', sats: 150000, streak: 120 },
                                    { username: 'bob_hodler', sats: 95000, streak: 89 },
                                ].map((contributor, index) => (
                                    <div key={contributor.username} className="flex items-center gap-3">
                                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-bitcoin-orange/10 text-bitcoin-orange font-bold text-sm">
                                            {index + 1}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="text-sm font-medium truncate">
                                                {contributor.username}
                                            </div>
                                            <div className="text-xs text-muted-foreground">
                                                {contributor.sats.toLocaleString()} sats • {contributor.streak} day streak
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Card>

                        {/* Community Stats */}
                        <Card className="p-4">
                            <h3 className="font-bold mb-3 flex items-center gap-2">
                                <Users className="h-4 w-4 text-bitcoin-orange" />
                                Community
                            </h3>
                            <div className="space-y-3">
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Active Users</span>
                                    <span className="font-semibold">12,847</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Total Threads</span>
                                    <span className="font-semibold">45,921</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Sats Tipped Today</span>
                                    <span className="font-semibold text-bitcoin-gold">1.2M</span>
                                </div>
                            </div>
                        </Card>
                    </div>

                    {/* Channel Filter */}
                    <div className="pt-4 border-t border-border">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-2xl font-bold">What People Are Talking About</h2>
                            <div className="relative w-72">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input
                                    type="text"
                                    placeholder="Search threads..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-10 bg-surface border-border focus:border-bitcoin-orange"
                                />
                            </div>
                        </div>
                        <ChannelFilter
                            activeChannel={activeChannel}
                            onChannelChange={setActiveChannel}
                        />
                    </div>

                    {/* Threads Section */}
                    <div className="flex items-center justify-between pt-4">
                        <h3 className="text-lg font-semibold text-muted-foreground">
                            {filteredThreads.length} {filteredThreads.length === 1 ? 'thread' : 'threads'}
                            {searchQuery && ` matching "${searchQuery}"`}
                        </h3>
                        <div className="flex items-center gap-2">
                            {(['hot', 'new', 'top'] as const).map((sort) => (
                                <Button
                                    key={sort}
                                    variant={sortBy === sort ? 'default' : 'ghost'}
                                    size="sm"
                                    onClick={() => setSortBy(sort)}
                                    className={sortBy === sort ? 'bg-bitcoin-orange hover:bg-bitcoin-orange/90 text-bitcoin-dark' : ''}
                                >
                                    {sort === 'hot' && '🔥'}
                                    {sort === 'new' && '✨'}
                                    {sort === 'top' && '⭐'}
                                    <span className="ml-1 capitalize">{sort}</span>
                                </Button>
                            ))}
                            <Button variant="ghost" size="icon">
                                <Filter className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>

                    <div className="space-y-4">
                        {filteredThreads.length > 0 ? (
                            filteredThreads.map((thread) => (
                                <ThreadCard
                                    key={thread.id}
                                    thread={thread}
                                    onClick={() => navigate(`/thread/${thread.id}`)}
                                />
                            ))
                        ) : (
                            <div className="text-center py-12">
                                <Search className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
                                <h3 className="text-lg font-semibold mb-2">No threads found</h3>
                                <p className="text-muted-foreground">
                                    {searchQuery
                                        ? `No results for "${searchQuery}". Try different keywords.`
                                        : 'No threads in this channel yet.'}
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Leaderboard */}
                    <div className="mt-8">
                        <Leaderboard />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Forum;
