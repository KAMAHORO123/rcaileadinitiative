"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ImageViewer } from "@/components/ui/image-viewer";
import { useState, useEffect } from "react";
import { Video } from "lucide-react";
import { useRouter } from "next/navigation";

// Define image categories and their corresponding images
const imageCategories = {
  all: Array.from({ length: 24 }, (_, i) => ({
    id: i + 1,
    src: `/gallery/img${i + 1}.jpg`,
    alt: `Gallery image ${i + 1}`,
    category: "all",
  })),
  events: Array.from({ length: 8 }, (_, i) => ({
    id: i + 1,
    src: `/gallery/img${i + 1}.jpg`,
    alt: `Event image ${i + 1}`,
    category: "events",
  })),
  programs: Array.from({ length: 8 }, (_, i) => ({
    id: i + 1,
    src: `/gallery/img${i + 9}.jpg`,
    alt: `Program image ${i + 1}`,
    category: "programs",
  })),
  community: Array.from({ length: 8 }, (_, i) => ({
    id: i + 1,
    src: `/gallery/img${i + 17}.jpg`,
    alt: `Community image ${i + 1}`,
    category: "community",
  })),
};

export default function Gallery() {
  const router = useRouter();
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null
  );
  const [displayedImages, setDisplayedImages] = useState(12);
  const [isInitialRender, setIsInitialRender] = useState(true);
  const [activeCategory, setActiveCategory] = useState("all");
  const [filteredImages, setFilteredImages] = useState(imageCategories.all);

  useEffect(() => {
    // Check if we're on the gallery page
    const isGalleryPage = window.location.pathname === "/gallery";
    if (!isGalleryPage) {
      router.push("/");
      return;
    }
    setIsInitialRender(false);
  }, [router]);

  useEffect(() => {
    // Update filtered images when category changes
    setFilteredImages(
      imageCategories[activeCategory as keyof typeof imageCategories]
    );
    setDisplayedImages(12); // Reset displayed images count when changing category
  }, [activeCategory]);

  const handleNext = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((prev) => (prev! + 1) % filteredImages.length);
    }
  };

  const handlePrev = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex(
        (prev) => (prev! - 1 + filteredImages.length) % filteredImages.length
      );
    }
  };

  const handleImageClick = (index: number) => {
    if (!isInitialRender) {
      setSelectedImageIndex(index);
    }
  };

  const handleClose = () => {
    setSelectedImageIndex(null);
  };

  const handleLoadMore = () => {
    setDisplayedImages((prev) => Math.min(prev + 12, filteredImages.length));
  };

  // If we're still in initial render, show a loading state
  if (isInitialRender) {
    return (
      <div className="flex h-screen items-center justify-center dark:bg-black">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
            Loading Gallery...
          </h2>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            Please wait while we prepare your gallery view.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="dark:bg-black">
      {/* Hero Section */}
      <section className="hero-pattern relative overflow-hidden py-20 md:py-32 dark:bg-black">
        <div className="absolute -right-64 -top-64 h-[500px] w-[500px] rounded-full bg-gold-100 opacity-60 blur-3xl dark:bg-black"></div>
        <div className="absolute -bottom-32 -left-32 h-[300px] w-[300px] rounded-full bg-gold-100 opacity-60 blur-3xl dark:bg-black"></div>
        <div className="container relative mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-4 text-4xl font-extrabold leading-tight tracking-tight text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
              Our <span className="text-gradient">Gallery</span>
            </h1>
            <p className="mb-8 text-lg text-gray-600 dark:text-gray-300">
              Explore photos and videos from our programs, events, and community
              activities. Each image tells a story of our journey in empowering
              youth in Rwanda.
            </p>
          </div>
        </div>
      </section>

      {/* Gallery Categories */}
      <section className="py-8 dark:bg-black">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              variant={activeCategory === "all" ? "default" : "outline"}
              className={`rounded-full ${
                activeCategory === "all"
                  ? "bg-bronze-600 text-white hover:bg-bronze-700 dark:bg-bronze-600 dark:text-white dark:hover:bg-bronze-700"
                  : "hover:bg-bronze-600 hover:text-white dark:border-gray-700 dark:text-white dark:hover:bg-black"
              }`}
              onClick={() => setActiveCategory("all")}
            >
              All
            </Button>
            <Button
              variant={activeCategory === "events" ? "default" : "outline"}
              className={`rounded-full ${
                activeCategory === "events"
                  ? "bg-bronze-600 text-white hover:bg-bronze-700 dark:bg-bronze-600 dark:text-white dark:hover:bg-bronze-700"
                  : "hover:bg-bronze-600 hover:text-white dark:border-gray-700 dark:text-white dark:hover:bg-black"
              }`}
              onClick={() => setActiveCategory("events")}
            >
              Events
            </Button>
            <Button
              variant={activeCategory === "programs" ? "default" : "outline"}
              className={`rounded-full ${
                activeCategory === "programs"
                  ? "bg-bronze-600 text-white hover:bg-bronze-700 dark:bg-bronze-600 dark:text-white dark:hover:bg-bronze-700"
                  : "hover:bg-bronze-600 hover:text-white dark:border-gray-700 dark:text-white dark:hover:bg-black"
              }`}
              onClick={() => setActiveCategory("programs")}
            >
              Programs
            </Button>
            <Button
              variant={activeCategory === "community" ? "default" : "outline"}
              className={`rounded-full ${
                activeCategory === "community"
                  ? "bg-bronze-600 text-white hover:bg-bronze-700 dark:bg-bronze-600 dark:text-white dark:hover:bg-bronze-700"
                  : "hover:bg-bronze-600 hover:text-white dark:border-gray-700 dark:text-white dark:hover:bg-black"
              }`}
              onClick={() => setActiveCategory("community")}
            >
              Community
            </Button>
          </div>
        </div>
      </section>

      {/* Image Container */}
      <section className="py-8 dark:bg-black">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {filteredImages.slice(0, displayedImages).map((image, index) => (
              <div
                key={image.id}
                className="overflow-hidden rounded-lg bg-gray-100 shadow-md dark:bg-black dark:border dark:border-gray-800"
              >
                <ImageViewer
                  src={image.src}
                  alt={image.alt}
                  className="h-full w-full object-cover"
                  onNext={handleNext}
                  onPrev={handlePrev}
                  hasNext={
                    selectedImageIndex !== null &&
                    selectedImageIndex < filteredImages.length - 1
                  }
                  hasPrev={
                    selectedImageIndex !== null && selectedImageIndex > 0
                  }
                  onClick={() => handleImageClick(index)}
                  selectedImageIndex={selectedImageIndex}
                  onClose={handleClose}
                  currentIndex={index}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Load More Button */}
      <section className="py-8 dark:bg-black">
        <div className="container mx-auto px-4 text-center">
          {displayedImages < filteredImages.length && (
            <Button
              variant="outline"
              onClick={handleLoadMore}
              className="rounded-full hover:bg-bronze-600 hover:text-white transition-colors dark:border-gray-700 dark:text-white dark:hover:bg-black"
            >
              Load More
            </Button>
          )}
        </div>
      </section>

      {/* Coming Soon Section */}
      <section className="py-16 bg-gray-50 dark:bg-black">
        <div className="container mx-auto px-4 text-center">
          <div className="mx-auto max-w-2xl">
            <Video className="mx-auto h-16 w-16 text-bronze-600 dark:text-gold-500 mb-6" />
            <h2 className="mb-4 text-3xl font-bold text-gray-800 dark:text-white">
              Video Gallery Coming Soon
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              We're working on bringing you an exciting collection of videos
              showcasing our programs, events, and community impact. Stay tuned
              for updates!
            </p>
            <Button
              asChild
              variant="outline"
              className="rounded-full border-bronze-600 text-bronze-600 hover:bg-bronze-600 hover:text-white transition-colors dark:border-gray-700 dark:text-white dark:hover:bg-black"
            >
              <Link href="/contact">Get Notified</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Submit Photos CTA */}
      <section className="bg-gray-50 py-16 dark:bg-black">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
            Share Your Photos
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-gray-600 dark:text-gray-300">
            Have photos from our events or programs? We'd love to feature them
            in our gallery. Submit your photos to share your experience with our
            community.
          </p>
          <div className="mt-8">
            <Button
              asChild
              className="bg-bronze-600 text-white hover:bg-bronze-700 dark:bg-bronze-600 dark:text-white dark:hover:bg-bronze-700"
            >
              <Link href="/contact">Submit Photos</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
