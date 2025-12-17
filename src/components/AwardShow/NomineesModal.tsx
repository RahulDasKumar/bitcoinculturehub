import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { categories, mockNominees } from "./CategoryCard";
import { ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface NomineesModalProps {
  open: boolean;
  onClose: () => void;
}

export const NomineesModal = ({ open, onClose }: NomineesModalProps) => {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const toggleCategory = (categoryId: string) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
  };

  // Get nominees for a category (using mock data for now)
  const getNomineesForCategory = (categoryId: string) => {
    return mockNominees.filter(n => n.categoryId === categoryId);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[85vh] p-0">
        <DialogHeader className="px-6 pt-6 pb-4 border-b border-border">
          <DialogTitle className="text-2xl font-display uppercase">
            All Award Categories & Nominees
          </DialogTitle>
          <p className="text-sm text-muted-foreground">
            Explore all 21 categories and their nominees for the 2025 Proof of Work Awards.
          </p>
        </DialogHeader>

        <ScrollArea className="h-[60vh] px-6 py-4">
          <div className="space-y-3">
            {categories.map((category) => {
              const isExpanded = expandedCategory === category.id;
              const nominees = getNomineesForCategory(category.id);

              return (
                <div
                  key={category.id}
                  className="border border-border rounded-lg overflow-hidden"
                >
                  {/* Category Header */}
                  <button
                    onClick={() => toggleCategory(category.id)}
                    className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors text-left"
                  >
                    <div className="flex items-center gap-3">
                      <div>
                        <h3 className="font-display text-base uppercase tracking-wide">
                          {category.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {category.description}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant="secondary" className="text-xs">
                        {category.nominationCount} nominees
                      </Badge>
                      {isExpanded ? (
                        <ChevronUp className="w-5 h-5 text-muted-foreground" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-muted-foreground" />
                      )}
                    </div>
                  </button>

                  {/* Nominees List */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="border-t border-border bg-muted/30"
                      >
                        <div className="p-4 space-y-3">
                          {nominees.length > 0 ? (
                            nominees.map((nominee) => (
                              <div
                                key={nominee.id}
                                className="flex items-start gap-3 p-3 bg-background rounded-lg border border-border"
                              >
                                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-sm font-medium flex-shrink-0">
                                  {nominee.name.charAt(0)}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2">
                                    <h4 className="font-medium text-sm">
                                      {nominee.name}
                                    </h4>
                                    {nominee.rank && nominee.rank <= 3 && (
                                      <Badge className="bg-primary/20 text-primary text-xs">
                                        Top {nominee.rank}
                                      </Badge>
                                    )}
                                  </div>
                                  <p className="text-xs text-muted-foreground">
                                    {nominee.subtitle}
                                  </p>
                                  <p className="text-xs text-muted-foreground mt-1">
                                    {nominee.description}
                                  </p>
                                </div>
                              </div>
                            ))
                          ) : (
                            <p className="text-sm text-muted-foreground text-center py-4">
                              Nominees will be revealed soon.
                            </p>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
