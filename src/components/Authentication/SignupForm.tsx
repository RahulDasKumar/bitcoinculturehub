import React, { Dispatch, SetStateAction, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Input } from "./Input";
import { Button } from "./Button";
import { API_URL } from "@/config";
const devurl = "http://127.0.0.1:8000"
interface SignupFormProps {
  setActiveTab: Dispatch<SetStateAction<string>>
}
export const SignupForm: React.FC<SignupFormProps> = ({ setActiveTab }) => {
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    try {
      const body: any = {
        email,
        username,
        password,
      };

      const searchParams = new URLSearchParams(location.search);
      const inviteToken = searchParams.get("token");
      if (inviteToken) body.invite_token = inviteToken;

      const res = await fetch(`${API_URL}/authorize/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const errorData = await res.json();
        setMessage(errorData.detail || "Signup failed");
        return;
      }
      setActiveTab('login')

      
    } catch (err) {
      setMessage("Network error. Try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <Input
        label="Email"
        type="email"
        placeholder="you@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <Input
        label="Username"
        type="text"
        placeholder="satoshi"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />

      <Input
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        showPasswordToggle
        required
      />

      <Input
        label="Confirm Password"
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        showPasswordToggle
        required
      />

      <Button type="submit">Create Account</Button>

      {message && (
        <p className="text-center text-sm text-red-500">{message}</p>
      )}

      <p className="text-[10px] text-center text-gray-500 pt-2">
        By creating an account, you agree to the{" "}
        <a href="#" className="underline hover:text-gray-700">
          Terms
        </a>
        .
      </p>
    </form>
  );
};
