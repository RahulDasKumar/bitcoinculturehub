
import React from 'react';
import { Step } from '../types';

interface FooterProps {
  onNext: () => void;
  onPrevious: () => void;
  currentStep: Step;
}

const Footer: React.FC<FooterProps> = ({ onNext, onPrevious, currentStep }) => {
  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-4 z-40">
      <div className="max-w-[1200px] mx-auto flex justify-between">
        <button 
          onClick={onPrevious}
          disabled={currentStep === Step.BASICS}
          className={`flex items-center gap-2 px-4 py-2 border-2 border-gray-300 rounded-sm text-xs font-bold uppercase transition-all ${
            currentStep === Step.BASICS ? 'opacity-30 cursor-not-allowed' : 'hover:border-black'
          }`}
        >
          <i className="fa-solid fa-arrow-left"></i>
          PREVIOUS
        </button>
        
        <button 
          onClick={onNext}
          className="flex items-center gap-2 px-6 py-2 bg-black text-white rounded-sm text-xs font-bold uppercase hover:bg-orange-600 transition-all group"
        >
          {currentStep === Step.REVIEW ? 'PUBLISH' : 'NEXT'}
          <i className="fa-solid fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
        </button>
      </div>
    </footer>
  );
};

export default Footer;
