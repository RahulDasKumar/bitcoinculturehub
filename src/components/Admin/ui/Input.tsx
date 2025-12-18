import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: string;
    icon?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({ label, error, icon, className = '', ...props }) => {
    return (
        <div className="w-full">
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 ml-1">
                {label}
            </label>
            <div className="relative group">
                {icon && (
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-slate-600">
                        {icon}
                    </div>
                )}
                <input
                    className={`
            w-full rounded-xl border bg-slate-50/50 text-slate-900 placeholder-slate-400 
            focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 focus:bg-white
            transition-all duration-200 ease-in-out
            py-3 ${icon ? 'pl-10' : 'pl-4'} pr-4
            ${error ? 'border-red-500 focus:ring-red-200' : 'border-slate-200'}
            ${className}
          `}
                    {...props}
                />
            </div>
            {error && <p className="mt-1 text-xs text-red-500 ml-1">{error}</p>}
        </div>
    );
};