
import React, { useState } from 'react';
import { X, Mail, Shield, User, Send, Link, Copy, Check } from 'lucide-react';
import { API_URL } from '@/config';
import useAuthStore from '@/hooks/use-auth';
const devurl = "http://127.0.0.1:8000"

interface InviteModalProps {
    isOpen: boolean;
    onClose: () => void;
    isAdmin:boolean;
    token:string;
    orgId:string;
    orgName:string;
}



const InviteModal: React.FC<InviteModalProps> = ({ isOpen, onClose, isAdmin,token,orgId,orgName }) => {
    const [email, setEmail] = useState('');
    const [role, setRole] = useState<'owner' | 'member'>('member');
    const [sending, setSending] = useState(false);
    const [generating, setGenerating] = useState(false);
    const [generatedLink, setGeneratedLink] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);
    const user = useAuthStore((s) => s.user)
    if (!isOpen) return null;

    const handleSendInvite = async (e: React.FormEvent) => {
        e.preventDefault();
        setSending(true);
        // Simulate API call
        const res = await fetch(`${API_URL}/authorize/invite/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify({
                org_id: orgId,
                role: role,
                expires_in_hours: 24,
            }),
        });

        if (!res.ok) {
            const err = await res.json();
            alert("Error: " + err.detail);
            return;
        }

        const data = await res.json();
        const link = data.invite_link
        const emailBody =
        {
            org_id: orgId,
            from_email:"rahul@bitcoinculturehub.com",
            to_email: email,
            join_link:link,
            org_name: orgName,
            sender_name: user.username,
            sender_title: isAdmin ? "Website Admin" : "Organization Owner"

        }
        const sendEmail = await fetch(`${devurl}/email/send-join-org-email`,{
            method: "POST", 
            headers: {
                "Content-Type": "application/json"
            }, 
            body: JSON.stringify(emailBody)
        })
        console.log(sendEmail.json())
        console.log("Email sending response message")
        setTimeout(() => {
            setSending(false);
            onClose();
            setEmail('');
        }, 1500);
    };

    const handleGenerateLink = async () => {
        setGenerating(true);
        setGeneratedLink(null);
        setCopied(false);
        const res = await fetch(`${API_URL}/authorize/invite/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify({
                org_id: orgId,
                role: role,
                expires_in_hours: 24,
            }),
        });

        if (!res.ok) {
            const err = await res.json();
            alert("Error: " + err.detail);
            return;
        }

        const data = await res.json();
        setGeneratedLink(data.invite_link)
    };

    const handleCopyLink = () => {
        if (generatedLink) {
            navigator.clipboard.writeText(generatedLink);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            {/* Modal Content */}
            <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
                <div className="p-8">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-2xl font-bold text-slate-900">Invite Team</h2>
                        <button
                            onClick={onClose}
                            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    <form onSubmit={handleSendInvite} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">Email Invitation</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                                    <Mail size={18} />
                                </div>
                                <input
                                    type="email"
                                    required
                                    placeholder="name@example.com"
                                    className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">Assign Role</label>
                            <div className="grid grid-cols-2 gap-4">
                                {isAdmin && (<button
                                    type="button"
                                    onClick={() => setRole('owner')}
                                    className={`flex items-center justify-center space-x-2 py-3 rounded-2xl border-2 transition-all ${role === 'owner'
                                            ? 'border-blue-600 bg-blue-50 text-blue-700'
                                            : 'border-slate-100 bg-slate-50 text-slate-500 hover:border-slate-200'
                                        }`}
                                >
                                    <Shield size={18} />
                                    <span className="font-bold text-sm">Admin</span>
                                </button>)}
                                <button
                                    type="button"
                                    onClick={() => setRole('member')}
                                    className={`flex items-center justify-center space-x-2 py-3 rounded-2xl border-2 transition-all ${role === 'member'
                                            ? 'border-blue-600 bg-blue-50 text-blue-700'
                                            : 'border-slate-100 bg-slate-50 text-slate-500 hover:border-slate-200'
                                        }`}
                                >
                                    <User size={18} />
                                    <span className="font-bold text-sm">Member</span>
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={sending}
                            className={`w-full py-4 bg-blue-600 text-white font-bold rounded-2xl shadow-lg shadow-blue-200 hover:bg-blue-700 hover:shadow-blue-300 transition-all transform active:scale-[0.98] flex items-center justify-center space-x-2 ${sending ? 'opacity-80 cursor-wait' : ''}`}
                        >
                            {sending ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                <>
                                    <Send size={18} />
                                    <span>Send Invitation</span>
                                </>
                            )}
                        </button>
                    </form>

                    <div className="relative my-10">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-slate-100"></div>
                        </div>
                        <div className="relative flex justify-center text-xs font-bold uppercase tracking-widest">
                            <span className="bg-white px-4 text-slate-300">Or Share Link</span>
                        </div>
                    </div>

                    <div className="space-y-4">
                        {!generatedLink ? (
                            <button
                                type="button"
                                onClick={handleGenerateLink}
                                disabled={generating}
                                className="w-full flex items-center justify-center space-x-2 py-3 bg-white border border-slate-200 rounded-2xl text-slate-600 font-bold hover:bg-slate-50 transition-all hover:border-slate-300"
                            >
                                {generating ? (
                                    <div className="w-5 h-5 border-2 border-slate-300 border-t-slate-600 rounded-full animate-spin" />
                                ) : (
                                    <>
                                        <Link size={18} />
                                        <span>Generate Invite Link</span>
                                    </>
                                )}
                            </button>
                        ) : (
                            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 animate-in fade-in slide-in-from-top-2">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Direct Invite Link</span>
                                    <div className="flex items-center text-[10px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                                        <Check size={10} className="mr-1" />
                                        Active
                                    </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <input
                                        readOnly
                                        value={generatedLink}
                                        className="flex-1 bg-white border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-600 font-mono focus:outline-none"
                                    />
                                    <button
                                        onClick={handleCopyLink}
                                        className={`p-2 rounded-xl transition-all ${copied
                                                ? 'bg-green-600 text-white shadow-lg shadow-green-100'
                                                : 'bg-white border border-slate-200 text-slate-400 hover:text-slate-600'
                                            }`}
                                    >
                                        {copied ? <Check size={18} /> : <Copy size={18} />}
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="px-8 py-6 bg-slate-50 border-t border-slate-100">
                    <p className="text-[11px] text-slate-400 text-center leading-relaxed">
                        Invite links expire in 24 hours. Manage all pending invitations in your <span className="text-blue-500 font-semibold cursor-pointer hover:underline">Settings</span>.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default InviteModal;
