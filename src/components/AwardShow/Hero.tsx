import { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface HeroProps {
  onStartVoting: () => void;
  onNominate: () => void;
}

const slides = [
  {
    id: 1,
    title: "BITCOIN HALL OF FAME",
    subtitle: "Honoring the legends who built the foundation",
    tag: "Hall of Fame",
  },
  {
    id: 2,
    title: "SATOSHI NAKAMOTO",
    subtitle: "The Creator · Class of 2025",
    tag: "Hall of Famer",
  },
  {
    id: 3,
    title: "BEST BITCOIN PODCAST",
    subtitle: "2025 Award Winner",
    tag: "Award",
  },
  {
    id: 4,
    title: "BUILDER OF THE YEAR",
    subtitle: "2025 Award Winner",
    tag: "Award",
  },
  {
    id: 5,
    title: "MEME OF THE YEAR",
    subtitle: "2025 Award Winner",
    tag: "Award",
  },
];

export const Hero = ({ onStartVoting, onNominate }: HeroProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };

    emblaApi.on("select", onSelect);
    onSelect();

    // Auto-play
    const interval = setInterval(() => {
      emblaApi.scrollNext();
    }, 5000);

    return () => {
      emblaApi.off("select", onSelect);
      clearInterval(interval);
    };
  }, [emblaApi]);

  const scrollPrev = () => emblaApi?.scrollPrev();
  const scrollNext = () => emblaApi?.scrollNext();
  const scrollTo = (index: number) => emblaApi?.scrollTo(index);

  return (
    <section className="bg-accent text-white relative">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {slides.map((slide) => (
            <div
              key={slide.id}
              className="flex-[0_0_100%] min-w-0"
            >
              <div className="container mx-auto max-w-7xl px-4 py-16 md:py-24 lg:py-32">
                <div className="max-w-5xl">
                  {/* Tag */}
                  <span className="inline-block text-xs uppercase tracking-widest text-white/60 mb-4">
                    {slide.tag}
                  </span>
                  
                  <h1 className="text-5xl md:text-7xl lg:text-8xl font-display leading-[0.85] mb-4 md:mb-6 tracking-tighter">
                    {slide.title}
                  </h1>
                  
                  <p className="text-base md:text-lg text-white/80">
                    {slide.subtitle}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={scrollPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center text-white/60 hover:text-white transition-colors"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={scrollNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center text-white/60 hover:text-white transition-colors"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollTo(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === selectedIndex
                ? "bg-white w-6"
                : "bg-white/40 hover:bg-white/60"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};
