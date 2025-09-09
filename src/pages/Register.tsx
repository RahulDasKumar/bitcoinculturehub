import * as React from "react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Header from "@/components/Header";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";

const Register: React.FC = () => {
  const location = useLocation();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(""); // reset message

    try {
      const res = await fetch("https://bch-backend-7vjs.onrender.com/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        setMessage(`Error: ${errorData.detail || "Signup failed"}`);
        return;
      }

      const data = await res.json();
      setMessage(`Signup successful! Token: ${data.access_token}`);
      // optionally, you can redirect after signup here

    } catch (err) {
      setMessage("Network error. Try again.");
    }
  };

  return (
    <div className="min-h-screen w-full bg-white text-white flex flex-col">
      <Header />

      <div className="flex flex-1 items-center justify-center px-4">
        <div className="w-full max-w-md rounded-xl bg-zinc-900 shadow-lg ring-1 ring-zinc-800 p-8">

          {/* Logo */}
          <div className="flex justify-center mb-4">
            {/* ...SVG code unchanged... */}
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
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-zinc-300">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full rounded-md px-3 py-2 bg-zinc-900 text-white placeholder:text-zinc-500 border border-zinc-700/50 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/40 transition-colors"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="username" className="text-zinc-300">
                Username
              </Label>
              <Input
                id="username"
                name="username"
                type="text"
                placeholder="Choose a username"
                value={formData.username}
                onChange={handleChange}
                required
                className="w-full rounded-md px-3 py-2 bg-zinc-900 text-white placeholder:text-zinc-500 border border-zinc-700/50 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/40 transition-colors"
              />
              <p className="text-xs text-zinc-500">
                3+ characters, letters, numbers, and underscores only
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-zinc-300">
                Password
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Create a password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full rounded-md px-3 py-2 bg-zinc-900 text-white placeholder:text-zinc-500 border border-zinc-700/50 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/40 transition-colors"
              />
              <p className="text-xs text-zinc-500">
                8+ characters with at least one letter and one number
              </p>
            </div>

            <Button
              type="submit"
              className="w-full font-semibold bg-orange-600 hover:bg-orange-700 text-white py-2 rounded-md mt-4"
            >
              Sign Up
            </Button>

            {message && (
              <p className="text-center text-sm mt-2 text-white">{message}</p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
