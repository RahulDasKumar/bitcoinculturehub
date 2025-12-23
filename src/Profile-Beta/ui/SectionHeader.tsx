import React from 'react';
import { LucideIcon } from 'lucide-react';

interface SectionHeaderProps {
  icon?: LucideIcon;
  title: string;
  subtitle?: string;
  rightElement?: React.ReactNode;
  className?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ icon: Icon, title, subtitle, rightElement, className = "" }) => {
  return (
    <div className={`mb-6 ${className}`}>
      <div className="flex justify-between items-end mb-2">
        <div className="flex items-center gap-3">
          {Icon && <Icon className="w-6 h-6 text-bitcoin" strokeWidth={2.5} />}
          <h2 className="font-header text-3xl font-bold uppercase tracking-wide leading-none">{title}</h2>
        </div>
        {rightElement}
      </div>
      {subtitle && <p className="text-gray-500 text-sm ml-9">{subtitle}</p>}
      <div className="h-[2px] w-full bg-black mt-2"></div>
    </div>
  );
};

export default SectionHeader;