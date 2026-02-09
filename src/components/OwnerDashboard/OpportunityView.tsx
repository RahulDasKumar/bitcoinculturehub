import React, { useEffect, useState } from 'react';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription,
    SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from './modal-ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from './modal-ui/badge';
import {
    Search,
    Clock,
    MoreHorizontal,
    Mail,
    Download,
    CheckCircle2,
    XCircle,
    UserCheck,
} from 'lucide-react';
import { useOrganizationStore } from '@/hooks/use-organization';
import { API_URL } from '@/config';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
const devurl = 'http://127.0.0.1:8000'

interface ViewApplicantsModalProps {
    opportunityTitle: string;
    opp_id: string;
    org_id: string;
    children: React.ReactNode;
}

export const ViewApplicantsModal = ({
    opportunityTitle,
    org_id,
    opp_id,
    children,
}: ViewApplicantsModalProps) => {
    const [open, setOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const {
        findAllApplicants,
        applicantsByOpportunity,
        loading, updateApplicantStatus
    } = useOrganizationStore();

    const applicants = applicantsByOpportunity[opp_id] || [];
    console.log(applicants)
    const downloadResume = async (resume_key: string) => {
        const res = await fetch(
            `${API_URL}/profile/applications/resume-url/${resume_key}`,
            
        );

        const data = await res.json();
        if (!data.url) {
            throw new Error("No resume available");
        }
        window.open(data.url, "_blank");
    };
    useEffect(() => {
        if (open && !applicantsByOpportunity[opp_id]) {
            findAllApplicants(org_id, opp_id);
        }
    }, [open, org_id, opp_id, applicantsByOpportunity, findAllApplicants]);

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'applied':
                return <Badge variant="blue">Pending</Badge>;
            case 'interviewing':
                return <Badge variant="purple">Interviewing</Badge>;
            case 'in_progress':
                return <Badge variant="green">Accepted</Badge>;
            case 'rejected':
                return <Badge variant="red">Rejected</Badge>;
            case 'offered':
                return <Badge variant="green">Offered</Badge>;
            default:
                return <Badge variant="gray">Reviewed</Badge>;
        }
    };

    const filteredApplicants = applicants.filter(
        (app) =>
            app.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
            app.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
    console.log(filteredApplicants)
    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>{children}</SheetTrigger>

            <SheetContent
                side="right"
                className="w-full sm:w-[500px] flex flex-col h-full p-0 bg-white"
            >
                <SheetHeader className="px-6 py-6 border-b">
                    <Badge variant="outline" className="w-fit mb-2">
                        Opportunity
                    </Badge>
                    <SheetTitle className="text-xl font-bold">
                        {opportunityTitle}
                    </SheetTitle>
                    <SheetDescription>
                        Manage and review the {applicants.length} candidates who applied.
                    </SheetDescription>

                    <div className="relative mt-4">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search applicants..."
                            className="w-full pl-9 pr-4 py-2 text-sm border rounded-md"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </SheetHeader>

                <div className="flex-1 overflow-y-auto">
                    {loading && open ? (
                        <div className="flex items-center justify-center h-48">
                            Loading applicants...
                        </div>
                    ) : filteredApplicants.length === 0 ? (
                        <div className="flex items-center justify-center h-48">
                            No applicants found
                        </div>
                    ) : (
                        <div className="divide-y">
                                    {filteredApplicants.map((applicant) => (
                                        <div key={applicant.id} className="p-4 hover:bg-gray-50">
                                            <div className="flex justify-between items-start">
                                                <div className="flex gap-4">
                                                    <Avatar className="h-10 w-10">
                                                        <AvatarImage src={applicant.avatar} />
                                                        <AvatarFallback>{applicant.username[0]}</AvatarFallback>
                                                    </Avatar>

                                                    <div>
                                                        <div className="flex items-center gap-2">
                                                            <h4 className="font-semibold">{applicant.username}</h4>
                                                            {getStatusBadge(applicant.status)}
                                                        </div>
                                                        <p className="text-xs text-muted-foreground">{applicant.email}</p>
                                                        <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                                                            <Clock className="w-3 h-3" />
                                                            {applicant.appliedAt}
                                                        </div>
                                                    </div>
                                                </div>

                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="hover:bg-gray-100 rounded-full"
                                                        >
                                                            <MoreHorizontal className="w-4 h-4 text-gray-600" />
                                                        </Button>
                                                    </DropdownMenuTrigger>

                                                    <DropdownMenuContent
                                                        align="end"
                                                        className="w-48 rounded-lg bg-white border border-gray-200 shadow-lg p-1"
                                                    >
                                                        {[
                                                            { label: "Pending", status: "applied", icon: Clock, color: "text-yellow-500" },
                                                            { label: "Accepted", status: "in_progress", icon: CheckCircle2, color: "text-green-600" },
                                                            { label: "Interviewing", status: "interviewing", icon: UserCheck, color: "text-blue-600" },
                                                            { label: "Rejected", status: "rejected", icon: XCircle, color: "text-red-600" },
                                                            { label: "Offered", status: "offered", icon: Clock, color: "text-green-500" }
                                                        ].map((option) => (
                                                            <DropdownMenuItem
                                                                key={option.status}
                                                                className={`flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md cursor-pointer ${option.status === "rejected" ? "text-red-600 hover:bg-red-50" : ""}`}
                                                                onClick={() => {
                                                                    // Update the local applicant status
                                                                    applicant.status = option.status;
                                                                    // Force state update
                                                                    setOpen((prev) => !prev); // temporary trick to rerender; better: manage applicants in local state
                                                                    setTimeout(() => setOpen(true), 0);
                                                                    // Optional: call store method to persist change to backend
                                                                    updateApplicantStatus(org_id, opp_id, applicant.id, option.status);
                                                                }}
                                                            >
                                                                <option.icon className={`w-4 h-4 ${option.color}`} />
                                                                {option.label}
                                                            </DropdownMenuItem>
                                                        ))}
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </div>

                                            {applicant.status === 'applied' && (
                                                <div className="mt-3 flex gap-2 pl-14">
                                                    <Button size="xs" variant="outline">
                                                        <Mail className="w-3 h-3 mr-1" />
                                                        Email
                                                    </Button>
                                                    <Button
                                                        size="xs"
                                                        variant="outline"
                                                        onClick={() => downloadResume(applicant.resume_link)}
                                                    >
                                                        <Download className="w-3 h-3 mr-1" />
                                                        Resume
                                                    </Button>
                                                    <div className="flex-1" />
                                                    <Button size="xs" variant="ghost" className="text-red-500">
                                                        <XCircle className="w-4 h-4" />
                                                    </Button>
                                                    <Button size="xs" variant="ghost" className="text-green-600">
                                                        <CheckCircle2 className="w-4 h-4" />
                                                    </Button>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                        </div>
                    )}
                </div>
            </SheetContent>
        </Sheet>
    );
};
