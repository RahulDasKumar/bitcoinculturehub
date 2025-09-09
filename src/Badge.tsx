"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Play, Download, Copy, Share, Zap, Upload } from "lucide-react"
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion"
import Header from "@/components/Header";

export default function BitcoinCultureHub() {
    const navigate = useNavigate()
    const [xp, setXp] = useState(0)
    const [selectedSubs, setSelectedSubs] = useState<Record<string, Set<string>>>({})
    const [openInterest, setOpenInterest] = useState<string | null>(null)
    const [showCelebration, setShowCelebration] = useState(false)
    const [dialogOpen, setDialogOpen] = useState(false)
    const [dialogType, setDialogType] = useState<"profile" | "quiz">("profile")

    const interestCategories = {
        Bitcoin: ["Investments", "Technology", "Regulation"],
        DeFi: ["L2", "DEXs", "Lending"],
        Art: ["Ordinals", "NFTs", "Creator royalties"],
        History: ["World", "Internet", "Mythology"],
        "Philosophy + Ideas": ["Ethics", "Politics", "Science"],
        "Community/Movements": ["Trending", "Local groups", "Conferences", "Student groups"],
        "Media/Entertainment": ["Podcasts", "Films", "Sports"],
        "Lifestyle/Wellness": ["Health", "Travel", "Food"],
        "Future/Frontier": ["Space", "AI", "VR/AR"],
        "Economics & Markets": ["Macro", "On-chain", "Trading"],
    }

    const themePresets = {
        default: "from-primary/20 to-accent/20",
        bitcoin: "from-orange-500/30 to-yellow-500/20",
        cyber: "from-cyan-500/30 to-blue-500/20",
    }

    const toggleSubChoice = (category: string, subChoice: string) => {
        const currentSubs = selectedSubs[category] || new Set()
        const newSubs = new Set(currentSubs)

        if (newSubs.has(subChoice)) {
            newSubs.delete(subChoice)
            setXp(Math.max(0, xp - 10))
        } else {
            newSubs.add(subChoice)
            setXp(xp + 10)
        }

        setSelectedSubs({
            ...selectedSubs,
            [category]: newSubs,
        })
    }

    const handleCategoryClick = (category: string) => {
        setOpenInterest(openInterest === category ? null : category)
    }

    const getTotalSelected = () => {
        return Object.values(selectedSubs).reduce((total, subs) => total + subs.size, 0)
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Escape" && openInterest) {
            setOpenInterest(null)
        }
    }

    const scrollToId = (id: string) => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" })
    }

    const scrollToVideo = () => {
        scrollToId("video-section")
    }

    const scrollToInterests = () => {
        scrollToId("interests-section")
        setDialogOpen(false)
    }

    const scrollToProfile = () => {
        scrollToId("profile-card-section")
        setDialogOpen(false)
    }

    const openQuizDialog = () => {
        setDialogType("quiz")
        setDialogOpen(true)
    }

    const openProfileDialog = () => {
        setDialogType("profile")
        setDialogOpen(true)
    }

    const handleQuizNavigation = () => {
        try {
            navigate("/quiz")
        } catch (error) {
            console.warn("Quiz route not found - /quiz route needs to be created")
            setDialogOpen(false)
        }
    }

    const triggerCelebration = () => {
        setXp(xp + 50)
        setShowCelebration(true)
        setTimeout(() => setShowCelebration(false), 3000)
    }

    const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onload = (e) => {
                setProfileData({ ...profileData, avatar: e.target?.result as string })
            }
            reader.readAsDataURL(file)
        }
    }

    const [profileData, setProfileData] = useState({
        username: "",
        displayName: "",
        bio: "",
        role: "",
        location: "",
        website: "",
        twitterHandle: "",
        achievements: "",
        alignment: [50],
        theme: "default",
        tagline: "",
        favoriteMeme: "",
        platform: "",
        avatar: "",
    })

    return (
        <div className="min-h-screen bg-background text-foreground" onKeyDown={handleKeyDown}>
            {/* XP Counter */}
            <Header/>
            <div className="fixed top-4 right-4 z-50">
                <Badge variant="secondary" className="text-lg px-4 py-2 glow-hover">
                    <Zap className="w-4 h-4 mr-2" />
                    {xp} XP
                </Badge>
            </div>

            <TooltipProvider>
                <section className="relative isolate bitcoin-gradient pt-6 sm:pt-8 lg:pt-10 pb-10 sm:pb-12">
                    <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 max-h-[92vh]">
                        <div className="flex justify-center mb-3 sm:mb-4 lg:mb-5">
                            <div className="w-16 sm:w-20 md:w-24 lg:w-28 xl:w-28 h-auto mx-auto relative z-10">
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Card
                                            className="cursor-pointer transition-all duration-300 hover:scale-105 rounded-[28px] bg-gradient-to-br from-orange-600/85 via-orange-800/85 to-[#0e0e0e]/85 border-2 border-accent/50 shadow-[0_0_18px_rgba(0,255,204,0.25)] overflow-hidden animate-spin-twice relative"
                                            onClick={openProfileDialog}
                                            role="button"
                                            aria-label="Create your card"
                                            tabIndex={0}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter" || e.key === " ") {
                                                    e.preventDefault()
                                                    openProfileDialog()
                                                }
                                            }}
                                        >
                                            <div className="absolute inset-0 bg-accent/20 blur-[12px] opacity-35 -z-10"></div>
                                            <CardContent className="p-0 relative">
                                                <img
                                                    src="/cards/saylor-card.png"
                                                    alt="Michael Saylor Bitcoin Culture Card - Create your own"
                                                    className="w-full h-auto"
                                                    loading="lazy"
                                                    onError={(e) => {
                                                        e.currentTarget.src =
                                                            "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Saylor%20Card-Oem8pMpQRJ7JKibmq4qZQFIu0LRuKe.png"
                                                    }}
                                                />
                                            </CardContent>
                                        </Card>
                                    </TooltipTrigger>
                                    <TooltipContent side="top" className="shadow-lg ring-2 ring-accent/20">
                                        <p>Create your card</p>
                                    </TooltipContent>
                                </Tooltip>
                            </div>
                        </div>

                        <div className="relative z-20 text-center max-w-4xl mx-auto px-4">
                            <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold mb-6 float-animation leading-[1.05]">
                                The First Place Where <span className="text-primary">Bitcoin Culture</span> Lives
                            </h1>
                            <p className="mt-4 text-base sm:text-lg lg:text-xl text-white/85 max-w-3xl mx-auto">
                                Connect with Bitcoiners, share your passions, earn XP, and create your cultural identity.
                            </p>
                            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                                <Button size="lg" className="glow-hover text-lg px-8 py-4" onClick={openQuizDialog}>
                                    Take The Quiz
                                </Button>
                                <Button
                                    variant="outline"
                                    size="lg"
                                    onClick={scrollToVideo}
                                    className="text-lg px-8 py-4 border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent"
                                >
                                    <Play className="w-5 h-5 mr-2" />
                                    Watch Video
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>
            </TooltipProvider>

            {/* Video Embed Section */}
            <section id="video-section" className="py-20 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="relative aspect-video bg-card rounded-lg border-2 border-accent glow-hover mb-6">
                        <div className="absolute inset-0 flex items-center justify-center">
                            <Play className="w-20 h-20 text-accent" />
                        </div>
                    </div>
                </div>
            </section>

            <section id="interests-section" className="py-20 px-4 bg-card/50">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-4xl font-bold text-center mb-12">
                        What Interests You in <span className="text-primary">Bitcoin Culture</span>?
                    </h2>

                    <motion.div
                        className="grid gap-4 sm:gap-5 md:gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-5"
                        data-int-grid
                        layout
                    >
                        {Object.entries(interestCategories).map(([category, subChoices]) => {
                            const isOpen = openInterest === category
                            const selected = Array.from(selectedSubs[category] ?? [])

                            return (
                                <div key={category} className="relative" data-interest-item>
                                    <Button
                                        variant="outline"
                                        className="h-auto py-4 px-6 rounded-full transition-all duration-300 hover:scale-105 bg-transparent w-full"
                                        onClick={() => handleCategoryClick(category)}
                                        aria-expanded={openInterest === category}
                                        aria-controls={`chips-${category.toLowerCase().replace(/[^a-z0-9]/g, "-")}`}
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter" || e.key === " ") {
                                                e.preventDefault()
                                                handleCategoryClick(category)
                                            }
                                            if (e.key === "Escape") {
                                                setOpenInterest(null)
                                            }
                                        }}
                                    >
                                        {category}
                                    </Button>

                                    {!isOpen && selected.length > 0 && (
                                        <div className="mt-1.5 flex flex-wrap gap-1.5 justify-center">
                                            {selected.map((s) => (
                                                <span key={s} className="px-2 py-0.5 text-xs rounded-full border border-border/60 bg-card/70">
                                                    {s}
                                                </span>
                                            ))}
                                        </div>
                                    )}

                                    <AnimatePresence>
                                        {isOpen && (
                                            <motion.div
                                                key={category}
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: "auto" }}
                                                exit={{ opacity: 0, height: 0 }}
                                                transition={{ duration: 0.18, ease: "easeOut" }}
                                                className="mt-2 overflow-hidden"
                                            >
                                                <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-accent/30 rotate-45 rounded-[2px]"></div>

                                                <div
                                                    className="mt-2 flex flex-wrap items-center gap-2 pl-2 pr-2"
                                                    id={`chips-${category.toLowerCase().replace(/[^a-z0-9]/g, "-")}`}
                                                    role="group"
                                                    aria-label={`${category} sub-categories`}
                                                >
                                                    {subChoices.map((subChoice) => {
                                                        const isSelected = selectedSubs[category]?.has(subChoice) || false
                                                        return (
                                                            <button
                                                                key={subChoice}
                                                                className={`px-3 py-1.5 rounded-full text-sm border transition-all duration-200 ${isSelected
                                                                        ? "bg-primary text-primary-foreground border-primary"
                                                                        : "border-border/70 bg-card/70 hover:border-accent hover:bg-accent/10"
                                                                    }`}
                                                                onClick={() => toggleSubChoice(category, subChoice)}
                                                                aria-pressed={isSelected}
                                                                onKeyDown={(e) => {
                                                                    if (e.key === "Enter" || e.key === " ") {
                                                                        e.preventDefault()
                                                                        toggleSubChoice(category, subChoice)
                                                                    }
                                                                    if (e.key === "Escape") {
                                                                        setOpenInterest(null)
                                                                    }
                                                                }}
                                                            >
                                                                {subChoice}
                                                            </button>
                                                        )
                                                    })}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            )
                        })}
                    </motion.div>

                    {getTotalSelected() > 0 && (
                        <div className="mt-6 sm:mt-8 flex justify-center">
                            <Button onClick={openQuizDialog} size="lg" className="px-8 glow-hover">
                                Continue
                            </Button>
                        </div>
                    )}
                </div>
            </section>

            <section id="profile-card-section" className="py-20 px-4 bg-card/30">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-4xl font-bold text-center mb-12">
                        Create Your <span className="text-primary">Profile Card</span>
                    </h2>
                    <div className="grid lg:grid-cols-2 gap-12 items-start">
                        {/* Form */}
                        <Card className="bg-card border-border">
                            <CardHeader>
                                <CardTitle>Customize Your Identity</CardTitle>
                                <CardDescription>Fill out your details to create your unique Bitcoin culture card</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div>
                                    <Label htmlFor="avatar">Avatar Upload</Label>
                                    <div className="flex items-center gap-4">
                                        <Input
                                            id="avatar"
                                            type="file"
                                            accept="image/*"
                                            onChange={handleAvatarUpload}
                                            className="bg-input border-border"
                                        />
                                        <Upload className="w-4 h-4 text-muted-foreground" />
                                    </div>
                                </div>

                                <div>
                                    <Label htmlFor="displayName">Display Name</Label>
                                    <Input
                                        id="displayName"
                                        value={profileData.displayName}
                                        onChange={(e) => setProfileData({ ...profileData, displayName: e.target.value })}
                                        placeholder="Satoshi Nakamoto"
                                        className="bg-input border-border"
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="username">Username</Label>
                                    <Input
                                        id="username"
                                        value={profileData.username}
                                        onChange={(e) => setProfileData({ ...profileData, username: e.target.value })}
                                        placeholder="satoshi_nakamoto"
                                        className="bg-input border-border"
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="bio">Bio</Label>
                                    <Textarea
                                        id="bio"
                                        value={profileData.bio}
                                        onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                                        placeholder="Tell us about yourself..."
                                        className="bg-input border-border resize-none"
                                        rows={3}
                                    />
                                    <div className="text-xs text-muted-foreground mt-1">{profileData.bio.length}/280 characters</div>
                                </div>

                                <div>
                                    <Label htmlFor="role">Role</Label>
                                    <Select
                                        value={profileData.role}
                                        onValueChange={(value) => setProfileData({ ...profileData, role: value })}
                                    >
                                        <SelectTrigger className="bg-input border-border">
                                            <SelectValue placeholder="Select your role" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Student">Student</SelectItem>
                                            <SelectItem value="Professional">Professional</SelectItem>
                                            <SelectItem value="Creator">Creator</SelectItem>
                                            <SelectItem value="Developer">Developer</SelectItem>
                                            <SelectItem value="Researcher">Researcher</SelectItem>
                                            <SelectItem value="Other">Other</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <Label htmlFor="location">Location</Label>
                                        <Input
                                            id="location"
                                            value={profileData.location}
                                            onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
                                            placeholder="San Francisco, CA"
                                            className="bg-input border-border"
                                        />
                                    </div>

                                    <div>
                                        <Label htmlFor="website">Website</Label>
                                        <Input
                                            id="website"
                                            value={profileData.website}
                                            onChange={(e) => setProfileData({ ...profileData, website: e.target.value })}
                                            placeholder="https://yoursite.com"
                                            className="bg-input border-border"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <Label htmlFor="twitterHandle">X (Twitter) Handle</Label>
                                    <Input
                                        id="twitterHandle"
                                        value={profileData.twitterHandle}
                                        onChange={(e) => setProfileData({ ...profileData, twitterHandle: e.target.value })}
                                        placeholder="@yourusername"
                                        className="bg-input border-border"
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="achievements">Achievements (comma-separated)</Label>
                                    <Input
                                        id="achievements"
                                        value={profileData.achievements}
                                        onChange={(e) => setProfileData({ ...profileData, achievements: e.target.value })}
                                        placeholder="Bitcoin Maximalist, HODL Master, Lightning Expert"
                                        className="bg-input border-border"
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="alignment">Bitcoin Alignment (0-100)</Label>
                                    <Slider
                                        id="alignment"
                                        min={0}
                                        max={100}
                                        step={1}
                                        value={profileData.alignment}
                                        onValueChange={(value) => setProfileData({ ...profileData, alignment: value })}
                                        className="mt-2"
                                    />
                                    <div className="text-sm text-muted-foreground mt-1">Current: {profileData.alignment[0]}%</div>
                                </div>

                                <div>
                                    <Label htmlFor="theme">Theme</Label>
                                    <Select
                                        value={profileData.theme}
                                        onValueChange={(value) => setProfileData({ ...profileData, theme: value })}
                                    >
                                        <SelectTrigger className="bg-input border-border">
                                            <SelectValue placeholder="Select theme" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="default">Default</SelectItem>
                                            <SelectItem value="bitcoin">Bitcoin Orange</SelectItem>
                                            <SelectItem value="cyber">Cyber Blue</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div>
                                    <Label htmlFor="tagline">Tagline</Label>
                                    <Input
                                        id="tagline"
                                        value={profileData.tagline}
                                        onChange={(e) => setProfileData({ ...profileData, tagline: e.target.value })}
                                        placeholder="HODL to the moon 🚀"
                                        className="bg-input border-border"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="meme">Favorite Meme</Label>
                                    <Input
                                        id="meme"
                                        value={profileData.favoriteMeme}
                                        onChange={(e) => setProfileData({ ...profileData, favoriteMeme: e.target.value })}
                                        placeholder="Diamond Hands"
                                        className="bg-input border-border"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="platform">Favorite Platform</Label>
                                    <Input
                                        id="platform"
                                        value={profileData.platform}
                                        onChange={(e) => setProfileData({ ...profileData, platform: e.target.value })}
                                        placeholder="Twitter"
                                        className="bg-input border-border"
                                    />
                                </div>

                                <Button onClick={triggerCelebration} className="w-full glow-hover">
                                    Complete Profile
                                </Button>
                            </CardContent>
                        </Card>

                        <div className="sticky top-8">
                            <div className="w-full rounded-2xl overflow-hidden border-2 border-accent/40 glow-hover bg-gradient-to-br from-orange-500/10 to-transparent">
                                <img
                                    className="w-full h-auto object-cover"
                                    src="/cards/saylor-card.png"
                                    alt="Michael Saylor profile card example - Your card will look similar"
                                    loading="lazy"
                                    onError={(e) => {
                                        e.currentTarget.src =
                                            "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Saylor%20Card-Oem8pMpQRJ7JKibmq4qZQFIu0LRuKe.png"
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="card-congrats-section" className="py-20 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl font-bold mb-4">Congrats, your card is ready 🎉</h2>
                    <p className="text-xl text-muted-foreground mb-8">Share your Bitcoin culture identity with the world</p>

                    <div className="flex flex-wrap justify-center gap-4 mb-12">
                        <Button className="glow-hover">
                            <Share className="w-4 h-4 mr-2" />
                            Share to X
                        </Button>
                        <Button variant="outline">
                            <Copy className="w-4 h-4 mr-2" />
                            Copy Link
                        </Button>
                        <Button variant="outline">
                            <Download className="w-4 h-4 mr-2" />
                            Download PNG
                        </Button>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        {/* Jack Mallers Card */}
                        <Card className="bg-gradient-to-br from-orange-600/30 to-orange-800/20 border-2 border-orange-500/50 glow-hover relative overflow-hidden">
                            <CardContent className="p-0">
                                <img
                                    src="/cards/jack-card.png"
                                    alt="Jack Mallers Bitcoin Culture Card"
                                    className="w-full h-auto"
                                    loading="lazy"
                                    onError={(e) => {
                                        e.currentTarget.src =
                                            "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Jack%20Card-oZuBybjwv6Y43Mb0217vem2sAxgaG3.png"
                                    }}
                                />
                            </CardContent>
                        </Card>

                        {/* Ella Hough Card */}
                        <Card className="bg-gradient-to-br from-orange-600/30 to-orange-800/20 border-2 border-orange-500/50 glow-hover relative overflow-hidden">
                            <CardContent className="p-0">
                                <img
                                    src="/cards/ella-card.png"
                                    alt="Ella Hough Bitcoin Culture Card"
                                    className="w-full h-auto"
                                    loading="lazy"
                                    onError={(e) => {
                                        e.currentTarget.src =
                                            "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Ella%20Card-zOgyW6R0Uv1HljvEoEws8zyACBo73J.png"
                                    }}
                                />
                            </CardContent>
                        </Card>

                        {/* Pepenardo Card */}
                        <Card className="bg-gradient-to-br from-emerald-600/30 to-emerald-800/20 border-2 border-emerald-500/50 glow-hover relative overflow-hidden">
                            <CardContent className="p-0">
                                <img
                                    src="/cards/pepenardo-card.png"
                                    alt="Pepenardo Bitcoin Culture Card"
                                    className="w-full h-auto"
                                    loading="lazy"
                                    onError={(e) => {
                                        e.currentTarget.src =
                                            "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Pepenardo%20Card-cR3VYx26uFsbjQLQ3d2oqtUZFYxvWi.png"
                                    }}
                                />
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogContent>
                    <DialogHeader className="text-center">
                        <DialogTitle>{dialogType === "quiz" ? "Culture Identity Quiz" : "Your Profile Card"}</DialogTitle>
                        <DialogDescription>
                            {dialogType === "quiz"
                                ? "Answer a few questions to find your Bitcoin Culture Identity."
                                : "Fill out your details to create your unique Bitcoin culture card"}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex gap-2">
                        <Button onClick={dialogType === "quiz" ? handleQuizNavigation : scrollToProfile} className="flex-1">
                            {dialogType === "quiz" ? "Take The Quiz Now" : "Create Your Profile Card"}
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>

            {showCelebration && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <Card className="bg-card border-primary border-2 glow-hover max-w-md mx-4">
                        <CardContent className="p-8 text-center">
                            <h3 className="text-3xl font-bold mb-4">Achievement Unlocked!</h3>
                            <p className="text-xl mb-6">+50 XP for completing signup 🎉</p>
                            <div className="text-6xl mb-6">🎊</div>
                            <Button
                                onClick={() => {
                                    setShowCelebration(false)
                                    scrollToId("card-congrats-section")
                                }}
                                className="glow-hover"
                            >
                                View My Card
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            )}
        </div>
    )
}
