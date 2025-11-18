import { useState } from 'react';

export default function ResetPasswordForm() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);


//new function to forgot password
const sendPasswordResetEmail = async (email: string): Promise<{ success: boolean }> => {
  try {
    const response = await fetch("http://localhost:8000/auth/forgot-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || "Failed to send reset link.");
    }

    return { success: true };

  } catch (error) {
    console.error("Error sending reset link:", error);
    throw error;
  }
};



//new function to forgot password
  const handleSubmit = async () => {
  if (!email) {
    return;
  }

  setIsLoading(true);

  await sendPasswordResetEmail(email);

  setIsLoading(false);
  setIsSubmitted(true);
};




  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
      <div className="bg-gray-900 rounded-3xl shadow-2xl p-8 w-full max-w-md border border-gray-800">
        {/* Logo */}
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
        <h1 className="text-white text-3xl font-bold text-center mb-2">
          Bitcoin Culture Hub
        </h1>
        <p className="text-gray-400 text-center mb-8">
          {isSubmitted ? 'Check your email' : 'Reset your password'}
        </p>

        {!isSubmitted ? (
          <>
            {/* Reset Password Form */}
            <div className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-white text-sm mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Enter your email"
                  className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-orange-500 transition-colors placeholder-gray-500"
                />
              </div>

              <p className="text-gray-400 text-sm">
                We'll send you a link to reset your password
              </p>

              <button
                onClick={handleSubmit}
                disabled={isLoading || !email}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Sending...' : 'Send Reset Link'}
              </button>
            </div>


          </>
        ) : (
          <>
            {/* Success Message */}
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-green-500 bg-opacity-20 rounded-full flex items-center justify-center mx-auto">
                <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              
              <p className="text-gray-300">
                We've sent a password reset link to
              </p>
              <p className="text-white font-semibold">
                {email}
              </p>
              <p className="text-gray-400 text-sm">
                Please check your inbox and follow the instructions to reset your password
              </p>

              <button
                onClick={() => {
                  setIsSubmitted(false);
                  setEmail('');
                }}
                className="text-orange-500 hover:text-orange-400 text-sm transition-colors block w-full mt-4"
              >
                Didn't receive the email? Resend
              </button>

              <div className="mt-4 text-center">
                <button
                  onClick={() => {
                    setIsSubmitted(false);
                    setEmail('');
                  }}
                  className="text-gray-400 hover:text-gray-300 text-sm transition-colors"
                >
                  ← Back to Sign In
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}