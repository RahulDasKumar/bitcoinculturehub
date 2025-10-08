"use client"

import { Button } from "@/components/ui/button"
import { SiX } from "react-icons/si"

import {
    User,
    Shield,
    GraduationCapIcon,
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
import Footer from "./components/Footer"

export default function HomePage() {
    const [showPulse, setShowPulse] = useState(false)
    const navigate = useNavigate()
    const handleLoginNavigation = () => {
            navigate("/quiz")
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
                    <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh] justify-items-center">
                        {/* Left Column - Hero Text */}
                        <div className="space-y-8">
                            <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight text-balance drop-shadow-lg">
                                Lifelong Learning<span className="text-gray-900"> with Bitcoin
                                </span>
                            </h1>

                            <p className="text-xl text-white leading-relaxed max-w-lg drop-shadow-sm">
                            A new frontier of learning and belonging. Explore crypto through culture, knowledge, and connection.

                            </p>

                            <div className="space-y-6 mt-12">

                            <Button
                                className={`
                                bg-white text-orange-600 hover:bg-gray-50 
                                px-8 py-4 h-14 text-lg font-bold 
                                rounded-full w-full sm:w-auto min-w-[280px]
                                hover:scale-105 hover:shadow-2xl hover:shadow-white/25
                                transition-all duration-300 ease-out
                                border-2 border-white mx-auto sm:mx-0
                                `}
                                onClick={handleLoginNavigation}
                            >
                                Join Now
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
                            <img
                                src="images/Satoshi_Nakamoto_Emblem_with_Volcano.png"
                                alt="badge"
                                className="relative animate-bounce-slow" 
                            />
                        </div>

                    </div>
                </div>
            </div>

            <div className="bg-white py-16 font-sans">
            <div className="container mx-auto px-6">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 text-center mb-12 ">
            Own Your Future
             </h2>

            {/* Two-column grid */}
            <div className="grid lg:grid-cols-2 gap-12 items-center justify-items-center">
            {/* Left Column - Stacked Content */}
            <div className="space-y-8">
                {/* Block 1 - Learn */}
                <div className="group bg-white p-6 rounded-xl border-2 border-transparent hover:border-orange-300 transition-all duration-300 shadow-md hover:shadow-xl relative overflow-hidden max-w-[500px]">
                <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg transition-transform duration-300 group-hover:scale-110">
                    <GraduationCapIcon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Learn</h3>
                    <p className="text-gray-600">
                        <b>Lifelong mastery</b>. Grow skills, earn recognition, and evolve with your network.
                    </p>
                    </div>
                </div>
                
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-orange-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>

                

                {/* Block 2 - Work */}
                <div className="group bg-white p-6 rounded-xl border-2 border-transparent hover:border-green-300 transition-all duration-300 shadow-md hover:shadow-xl relative overflow-hidden max-w-[500px] group-hover:bg-green-500">
                <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg transition-transform duration-300 group-hover:scale-110">
                    <Star className="w-6 h-6 text-white" />
                    </div>
                    <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Work</h3>
                    <p className="text-gray-600">
                        <b>Identity as opportunity.</b> Access borderless work and collaborate in the new economy.
                    </p>
                    </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-teal-400/10 to-teal-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>

                {/* Block 3 - Save */}
                <div className="group bg-white p-6 rounded-xl border-2 border-transparent hover:border-purple-300 transition-all duration-300 shadow-md hover:shadow-xl relative overflow-hidden max-w-[500px] group-hover:bg-purple-500">
                <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg transition-transform duration-300 group-hover:scale-110">
                    <Shield className="w-6 h-6 text-white" />
                    </div>
                    <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Save</h3>
                    <p className="text-gray-600">
                        <b>Protect your future.</b> Grow and safeguard wealth in the crypto economy.
                    </p>
                    </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-purple-400/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </div>
            </div>

            {/* Right Column - Video */}
            <div className="flex flex-col justify-center lg:justify-end">
                <div className="w-full max-w-lg">
                <video
                    controls
                    className="w-full rounded-2xl shadow-2xl border-2 border-orange-500"
                >
                    <source src="second-video.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                </div>
                <p className="text-gray-600 text-center mt-2">
                <b>Checkout what it means to be part of Bitcoin Culture Hub.</b>
                </p>
            </div>
            </div> 

            {/* CTA button centered below grid */}
            <div className="w-full flex justify-center mt-8">
            <Button
                className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 h-14 text-lg font-bold rounded-full"
                onClick={handleLoginNavigation}
            >
                Join Now
            </Button>
            </div>
        </div>
        </div>


            {/* Layer 1: Proof / Stats Band */}
            <div className="bg-slate-900 py-12 lg:py-14">
                {/* <div className="container mx-auto px-6">
                    <div className="text-center">
                        <div className="text-white/80 text-xl lg:text-2xl leading-relaxed">
                            <span className="font-semibold text-white">12,847</span> cards created •{" "}
                            <span className="font-semibold text-white">127</span> campuses •{" "}
                            <span className="font-semibold text-white">89%</span> connected
                        </div>
                    </div>
                </div> */}
            </div>
            <div className="bg-white py-20 lg:py-24">
                <div className="container mx-auto px-6">
                    {/* Centered Headline */}
                    <div className="text-center mb-12">
                        <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                        The Cultural OS for Bitcoin
                        </h2>
                    </div>

                    {/* Two-Column Layout */}
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-16">
                        {/* Left Column - Mockup Image */}
                        <div className="flex justify-center lg:justify-start">
                        <div className="max-w-lg w-full relative">
                            <img
                            src="images/explore.jpg"
                            alt="Hodloma platform mockup showing campus citadel interface"
                            className="w-full h-auto rounded-2xl shadow-2xl border-2 border-orange-500"
                            />
                            <p className="text-gray-600 text-center mt-2">
                            <b>Every card a piece of history.
                               Every click a new discovery.</b>
                            </p>
                        </div>
                        </div>

                        {/* Right Column - Bulleted Copy */}
                        <div className="space-y-8">
                            {/* Connect */}
                            
                            {/* Connect */}
                            <div className="group bg-white p-6 rounded-xl border-2 border-transparent hover:border-orange-300 transition-all duration-300 shadow-md hover:shadow-xl relative overflow-hidden max-w-[600px]">
                                <div className="flex items-center gap-5">
                                {/* Icon Box — adjusted alignment */}
                                <div className="w-14 h-14 bg-orange-500 rounded-xl flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110 translate-y-[2px]">
                                    <Users className="w-7 h-7 text-white" />
                                </div>

                                {/* Text Block */}
                                <div className="max-w-md">
                                    <h3 className="text-xl font-bold text-gray-900 mb-1">Connect</h3>
                                    <p className="text-gray-600 text-sm leading-relaxed text-sm">
                                    Bridge the gap between students, creators, and builders through a shared cultural network
                                    that brings every corner of Bitcoin together — on campus, online, and beyond.
                                    </p>
                                </div>
                                </div>

                                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-orange-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                            </div>



                            {/* Earn Reputation */}
                            <div className="group bg-white p-6 rounded-xl border-2 border-transparent hover:border-teal-200 transition-all duration-300 shadow-md hover:shadow-xl relative overflow-hidden max-w-[600px]">
                            <div className="flex items-start gap-4">
                                <div className="w-14 h-14 bg-teal-500 rounded-xl flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110 translate-y-[1px]">
                                <Star className="w-7 h-7 text-white" />
                                </div>
                                <div className="max-w-md">
                                <h3 className="text-xl font-bold text-gray-900 mb-2">Explore</h3>
                                <p className="text-gray-600 text-base leading-relaxed text-sm">
                                Dive into thousands of artifacts, creators, and events that define Bitcoin’s story — from art and music to research and innovation — all in one place built to preserve and celebrate Bitcoin culture.
                                </p>
                                </div>
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-br from-teal-400/10 to-teal-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                            </div>

                            {/* Learn */}
                            <div className="group bg-white p-6 rounded-xl border-2 border-transparent hover:border-purple-200 transition-all duration-300 shadow-md hover:shadow-xl relative overflow-hidden max-w-[600px]">
                                <div className="flex items-start gap-4">
                                    <div className="w-14 h-14 bg-purple-500 rounded-xl flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110">
                                    <GraduationCapIcon className="w-7 h-7 text-white" />
                                    </div>
                                    <div className="max-w-md">
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">Learn</h3>
                                    <p className="text-gray-600 text-base leading-relaxed text-sm">
                                    Access resources, club hubs, and collaborative initiatives that help students grow their presence, host events, and amplify Bitcoin education across campuses worldwide.
                                    </p>
                                    </div>
                                </div>
                            <div className="absolute inset-0 bg-gradient-to-br from-purple-400/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                            </div>

                        </div>
                    </div>

                    {/* Centered CTA */}
                    <div className="text-center relative">
                    <div style={{ transform: "translateY(20px)" }}>
                        <Button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 h-14 text-lg font-bold rounded transition-colors duration-200 ease-in-out"
                        onClick={handleLoginNavigation}>
                        Join Waitlist
                        </Button>
                    </div>
                    </div>
                </div>
            </div>
            {/* Layer 1: Proof / Stats Band */}
            <div className="bg-slate-900 py-12 lg:py-14">
                {/* <div className="container mx-auto px-6">
                    <div className="text-center">
                        <div className="text-white/80 text-xl lg:text-2xl leading-relaxed">
                            <span className="font-semibold text-white">12,847</span> cards created •{" "}
                            <span className="font-semibold text-white">127</span> campuses •{" "}
                            <span className="font-semibold text-white">89%</span> connected
                        </div>
                    </div>
                </div> */}
            </div>

            {/* Houses, Archetypes, Citadels Section */}
            <div className="bg-white py-20 lg:py-24">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4"> Foundations of Our Community</h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch content-stretch">
                        {/* Card 1 - Houses */}
                        <div className="group">
                            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-orange-200 relative overflow-hidden flex flex-col justify-between h-full text-center">
                                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-orange-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                <div className="relative z-10 text-center space-y-6">
                                    <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg group-hover:scale-110 transition-transform duration-300">
                                        <Castle className="w-8 h-8 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-gray-900 mb-4">Students</h3>
                                        <p className="text-gray-600 leading-relaxed text-sm">
                                        The next generation of Bitcoin builders. Campus clubs, national networks, and student leaders shaping the cultural and educational heartbeat of Bitcoin
 
                                        </p>
                                    </div>
                                </div>
                                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-orange-400/20 to-orange-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl -z-10 pointer-events-none"></div>
                            </div>
                        </div>

                        {/* Card 2 - Archetypes */}
                        <div className="group">
                            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-purple-200 relative overflow-hidden flex flex-col justify-between h-full text-center">
                                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                <div className="relative z-10 text-center space-y-6">
                                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg group-hover:scale-110 transition-transform duration-300">
                                        <UserCircle className="w-8 h-8 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-gray-900 mb-4">Culture</h3>
                                        <p className="text-gray-600 leading-relaxed text-sm">
                                        Where Bitcoin’s identity lives.  A curated ecosystem of art, artifacts, creators, and events that tell the evolving story of Bitcoin — preserved and celebrated through BCH Explore.
                                        </p>
                                    </div>
                                </div>
                                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-400/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl -z-10 pointer-events-none"></div>
                            </div>
                        </div>

                        {/* Card 3 - Citadels */}
                        <div className="group">
                            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-green-200 relative overflow-hidden flex flex-col justify-between h-full text-center">
                                <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-green-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                <div className="relative z-10 text-center space-y-6">
                                    <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg group-hover:scale-110 transition-transform duration-300">
                                        <Fortress className="w-8 h-8 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-gray-900 mb-4">Media</h3>
                                        <p className="text-gray-600 leading-relaxed text-sm">
                                        Amplifying voices that matter. Podcasts, Spaces, and multimedia storytelling that spotlight the thinkers, artists, and innovators driving Bitcoin’s future.
                                        </p>
                                    </div>
                                </div>
                                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-green-400/20 to-green-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl -z-10 pointer-events-none"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer/>
        </div>
    )
}