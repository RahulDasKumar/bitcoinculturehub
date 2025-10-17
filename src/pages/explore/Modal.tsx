"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import BookmarkButton from "../../components/BookmarkButton";
import { FEATURE_EXPLORE_MODAL_NAV } from "@/lib/features";
import { inferItemType, type ItemType } from "@/lib/bookmark-utils";
import { API_BASE_URL } from "@/config";
interface ModalItem {
  id?: string;
  title: string;
  description?: string;
  summary?: string;
  content?: string;
  bio?: string;
  genesis?: string;
  development?: string;
  legacy?: string;
  category: string;
  tags: string[];
  image_url?: string;
  image?: string;
  external_url?: string;
  logo_url?: string;
}

interface ExploreModalProps {
  item: ModalItem | null;
  isOpen: boolean;
  onClose: () => void;
  onPrev?: () => void;
  onNext?: () => void;
  canGoPrev?: boolean;
  canGoNext?: boolean;
}

const ExploreModal = ({ item, isOpen, onClose, onPrev, onNext, canGoPrev, canGoNext }: ExploreModalProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    if (isOpen) setImageLoaded(false);
  }, [isOpen, item]);

  // Keyboard navigation - feature flagged
  useEffect(() => {
    if (!isOpen || !FEATURE_EXPLORE_MODAL_NAV) return;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' && onPrev && canGoPrev) {
        e.preventDefault();
        onPrev();
      } else if (e.key === 'ArrowRight' && onNext && canGoNext) {
        e.preventDefault();
        onNext();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onPrev, onNext, canGoPrev, canGoNext]);

  // Preload neighbor images when modal is open
  useEffect(() => {
    if (!isOpen || !FEATURE_EXPLORE_MODAL_NAV) return;
    
    // This would need access to the snapshot to preload neighbor images
    // For now, we'll just ensure the current image loads properly
  }, [isOpen, item]);

  if (!item) return null;
  console.log("🟣 [Modal] Opened modal with item:", item.title, {
    image_url: item.image_url,
    fullImage: item.image_url?.startsWith("http") ? item.image_url : `${API_BASE_URL}${item.image_url}`,
    isOpen,
  });

  const imgSrc = (() => {
    const imgSrc = (() => {
      if (!item) return "/placeholder.svg";
      
      // Log item to inspect
      console.log("🧩 [Modal] Item received in modal:", item);
      
      // Determine image URL logic
      if (!item.image_url) {
        console.warn("⚠️ [Modal] item.image_url is missing, using placeholder.");
        return "/placeholder.svg";
      }
      
      if (item.image_url.startsWith("http")) {
        console.log("🟢 [Modal] Using full URL:", item.image_url);
        return item.image_url;
      }
      
      const finalUrl = `${API_BASE_URL}${item.image_url}`;
      console.log("🟢 [Modal] Constructed image URL:", finalUrl);
      return finalUrl;
    })();

    console.log("🟢 [Modal] Final image src resolved to:", imgSrc);

    if (!item) return "/placeholder.svg";
  
    // Log item to inspect
    console.log("🧩 [Modal] Item received in modal:", item);
  
    // Determine image URL logic
    if (!item.image_url) {
      console.warn("⚠️ [Modal] item.image_url is missing, using placeholder.");
      return "/placeholder.svg";
    }
  
    if (item.image_url.startsWith("http")) {
      console.log("🟢 [Modal] Using full URL:", item.image_url);
      return item.image_url;
    }
  
    const finalUrl = `${API_BASE_URL}${item.image_url}`;
    console.log("🟢 [Modal] Constructed image URL:", finalUrl);
    return finalUrl;
  })();
  


  return (
    <Dialog open={Boolean(item && isOpen)} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="z-[100] max-w-4xl max-h-[90vh] overflow-y-auto bg-card border-border p-0">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-50 p-2 rounded-full bg-background/80 hover:bg-background transition-colors"
        >
          <X className="w-5 h-5 text-foreground" />
        </button>

        {/* Navigation arrows - feature flagged */}
        {FEATURE_EXPLORE_MODAL_NAV && onPrev && (
          <button
            onClick={onPrev}
            disabled={!canGoPrev}
            className={`absolute left-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full transition-all duration-200 ${
              canGoPrev 
                ? 'bg-background/80 hover:bg-background text-foreground hover:scale-110' 
                : 'bg-background/40 text-muted-foreground cursor-not-allowed'
            }`}
            style={{ minWidth: '44px', minHeight: '44px' }}
            aria-label="Previous item"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}

        {FEATURE_EXPLORE_MODAL_NAV && onNext && (
          <button
            onClick={onNext}
            disabled={!canGoNext}
            className={`absolute right-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full transition-all duration-200 ${
              canGoNext 
                ? 'bg-background/80 hover:bg-background text-foreground hover:scale-110' 
                : 'bg-background/40 text-muted-foreground cursor-not-allowed'
            }`}
            style={{ minWidth: '44px', minHeight: '44px' }}
            aria-label="Next item"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}

        <div className="relative aspect-video bg-muted">
          <img
            src={imgSrc}
            alt={item.title}
            className={`w-full h-full object-cover transition-opacity duration-300 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
            onLoad={() => {
              console.log("✅ [Modal] Image loaded successfully:", imgSrc);
              setImageLoaded(true);
            }}
            onError={(e) => {
              console.error("❌ [Modal] Image failed to load:", imgSrc);
              setImageLoaded(true);
              e.currentTarget.src = "/placeholder.svg";
            }}
            
          />
          {!imageLoaded && <div className="absolute inset-0 bg-muted animate-pulse" />}

          {item.category && (
            <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground font-semibold">
              {item.category.endsWith("s") ? item.category.slice(0, -1) : item.category}
            </Badge>
          )}
        </div>

        <div className="p-8">
          <div className="mb-8">
            <div className="flex items-start justify-between mb-4">
              <h1 className="text-4xl font-bold text-card-foreground leading-tight">
                {item.title}
              </h1>
            </div>
            <div className="flex flex-wrap gap-2">
              {(item.tags ?? []).map((tag) => (
                <span key={tag} className="px-3 py-1 text-sm bg-muted text-muted-foreground rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-8 text-card-foreground">
            <section>
              <h2 className="text-2xl font-bold mb-4 text-primary">Description</h2>
              <p className="text-lg leading-relaxed text-muted-foreground">{item.description || item.summary || item.content}</p>
            </section>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ExploreModal;