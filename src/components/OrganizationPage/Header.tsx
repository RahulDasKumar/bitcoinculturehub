
import React from 'react';
import { REGEXP_ONLY_CHARS } from 'input-otp';
const OrgHeader= ({org_title}) => {
  const getAcronym = (title: string) => {
    return title
      .split(' ')
      .map(word => word.trim())                
      .filter(word => word.length > 0)         
      .map(word => {
        const firstLetter = word[0];
        return /[A-Z]/.test(firstLetter) ? firstLetter : '';
      })
      .join('');
  };

  return (
    <header className="flex items-center gap-6">
      {/* Square Logo Placeholder */}
      <div className="w-16 h-16 bg-black text-white flex items-center justify-center font-black text-xl rounded-sm shrink-0">
        {getAcronym(org_title)}
      </div>
      <div>
        <h1 className="text-5xl font-extrabold text-black tracking-tight">{org_title}</h1>
        <div className="flex items-center gap-2 mt-2">
          <div className="flex items-center justify-center bg-gray-50 border border-gray-200 px-2 py-0.5 rounded text-[10px] font-bold text-gray-700 uppercase tracking-widest">
            <svg className="w-3 h-3 text-blue-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Verified Organization
          </div>
        </div>
      </div>
    </header>
  );
};

export default OrgHeader;
