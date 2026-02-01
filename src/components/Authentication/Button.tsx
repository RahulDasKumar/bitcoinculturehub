
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ children, className, ...props }) => {
  return (
    <button
      {...props}
      className={`w-full bg-[#ff8000] hover:bg-[#f37a00] text-white py-4 text-[11px] font-bold uppercase tracking-[0.15em] transition-all duration-200 active:opacity-90 ${className}`}
    >
      {children}
    </button>
  );
};
