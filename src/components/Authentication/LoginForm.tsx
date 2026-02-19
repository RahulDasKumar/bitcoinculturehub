
import React, { useState } from 'react';
import { Input } from './Input';
import { Button } from './Button';
import { API_URL } from "@/config";
import useAuthStore from '@/hooks/use-auth';
import { useNavigate } from 'react-router-dom';
const devurl = 'http://127.0.0.1:8000'
interface LoginFormProps {
  onForgotPassword?: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onForgotPassword }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState("");
  const { user, isLoggedIn, login, logout, updateProfile } = useAuthStore();
  const navigate = useNavigate()

  const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const res = await fetch(`${API_URL}/authorize/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
            });
            
            if (!res.ok) {
                const errorData = await res.json();
                setMessage(`Error: ${errorData.detail || "Login failed"}`);
                return;
            }

            const data = await res.json();
            login({
                id:data.user_id,
                username: data.username,
                email: data.email,
                bio:data.bio,
                links: data.links,
                location:" ",
                avatar:data.profile_picture,
            },data.access_token);

            setMessage(`Login successful!`);
            navigate("/");
        } catch (err) {
            console.error(err.message);
            setMessage("Network error. Try again.");
        }
    };

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <Input
        label="Email"
        type="email"
        placeholder="you@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        showPasswordToggle
      />
      
      <Button type="submit">Log In</Button>
      
      <div className="text-center">
        <button
          type="button"
          onClick={onForgotPassword}
          className="text-[12px] text-[#888888] hover:text-[#333333] transition-colors"
        >
          Forgot password?
        </button>
      </div>
    </form>
  );
};
