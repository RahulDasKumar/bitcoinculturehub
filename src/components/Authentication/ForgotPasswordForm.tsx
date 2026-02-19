import React, { useState } from 'react';
import { Input } from './Input';
import { Button } from './Button';
import { API_URL } from '@/config';

interface ForgotPasswordFormProps {
  onBack: () => void;
}

export const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({ onBack }) => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch(`${API_URL}/authorize/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.detail || 'Something went wrong. Please try again.');
        return;
      }

      setSubmitted(true);
    } catch {
      setError('Network error. Please try again.');
    }
  };

  if (submitted) {
    return (
      <div className="space-y-6 text-center">
        <p className="text-[14px] text-[#333333] leading-relaxed">
          If an account exists with that email, you'll receive a password reset link.
        </p>
        <button
          type="button"
          onClick={onBack}
          className="text-[12px] text-[#888888] hover:text-[#333333] transition-colors"
        >
          &larr; Back to Log In
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <p className="text-[13px] text-[#777777] leading-relaxed">
        Enter your email address and we'll send you a link to reset your password.
      </p>

      <Input
        label="Email"
        type="email"
        placeholder="you@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      {error && (
        <p className="text-[12px] text-red-500">{error}</p>
      )}

      <Button type="submit">Send Reset Link</Button>

      <div className="text-center">
        <button
          type="button"
          onClick={onBack}
          className="text-[12px] text-[#888888] hover:text-[#333333] transition-colors"
        >
          &larr; Back to Log In
        </button>
      </div>
    </form>
  );
};
