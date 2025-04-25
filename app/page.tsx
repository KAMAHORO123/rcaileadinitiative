"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Heart, Users, Globe, ArrowRight } from "lucide-react";
import { ImageViewer } from "@/components/ui/image-viewer";
import { NewsletterSubscribe } from "@/components/newsletter-subscribe";

export default function Home() {
  const animatedElementsRef = useRef<HTMLElement[]>([]);
  const [isGalleryVisible, setIsGalleryVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            // If this is the gallery section, set it to visible
            if (entry.target.id === "gallery-section") {
              setIsGalleryVisible(true);
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll(".animate-on-scroll");
    elements.forEach((el) => {
      observer.observe(el);
    });

    return () => {
      elements.forEach((el) => {
        observer.unobserve(el);
      });
    };
  }, []);

  return (
    <div className="dark:bg-black">
      {/* Hero Section */}
      <section className="hero-pattern relative overflow-hidden py-20 md:py-32 dark:bg-black">
        <div className="absolute -right-64 -top-64 h-[500px] w-[500px] rounded-full bg-gold-100 opacity-60 blur-3xl dark:bg-black"></div>
        <div className="absolute -bottom-32 -left-32 h-[300px] w-[300px] rounded-full bg-gold-100 opacity-60 blur-3xl dark:bg-black"></div>
        <div className="container relative mx-auto px-4">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div className="animate-fade-up">
              <h1 className="mb-4 text-4xl font-extrabold leading-tight tracking-tight text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
                Empowering Future <span className="text-gradient">Leaders</span>{" "}
                in Rwanda
              </h1>
              <p className="mb-8 text-lg text-gray-600 dark:text-gray-300">
                We&apos;re on a mission to nurture leadership, support, and
                access to education among underserved children in Rwanda.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button
                  asChild
                  size="lg"
                  className="rounded-full bg-bronze-600 text-white hover:bg-bronze-700 btn-hover"
                >
                  <Link href="/donate">Donate Now</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="rounded-full border-bronze-600 text-bronze-600 hover:bg-gold-50 dark:border-gray-700 dark:text-white dark:hover:bg-black btn-hover"
                >
                  <Link href="/about">
                    Learn More <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
            <div className="relative animate-fade-in">
              <div className="absolute -left-4 -top-4 h-24 w-24 rounded-full bg-gold-100 dark:bg-black"></div>
              <div className="absolute -bottom-4 -right-4 h-32 w-32 rounded-full bg-gold-200 dark:bg-black"></div>
              <div className="relative overflow-hidden">
                <Image
                  src="/header.png"
                  alt="Youth in Rwanda"
                  width={600}
                  height={600}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 dark:bg-black">
        <div className="container mx-auto px-4 text-center">
          <div className="mx-auto max-w-3xl">
            <h2 className="animate-on-scroll mb-6 text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
              Our Mission
            </h2>
            <div className="animate-on-scroll mb-10 h-1 w-20 bg-bronze-600 mx-auto rounded-full"></div>
            <p className="animate-on-scroll mx-auto text-lg text-gray-600 dark:text-gray-300">
              The RCA iLEAD Initiative is committed to nurturing leadership,
              enhancing education, and strengthening community in Rwanda. We
              empower students through sustainable programs that create real,
              long-term change—starting within our own community and extending
              across the nation.
            </p>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="section-pattern py-20 dark:bg-black">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="animate-on-scroll group rounded-2xl bg-white p-8 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 dark:bg-black dark:border dark:border-gray-800">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gold-100 text-bronze-600 transition-all duration-300 group-hover:bg-bronze-600 group-hover:text-white dark:bg-black">
                <Heart className="h-8 w-8" />
              </div>
              <h3 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
                Compassion
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                We lead with empathy—understanding the challenges many students
                face and striving to offer them dignity, opportunity, and hope.
              </p>
            </div>
            <div className="animate-on-scroll group rounded-2xl bg-white p-8 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 dark:bg-black dark:border dark:border-gray-800">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gold-100 text-bronze-600 transition-all duration-300 group-hover:bg-bronze-600 group-hover:text-white dark:bg-black">
                <Users className="h-8 w-8" />
              </div>
              <h3 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
                Community
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                We thrive on the strength of unity. RCA students come together
                to lift one another and build a support system that lasts beyond
                school.
              </p>
            </div>
            <div className="animate-on-scroll group rounded-2xl bg-white p-8 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 dark:bg-black dark:border dark:border-gray-800">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gold-100 text-bronze-600 transition-all duration-300 group-hover:bg-bronze-600 group-hover:text-white dark:bg-black">
                <Globe className="h-8 w-8" />
              </div>
              <h3 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
                Global Impact
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Our vision extends beyond Nyabihu. By fostering responsibility
                and leadership in Rwanda's youth, we aim to build change-makers
                who can influence the world.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Programs */}
      <section className="section-pattern py-20 dark:bg-black">
        <div className="container mx-auto px-4">
          <h2 className="animate-on-scroll mb-6 text-center text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
            RCA iLEAD Initiatives
          </h2>
          <div className="animate-on-scroll mb-10 h-1 w-20 bg-bronze-600 mx-auto rounded-full"></div>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="animate-on-scroll overflow-hidden rounded-2xl bg-white shadow-lg card-hover dark:bg-black dark:border dark:border-gray-800">
              <div className="h-48 overflow-hidden">
                <Image
                  src="/sup1.png"
                  alt="School Fee Support"
                  width={400}
                  height={200}
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              <div className="p-6">
                <h3 className="mb-3 text-xl font-bold text-gray-900 dark:text-white">
                  School Fee Support
                </h3>
                <p className="mb-4 text-gray-600 dark:text-gray-300">
                  Through collective contributions, we ensure every student at
                  RCA has the opportunity to stay in school regardless of
                  financial barriers.
                </p>
                <Button
                  asChild
                  variant="outline"
                  className="w-full rounded-full border-bronze-600 text-bronze-600 hover:bg-gold-50 dark:border-gray-700 dark:text-white dark:hover:bg-black"
                >
                  <Link href="/about">Learn More</Link>
                </Button>
              </div>
            </div>
            <div className="animate-on-scroll overflow-hidden rounded-2xl bg-white shadow-lg card-hover dark:bg-black dark:border dark:border-gray-800">
              <div className="h-48 overflow-hidden">
                <Image
                  src="/sup2.png"
                  alt="Empowerment Workshops"
                  width={400}
                  height={200}
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              <div className="p-6">
                <h3 className="mb-3 text-xl font-bold text-gray-900 dark:text-white">
                  Empowerment Workshops
                </h3>
                <p className="mb-4 text-gray-600 dark:text-gray-300">
                  We conduct regular workshops to build leadership skills and
                  empower students to take initiative in their communities.
                </p>
                <Button
                  asChild
                  variant="outline"
                  className="w-full rounded-full border-bronze-600 text-bronze-600 hover:bg-gold-50 dark:border-gray-700 dark:text-white dark:hover:bg-black"
                >
                  <Link href="/about">Learn More</Link>
                </Button>
              </div>
            </div>
            <div className="animate-on-scroll overflow-hidden rounded-2xl bg-white shadow-lg card-hover dark:bg-black dark:border dark:border-gray-800">
              <div className="h-48 overflow-hidden">
                <Image
                  src="/sup3.png"
                  alt="Community Outreach"
                  width={400}
                  height={200}
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              <div className="p-6">
                <h3 className="mb-3 text-xl font-bold text-gray-900 dark:text-white">
                  Community Outreach
                </h3>
                <p className="mb-4 text-gray-600 dark:text-gray-300">
                  Our students actively engage with the community through
                  various outreach programs, making a positive impact on
                  society.
                </p>
                <Button
                  asChild
                  variant="outline"
                  className="w-full rounded-full border-bronze-600 text-bronze-600 hover:bg-gold-50 dark:border-gray-700 dark:text-white dark:hover:bg-black"
                >
                  <Link href="/about">Learn More</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery-section" className="py-20 dark:bg-black">
        <div className="container mx-auto px-4">
          <h2 className="animate-on-scroll mb-6 text-center text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
            Gallery
          </h2>
          <div className="animate-on-scroll mb-10 h-1 w-20 bg-bronze-600 mx-auto rounded-full"></div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
              <div
                key={num}
                className="group relative overflow-hidden rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 dark:border dark:border-gray-800"
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={`/gallery/img${num}.jpg`}
                    alt={`Gallery image ${num}`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Button
              asChild
              className="rounded-full bg-bronze-600 text-white hover:bg-bronze-700"
            >
              <Link href="/gallery">View Full Gallery</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden py-20 dark:bg-black">
        <div className="absolute -left-20 -top-20 h-80 w-80 rounded-full bg-gold-100 opacity-60 blur-3xl dark:bg-black"></div>
        <div className="absolute -bottom-20 -right-20 h-80 w-80 rounded-full bg-gold-100 opacity-60 blur-3xl dark:bg-black"></div>
        <div className="container relative mx-auto px-4 text-center">
          <div className="mx-auto max-w-3xl">
            <h2 className="animate-on-scroll mb-6 text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
              Join Our Mission
            </h2>
            <p className="animate-on-scroll mb-8 text-lg text-gray-600 dark:text-gray-300">
              We believe every student deserves the chance to learn, lead, and
              live a meaningful life. By supporting the RCA iLEAD Initiative,
              you're helping build the Rwanda of tomorrow—one leader at a time.
            </p>
            <div className="animate-on-scroll flex flex-wrap justify-center gap-4">
              <Button
                asChild
                size="lg"
                className="rounded-full bg-bronze-600 text-white hover:bg-bronze-700 btn-hover"
              >
                <Link href="/donate">Donate Now</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="rounded-full border-bronze-600 text-bronze-600 hover:bg-gold-50 dark:border-gray-700 dark:text-white dark:hover:bg-black btn-hover"
              >
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
