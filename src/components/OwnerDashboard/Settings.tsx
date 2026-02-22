import React, { useState, useEffect } from "react";
import {
    Settings,
    ChevronUp,
    ChevronDown,
    Mail,
    Bell,
    Trash2,
    Archive,
} from "lucide-react";
import Toggle from "./Toggle";
import { Organization } from "../types";
import { useOrganizationStore } from "@/hooks/use-organization";

interface SettingsProps {
    organization: Partial<Organization>;
}

const OrganizationSettings: React.FC<SettingsProps> = ({ organization }) => {
    const [isOpen, setIsOpen] = useState(true);
    const [notif1, setNotif1] = useState(true);
    const [notif2, setNotif2] = useState(false);
    const [notif3, setNotif3] = useState(false);
    const [orgName, setOrgName] = useState(organization.name ?? "");
    const [orgEmail, setOrgEmail] = useState(organization.email ?? "");
    const [orgMeetingLink, setOrgMeetingLink] = useState(organization.meeting_link ?? "");
    const { archiveOrganization, unarchiveOrganization, editOrganization } = useOrganizationStore();

    const [archived, setArchived] = useState(Boolean(organization.deleted_at));

    // Sync state if organization prop changes
    useEffect(() => {
        setOrgName(organization.name ?? "");
        setOrgEmail(organization.email ?? "");
        setOrgMeetingLink(organization.meeting_link ?? "");
    }, [organization.name, organization.email, organization.meeting_link]);

    useEffect(() => {
        setArchived(Boolean(organization.deleted_at));
    }, [organization.deleted_at]);

    const handleSubmit = (e: React.MouseEvent) => {
        editOrganization(organization.id, {
            ...organization,
            name: orgName,
            email: orgEmail,
            meeting_link: orgMeetingLink,
        });
    };

    return (
        <section className="mb-16 mt-5">
            {/* Header */}
            <div
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center justify-between p-4 border border-gray-100 bg-white rounded-t-xl cursor-pointer hover:bg-gray-50 transition-colors"
            >
                <div className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-gray-900">
                    <Settings size={16} className="text-gray-500" />
                    Organization Settings
                    {archived && (
                        <span className="ml-2 text-red-500 text-[10px] font-bold uppercase">
                            Archived
                        </span>
                    )}
                </div>
                {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </div>

            {/* Content */}
            {isOpen && (
                <div className="bg-white border-x border-b border-gray-100 rounded-b-xl p-8 space-y-10 shadow-sm animate-in fade-in slide-in-from-top-2 duration-300">
                    {/* Details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-6">
                            <div className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-gray-900 mb-4">
                                <Settings size={14} /> Organization Details
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                                    Organization Name
                                </label>
                                <input
                                    type="text"
                                    value={orgName}
                                    onChange={(e) => setOrgName(e.target.value)}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 outline-none transition-shadow"
                                />
                            </div>
                        </div>

                        <div className="space-y-6 md:mt-11">
                            <div className="space-y-1">
                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1.5">
                                    <Mail size={12} /> Contact Email
                                </label>
                                <input
                                    type="email"
                                    value={orgEmail}
                                    onChange={(e) => setOrgEmail(e.target.value)}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 outline-none transition-shadow"
                                />
                            </div>
                        </div>
                        <div className="space-y-1">
                            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                                Meeting Link
                            </label>
                            <input
                                type="text"
                                value={orgMeetingLink}
                                onChange={(e) => setOrgMeetingLink(e.target.value)}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 outline-none transition-shadow"
                            />
                        </div>
                    </div>

                    {/* Notifications */}
                    <div>
                        <div className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-gray-900 mb-6">
                            <Bell size={14} /> Notification Preferences
                        </div>
                        <div className="space-y-4 max-w-lg">
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-bold text-gray-700">
                                    Email me when someone applies
                                </span>
                                <Toggle enabled={notif1} onChange={setNotif1} />
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-bold text-gray-700">
                                    Email me weekly digest
                                </span>
                                <Toggle enabled={notif2} onChange={setNotif2} />
                            </div>
                            <div className="flex items-center justify-between opacity-50">
                                <span className="text-sm font-bold text-gray-700">
                                    Email me when a chapter becomes inactive
                                </span>
                                <Toggle enabled={notif3} onChange={setNotif3} />
                            </div>
                        </div>
                    </div>

                    <button
                        className="mt-4 px-6 py-2 bg-orange-500 text-white rounded font-bold text-sm hover:bg-orange-600 transition-colors"
                        onClick={handleSubmit}
                    >
                        Save Changes
                    </button>

                    {/* Danger Zone */}
                    <div className="pt-8 border-t border-gray-100">
                        <div className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-red-500 mb-6">
                            <Trash2 size={14} /> Danger Zone
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Archive */}
                            <div className="p-4 border border-red-100 bg-red-50/30 rounded-lg flex items-center justify-between">
                                <div>
                                    <h4 className="text-sm font-bold text-gray-900">
                                        Archive Organization
                                    </h4>
                                    <p className="text-[10px] text-gray-500">
                                        Hide from public view but keep all data
                                    </p>
                                </div>
                                <button
                                    disabled={archived}
                                    className={`flex items-center gap-1.5 px-4 py-2 rounded text-[10px] font-bold uppercase tracking-widest transition-colors ${archived
                                            ? "border border-gray-200 text-gray-400 bg-gray-100 cursor-not-allowed"
                                            : "border border-red-200 text-red-600 bg-white hover:bg-red-50"
                                        }`}
                                    onClick={async () => {
                                        await archiveOrganization(organization.id);
                                        setArchived(true);
                                    }}
                                >
                                    <Archive size={14} /> Archive
                                </button>
                            </div>

                            {/* Unarchive */}
                            <div className="p-4 border border-green-100 bg-green-50/30 rounded-lg flex items-center justify-between">
                                <div>
                                    <h4 className="text-sm font-bold text-gray-900">
                                        Unarchive Organization
                                    </h4>
                                    <p className="text-[10px] text-gray-500">Unhide the archived org</p>
                                </div>
                                <button
                                    disabled={!archived}
                                    className={`flex items-center gap-1.5 px-4 py-2 rounded text-[10px] font-bold uppercase tracking-widest transition-colors ${!archived
                                            ? "border border-gray-200 text-gray-400 bg-gray-100 cursor-not-allowed"
                                            : "border border-green-200 text-green-600 bg-white hover:bg-green-50"
                                        }`}
                                    onClick={async () => {
                                        await unarchiveOrganization(organization.id);
                                        setArchived(false);
                                    }}
                                >
                                    <Archive size={14} /> Unarchive
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default OrganizationSettings;