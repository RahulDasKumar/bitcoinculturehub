import * as React from "react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Header from "@/components/Header";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";

const Login: React.FC = () => {
    const [email, setEmail] = useState("");
    const [pw, setPw] = useState("");
    const location = useLocation();

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log({ email, pw });
    };

    return (
        <div className="min-h-screen w-full bg-white text-white flex flex-col">
            <Header/>

            <div className="flex flex-1 items-center justify-center px-4">
                <div className="w-full max-w-md rounded-xl bg-zinc-900 shadow-lg ring-1 ring-zinc-800 p-8">

                    {/* Logo (orange gradient) */}
                    <div className="flex justify-center mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="56" height="56">
                            <defs>
                                <linearGradient id="bitcoinGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#f7931a" />
                                    <stop offset="100%" stopColor="#f2a900" />
                                </linearGradient>
                            </defs>
                            <circle
                                cx="16"
                                cy="16"
                                r="15"
                                fill="url(#bitcoinGradient)"
                                stroke="#e8930c"
                                strokeWidth="1"
                            />
                            <path
                                d="M23.189 14.02c.314-2.096-1.283-3.223-3.465-3.975l.708-2.84-1.728-.43-.69 2.765c-.454-.114-.92-.22-1.385-.326l.695-2.783L15.596 6l-.708 2.839c-.376-.086-.746-.17-1.104-.26l.002-.009-2.384-.595-.46 1.846s1.283.294 1.256.312c.7.175.826.638.805 1.006l-.806 3.235c.048.012.11.03.18.057l-.181-.045-1.13 4.532c-.086.212-.303.531-.793.41.017.025-1.256-.313-1.256-.313l-.858 1.978 2.25.561c.418.105.828.215 1.231.318l-.715 2.872 1.727.43.708-2.84c.472.127.93.245 1.378.357l-.706 2.828 1.728.43.715-2.866c2.948.558 5.164.333 6.097-2.333.752-2.146-.037-3.385-1.588-4.192 1.13-.26 1.98-1.003 2.207-2.538zm-3.95 5.538c-.533 2.147-4.148.986-5.32.695l.95-3.805c1.172.293 4.929.872 4.37 3.11zm.535-5.569c-.487 1.953-3.495.96-4.47.717l.86-3.45c.975.243 4.118.696 3.61 2.733z"
                                fill="white"
                            />
                        </svg>
                    </div>


                    {/* Title */}
                    <h1 className="text-2xl font-bold text-center text-white">
                        Bitcoin Culture Hub
                    </h1>
                    <p className="text-center text-sm text-zinc-400 mb-6">Join the culture</p>

                    {/* Toggle */}
                    <div className="flex justify-center items-center bg-zinc-800 rounded-full p-1 mb-8">
                        <Link
                            to="/login"
                            className={`flex-1 text-center px-5 py-2 rounded-full text-sm font-medium transition-colors ${location.pathname === "/login"
                                    ? "bg-orange-600 text-white"
                                    : "text-zinc-300 hover:text-white"
                                }`}
                        >
                            Sign In
                        </Link>
                        <Link
                            to="/register"
                            className={`flex-1 text-center px-5 py-2 rounded-full text-sm font-medium transition-colors ${location.pathname === "/register"
                                    ? "bg-orange-600 text-white"
                                    : "text-zinc-300 hover:text-white"
                                }`}
                        >
                            Sign Up
                        </Link>
                    </div>

                    {/* Form */}
                    <form className="space-y-5" onSubmit={onSubmit}>
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-zinc-300">
                                Email
                            </Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full rounded-md px-3 py-2 bg-zinc-900 text-white placeholder:text-zinc-500 border border-zinc-700/50 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/40 transition-colors"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password" className="text-zinc-300">
                                Password
                            </Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="Enter your password"
                                value={pw}
                                onChange={(e) => setPw(e.target.value)}
                                required
                                className="w-full rounded-md px-3 py-2 bg-zinc-900 text-white placeholder:text-zinc-500 border border-zinc-700/50 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/40 transition-colors"
                            />
                        </div>

                        <Button
                            type="submit"
                            className="w-full font-semibold bg-orange-600 hover:bg-orange-700 text-white py-2 rounded-md mt-4"
                        >
                            Sign In
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;