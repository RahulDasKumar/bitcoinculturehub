import React, { useState } from 'react';
import { OrganizationType, SignUpFormData } from '../../types';
import { Input } from './ui/Input';
import { Button } from './ui/Button';

// Icons
const UploadIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" x2="12" y1="3" y2="15" /></svg>
);
const MapPinIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>
);
const BuildingIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="16" height="20" x="4" y="2" rx="2" ry="2" /><path d="M9 22v-4h6v4" /><path d="M8 6h.01" /><path d="M16 6h.01" /><path d="M8 10h.01" /><path d="M16 10h.01" /><path d="M8 14h.01" /><path d="M16 14h.01" /></svg>
);
const SparklesIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" /></svg>
);
const MailIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
);
const CheckCircleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><path d="m9 11 3 3L22 4" /></svg>
);
const LockIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
);
const KeyIcon = () => (
    <svg className="w-8 h-8 text-[#F7931A]" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12.65 10C11.83 7.67 9.61 6 7 6c-3.31 0-6 2.69-6 6s2.69 6 6 6c2.61 0 4.83-1.67 5.65-4H17v4h4v-4h2v-4H12.65zM7 14c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" />
    </svg>
);

export const SignUpForm = () => {
    const [isLogin, setIsLogin] = useState(false);
    const [formData, setFormData] = useState<SignUpFormData>({
        organizationName: '',
        organizationType: null,
        location: '',
        description: '',
        email: '',
        password: '',
        profileImage: null
    });

    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [isGeneratingBio, setIsGeneratingBio] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setFormData(prev => ({ ...prev, profileImage: file }));
            const objectUrl = URL.createObjectURL(file);
            setPreviewUrl(objectUrl);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleTypeSelect = (type: OrganizationType) => {
        setFormData(prev => ({ ...prev, organizationType: type }));
    };

    // // Gemini AI Bio Generation
    // const handleGenerateBio = async () => {
    //     if (!formData.organizationName || !formData.organizationType || !formData.location) {
    //         alert("Please fill in Name, Type, and Location first!");
    //         return;
    //     }

    //     setIsGeneratingBio(true);
    //     try {
    //         const bio = await generateOrgDescription(
    //             formData.organizationName,
    //             formData.organizationType,
    //             formData.location
    //         );
    //         setFormData(prev => ({ ...prev, description: bio }));
    //     } catch (error) {
    //         console.error(error);
    //         alert("Failed to generate bio. Please try again.");
    //     } finally {
    //         setIsGeneratingBio(false);
    //     }
    //};

    // Form Submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        console.log(isLogin ? "Logged In:" : "Registered:", formData);
        setIsSubmitting(false);
        setIsSuccess(true);
    };

    if (isSuccess) {
        return (
            <div className="flex flex-col items-center justify-center p-12 text-center animate-fade-in">
                <div className="mb-6 rounded-full bg-green-50 p-6">
                    <CheckCircleIcon />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">
                    {isLogin ? "Welcome Back!" : "Registration Complete!"}
                </h2>
                <p className="text-slate-500 max-w-md">
                    {isLogin
                        ? "You have successfully signed in to your dashboard."
                        : <span>Welcome to the network, <span className="font-semibold text-slate-900">{formData.organizationName}</span>. We've sent a verification email to {formData.email}.</span>
                    }
                </p>
                <Button onClick={() => {
                    setIsSuccess(false);
                    setFormData({
                        organizationName: '',
                        organizationType: null,
                        location: '',
                        description: '',
                        email: '',
                        password: '',
                        profileImage: null
                    });
                    setPreviewUrl(null);
                }} variant="outline" className="mt-8">
                    {isLogin ? "Go to Dashboard" : "Register Another Organization"}
                </Button>
            </div>
        );
    }

    return (
        <div className="flex flex-col md:flex-row h-full min-h-[600px]">

            {/* Left Panel: Contextual Content */}
            <div className="w-full md:w-5/12 bg-slate-50 p-8 border-b md:border-b-0 md:border-r border-slate-100 flex flex-col items-center transition-all duration-300">

                {isLogin ? (
                    // Login Mode - Simplified Left Panel
                    <div className="h-full flex flex-col items-center justify-center text-center">
                        <div className="w-24 h-24 rounded-full bg-white shadow-md border border-slate-100 flex items-center justify-center mb-6">
                            <KeyIcon />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900">Welcome Back</h3>
                        <p className="text-slate-500 mt-3 text-sm max-w-xs leading-relaxed">
                            Sign in to manage your organization's profile, update events, and connect with the community.
                        </p>
                    </div>
                ) : (
                    // Sign Up Mode - Full Upload & Type Selection
                    <>
                        <div className="mb-8 w-full flex flex-col items-center animate-fade-in">
                            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">
                                Organization Profile
                            </label>
                            <div className="relative group cursor-pointer">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="absolute inset-0 w-full h-full opacity-0 z-10 cursor-pointer"
                                />
                                <div className={`
                    w-40 h-40 rounded-full border-4 border-white shadow-lg flex items-center justify-center overflow-hidden transition-all duration-300
                    ${previewUrl ? 'bg-white' : 'bg-slate-200 group-hover:bg-slate-300'}
                    `}>
                                    {previewUrl ? (
                                        <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="text-slate-400 flex flex-col items-center">
                                            <UploadIcon />
                                            <span className="text-xs mt-2 font-medium">Upload Logo</span>
                                        </div>
                                    )}
                                </div>
                                <div className="absolute bottom-1 right-1 bg-slate-900 text-white p-2 rounded-full shadow-md z-20 pointer-events-none">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14" /></svg>
                                </div>
                            </div>
                        </div>

                        <div className="w-full animate-fade-in">
                            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3 ml-1">
                                Organization Type
                            </label>
                            <div className="space-y-2">
                                {Object.values(OrganizationType).map((type) => (
                                    <label
                                        key={type}
                                        className={`
                        flex items-center w-full p-3 rounded-xl border cursor-pointer transition-all duration-200
                        ${formData.organizationType === type
                                                ? 'border-slate-900 bg-white ring-1 ring-slate-900 shadow-sm'
                                                : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'}
                        `}
                                    >
                                        <input
                                            type="radio"
                                            name="orgType"
                                            value={type}
                                            checked={formData.organizationType === type}
                                            onChange={() => handleTypeSelect(type)}
                                            className="w-4 h-4 text-slate-900 border-gray-300 focus:ring-slate-900"
                                        />
                                        <span className={`ml-3 text-sm font-medium ${formData.organizationType === type ? 'text-slate-900' : 'text-slate-600'}`}>
                                            {type}
                                        </span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </>
                )}
            </div>

            {/* Right Panel: Form Fields */}
            <div className="w-full md:w-7/12 p-8 bg-white flex flex-col">

                {/* Toggle Switch */}
                <div className="flex items-center justify-between mb-8">
                    <h3 className="text-xl font-semibold text-slate-900">
                        {isLogin ? 'Sign In' : 'Organization Details'}
                    </h3>
                    <div className="bg-slate-100 p-1 rounded-lg flex">
                        <button
                            onClick={() => setIsLogin(false)}
                            className={`px-4 py-1.5 text-xs font-medium rounded-md transition-all duration-200 ${!isLogin ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                        >
                            Sign Up
                        </button>
                        <button
                            onClick={() => setIsLogin(true)}
                            className={`px-4 py-1.5 text-xs font-medium rounded-md transition-all duration-200 ${isLogin ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                        >
                            Sign In
                        </button>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="flex-1 flex flex-col justify-between">
                    <div className="space-y-6">

                        {isLogin ? (
                            // Login Fields
                            <div className="space-y-6 animate-fade-in">
                                <Input
                                    label="Email Address"
                                    type="email"
                                    name="email"
                                    placeholder="hello@example.com"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required
                                    icon={<MailIcon />}
                                />
                                <Input
                                    label="Password"
                                    type="password"
                                    name="password"
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    required
                                    icon={<LockIcon />}
                                />
                                <div className="flex justify-end">
                                    <a href="#" className="text-xs text-slate-500 hover:text-slate-800 transition-colors">Forgot password?</a>
                                </div>
                            </div>
                        ) : (
                            // Sign Up Fields
                            <div className="space-y-6 animate-fade-in">
                                <Input
                                    label="Organization Name"
                                    name="organizationName"
                                    placeholder="e.g. Satoshi Studios"
                                    value={formData.organizationName}
                                    onChange={handleInputChange}
                                    required
                                    icon={<BuildingIcon />}
                                />

                                <Input
                                    label="Contact Email"
                                    type="email"
                                    name="email"
                                    placeholder="hello@example.com"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required
                                    icon={<MailIcon />}
                                />

                                <Input
                                    label="Based In"
                                    name="location"
                                    placeholder="e.g. Austin, Texas"
                                    value={formData.location}
                                    onChange={handleInputChange}
                                    required
                                    icon={<MapPinIcon />}
                                />

                                {/* Description Field with AI */}
                                <div className="w-full">
                                    <div className="flex justify-between items-end mb-2">
                                        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider ml-1">
                                            Bio / Description
                                        </label>
                                        <button
                                            type="button"
                                            // onClick={handleGenerateBio}
                                            disabled={isGeneratingBio}
                                            className="text-[10px] bg-indigo-50 text-indigo-700 px-2 py-1 rounded-md font-medium hover:bg-indigo-100 transition-colors flex items-center"
                                        >
                                            {isGeneratingBio ? (
                                                <span className="animate-pulse">Thinking...</span>
                                            ) : (
                                                <>
                                                    <SparklesIcon />
                                                    Generate with AI
                                                </>
                                            )}
                                        </button>
                                    </div>
                                    <textarea
                                        name="description"
                                        rows={4}
                                        className="w-full rounded-xl border border-slate-200 bg-slate-50/50 p-3 text-sm text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 focus:bg-white transition-all resize-none"
                                        placeholder="Briefly describe your mission..."
                                        value={formData.description}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                        )}

                    </div>

                    <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-end gap-4">
                        <Button type="button" variant="ghost" onClick={() => window.location.reload()}>
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            isLoading={isSubmitting}
                            disabled={isLogin
                                ? (!formData.email || !formData.password)
                                : (!formData.organizationName || !formData.email || !formData.organizationType)
                            }
                        >
                            {isLogin ? "Sign In" : "Create Profile"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};