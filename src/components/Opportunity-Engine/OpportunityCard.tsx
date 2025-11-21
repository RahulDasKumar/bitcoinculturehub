import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MapPin, Globe } from "lucide-react";
import useAuthStore from "@/hooks/use-auth";
import { useState } from "react";
interface OpportunityCardProps {
    type: "job" | "internship" | "volunteer";
    title: string;
    description: string;
    postedBy: string;
    postedDate: string;
    location?: string;
    remote?: boolean;
    jobID:string;
    applicants:string[];
}

const typeConfig = {
    job: { label: "Job", color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200" },
    internship: { label: "Internship", color: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200" },
    volunteer: { label: "Volunteer", color: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200" }
};



export const OpportunityCard = ({
    type,
    title,
    description,
    postedBy,
    postedDate,
    location,
    remote,
    jobID,
    applicants,
}: OpportunityCardProps) => {
    const config = typeConfig[type];
    const { user, isLoggedIn, logout } = useAuthStore();
    const [applicantList, setApplicants] = useState(applicants || []);
    const applyToJob = async (jobID: string, userEmail: string) => {
        const response = await fetch(`https://bch-backend-7vjs.onrender.com/jobs/${jobID}/apply`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify([userEmail])
        });
        const updatedJobs = await response.json()
        setApplicants(updatedJobs.applicants)

    }
    const isNotified = applicantList.includes(user.email);
    return (
        <Card className="p-6 hover:shadow-lg transition-shadow duration-200 border-border bg-card">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div className="flex-1 space-y-3">
                    <div className="flex items-center gap-2 flex-wrap">
                        <Badge className={config.color} variant="secondary">
                            {config.label}
                        </Badge>
                        {remote && (
                            <Badge variant="outline" className="gap-1">
                                <Globe className="h-3 w-3" />
                                Remote
                            </Badge>
                        )}
                    </div>

                    <div>
                        <h3 className="text-xl font-semibold text-foreground mb-2">
                            {title}
                        </h3>
                        <p className="text-muted-foreground text-sm mb-2">
                            Posted by {postedBy} • {postedDate}
                        </p>
                    </div>

                    <p className="text-foreground leading-relaxed">
                        {description}
                    </p>

                    {location && (
                        <div className="flex items-center gap-1 text-muted-foreground text-sm">
                            <MapPin className="h-4 w-4" />
                            <span>{location}</span>
                        </div>
                    )}
                </div>
                
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90 shrink-0" onClick={() => applyToJob(jobID, user.email)}
                    disabled={isNotified}>
                    {isNotified ? "Notified" : "I'm interested"}
                    
                </Button>
            </div>
        </Card>
    );
};
