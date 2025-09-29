import { useState } from 'react';
import { Loader2 } from 'lucide-react';

interface DynamicImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackSrc?: string;
  showLoader?: boolean;
}

const DynamicImage = ({ 
  src, 
  alt, 
  className = "", 
  fallbackSrc = "/placeholder.svg",
  showLoader = true 
}: DynamicImageProps) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const handleLoad = () => {
    setLoading(false);
  };

  const handleError = () => {
    setLoading(false);
    setError(true);
  };

  return (
    <div className="relative">
      {loading && showLoader && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted/50 rounded">
          <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
        </div>
      )}
      <img
        src={error ? fallbackSrc : src}
        alt={alt}
        className={className}
        onLoad={handleLoad}
        onError={handleError}
      />
    </div>
  );
};

export default DynamicImage;