"use client";

import type React from "react";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/logo";
import { theme } from "@/lib/theme";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "border-b border-gold-100 bg-white dark:border-gray-800 dark:bg-black"
          : "bg-white dark:bg-black"
      )}
    >
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        <div className="flex items-center">
          <Logo />
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <X className="h-6 w-6 dark:text-white" />
          ) : (
            <Menu className="h-6 w-6 dark:text-white" />
          )}
        </button>

        {/* Desktop navigation */}
        <nav className="hidden md:flex md:items-center md:space-x-1">
          <NavLink href="/">Home</NavLink>
          <NavLink href="/about">About</NavLink>
          <NavLink href="/events">Events</NavLink>
          <NavLink href="/gallery">Gallery</NavLink>
          <NavLink href="/contact">Contact</NavLink>
          <Button
            asChild
            className="ml-2 bg-bronze-600 text-white hover:bg-bronze-700 dark:bg-bronze-600 dark:text-white dark:hover:bg-bronze-700"
          >
            <Link href="/donate">Donate</Link>
          </Button>
          <ThemeToggle />
        </nav>
      </div>

      {/* Mobile navigation */}
      <nav
        className={cn(
          "fixed inset-0 top-20 z-50 bg-white p-4 dark:bg-black",
          isMenuOpen ? "block" : "hidden"
        )}
      >
        <div className="container mx-auto">
          <div className="flex flex-col space-y-4">
            <MobileNavLink href="/" onClick={() => setIsMenuOpen(false)}>
              Home
            </MobileNavLink>
            <MobileNavLink href="/about" onClick={() => setIsMenuOpen(false)}>
              About
            </MobileNavLink>
            <MobileNavLink href="/events" onClick={() => setIsMenuOpen(false)}>
              Events
            </MobileNavLink>
            <MobileNavLink href="/gallery" onClick={() => setIsMenuOpen(false)}>
              Gallery
            </MobileNavLink>
            <MobileNavLink href="/contact" onClick={() => setIsMenuOpen(false)}>
              Contact
            </MobileNavLink>
            <Button
              asChild
              className="w-full bg-bronze-600 text-white hover:bg-bronze-700 dark:bg-bronze-600 dark:text-white dark:hover:bg-bronze-700"
            >
              <Link href="/donate" onClick={() => setIsMenuOpen(false)}>
                Donate
              </Link>
            </Button>
          </div>
        </div>
      </nav>
    </header>
  );
}

function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="group relative px-3 py-2 text-sm font-medium transition-colors hover:text-bronze-600 dark:text-white dark:hover:text-gold-500"
    >
      {children}
      <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-bronze-600 transition-all duration-300 group-hover:w-full dark:bg-gold-500"></span>
    </Link>
  );
}

function MobileNavLink({
  href,
  onClick,
  children,
}: {
  href: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="block py-3 text-base font-medium transition-colors hover:text-bronze-600 dark:text-white dark:hover:text-gold-500"
      onClick={onClick}
    >
      {children}
    </Link>
  );
}
