
import React from 'react';
import { Step } from '../types';

interface StepIndicatorProps {
  currentStep: Step;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep }) => {
  const steps = [
    { id: Step.BASICS, label: 'Basics' },
    { id: Step.SCOPE, label: 'Scope' },
    { id: Step.SKILLS, label: 'Skills' },
    // { id: Step.REWARDS, label: 'Rewards', status: 'completed' },
    { id: Step.VISIBILITY, label: 'Visibility', status: 'completed' },
    { id: Step.REVIEW, label: 'Review' },
  ];

  return (
    <div className="bg-gray-100/50 border-b border-gray-200">
      <div className="max-w-[1200px] mx-auto flex">
        {steps.map((step) => {
          const isActive = currentStep === step.id;
          const isCompleted = step.status === 'completed'; 
          
          return (
            <div 
              key={step.id} 
              className={`flex items-center px-4 py-2 text-[11px] font-bold uppercase tracking-tight border-b-2 transition-all ${
                isActive ? 'border-orange-500 bg-white' : 'border-transparent text-gray-400'
              }`}
            >
              <div className={`w-4 h-4 rounded-sm flex items-center justify-center mr-2 text-[10px] ${
                isActive ? 'bg-orange-500 text-white' : 
                isCompleted ? 'bg-green-500 text-white' : 'bg-gray-300 text-white'
              }`}>
                {isCompleted ? <i className="fa-solid fa-check scale-75"></i> : step.id + 1}
              </div>
              <span className={isActive ? 'text-orange-500' : isCompleted ? 'text-green-600' : 'text-gray-400'}>
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StepIndicator;
