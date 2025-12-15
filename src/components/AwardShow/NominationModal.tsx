import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { categories } from "./CategoryCard";
import { CheckCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";

interface NominationModalProps {
  open: boolean;
  onClose: () => void;
  initialCategoryId?: string;
}

export const NominationModal = ({
  open,
  onClose,
  initialCategoryId,
}: NominationModalProps) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    categoryId: initialCategoryId || "",
    name: "",
    type: "",
    url: "",
    proofUrl: "",
    description: "",
    highlights: "",
    imageUrl: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    setSubmitted(true);
    toast({
      title: "Nomination submitted! 🎉",
      description: "Your nomination is pending committee review",
    });
    setTimeout(() => {
      handleClose();
    }, 2000);
  };

  const handleClose = () => {
    setStep(1);
    setFormData({
      categoryId: initialCategoryId || "",
      name: "",
      type: "",
      url: "",
      proofUrl: "",
      description: "",
      highlights: "",
      imageUrl: "",
    });
    setSubmitted(false);
    onClose();
  };

  const canProceed = () => {
    if (step === 1) return formData.categoryId !== "";
    if (step === 2) {
      return (
        formData.name !== "" &&
        formData.type !== "" &&
        formData.url !== "" &&
        formData.description !== ""
      );
    }
    return true;
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        {!submitted ? (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl">Submit a Nomination</DialogTitle>
              <DialogDescription>
                Step {step} of 3: {step === 1 ? "Select Category" : step === 2 ? "Nominee Details" : "Review & Submit"}
              </DialogDescription>
            </DialogHeader>

            <AnimatePresence mode="wait">
              {/* Step 1: Select Category */}
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4"
                >
                  <div className="space-y-2">
                    <Label>Category *</Label>
                    <Select
                      value={formData.categoryId}
                      onValueChange={(value) =>
                        setFormData({ ...formData, categoryId: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((cat) => (
                          <SelectItem key={cat.id} value={cat.id}>
                            {cat.icon} {cat.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </motion.div>
              )}

              {/* Step 2: Details */}
              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4"
                >
                  <div className="grid gap-4">
                    <div className="space-y-2">
                      <Label>Nominee Name *</Label>
                      <Input
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        placeholder="Full name or project name"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Type *</Label>
                      <Select
                        value={formData.type}
                        onValueChange={(value) =>
                          setFormData({ ...formData, type: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="person">Person</SelectItem>
                          <SelectItem value="project">Project</SelectItem>
                          <SelectItem value="podcast">Podcast</SelectItem>
                          <SelectItem value="event">Event</SelectItem>
                          <SelectItem value="artwork">Artwork</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Primary URL *</Label>
                      <Input
                        value={formData.url}
                        onChange={(e) =>
                          setFormData({ ...formData, url: e.target.value })
                        }
                        placeholder="https://..."
                        type="url"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Proof/Evidence Links (optional)</Label>
                      <Input
                        value={formData.proofUrl}
                        onChange={(e) =>
                          setFormData({ ...formData, proofUrl: e.target.value })
                        }
                        placeholder="Additional links"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Short Description * (max 280 characters)</Label>
                      <Textarea
                        value={formData.description}
                        onChange={(e) =>
                          setFormData({ ...formData, description: e.target.value })
                        }
                        placeholder="Brief description of the nominee"
                        maxLength={280}
                        rows={3}
                      />
                      <p className="text-xs text-muted-foreground text-right">
                        {formData.description.length}/280
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label>Highlights/Evidence (optional)</Label>
                      <Textarea
                        value={formData.highlights}
                        onChange={(e) =>
                          setFormData({ ...formData, highlights: e.target.value })
                        }
                        placeholder="Why should they win? Key achievements..."
                        rows={4}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Cover Image URL (optional)</Label>
                      <Input
                        value={formData.imageUrl}
                        onChange={(e) =>
                          setFormData({ ...formData, imageUrl: e.target.value })
                        }
                        placeholder="https://..."
                        type="url"
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Review */}
              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4"
                >
                  <Card className="p-5 bg-gradient-card border-border space-y-3">
                    <h3 className="font-bold text-lg">Review Your Nomination</h3>
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="text-muted-foreground">Category:</span>{" "}
                        <span className="font-medium">
                          {categories.find((c) => c.id === formData.categoryId)?.title}
                        </span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Nominee:</span>{" "}
                        <span className="font-medium">{formData.name}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Type:</span>{" "}
                        <span className="font-medium capitalize">{formData.type}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Description:</span>
                        <p className="mt-1">{formData.description}</p>
                      </div>
                    </div>
                  </Card>

                  <div className="p-4 bg-muted/50 rounded-lg">
                    <p className="text-sm text-muted-foreground">
                      <strong>Next steps:</strong> Your nomination will be reviewed by our
                      committee. Approved nominations will appear in the live voting round
                      within 24-48 hours.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex justify-between pt-4 border-t border-border">
              <Button
                variant="outline"
                onClick={() => (step > 1 ? setStep(step - 1) : handleClose())}
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                {step === 1 ? "Cancel" : "Back"}
              </Button>

              {step < 3 ? (
                <Button
                  onClick={() => setStep(step + 1)}
                  disabled={!canProceed()}
                  className="bg-gradient-primary text-primary-foreground"
                >
                  Next
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  className="bg-gradient-primary text-primary-foreground"
                >
                  Submit Nomination
                </Button>
              )}
            </div>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="py-12 text-center space-y-4"
          >
            <CheckCircle className="h-16 w-16 text-accent mx-auto" />
            <h3 className="text-2xl font-bold">Nomination Submitted!</h3>
            <p className="text-muted-foreground">
              Status: <span className="text-primary font-medium">Pending Committee Review</span>
            </p>
          </motion.div>
        )}
      </DialogContent>
    </Dialog>
  );
};