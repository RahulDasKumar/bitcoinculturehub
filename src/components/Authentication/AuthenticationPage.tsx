
import React from 'react';
import { AuthCard } from './AuthCard';
import Header from '../Header';

const AuthPage: React.FC = () => {
  return <>
    <Header/>
    <div className="min-h-screen flex flex-col md:flex-row">
    
      {/* Left Column: Brand Information (Light Gray) */}
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

      {/* Right Column: Authentication Form (White) */}
      <div className="flex-1 bg-white flex flex-col justify-center items-center px-4 md:px-0 py-12 md:py-0">
        <AuthCard />
      </div>
    </div>

    </>
};

export default AuthPage;
