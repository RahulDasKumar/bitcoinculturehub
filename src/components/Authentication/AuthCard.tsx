
import React, { useState } from 'react';
import { LoginForm } from './LoginForm';
import { SignupForm } from './SignupForm';
import Header from '../Header';

export const AuthCard: React.FC = () => {

  const searchParams = new URLSearchParams(location.search);
  const inviteToken = searchParams.get("token");
  const mode = searchParams.get("mode");
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>(
    inviteToken || mode === 'signup' ? 'signup' : 'login'
  );

  return (
    <div className="w-full max-w-[440px]">
      <div className="bg-white border border-[#eeeeee] overflow-hidden mb-6">
        {/* Tabs */}
        <div className="flex border-b border-[#eeeeee]">
          <button
            onClick={() => setActiveTab('login')}
            className={`flex-1 py-5 text-[11px] font-semibold tracking-[0.1em] uppercase transition-all duration-200 ${
              activeTab === 'login'
                ? 'text-black border-b-2 border-black'
                : 'text-[#999999] hover:text-[#666666]'
            }`}
          >
            Log In
          </button>
          <button
            onClick={() => setActiveTab('signup')}
            className={`flex-1 py-5 text-[11px] font-semibold tracking-[0.1em] uppercase transition-all duration-200 ${
              activeTab === 'signup'
                ? 'text-black border-b-2 border-black'
                : 'text-[#999999] hover:text-[#666666]'
            }`}
          >
            Create Account
          </button>
        </div>

        {/* Form Content */}
        <div className="p-8 md:p-10">
          {activeTab === 'login' ? (
            <LoginForm />
          ) : (
              <SignupForm setActiveTab={setActiveTab} />
          )}
        </div>
      </div>

      {/* Footer Info Box */}
      <div className="bg-[#f9f9f9] p-5 text-center text-[12px] text-[#777777] leading-relaxed border border-[#eeeeee]">
        <p>
          <span className="font-bold text-[#333]">Create an account</span> to create a page for your organization, community, or meetup.
        </p>
      </div>
    </div>
  );
};
