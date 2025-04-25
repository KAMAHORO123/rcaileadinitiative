import Link from "next/link";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Logo } from "@/components/logo";
import { NewsletterSubscribe } from "@/components/newsletter-subscribe";
import { theme } from "@/lib/theme";

export default function Footer() {
  return (
    <footer className="bg-gray-50 dark:bg-black">
      <div className="container mx-auto px-4 py-16">
        <div className="mb-10 grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            <Logo className="mb-4" />
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
              RCA ILEAD Initiative is dedicated to empowering future leaders in
              Rwanda through education, community development, and sustainable
              programs.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold dark:text-white">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link
                  href="/about"
                  className="text-sm text-gray-600 transition-colors hover:text-bronze-600 dark:text-gray-300 dark:hover:text-gold-500"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/gallery"
                  className="text-sm text-gray-600 transition-colors hover:text-bronze-600 dark:text-gray-300 dark:hover:text-gold-500"
                >
                  Gallery
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-gray-600 transition-colors hover:text-bronze-600 dark:text-gray-300 dark:hover:text-gold-500"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold dark:text-white">
              Get Involved
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link
                  href="/donate"
                  className="text-sm text-gray-600 transition-colors hover:text-bronze-600 dark:text-gray-300 dark:hover:text-gold-500"
                >
                  Donate
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-gray-600 transition-colors hover:text-bronze-600 dark:text-gray-300 dark:hover:text-gold-500"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold dark:text-white">
              Subscribe to Our Newsletter
            </h3>
            <NewsletterSubscribe />
            <div className="mt-6">
              <h4 className="mb-3 text-sm font-semibold dark:text-white">
                Connect With Us
              </h4>
              <div className="flex space-x-4">
                <Link
                  href="https://facebook.com/rcailead"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-gold-100 text-bronze-600 transition-colors hover:bg-bronze-600 hover:text-white dark:bg-gray-900 dark:text-gold-500 dark:hover:bg-bronze-600 dark:hover:text-white"
                >
                  <Facebook className="h-4 w-4" />
                  <span className="sr-only">Facebook</span>
                </Link>
                <Link
                  href="https://twitter.com/rcailead"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-gold-100 text-bronze-600 transition-colors hover:bg-bronze-600 hover:text-white dark:bg-gray-900 dark:text-gold-500 dark:hover:bg-bronze-600 dark:hover:text-white"
                >
                  <Twitter className="h-4 w-4" />
                  <span className="sr-only">Twitter</span>
                </Link>
                <Link
                  href="https://instagram.com/ileadinitiativeofficial"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-gold-100 text-bronze-600 transition-colors hover:bg-bronze-600 hover:text-white dark:bg-gray-900 dark:text-gold-500 dark:hover:bg-bronze-600 dark:hover:text-white"
                >
                  <Instagram className="h-4 w-4" />
                  <span className="sr-only">Instagram</span>
                </Link>
                <Link
                  href="https://linkedin.com/company/rcailead"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-gold-100 text-bronze-600 transition-colors hover:bg-bronze-600 hover:text-white dark:bg-gray-900 dark:text-gold-500 dark:hover:bg-bronze-600 dark:hover:text-white"
                >
                  <Linkedin className="h-4 w-4" />
                  <span className="sr-only">LinkedIn</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-200 pt-8 text-center dark:border-gray-800">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            © {new Date().getFullYear()} RCA ILEAD Initiative. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
