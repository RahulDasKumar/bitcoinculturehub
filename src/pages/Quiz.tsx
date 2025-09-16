"use client"

import type React from "react"
import { useState, useEffect, useCallback } from "react"
import { Check, ChevronLeft, SkipForward, Bitcoin, Eye, EyeOff, Lock, Loader2 } from "lucide-react"
import Header from "@/components/Header"
import ArchtypeProgress from "./Quiz-Components/ArchtypeProgress";


// Types
interface QuizOption {
    id: string
    text: string
    archetype: string
    weight: number
}

interface QuizQuestion {
    id: string
    topic: string
    question: string
    options: QuizOption[]
}

interface QuizAnswer {
    questionId: string
    optionId: string
    archetype: string
    weight: number
}

interface QuizState {
    currentStep: number
    answers: QuizAnswer[]
    seed: number
    isComplete: boolean
}



  

// Quiz Data
const archetypes = {
    forger: { 
        name: "forger", 
        color: "#f97316",
        description: "You see Bitcoin as a tool for creation and innovation.",
        logo: "/images/Forger-Archetype.png"
    },
    voyager: {
        name: "voyager",
        color: "#3b82f6",
        description: "You value Bitcoin's security and decentralization above all.",
        logo: "/images/Voyager-Archetype.png"
    },
    luminary: { 
        name: "luminary",
        color: "#10b981",
        description: "You believe Bitcoin can protect and preserve wealth.",
        logo: "/images/Luminary-Archetype.png"
    },
    sentinel: {
        name: "sentinel",
        color: "#8b5cf6",
        description: "You're drawn to Bitcoin's philosophical and cultural aspects.",
        logo: "/images/Sentinel-Archetype.png"
    },
    builder: { 
        name: "builder", 
        color: "#ef4444", 
        description: "You want to build the future with Bitcoin technology.",
        logo: "/images/Builder-Archetype.png" // Added missing logo
    },
}

