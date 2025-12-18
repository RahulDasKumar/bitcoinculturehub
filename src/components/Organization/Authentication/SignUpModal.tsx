import React from 'react';
import  SignUpForm  from './SignUpForm';
import Header from '@/components/Header';

export function SignUpModal() {
    return <>
    <Header></Header>
        <div className="min-h-screen w-full flex items-center justify-center p-4 md:p-8 bg-slate-50">
            <div className="w-full max-w-6xl flex flex-col items-center">

                <header className="mb-8 text-center animate-fade-in-down">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white shadow-sm border border-slate-100 mb-4">
                        <svg className="w-6 h-6 text-[#F7931A]" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M23.638 14.904c-1.602 6.43-8.113 10.34-14.542 8.736C2.67 22.05-1.244 15.525.362 9.105 1.962 2.67 8.475-1.24 14.9.358c6.43 1.605 10.341 8.115 8.738 14.548v-.002zm-16.088-6.72h-1.6v-2.24h2.24v2.24h1.6c.884 0 1.6.716 1.6 1.6v4.8c0 .884-.716 1.6-1.6 1.6h-1.6v2.24h-2.24v-2.24h-1.6v-2.24h2.24v-4.8h-2.24v-1.6h2.24v-1.6z" opacity="0" />
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" fill="none" />
                            {/* Simple Bitcoin-like B logo for aesthetics */}
                            <path d="M16.974 9.125c.18.96-.062 2.37-1.282 3.26 1.127.63 1.83 2.056 1.5 3.79-.537 2.822-3.21 3.53-6.69 3.106l-1.076 4.312-2.093-.523 1.054-4.227c-.544-.136-1.11-.284-1.666-.425l-1.058 4.242-2.092-.523 1.077-4.316c-.46-.115-.91-.23-1.35-.35L1 16.73l1.583-.635c.677.21.602.13.918-.73L5.86 6.38c.036-.57-.145-.718-.725-.86l-1.62-.405 1.118-4.48 3.937.984c.75.187 1.488.39 2.217.59l1.07-4.29 2.093.522-1.075 4.31c.57.155 1.128.32 1.673.475 2.805.81 3.266 2.35 2.428 5.897zm-3.52 5.094c.368-1.472 2.39-1.362 1.956.375-.373 1.492-2.398 1.495-1.956-.375zm-1.772-5.49c.315-1.26 2.043-1.166 1.672.316-.32 1.282-2.05 1.297-1.673-.315z" />
                        </svg>
                    </div>
                    <h1 className="text-3xl font-semibold text-slate-900 tracking-tight">Join the Network</h1>
                    <p className="text-slate-500 mt-2 text-sm">Create your organization profile to connect with the Bitcoin ecosystem.</p>
                </header>

                    <SignUpForm />

                <footer className="mt-8 text-center text-slate-400 text-xs">
                    © {new Date().getFullYear()} SatoshiSync. All rights reserved.
                </footer>
            </div>
        </div>
    </>
}