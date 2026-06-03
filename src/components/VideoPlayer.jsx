import { useState, useCallback, useMemo, memo } from "react";
import { motion } from "framer-motion";

// Memoized thumbnail component to prevent unnecessary re-renders
const Thumbnail = memo(({ src, alt, isActive, onClick, index }) => (
  <motion.button
    onClick={onClick}
    className={`relative h-20 w-20 rounded-lg border-2 transition-all duration-200 flex-shrink-0 ${
      isActive 
        ? "border-[var(--accent)] shadow-lg shadow-[var(--accent)]" 
        : "border-[var(--border)] hover:border-[var(--accent)]"
    }`}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.98 }}
  >
    <img
      src={src}
      alt={alt}
      className="h-full w-full object-cover rounded-md"
      loading="lazy"
      decoding="async"
    />
    {isActive && (
      <div className="absolute inset-0 rounded-md bg-black/20 flex items-center justify-center">
        <div className="w-0 h-0 border-l-8 border-r-0 border-t-5 border-b-5 border-l-white border-t-transparent border-b-transparent" />
      </div>
    )}
  </motion.button>
));

Thumbnail.displayName = "Thumbnail";

export function VideoPlayer({ 
  videoSrc = "https://via.placeholder.com/800x600?text=Video+Player",
  thumbnails = [],
  title = "Training Video",
  description = "Video description here"
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  // Memoize thumbnail list to avoid recalculation
  const displayThumbnails = useMemo(() => {
    if (thumbnails.length === 0) {
      // Generate placeholder thumbnails if none provided
      return Array.from({ length: 6 }, (_, i) => ({
        src: `https://via.placeholder.com/80x80?text=Video+${i + 1}`,
        alt: `Video thumbnail ${i + 1}`,
        id: i,
      }));
    }
    return thumbnails;
  }, [thumbnails]);

  const handleThumbnailClick = useCallback((index) => {
    setActiveIndex(index);
    setIsPlaying(true);
  }, []);

  const handlePrevious = useCallback(() => {
    setActiveIndex((prev) => (prev === 0 ? displayThumbnails.length - 1 : prev - 1));
  }, [displayThumbnails.length]);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev === displayThumbnails.length - 1 ? 0 : prev + 1));
  }, [displayThumbnails.length]);

  return (
    <div className="w-full space-y-4">
      {/* Main Video Container */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="relative rounded-3xl border border-[var(--border)] bg-[var(--panel)] overflow-hidden"
      >
        <div className="relative aspect-video w-full bg-black flex items-center justify-center group cursor-pointer"
          onClick={() => setIsPlaying(!isPlaying)}
        >
          <img
            src={displayThumbnails[activeIndex]?.src || videoSrc}
            alt={title}
            className="w-full h-full object-cover"
            loading="lazy"
            decoding="async"
          />
          {!isPlaying && (
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm group-hover:bg-black/40 transition-all"
            >
              <div className="w-0 h-0 border-l-12 border-r-0 border-t-8 border-b-8 border-l-white border-t-transparent border-b-transparent" />
            </motion.div>
          )}
        </div>

        {/* Video Info */}
        <div className="p-4">
          <h3 className="text-lg font-bold text-[var(--text)]">{title}</h3>
          <p className="mt-1 text-sm text-[var(--muted)]">{description}</p>
        </div>
      </motion.div>

      {/* Thumbnails Carousel - Optimized for performance */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.35, delay: 0.1 }}
        className="relative"
      >
        {/* Left Arrow */}
        <button
          onClick={handlePrevious}
          className="absolute left-0 top-1/2 z-10 -translate-y-1/2 -translate-x-4 w-8 h-8 rounded-full border border-[var(--border)] bg-[var(--panel)] flex items-center justify-center hover:bg-[var(--card)] transition-all duration-200 hover:shadow-lg"
          aria-label="Previous video"
        >
          <span className="text-lg">‹</span>
        </button>

        {/* Thumbnails Container */}
        <div className="overflow-x-auto scrollbar-hide">
          <div className="flex gap-3 pb-2 px-2">
            {displayThumbnails.map((thumb, index) => (
              <Thumbnail
                key={thumb.id || index}
                src={thumb.src}
                alt={thumb.alt}
                isActive={index === activeIndex}
                onClick={() => handleThumbnailClick(index)}
                index={index}
              />
            ))}
          </div>
        </div>

        {/* Right Arrow */}
        <button
          onClick={handleNext}
          className="absolute right-0 top-1/2 z-10 -translate-y-1/2 translate-x-4 w-8 h-8 rounded-full border border-[var(--border)] bg-[var(--panel)] flex items-center justify-center hover:bg-[var(--card)] transition-all duration-200 hover:shadow-lg"
          aria-label="Next video"
        >
          <span className="text-lg">›</span>
        </button>
      </motion.div>

      {/* Thumbnails Counter */}
      <div className="text-center text-xs text-[var(--muted)]">
        {activeIndex + 1} / {displayThumbnails.length}
      </div>
    </div>
  );
}