const quizData = {
    questions: [
        {
            id: "q1",
            topic: "Initial Attraction",
            question: "What draws you to Bitcoin?",
            options: [
                { id: "q1a", text: "Its long-term value and historical significance", archetype: "luminary", weight: 3 },
                {
                    id: "q1b",
                    text: "The chance to create art or memes, Bitcoin Ordinals, trading cards, or digital art",
                    archetype: "forger",
                    weight: 3,
                },
                { id: "q1c", text: "Curiosity about its culture and basics", archetype: "voyager", weight: 3 },
                {
                    id: "q1d",
                    text: "Belief in its exclusive superiority and ability to revolutionize finance into sound money",
                    archetype: "sentinel",
                    weight: 3,
                },
            ],
        },
        {
            id: "q2",
            topic: "Technology Perspective",
            question: "How do you view Bitcoin's technology?",
            options: [
                { id: "q2a", text: "A revolutionary breakthrough in monetary systems", archetype: "sentinel", weight: 2 },
                { id: "q2b", text: "A platform for creative expression and innovation", archetype: "forger", weight: 2 },
                { id: "q2c", text: "A fascinating system I want to understand better", archetype: "voyager", weight: 2 },
                { id: "q2d", text: "A foundation for building new financial infrastructure", archetype: "builder", weight: 2 },
                { id: "q2e", text: "A store of value that preserves purchasing power", archetype: "luminary", weight: 2 },
            ],
        },
        {
            id: "q3",
            topic: "Community Engagement",
            question: "How do you prefer to engage with the Bitcoin community?",
            options: [
                { id: "q3a", text: "Creating and sharing Bitcoin-related content", archetype: "forger", weight: 2 },
                { id: "q3b", text: "Educating others about Bitcoin's benefits", archetype: "sentinel", weight: 2 },
                { id: "q3c", text: "Learning from experienced Bitcoiners", archetype: "voyager", weight: 2 },
                { id: "q3d", text: "Building tools and applications", archetype: "builder", weight: 2 },
            ],
        },
        {
            id: "q4",
            topic: "Future Vision",
            question: "What excites you most about Bitcoin's future?",
            options: [
                { id: "q4a", text: "Mass adoption as global sound money", archetype: "sentinel", weight: 3 },
                { id: "q4b", text: "New forms of digital art and culture", archetype: "forger", weight: 3 },
                { id: "q4c", text: "Understanding its full potential and implications", archetype: "voyager", weight: 3 },
                { id: "q4d", text: "Building the infrastructure of tomorrow", archetype: "builder", weight: 3 },
                { id: "q4e", text: "Protecting wealth for future generations", archetype: "luminary", weight: 3 },
            ],
        },
        {
            id: "q5",
            topic: "Learning Style",
            question: "How do you prefer to learn about Bitcoin?",
            options: [
                { id: "q5a", text: "Hands-on experimentation and creation", archetype: "forger", weight: 2 },
                { id: "q5b", text: "Reading whitepapers and technical documentation", archetype: "sentinel", weight: 2 },
                { id: "q5c", text: "Listening to podcasts and community discussions", archetype: "voyager", weight: 2 },
                { id: "q5d", text: "Building projects and applications", archetype: "builder", weight: 2 },
            ],
        },
        {
            id: "q6",
            topic: "Value Proposition",
            question: "What's Bitcoin's most important feature to you?",
            options: [
                { id: "q6a", text: "Decentralization and censorship resistance", archetype: "sentinel", weight: 3 },
                { id: "q6b", text: "Programmable money and smart contracts", archetype: "builder", weight: 3 },
                { id: "q6c", text: "Digital scarcity and collectibles", archetype: "forger", weight: 3 },
                { id: "q6d", text: "Store of value properties", archetype: "luminary", weight: 3 },
                { id: "q6e", text: "Cultural and philosophical implications", archetype: "voyager", weight: 3 },
            ],
        },
        {
            id: "q7",
            topic: "Personal Goals",
            question: "What do you hope to achieve with Bitcoin?",
            options: [
                { id: "q7a", text: "Create something unique and valuable", archetype: "forger", weight: 3 },
                { id: "q7b", text: "Contribute to financial sovereignty", archetype: "sentinel", weight: 3 },
                { id: "q7c", text: "Deepen my understanding of money and technology", archetype: "voyager", weight: 3 },
                { id: "q7d", text: "Build solutions for real-world problems", archetype: "builder", weight: 3 },
                { id: "q7e", text: "Preserve and grow wealth responsibly", archetype: "luminary", weight: 3 },
            ],
        },
    ],
}

// Utility functions
function cn(...classes: (string | undefined | null | false)[]): string {
    return classes.filter(Boolean).join(" ")
}

function seededRandom(seed: number) {
    const x = Math.sin(seed) * 10000
    return x - Math.floor(x)
}

function shuffleArray<T>(array: T[], seed: number): T[] {
    const shuffled = [...array]
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(seededRandom(seed + i) * (i + 1))
            ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    return shuffled
}

function calculateResults(answers: QuizAnswer[]) {
    const scores: Record<string, number> = {}
  
    answers.forEach((answer) => {
      if (answer) {
        scores[answer.archetype] = (scores[answer.archetype] || 0) + answer.weight
      }
    })
  
    return Object.entries(scores)
      .map(([archetype, totalWeight]) => {
        const archetypeData = archetypes[archetype as keyof typeof archetypes]
  
        return {
          name: archetypeData?.name || archetype,
          description: archetypeData?.description || "",
          color: archetypeData?.color || "#6b7280",
          logo: archetypeData?.logo || "",   // ✅ now works
          totalWeight,
          archetype,
        }
      })
      .sort((a, b) => b.totalWeight - a.totalWeight)
  }
  

