"use client";

import * as React from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface ImageViewerProps {
  src: string;
  alt: string;
  className?: string;
  onNext?: () => void;
  onPrev?: () => void;
  hasNext?: boolean;
  hasPrev?: boolean;
  onClick?: () => void;
  selectedImageIndex?: number | null;
  onClose?: () => void;
  currentIndex?: number;
}

export function ImageViewer({
  src,
  alt,
  className,
  onNext,
  onPrev,
  hasNext = false,
  hasPrev = false,
  onClick,
  selectedImageIndex,
  onClose,
  currentIndex,
}: ImageViewerProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isInitialRender, setIsInitialRender] = React.useState(true);

  React.useEffect(() => {
    setIsInitialRender(false);
  }, []);

  const handleClick = () => {
    if (!isInitialRender) {
      setIsOpen(true);
      onClick?.();
    }
  };

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(false);
    onClose?.();
  };

  const handleKeyDown = React.useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
        onClose?.();
      } else if (e.key === "ArrowRight" && hasNext) {
        onNext?.();
      } else if (e.key === "ArrowLeft" && hasPrev) {
        onPrev?.();
      }
    },
    [hasNext, hasPrev, onNext, onPrev, onClose]
  );

  React.useEffect(() => {
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }
  }, [isOpen, handleKeyDown]);

  // Only update isOpen when selectedImageIndex changes and it's not the initial render
  React.useEffect(() => {
    if (!isInitialRender && selectedImageIndex !== null) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [selectedImageIndex, isInitialRender]);

  return (
    <>
      <img
        src={src}
        alt={alt}
        className={cn("cursor-pointer", className)}
        onClick={handleClick}
      />
      {isOpen && selectedImageIndex === currentIndex && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
          onClick={handleClose}
        >
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-4 text-white hover:bg-white/10"
            onClick={handleClose}
          >
            <X className="h-6 w-6" />
            <span className="sr-only">Close</span>
          </Button>

          {hasPrev && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/10"
              onClick={(e) => {
                e.stopPropagation();
                onPrev?.();
              }}
            >
              <ChevronLeft className="h-8 w-8" />
              <span className="sr-only">Previous image</span>
            </Button>
          )}

          {hasNext && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/10"
              onClick={(e) => {
                e.stopPropagation();
                onNext?.();
              }}
            >
              <ChevronRight className="h-8 w-8" />
              <span className="sr-only">Next image</span>
            </Button>
          )}

          <img
            src={src}
            alt={alt}
            className="max-h-[90vh] max-w-[90vw] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}
