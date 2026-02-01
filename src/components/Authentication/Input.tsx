
import React, { useState } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  showPasswordToggle?: boolean;
}

export const Input: React.FC<InputProps> = ({ label, showPasswordToggle, type = 'text', ...props }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const currentType = showPasswordToggle ? (isPasswordVisible ? 'text' : 'password') : type;

  return (
    <div className="flex flex-col gap-2">
      <label className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#999999]">
        {label}
      </label>
      <div className="relative">
        <input
          {...props}
          type={currentType}
          className="w-full bg-[#f8f8f8] border border-transparent px-4 py-3 text-sm focus:bg-white focus:border-[#eeeeee] outline-none transition-all placeholder:text-[#cccccc] text-[#333333]"
        />
        {showPasswordToggle && (
          <button
            type="button"
            onClick={() => setIsPasswordVisible(!isPasswordVisible)}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-[#aaaaaa] hover:text-[#333333] transition-colors"
          >
            <EyeIcon className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};

const EyeIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="1.5" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);
