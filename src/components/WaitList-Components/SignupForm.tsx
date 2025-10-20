import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import "./waitlist.css";

const SignupForm = () => {
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();
    const [message, setMessage] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage("");
        setIsLoading(true);

        try {
            const res = await fetch("https://bch-backend-7vjs.onrender.com/auth/join", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                // send only email
                body: JSON.stringify({ email }),
            });

            if (!res.ok) {
                const errorData = await res.json();
                setMessage(`Error: ${errorData.detail || "Signup failed"}`);
            }

            const data = await res.json();
            setMessage(`Signup successful! Token: ${data.access_token}`);
            toast({
                title: "Success",
                description: "You’ve joined the waitlist!",
            });
        } catch (err) {
            setMessage("Network error. Try again.");
            toast({
                title: "Error",
                description: "You have already signed up!",
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-4 w-full max-w-md"
        >
            <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 bg-card border-2 border-bitcoin-orange/40 focus:border-bitcoin-orange focus:ring-bitcoin-orange/30 text-foreground placeholder:text-foreground/50"
            />
            <Button
                type="submit"
                disabled={isLoading}
                className="bg-gradient-primary hover:shadow-glow transition-all duration-300 text-primary-foreground font-semibold px-8 py-2 whitespace-nowrap animate-glow"
            >
                {isLoading ? "Joining..." : "Join Waitlist"}
            </Button>
        </form>
    );
};

export default SignupForm;
