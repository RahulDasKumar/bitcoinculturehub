import React, { useEffect, useState } from "react";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Input } from "./Authentication/ui/Input";
import { Button } from "@/components/ui/button";
import { Opportunity } from "../types";
import { ButtonGroup } from "@/components/ui/opportunity-job-select";
import { Plus } from "lucide-react";
import useAuthStore from "@/hooks/use-auth";
import { useOrganizationStore } from "@/hooks/use-organization";

interface AddOpportunityModalProps {
    opportunityTitle?: string;
    opportunityType?: string;
    opportunityDescription?: string;
    location?: string;
    org_id: string;
    opp_id:string;
    opportunityCategories:string[]
}


export const EditOpportunityModal = ({
    opportunityTitle,
    opportunityType,
    opportunityDescription,
    opportunityCategories,
    location,
    org_id,
    opp_id
}: AddOpportunityModalProps) => {
    const { token } = useAuthStore()
    const options = ["Job", "Collaboration", "Grant", "Volunteer"];
    const categoryOptions = [
        "Development",
        "Editing",
        "Content",
        "Social Media",
        "Speaking",
        "Education",
        "Design",
        "Marketing",
        "Event",
        "Volunteer",
        "Creator Collab",
        "Street Team",
        "Ops / Event Ops",
        "Content / Writing",
        "Product / Research",
        "Engineering / Technical",
        "Campus / Student Club",
        "Internship / Fellowship"
    ];

    const timeUnits = ["Hours", "Days", "Weeks", "Months"];
    const { editOpportunity } = useOrganizationStore()
    console.log(opportunityCategories)
    const [formData, setFormData] = useState<Partial<Opportunity>>({
        title: opportunityTitle,
        type: opportunityType,
        description: opportunityDescription,
        id: org_id,
        location: location,
        time_commitment: "",
        categories: opportunityCategories || []
    });
    useEffect(() => {
        setFormData(prev => ({
            ...prev,
            categories: opportunityCategories || [],
            title: opportunityTitle || prev.title,
            type: opportunityType || prev.type,
            description: opportunityDescription || prev.description,
            location: location || prev.location,
        }));
    }, [opportunityCategories, opportunityTitle, opportunityType, opportunityDescription, location]);
    const [duration, setDuration] = useState("");
    const [unit, setUnit] = useState("Hours");
    
    useEffect(() => {
        if (duration) {
            setFormData(prev => ({ ...prev, timeCommitment: `${duration} ${unit}` }));
        } else {
            setFormData(prev => ({ ...prev, timeCommitment: "" }));
        }
    }, [duration, unit]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const toggleCategory = (category: string) => {
        setFormData(prev => {
            const current = prev.categories || [];
            const newCategories = current.includes(category)
                ? current.filter(c => c !== category)
                : [...current, category];
            return { ...prev, categories: newCategories };
        });
    };

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="ghost" size="sm">Edit</Button>
            </SheetTrigger>

            <SheetContent side="right" className="w-80 sm:w-96 overflow-y-auto">
                <SheetHeader>
                    <SheetTitle>Create Opportunity</SheetTitle>
                    <SheetDescription>
                        Create a new opportunity for the bitcoin world.
                    </SheetDescription>
                </SheetHeader>

                {/* form data */}
                <div className="mt-6 space-y-4">
                    <Input
                        label="Title"
                        name="title"
                        placeholder={`${opportunityTitle || 'Title'}`}
                        value={formData.title}
                        onChange={handleInputChange}
                        required
                    />

                    <div>
                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-2 block">
                            Type
                        </label>
                        <ButtonGroup>
                            {options.map((option) => (
                                <Button
                                    key={option}
                                    variant={formData.categories.includes(option) ? "default" : "outline"}
                                    size="sm"
                                    onClick={() => setFormData(prev => ({ ...prev, type: option }))}
                                >
                                    {option}
                                </Button>
                            ))}
                        </ButtonGroup>
                    </div>

                    <div>
                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-2 block">
                            Categories
                        </label>
                        <div className="flex flex-wrap gap-2">
                            {categoryOptions.map((cat) => (
                                <Button
                                    key={cat}
                                    variant={formData.categories?.includes(cat) ? "default" : "outline"}
                                    size="sm"
                                    onClick={() => toggleCategory(cat)}
                                    className="h-7 text-xs rounded-full"
                                >
                                    {cat}
                                </Button>
                            ))}
                        </div>
                    </div>

                    <Input
                        label="Description"
                        name="description"
                        placeholder={`${opportunityDescription || 'Description'}`}
                        value={formData.description}
                        onChange={handleInputChange}
                    />

                    <Input
                        label="Location"
                        name="location"
                        placeholder={`${location || 'Location'}`}
                        value={formData.location}
                        onChange={handleInputChange}
                    />

                    {/* Time Commitment Slot */}
                    <div className="flex flex-col items-center justify-center">
                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-2 block ">
                            Time Commitment
                        </label>
                        <div className="flex gap-2">
                            <Input
                                type="number"
                                min="1"
                                placeholder="Duration"
                                value={duration}
                                onChange={(e) => setDuration(e.target.value)}
                                className="w-1/2" label={"timeCommitment"} />
                            <select
                                className="flex h-10 w-1/2 rounded-md border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mt-7"
                                value={unit}
                                onChange={(e) => setUnit(e.target.value)}
                            >
                                {timeUnits.map((u) => (
                                    <option key={u} value={u}>{u}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                <Button className="mt-9 w-full"
                    onClick={() => {
                        editOpportunity(formData, token,opp_id,org_id)
                    }}>
                    Submit
                </Button>
            </SheetContent>
        </Sheet>
    );
}
