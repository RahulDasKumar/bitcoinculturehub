
import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'outline' | 'orange' | 'green' | 'black';
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({ children, variant = 'default', className = "" }) => {
  const base = "px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider inline-flex items-center gap-1";
  const styles = {
    default: "bg-gray-100 text-gray-800",
    outline: "border border-gray-300 text-gray-600",
    orange: "bg-orange-500 text-white border border-orange-600",
    green: "bg-green-600 text-white",
    black: "bg-black text-white",
  };
  return <span className={`${base} ${styles[variant]} ${className}`}>{children}</span>;
};

export default Badge;
