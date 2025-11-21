import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "sonner";
import { ArrowLeft, Loader2, Info } from "lucide-react";

console.log("🌐 import.meta.env:", import.meta.env);

const SubmitOpportunity = () => {
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Automatically set posted date
    const [postedDate, setPostedDate] = useState("0d ago");

    useEffect(() => {
        // Automatically compute 0d ago for new posts
        setPostedDate("0d ago");
    }, []);

    // Form Data
    const [formData, setFormData] = useState({
        type: "volunteer",
        title: "",
        description: "",
        postedBy: "",
        remote: false,
    });

    const handleInputChange = (field: string, value: any) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const data = new FormData();
            data.append("type", formData.type);
            data.append("title", formData.title);
            data.append("description", formData.description);
            data.append("postedBy", formData.postedBy);
            data.append("postedDate", postedDate); // auto date
            data.append("remote", String(formData.remote));

            console.log("📤 Submitting opportunity:", [...data.entries()]);

            const response = await fetch(`https://bch-backend-7vjs.onrender.com/jobs/`, {
                method: "POST",
                body: data,
            });

            if (response.ok) {
                toast.success("🎉 Opportunity submitted successfully!");
                setTimeout(() => navigate("/opportunity"), 800);
            } else {
                const err = await response.json();
                toast.error(`Failed to submit: ${err.detail || "Unknown error"}`);
            }
        } catch (err) {
            toast.error("Error submitting opportunity.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-background py-8 px-4">
            <div className="max-w-2xl mx-auto">
                <Button variant="ghost" onClick={() => navigate("/opportunity")} className="mb-6">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Opportunities
                </Button>

                <Card>
                    <CardHeader>
                        <CardTitle>Submit Volunteer Opportunity</CardTitle>
                        <CardDescription>
                            Add a Bitcoin-related volunteer or community contribution opportunity.
                        </CardDescription>
                    </CardHeader>

                    <CardContent>
                        <Alert className="mb-6">
                            <Info className="h-4 w-4" />
                            <AlertDescription>
                                Your submission will be reviewed and published in the opportunities directory.
                            </AlertDescription>
                        </Alert>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Type */}
                            <div className="space-y-2">
                                <Label>Opportunity Type</Label>
                                <Select
                                    value={formData.type}
                                    onValueChange={(value) => handleInputChange("type", value)}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="volunteer">Volunteer</SelectItem>
                                        <SelectItem value="job">Job</SelectItem>
                                        <SelectItem value="grant">Grant</SelectItem>
                                        <SelectItem value="bounty">Bounty</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Title */}
                            <div className="space-y-2">
                                <Label htmlFor="title">Title</Label>
                                <Input
                                    id="title"
                                    value={formData.title}
                                    onChange={(e) => handleInputChange("title", e.target.value)}
                                    placeholder="Grant Review Committee Member"
                                    required
                                />
                            </div>

                            {/* Description */}
                            <div className="space-y-2">
                                <Label htmlFor="description">Description</Label>
                                <Textarea
                                    id="description"
                                    value={formData.description}
                                    onChange={(e) => handleInputChange("description", e.target.value)}
                                    placeholder="Describe the opportunity..."
                                    rows={4}
                                    required
                                />
                            </div>

                            {/* Posted By */}
                            <div className="space-y-2">
                                <Label htmlFor="postedBy">Posted By</Label>
                                <Input
                                    id="postedBy"
                                    value={formData.postedBy}
                                    onChange={(e) => handleInputChange("postedBy", e.target.value)}
                                    placeholder="individual, org, project, etc."
                                    required
                                />
                            </div>

                            {/* Remote */}
                            <div className="flex items-center gap-3">
                                <input
                                    type="checkbox"
                                    checked={formData.remote}
                                    onChange={(e) => handleInputChange("remote", e.target.checked)}
                                    className="h-4 w-4"
                                />
                                <Label>Remote Opportunity</Label>
                            </div>

                            {/* Submit */}
                            <Button
                                type="submit"
                                className="w-full bg-[#FF5C35] hover:bg-[#ff3c00] text-white"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Submitting...
                                    </>
                                ) : (
                                    "Submit Opportunity"
                                )}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default SubmitOpportunity;
