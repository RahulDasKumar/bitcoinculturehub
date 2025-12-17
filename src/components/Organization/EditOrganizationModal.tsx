import { useState } from "react";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Edit } from "lucide-react";
import { Input } from "./Authentication/ui/Input";
import { Button } from "@/components/ui/button";

export interface EditOrganizationModalProps {
    organization: Partial<{
        id: string;
        name: string;
        type: string;
        location: string;
        email: string;
        status: string;
        submittedAt: string;
        description: string;
        website: string;
    }>;
}

export const EditOrganizationModal = ({ organization }: EditOrganizationModalProps) => {
    const [formData, setFormData] = useState({
        name: "",
        location:  "",
        website: "",
        description:  "",
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="default" size="lg" className="mr-1">
                    <Edit className="w-3 h-3" /> Edit Organization
                </Button>
            </SheetTrigger>

            <SheetContent side="right" className="w-80 sm:w-96">
                <SheetHeader>
                    <SheetTitle>Edit Organization</SheetTitle>
                    <SheetDescription>
                        Update your organization’s information.
                    </SheetDescription>
                </SheetHeader>

                <div className="mt-6 space-y-4">
                    <Input
                        label="Organization Name"
                        name="name"
                        placeholder="Enter organization name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                    />

                    <Input
                        label="Location"
                        name="location"
                        placeholder="Enter location"
                        value={formData.location}
                        onChange={handleInputChange}
                        required
                    />

                    <Input
                        label="Website"
                        name="website"
                        placeholder="Enter website URL"
                        value={formData.website}
                        onChange={handleInputChange}
                    />

                    <Input
                        label="Description"
                        name="description"
                        placeholder="Enter a brief description"
                        value={formData.description}
                        onChange={handleInputChange}
                        className="h-[1/2]"
                    />
                </div>

                <Button
                    className="mt-9"
                    onClick={() => {
                        console.log("Updated organization data:", formData);
                       
                    }}
                >
                    Save Changes
                </Button>
            </SheetContent>
        </Sheet>
    );
};
