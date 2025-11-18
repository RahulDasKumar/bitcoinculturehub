import { useState } from "react";
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

type ContentType = "artifact" | "creator" | "meme" | "community" | "event";

const SubmitContent = () => {
  const navigate = useNavigate();
  const [contentType, setContentType] = useState<ContentType>("artifact");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    type: "",
    tags: "",
  });


   // 🔹 Category mapping (aligns with MongoDB categories)
   const categoryMap: Record<ContentType, string> = {
    artifact: "Artifacts",
    creator: "Creators",
    meme: "Memes",
    community: "Communities",
    event: "Events",
  };
  
  // 🔹 Handle input change
  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };
  // 🔹 Submit handler — sends data to FastAPI
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const data = new FormData();
      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("category", categoryMap[contentType]);
      data.append("type", contentType);
      data.append("tags", formData.tags);
      if (file) data.append("file", file);
      console.log("📤 Submitting to:", `https://bch-backend-7vjs.onrender.com/explore`);
      console.log("📦 FormData:", [...data.entries()]);

      const response = await fetch(`https://bch-backend-7vjs.onrender.com/explore`, {
        method: "POST",
        body: data,
      });
      console.log(response,'WOOOOOOOOOOOO')
      if (response.ok) {
        console.log('added to database')
        toast.success("🎉 Content submitted successfully!");
        setTimeout(() => navigate("/explore"), 800);
      } else {
        const err = await response.json();
        toast.error(`Failed to submit: ${err.detail || "Unknown error"}`);
      }
    } catch (err: any) {
      console.error(err);
      toast.error("Error submitting content.");
    } finally {
      setIsSubmitting(false);
    }
  };

  

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Back to Explore */}
        <Button
          variant="ghost"
          onClick={() => navigate("/explore")}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Explore
        </Button>

        <Card>
          <CardHeader>
            <CardTitle>Submit Bitcoin Culture</CardTitle>
            <CardDescription>
              Contribute to the Bitcoin cultural archive. Your submissions are stored in the global database and visible on the Explore page.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <Alert className="mb-6">
              <Info className="h-4 w-4" />
              <AlertDescription>
                Submissions are reviewed automatically and stored on the Bitcoin Culture Hub database.
              </AlertDescription>
            </Alert>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Content Type */}
              <div className="space-y-2">
                <Label htmlFor="type">Content Type</Label>
                <Select
                  value={contentType}
                  onValueChange={(value) => setContentType(value as ContentType)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="artifact">Artifact (Art, Music, etc.)</SelectItem>
                    <SelectItem value="creator">Creator</SelectItem>
                    <SelectItem value="meme">Meme</SelectItem>
                    <SelectItem value="community">Community</SelectItem>
                    <SelectItem value="event">Event</SelectItem>
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
                  placeholder="Enter title..."
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
                  placeholder="Describe your content..."
                  rows={4}
                  required
                />
              </div>

              {/* Tags */}
              <div className="space-y-2">
                <Label htmlFor="tags">Tags (comma-separated)</Label>
                <Input
                  id="tags"
                  value={formData.tags}
                  onChange={(e) => handleInputChange("tags", e.target.value)}
                  placeholder="bitcoin, culture, art"
                />
              </div>

              {/* File Upload */}
              <div className="space-y-2">
                <Label htmlFor="file">Upload Image</Label>
                <Input
                  id="file"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                />
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
                  "Submit for Review"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SubmitContent;
