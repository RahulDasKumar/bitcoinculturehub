
import React, { useState } from 'react';
import Header from '../Header';
import StepIndicator from './components/StepIndicator';
import MarketplacePreview from './components/MarketplacePreview';
import Footer from './components/Footer';
import BasicsStep from './components/steps/BasicsStep';
import ScopeStep from './components/steps/ScopeStep';
import SkillsStep from './components/steps/SkillsStep';
import RewardsStep from './components/steps/RewardsStep';
import VisibilityStep from './components/steps/VisibilityStep';
import ReviewStep from './components/steps/ReviewStep';
import { Step, FormData } from './types';
import FormHeader from './components/FormHeader';
import { useParams } from 'react-router-dom';
import { Opportunity } from '../types';
const PostOpportunity = () => {
  const { orgId } = useParams<{ orgId: string }>();
  const [currentStep, setCurrentStep] = useState<Step>(Step.BASICS);
  const [formData, setFormData] = useState<FormData>({
    org_id :orgId,
    title: '',
    type: 'Bounty',
    location: {type:'Remote',text:''},
    time_commitment: 'One-off',
    estimated_hours: 10,
    summary: '',
    description: '',
    output_type: [],
    due_date: '',
    skill_level: 'Beginner',
    categories: [],
    tools: [],
    status:'pending',
    primaryCategory: 'Design'
  });

  const updateFormData = (updates: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  const handleNext = () => {
    if (currentStep < Step.REVIEW) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > Step.BASICS) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case Step.BASICS:
        return <BasicsStep data={formData} update={updateFormData} />;
      case Step.SCOPE:
        return <ScopeStep data={formData} update={updateFormData} />;
      case Step.SKILLS:
        return <SkillsStep data={formData} update={updateFormData} />;
      case Step.REWARDS:
        return <RewardsStep data={formData} update={updateFormData} />;
      case Step.VISIBILITY:
        return <VisibilityStep data={formData} update={updateFormData} />;
      case Step.REVIEW:
        return <ReviewStep data={formData} update={updateFormData} />;
      default:
        return <BasicsStep data={formData} update={updateFormData} />;
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header/>
      <FormHeader />
      <StepIndicator currentStep={currentStep} />
      
      <main className="flex-1 max-w-[1200px] mx-auto w-full px-4 pt-8 pb-32">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Main Form Area */}
          <div className="flex-1">
            <h1 className="quick-task-header text-5xl font-bold uppercase mb-2">QUICK TASK</h1>
            <p className="text-gray-500 mb-8">Define real work. Find real builders.</p>
            
            <div className="border border-gray-300 rounded-sm p-0 overflow-hidden bg-white">
               {renderStep()}
            </div>
          </div>

          {/* Sidebar Preview */}
          <div className="w-full md:w-[320px] shrink-0">
            <MarketplacePreview data={formData} />
          </div>
        </div>
      </main>

      <Footer 
        onNext={handleNext} 
        onPrevious={handlePrevious} 
        currentStep={currentStep} 
      />
    </div>
  );
};

export default PostOpportunity;
