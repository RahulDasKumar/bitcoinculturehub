
import React from 'react';
import { useNavigate } from 'react-router-dom';
const FormHeader: React.FC = () => {
  const nav = useNavigate()
  return (
    <header className="flex items-center justify-between px-6 py-3 border-b border-gray-200 bg-white sticky top-0 z-50">
      <button className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-800 hover:text-orange-500 transition-colors" onClick={()=>{nav(-1)}}>
        <i className="fa-solid fa-arrow-left"></i>
        BACK
      </button>
      
      <div className="flex items-center gap-4">
        <span className="text-xs font-medium text-gray-400">0% clarity</span>
        <button className="flex items-center gap-2 px-3 py-1.5 border-2 border-black rounded-sm text-xs font-bold uppercase hover:bg-black hover:text-white transition-all">
          <i className="fa-regular fa-floppy-disk"></i>
          SAVE
        </button>
      </div>
    </header>
  );
};

export default FormHeader;
