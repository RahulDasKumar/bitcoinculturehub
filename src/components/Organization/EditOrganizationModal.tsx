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
import { useOrganizationStore } from "@/hooks/use-organization";
import useAuthStore from "@/hooks/use-auth";
import { Organization } from "../types";

interface EditOrganizationModalProps {
    organization: Partial<Organization>

}


export const EditOrganizationModal = ({ organization }: EditOrganizationModalProps) => {
    const { editOrganization } = useOrganizationStore()
    const { token } = useAuthStore()

    const [formData, setFormData] = useState<Partial<Organization>>({
        name: organization.name,
        location: organization.location,
        website: organization.website,
        description: organization.description,
    })
    console.log(organization, '  is the organization')
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
                        placeholder={organization.name}
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                    />

                    <Input
                        label="Location"
                        name="location"
                        placeholder={organization.location}
                        value={formData.location}
                        onChange={handleInputChange}
                        required
                    />

                    <Input
                        label="Website"
                        name="website"
                        placeholder={organization.website}
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
                        editOrganization(organization.id,formData,token)
                    }}
                >
                    Save Changes
                </Button>
            </SheetContent>
        </Sheet>
    );
};