// Components
function Button({
    children,
    onClick,
    disabled = false,
    variant = "default",
    size = "default",
    className = "",
    ...props
}: {
    children: React.ReactNode
    onClick?: () => void
    disabled?: boolean
    variant?: "default" | "outline" | "ghost"
    size?: "default" | "sm" | "lg"
    className?: string
    [key: string]: any
}) {
    const baseClasses =
        "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"

    const variants = {
        default: "bg-orange-500 text-white hover:bg-orange-600",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        ghost: "hover:bg-accent hover:text-accent-foreground",
    }

    const sizes = {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
    }

    return (
        <button
            className={cn(baseClasses, variants[variant], sizes[size], className)}
            onClick={onClick}
            disabled={disabled}
            {...props}
        >
            {children}
        </button>
    )
}

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
    return <div className={cn("rounded-lg border bg-card text-card-foreground shadow-sm", className)}>{children}</div>
}

function App() {
    const [quizState, setQuizState] = useState<QuizState>({
        currentStep: 0,
        answers: [],
        seed: Math.random(),
        isComplete: false,
    })
    const [shuffledOptions, setShuffledOptions] = useState<QuizOption[]>([])
    const [animatingOption, setAnimatingOption] = useState<string | null>(null)

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const [errors, setErrors] = useState({ email: "", password: "", general: "" })
    const [quizResult,setquizResult] = useState([])


    const currentQuestion = quizData.questions[quizState.currentStep]
    const currentAnswer = quizState.answers[quizState.currentStep]
    const isLastQuestion = quizState.currentStep === quizData.questions.length - 1

    // Shuffle options when question changes
    useEffect(() => {
        if (currentQuestion?.options) {
            const questionSeed = quizState.seed + Number.parseInt(currentQuestion.id.slice(1))
            setShuffledOptions(shuffleArray(currentQuestion.options, questionSeed))
        }
    }, [currentQuestion, quizState.seed])

    const handleAnswer = useCallback(
        (option: QuizOption) => {
            setAnimatingOption(option.id)

            const answer: QuizAnswer = {
                questionId: currentQuestion.id,
                optionId: option.id,
                archetype: option.archetype,
                weight: option.weight,
            }

            setTimeout(() => {
                setQuizState((prev) => {
                    const newAnswers = [...prev.answers]
                    newAnswers[prev.currentStep] = answer
                    return { ...prev, answers: newAnswers }
                })
                setAnimatingOption(null)
            }, 150)
        },
        [currentQuestion],
    )

    const handleNext = useCallback(() => {
        if (isLastQuestion) {
            setQuizState((prev) => ({ ...prev, isComplete: true }))
        } else {
            setQuizState((prev) => ({ ...prev, currentStep: prev.currentStep + 1 }))
        }
    }, [isLastQuestion])

    const handleBack = useCallback(() => {
        setQuizState((prev) => ({ ...prev, currentStep: Math.max(0, prev.currentStep - 1) }))
    }, [])

    const handleRestart = useCallback(() => {
        setQuizState({
            currentStep: 0,
            answers: [],
            seed: Math.random(),
            isComplete: false,
        })
        setEmail("")
        setPassword("")
        setShowPassword(false)
        setIsSubmitting(false)
        setIsSuccess(false)
        setErrors({ email: "", password: "", general: "" })
    }, [])

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return emailRegex.test(email)
    }

    const validatePassword = (password: string) => {
        return password.length >= 8 && /[a-zA-Z]/.test(password) && /\d/.test(password)
    }
      const [formData, setFormData] = useState({
        email: "",
        password: "",
        username:""
      });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrors({ email: "", password: "", general: "" });

        const newErrors = { email: "", password: "", general: "" };

        // validate against formData
        if (!validateEmail(formData.email)) {
            newErrors.email = "Enter a valid email.";
        }
        if (!validatePassword(formData.password)) {
            newErrors.password = "Use at least 8 characters with a letter and a number.";
        }

        if (newErrors.email || newErrors.password) {
            setErrors(newErrors);
            return;
        }

        const results = calculateResults(quizState.answers);
        const payload = {
            ...formData,   // email + password
            results,       // quiz results
        };
        console.log(payload)
        setIsSubmitting(true);
        try {
            const res = await fetch("https://bch-backend-7vjs.onrender.com/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (!res.ok) {
                const errorData = await res.json().catch(() => ({}));
                setErrors({ ...newErrors, general: errorData.message || "Signup failed." });
                return;
            }

            const data = await res.json();
            console.log("Signup success:", data);
            setIsSuccess(true); // 🔥 show success UI
        } catch (err) {
            setErrors({ ...newErrors, general: "Network error. Try again." });
        } finally {
            setIsSubmitting(false);
        }
    };


    const handleDownload = (primaryArchetype: any) => {
        const cardContent = `
🪙 BITCOIN CULTURE HUB IDENTITY CARD 🪙

Name: ${primaryArchetype?.name}
Profile: ${primaryArchetype?.description}

Total Profile Strength: ${primaryArchetype?.totalWeight}
Questions Answered: 7/7

Generated: ${new Date().toLocaleDateString()}
    `.trim()

        const blob = new Blob([cardContent], { type: "text/plain" })
        const url = URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = `bitcoin-profile-${primaryArchetype?.name.toLowerCase()}.txt`
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
    }

    
    if (quizState.isComplete) {
        const results = calculateResults(quizState.answers)
        const primaryArchetype = results[0]
        return (
            <div className="min-h-screen bg-background">
                <Header />
                <div className="container mx-auto px-4 py-8">
                    <div className="max-w-2xl mx-auto">
                        <div className="text-center mb-8 animate-fade-in">
                            <Bitcoin className="w-16 h-16 mx-auto mb-4 text-orange-500" />
                            <h1 className="text-4xl font-bold mb-2">You're a {primaryArchetype.name}</h1>
                            <p className="text-xl text-muted-foreground">{primaryArchetype.description}</p>
                        </div>

                        <Card className="p-8 mb-8 animate-slide-up">
                            {/*<div className="text-center mb-6">
                                   {/* <div className="relative w-40 h-24 mx-auto bg-gradient-to-br from-orange-100 to-orange-200 rounded-lg border-2 border-dashed border-orange-300 flex items-center justify-center mb-4">
                                    <div className="absolute inset-0 bg-white/60 backdrop-blur-sm rounded-lg" />
                                    <div className="relative text-center">
                                        <Lock className="w-5 h-5 mx-auto text-orange-600 mb-1" />
                                        <p className="text-xs text-orange-700 font-medium">Identity Card</p>
                                    </div>
                                </div>
                                <div className="relative w-40 h-24 mx-auto flex items-center justify-center mb-4">
                                <img
                                    src={primaryArchetype.logo}
                                    alt={primaryArchetype.name}
                                    className="max-h-20 object-contain"
                                />
                                </div>
                                <h2 className="text-xl font-bold text-foreground mb-2">Save Your Profile</h2>
                            </div>*/}

                            <div className="text-center mb-6">
                                <img
                                src={primaryArchetype.logo}
                                alt={primaryArchetype.name}
                                className="w-32 h-32 mx-auto mb-4 object-contain"
                                />
                                <h2 className="text-xl font-bold text-foreground mb-2">Save Your Profile</h2>
                            </div>


                            {!isSuccess ? (
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div className="space-y-2">
                                        <input
                                            type="username"
                                            placeholder="Pick your username"
                                            name="username"
                                            value={formData.username}
                                            onChange={handleChange}
                                            className={cn(
                                                "w-full px-3 py-2 border rounded-md text-center",
                                                errors.email ? "border-red-500" : "border-gray-300",
                                            )}
                                            autoFocus
                                        />
                                        {errors.email && <p className="text-sm text-red-600 text-center">{errors.email}</p>}
                                    </div>
                                    <div className="space-y-2">
                                        <input
                                            type="email"
                                            placeholder="Enter your email"
                                            name="email"   
                                            value={formData.email}
                                            onChange={handleChange}
                                            className={cn(
                                                "w-full px-3 py-2 border rounded-md text-center",
                                                errors.email ? "border-red-500" : "border-gray-300",
                                            )}
                                            autoFocus
                                        />
                                        {errors.email && <p className="text-sm text-red-600 text-center">{errors.email}</p>}
                                    </div>

                                    <div className="space-y-2">
                                        <div className="relative">
                                            <input
                                                type={showPassword ? "text" : "password"}
                                                placeholder="Create password"
                                                name="password"
                                                value={formData.password}
                                                onChange={handleChange}
                                                className={cn(
                                                    "w-full px-3 py-2 pr-10 border rounded-md text-center",
                                                    errors.password ? "border-red-500" : "border-gray-300",
                                                )}
                                            />
                                            <button
                                                type="button"
                                                className="absolute right-3 top-1/2 transform -translate-y-1/2"
                                                onClick={() => setShowPassword(!showPassword)}
                                            >
                                                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                            </button>
                                        </div>
                                        {errors.password && <p className="text-sm text-red-600 text-center">{errors.password}</p>}
                                    </div>

                                    {errors.general && <p className="text-sm text-red-600 text-center">{errors.general}</p>}

                                    <Button
                                        type="submit"
                                        className="w-full bg-orange-500 hover:bg-orange-600 text-white min-h-[48px] text-base"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                                Saving...
                                            </>
                                        ) : (
                                            "Save & Get Identity Card"
                                        )}
                                    </Button>
                                </form>
                            ) : (
                                <div className="text-center space-y-4">
                                    <div className="text-green-600 font-semibold text-lg">Profile Saved ✓</div>
                                    {/*<Button
                                        className="w-full bg-orange-500 hover:bg-orange-600 text-white min-h-[48px] text-base"
                                        onClick={() => handleDownload(primaryArchetype)}
                                    >
                                        Download Identity Card
                                    </Button>*/}
                                </div>
                            )}
                        </Card>

                        <Card className="p-8 animate-slide-up">
                            <div className="space-y-6">
                                <div className="space-y-1">
                                    <h3 className="text-2xl font-bold text-foreground">Your Complete Profile</h3>
                                    <p className="text-base text-muted-foreground">Sorted by strength</p>
                                </div>

                                <div className="space-y-4">
                                    {results.map((result, index) => {
                                        const maxScore = Math.max(...results.map((r) => r.totalWeight), 1)
                                        const percentage = (result.totalWeight / maxScore) * 100
                                        return (
                                            <div
                                                key={result.archetype}
                                                className="relative flex justify-between items-center h-14 rounded-full overflow-hidden bg-muted/30"
                                            >
                                                <div
                                                    className="absolute left-0 h-full transition-all duration-200"
                                                    style={{
                                                        width: `${percentage}%`,
                                                        backgroundColor: result.color,
                                                        opacity: result.totalWeight > 0 ? 0.9 : 0.3,
                                                    }}
                                                />

                                                <div className="relative z-10 flex items-center px-4 py-2">
                                                    <div
                                                        className="w-3 h-3 rounded-full mr-3 flex-shrink-0"
                                                        style={{ backgroundColor: result.color }}
                                                    />
                                                    <span className="text-lg font-semibold text-foreground">{result.name}</span>
                                                </div>

                                                <div className="relative z-10 mr-4">
                                                    <div
                                                        className="flex items-center justify-center min-w-[2.5rem] h-8 px-2 rounded-full text-sm font-semibold text-white"
                                                        style={{
                                                            backgroundColor: result.totalWeight > 0 ? result.color : "#6b7280",
                                                        }}
                                                    >
                                                        {result.totalWeight}
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>

                                <div className="pt-4 border-t border-border text-center">
                                    <p className="text-base text-muted-foreground">
                                        <span className="font-semibold text-foreground">
                                            {results.filter((r) => r.totalWeight > 0).length}
                                        </span>{" "}
                                        Archetype
                                        {results.filter((r) => r.totalWeight > 0).length !== 1 ? "s" : ""} Activated • Total Profile
                                        Strength:{" "}
                                        <span className="font-semibold text-foreground">
                                            {results.reduce((sum, r) => sum + r.totalWeight, 0)}
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </Card>

                        <div className="text-center mt-8">
                            <Button onClick={handleRestart} variant="outline" className="bg-transparent">
                                Retake Quiz
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    // Quiz view
    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <Header/>
            <div className="border-b bg-card">
                <div className="container mx-auto px-4 py-6">
                    <div className="flex items-center gap-4">
                        <Bitcoin className="w-8 h-8 text-orange-500" />
                        <div>
                            <h1 className="text-2xl font-bold">7 Questions for Your Bitcoin Profile</h1>
                            <p className="text-muted-foreground">{currentQuestion?.topic}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Progress */}
            <div className="bg-muted/30">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
                        <span>
                            Question {quizState.currentStep + 1} of {quizData.questions.length}
                        </span>
                        <span>{Math.round(((quizState.currentStep + 1) / quizData.questions.length) * 100)}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                        <div
                            className="bg-orange-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${((quizState.currentStep + 1) / quizData.questions.length) * 100}%` }}
                        />
                    </div>
                </div>
            </div>

            {/* Question */}
            <main className="container mx-auto px-4 py-8">
                <div className="max-w-2xl mx-auto">
                    <Card className="p-8 mb-6 animate-slide-up">
                        <h2 className="text-3xl font-bold mb-8 text-balance">{currentQuestion?.question}</h2>

                        <div className="space-y-4">
                            {shuffledOptions.map((option) => {
                                const isSelected = currentAnswer?.optionId === option.id
                                const isAnimating = animatingOption === option.id

                                return (
                                    <button
                                        key={option.id}
                                        onClick={() => handleAnswer(option)}
                                        className={cn(
                                            "w-full p-6 text-left rounded-xl border-2 transition-all duration-200",
                                            "hover:border-orange-300 hover:bg-orange-50 active:scale-[0.98]",
                                            "focus:outline-none focus:ring-2 focus:ring-orange-500",
                                            isSelected && "border-orange-500 bg-orange-50 shadow-lg",
                                            isAnimating && "scale-[0.98]",
                                            !isSelected && !isAnimating && "border-border bg-card hover:scale-[1.01]",
                                        )}
                                    >
                                        <div className="flex items-start gap-4">
                                            <div
                                                className={cn(
                                                    "flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 mt-0.5",
                                                    isSelected ? "border-orange-500 bg-orange-500" : "border-muted-foreground",
                                                )}
                                            >
                                                {isSelected && <Check className="w-4 h-4 text-white" />}
                                            </div>
                                            <p className="text-lg leading-relaxed">{option.text}</p>
                                        </div>
                                    </button>
                                )
                            })}
                        </div>
                    </Card>

                    {/* Navigation */}
                    <div className="flex items-center justify-between gap-4">
                        <Button variant="outline" onClick={handleNext} className="flex items-center gap-2 bg-transparent" size="sm">
                            <SkipForward className="w-4 h-4" />
                            Skip
                        </Button>

                        <div className="flex gap-4">
                            {quizState.currentStep > 0 && (
                                <Button variant="ghost" onClick={handleBack} className="flex items-center gap-2">
                                    <ChevronLeft className="w-4 h-4" />
                                    Back
                                </Button>
                            )}

                            <Button onClick={handleNext} disabled={!currentAnswer} size="lg" className="px-8">
                                {isLastQuestion ? "Complete Quiz" : "Next Question"}
                            </Button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default App
