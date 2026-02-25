import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Input } from './Input';
import { Button } from './Button';
import { API_URL } from '@/config';
import Header from '../Header';

const ResetPasswordPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token') ?? '';
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (newPassword !== confirm) {
      setError('Passwords do not match.');
      return;
    }

    if (!token) {
      setError('Missing reset token. Please use the link from your email.');
      return;
    }

    try {
      const res = await fetch(`${API_URL}/authorize/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, new_password: newPassword }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.detail || 'Invalid or expired reset link.');
        return;
      }

      setSuccess(true);
    } catch {
      setError('Network error. Please try again.');
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen flex flex-col md:flex-row">
        {/* Left Column */}
        <div className="flex-1 bg-[#f4f4f4] flex flex-col justify-center items-center md:items-start px-8 md:px-32 py-12 md:py-0 border-r border-gray-100">
          <div className="max-w-md">
            <h1 className="text-4xl md:text-5xl font-oswald text-[#ff8000] mb-3 tracking-wider uppercase leading-none">
              Bitcoin Culture Hub
            </h1>
            <p className="text-base md:text-lg text-[#555] font-light leading-relaxed">
              Connect with builders and opportunities in the Bitcoin ecosystem.
            </p>
          </div>
        </div>

        {/* Right Column */}
        <div className="flex-1 bg-white flex flex-col justify-center items-center px-4 md:px-0 py-12 md:py-0">
          <div className="w-full max-w-[440px]">
            <div className="bg-white border border-[#eeeeee] overflow-hidden mb-6">
              <div className="p-8 md:p-10">
                {success ? (
                  <div className="space-y-6 text-center">
                    <p className="text-[14px] text-[#333333] leading-relaxed">
                      Your password has been updated. You can now log in.
                    </p>
                    <button
                      type="button"
                      onClick={() => navigate('/auth')}
                      className="text-[12px] text-[#888888] hover:text-[#333333] transition-colors"
                    >
                      &larr; Back to Log In
                    </button>
                  </div>
                ) : (
                  <form onSubmit={onSubmit} className="space-y-6">
                    <p className="text-[13px] text-[#777777] leading-relaxed">
                      Enter your new password below.
                    </p>

                    <Input
                      label="New Password"
                      type="password"
                      placeholder="New password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      showPasswordToggle
                      required
                    />

                    <Input
                      label="Confirm Password"
                      type="password"
                      placeholder="Confirm new password"
                      value={confirm}
                      onChange={(e) => setConfirm(e.target.value)}
                      showPasswordToggle
                      required
                    />

                    {error && (
                      <p className="text-[12px] text-red-500">{error}</p>
                    )}

                    <Button type="submit">Set New Password</Button>

                    <div className="text-center">
                      <button
                        type="button"
                        onClick={() => navigate('/auth')}
                        className="text-[12px] text-[#888888] hover:text-[#333333] transition-colors"
                      >
                        &larr; Back to Log In
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPasswordPage;
