"use client"

import { Button } from "@/components/ui/button"
import {
    User,
    Shield,
    Users,
    Star,
    Castle,
    UserCircle,
    SortDesc as Fortress,
    Hammer,
    Eye,
    ShieldCheck,
} from "lucide-react"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Header from "./components/Header"

export default function HomePage() {
    const [showPulse, setShowPulse] = useState(false)
    const navigate = useNavigate()
    const handleLoginNavigation = () => {
        try {
            navigate("/register")
        } catch (error) {
            console.warn("Quiz route not found - /quiz route needs to be created")
            setDialogOpen(false)
        }
    }
    useEffect(() => {
        const timer = setTimeout(() => {
            setShowPulse(true)
        }, 3000)
        return () => clearTimeout(timer)
    }, [])

    return (
        <div className="min-h-screen">
            {/* Sticky Header with Logo, Navigation, and Profile Icon */}
           <Header/>
            <div className="bg-orange-500 bg-gradient-to-br from-orange-400 via-orange-500 to-amber-600 min-h-screen">
                {/* Hero Section */}
                <div className="container mx-auto px-6 py-16">
                    <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
                        {/* Left Column - Hero Text */}
                        <div className="space-y-8">
                            <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight text-balance drop-shadow-lg">
                                Find Your <span className="text-gray-900">Bitcoin</span> <span className="text-gray-900">Tribe</span>
                            </h1>

                            <p className="text-xl text-white leading-relaxed max-w-lg drop-shadow-sm">
                                Bitcoin isn't just money. It's a culture. Discover your House, claim your card, and belong.
                            </p>

                            <div className="space-y-6 mt-12">
                                    <Button
                                        className={`
                      bg-white text-orange-600 hover:bg-gray-50 
                      px-8 py-4 h-14 text-lg font-bold 
                      rounded-full w-full sm:w-auto min-w-[280px]
                      hover:scale-105 hover:shadow-2xl hover:shadow-white/25
                      transition-all duration-300 ease-out
                      border-2 border-white}
                    `}
                                        onClick={handleLoginNavigation}
                                    >
                                        Sign Up
                                    </Button>

                                <div className="text-center sm:text-left">
                                    {/* <Link
                                        href="/demo"
                                        className="text-white hover:text-gray-100 text-sm underline underline-offset-2 transition-colors drop-shadow-sm"
                                    >
                                        Watch 30s demo
                                    </Link> */}
                                </div>
                            </div>
                        </div>

                        {/* Right Column - Floating Archetype Card */}
                        <div className="flex justify-center lg:justify-end">
                            <div className="relative animate-bounce-slow">
                                <div className="w-64 bg-gradient-to-br from-white to-gray-100 rounded-2xl p-6 shadow-2xl hover:scale-105 hover:rotate-1 transition-all duration-300 border border-gray-200">
                                    <div className="h-full flex flex-col">
                                        <div className="text-center mb-4">
                                            <div className="text-lg font-bold text-orange-600">Level 3</div>
                                            <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                                                <div className="bg-orange-500 h-2 rounded-full w-4/5 transition-all duration-1000"></div>
                                            </div>
                                        </div>

                                        <div className="flex-1 flex flex-col items-center justify-center space-y-4">
                                            {/* Image container */}
                                            <div className="w-1/2">
                                                <img
                                                    src="images/Grey-Profile-Card.png"
                                                    alt="Grey-Profile-Card"
                                                    className="w-full h-auto"
                                                />
                                            </div>

                                            {/* Text content */}
                                            <div className="text-center">
                                                <h3 className="font-bold text-xl text-gray-900">THE SCHOLAR</h3>
                                                <p className="text-sm text-gray-600 mt-1">Knowledge Seeker</p>
                                                <p className="text-xs text-orange-600 font-medium mt-2">HOUSE WISDOM</p>
                                            </div>
                                        </div>

                                        <div className="flex justify-center">
                                            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                                                <Castle className="w-5 h-5 text-white" />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="absolute -inset-4 bg-gradient-to-r from-orange-400/20 to-purple-400/20 rounded-3xl blur-xl -z-10"></div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <div className="bg-white py-16">
                <div className="container mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        {/* Left Column - Stacked Content */}
                        <div className="space-y-8">
                            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900">Your Profile is Your Key</h2>

                            {/* Block 1 - Connect */}
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                                    <Users className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">Connect</h3>
                                    <p className="text-gray-600">Meet people in your House, online and IRL.</p>
                                </div>
                            </div>

                            {/* Block 2 - Earn Reputation */}
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                                    <Star className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">Earn Reputation</h3>
                                    <p className="text-gray-600">Build XP from games, referrals, and contributions.</p>
                                </div>
                            </div>

                            {/* Block 3 - Stay Private */}
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                                    <Shield className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">Stay Private</h3>
                                    <p className="text-gray-600">Pseudonymous by default. You decide what's public.</p>
                                </div>
                            </div>

                            {/* CTA Button */}
                            <div className="pt-4">
                                    <Button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 h-14 text-lg font-bold rounded-full"
                                    onClick={handleLoginNavigation}
                                    >
                                        Sign Up
                                    </Button>
                            </div>
                        </div>

                        {/* Right Column - Video Placeholder */}
                        <div className="flex justify-center lg:justify-end">
                            <div className="w-full max-w-lg">
                                <div className="aspect-video bg-gray-900 rounded-2xl shadow-2xl flex items-center justify-center relative overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-purple-500/20"></div>
                                    <div className="relative z-10 text-center">
                                        <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-4 mx-auto">
                                            <div className="w-0 h-0 border-l-[12px] border-l-white border-y-[8px] border-y-transparent ml-1"></div>
                                        </div>
                                        <p className="text-white/80 text-sm">Video Coming Soon</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Layer 1: Proof / Stats Band */}
            <div className="bg-slate-900 py-12 lg:py-14">
                <div className="container mx-auto px-6">
                    <div className="text-center">
                        <div className="text-white/80 text-xl lg:text-2xl leading-relaxed">
                            <span className="font-semibold text-white">12,847</span> cards created •{" "}
                            <span className="font-semibold text-white">127</span> campuses •{" "}
                            <span className="font-semibold text-white">89%</span> connected
                        </div>
                    </div>
                </div>
            </div>

            {/* Houses, Archetypes, Citadels Section */}
            <div className="bg-white py-20 lg:py-24">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Foundations of Your Identity</h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {/* Card 1 - Houses */}
                        <div className="group">
                            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-orange-200 relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-orange-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                <div className="relative z-10 text-center space-y-6">
                                    <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg group-hover:scale-110 transition-transform duration-300">
                                        <Castle className="w-8 h-8 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-gray-900 mb-4">Houses</h3>
                                        <p className="text-gray-600 leading-relaxed">
                                            Tribes of belonging and shared values. Your cultural anchor online and IRL.
                                        </p>
                                    </div>
                                </div>
                                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-orange-400/20 to-orange-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl -z-10"></div>
                            </div>
                        </div>

                        {/* Card 2 - Archetypes */}
                        <div className="group">
                            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-purple-200 relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                <div className="relative z-10 text-center space-y-6">
                                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg group-hover:scale-110 transition-transform duration-300">
                                        <UserCircle className="w-8 h-8 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-gray-900 mb-4">Archetypes</h3>
                                        <p className="text-gray-600 leading-relaxed">
                                            Ways of identifying and evolving in Bitcoin culture, shaping how you contribute.
                                        </p>
                                    </div>
                                </div>
                                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-400/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl -z-10"></div>
                            </div>
                        </div>

                        {/* Card 3 - Citadels */}
                        <div className="group">
                            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-green-200 relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-green-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                <div className="relative z-10 text-center space-y-6">
                                    <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg group-hover:scale-110 transition-transform duration-300">
                                        <Fortress className="w-8 h-8 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-gray-900 mb-4">Citadels</h3>
                                        <p className="text-gray-600 leading-relaxed">
                                            Local hubs where Houses and Archetypes converge—spaces for security, creation, kinship, and lore.
                                        </p>
                                    </div>
                                </div>
                                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-green-400/20 to-green-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl -z-10"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Comprehensive Footer */}
            <footer className="bg-gray-950 py-12">
                <div className="container mx-auto px-6">
                    <div className="grid md:grid-cols-4 gap-8">
                        {/* Logo & Tagline */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                                    <span className="text-white font-bold text-sm">₿</span>
                                </div>
                                <span className="text-xl font-bold text-white">Bitcoin Culture Hub</span>
                            </div>
                            <p className="text-gray-400 text-sm">The first place where Bitcoin culture lives and thrives.</p>
                        </div>

                        {/* Product */}
                        <div>
                            <h4 className="text-white font-semibold mb-4">Product</h4>
                            <ul className="space-y-2">
                                <li>
                                    {/* <Link href="/about" className="text-gray-400 hover:text-white text-sm">
                                        About
                                    </Link> */}
                                </li>
                            </ul>
                        </div>

                        {/* Community */}
                        <div>
                            <h4 className="text-white font-semibold mb-4">Community</h4>
                            <ul className="space-y-2">
                                <li>
                                    <a
                                        href="https://twitter.com"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-gray-400 hover:text-white text-sm"
                                    >
                                        Twitter/X
                                    </a>
                                </li>
                            </ul>
                        </div>

                        {/* Newsletter */}
                        <div>
                            <h4 className="text-white font-semibold mb-4">Stay Updated</h4>
                            <div className="space-y-3">
                                <div className="flex">
                                    <input
                                        type="email"
                                        placeholder="Enter your email"
                                        className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-l-lg text-white text-sm focus:outline-none focus:border-orange-500"
                                    />
                                    <Button className="bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-r-lg text-sm">
                                        Subscribe
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-gray-400 text-sm">
                            © {new Date().getFullYear()} Bitcoin Culture Hub. All rights reserved.
                        </p>
                        <div className="flex gap-6">
                            {/* <Link href="/terms" className="text-gray-400 hover:text-white text-sm">
                                Terms
                            </Link>
                            <Link href="/privacy" className="text-gray-400 hover:text-white text-sm">
                                Privacy
                            </Link>
                            <Link href="/contact" className="text-gray-400 hover:text-white text-sm">
                                Contact
                            </Link> */}
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}
function setDialogOpen(arg0: boolean) {
    throw new Error("Function not implemented.")
}

