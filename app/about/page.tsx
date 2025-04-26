import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Linkedin, Twitter, Facebook, Instagram, Mail } from "lucide-react";

export default function About() {
  return (
    <div className="dark:bg-black">
      {/* Hero Section */}
      <section className="bg-gray-50 py-20 dark:bg-black">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white md:text-5xl">
            About RCA ILEAD Initiative
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-gray-600 dark:text-gray-300">
            Learn about our student-led initiative, our purpose, and how
            we&apos;re building a future of empowered leaders at Rwanda Coding
            Academy.
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 dark:bg-black">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 md:grid-cols-2 md:items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
                Our Story
              </h2>
              <p className="mt-4 text-gray-600 dark:text-gray-300">
                The RCA iLead Initiative was born from the hearts of students at
                Rwanda Coding Academy who believe in the power of leadership,
                empathy, and community-driven change. Inspired by the values of
                the iLEAD program, this initiative started with a bold yet
                simple idea: that small contributions from many can remove big
                barriers for a few.
              </p>
              <p className="mt-4 text-gray-600 dark:text-gray-300">
                What began as a vision to help fellow students afford school
                fees and learning materials has become a transformative program
                that champions peer-to-peer support and leadership development.
                We're not just addressing financial challenges—we're building a
                culture of responsibility, unity, and purpose.
              </p>
            </div>
            <div className="flex justify-center md:ml-8">
              <Image
                src="/about.jpg"
                alt="RCA ILEAD Initiative team"
                width={500}
                height={100}
                className="w-full max-w-[500px] rounded-lg object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission and Vision Section */}
      <section className="bg-gray-50 py-16 dark:bg-black">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 md:grid-cols-2">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
                Our Mission
              </h2>
              <p className="mt-4 text-gray-600 dark:text-gray-300">
                To empower young leaders at Rwanda Coding Academy by promoting
                student-led solutions to educational inequality, fostering civic
                responsibility, and ensuring that every student has the support
                they need to thrive.
              </p>
              <p className="mt-4 text-gray-600 dark:text-gray-300">
                Through a collective fund powered by student contributions,
                we're creating opportunities for students to lift each other up
                and grow as compassionate, action-oriented leaders.
              </p>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
                Our Vision
              </h2>
              <p className="mt-4 text-gray-600 dark:text-gray-300">
                We envision a community where no student is left behind due to
                financial hardship, and where students take pride in supporting
                one another. A place where leadership is not just taught, but
                lived—through acts of generosity, decision-making, and
                accountability.
              </p>
              <p className="mt-4 text-gray-600 dark:text-gray-300">
                Our goal is to build a sustainable model of student-led
                educational support that can inspire change far beyond our
                campus.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 dark:bg-black">
        <div className="container mx-auto px-4">
          <h2 className="mb-8 text-center text-3xl font-bold text-gray-800 dark:text-white">
            Our Team
          </h2>
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {/* Linda - CEO & Founder */}
              <div className="group overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 dark:bg-black dark:border dark:border-gray-800">
                <div className="relative h-80 overflow-hidden">
                  <Image
                    src="/lindaa.png"
                    alt="Linda - CEO & Founder"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    priority
                  />
                </div>
                <div className="p-6">
                  <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
                    KAMAHORO Linda K.
                  </h3>
                  <p className="mb-3 text-base font-semibold text-bronze-600 dark:text-gold-500">
                    CEO & Founder
                  </p>
                  <p className="mb-4 text-sm text-gray-600 dark:text-gray-300 line-clamp-3">
                    Linda is the visionary behind RCA ILEAD Initiative. As a
                    student at Rwanda Coding Academy,
                  </p>
                  <div className="flex flex-wrap items-center gap-4">
                    <div className="flex space-x-3">
                      <Link
                        href="https://linkedin.com/in/linda kellia"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-bronze-600 dark:text-gray-300 dark:hover:text-gold-500"
                      >
                        <Linkedin className="h-5 w-5" />
                      </Link>
                      <Link
                        href="https://twitter.com/linda_kellia"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-bronze-600 dark:text-gray-300 dark:hover:text-gold-500"
                      >
                        <Twitter className="h-5 w-5" />
                      </Link>
                      <Link
                        href="https://facebook.com/linda kellia"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-bronze-600 dark:text-gray-300 dark:hover:text-gold-500"
                      >
                        <Facebook className="h-5 w-5" />
                      </Link>
                      <Link
                        href="https://instagram.com/linda_kellia"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-bronze-600 dark:text-gray-300 dark:hover:text-gold-500"
                      >
                        <Instagram className="h-5 w-5" />
                      </Link>
                    </div>
                    <Button
                      asChild
                      variant="outline"
                      size="sm"
                      className="ml-auto rounded-full border-bronze-600 text-bronze-600 hover:bg-bronze-600 hover:text-white dark:border-gray-700 dark:text-white dark:hover:bg-black"
                    >
                      <Link href="mailto:kamahorolinda@gmail.com">
                        <Mail className="mr-2 h-4 w-4" />
                        Message
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>

              {/* Nelson - CFO */}
              <div className="group overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 dark:bg-black dark:border dark:border-gray-800">
                <div className="relative h-80 overflow-hidden">
                  <Image
                    src="/nelsonn.png"
                    alt="Nelson - CFO"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    priority
                  />
                </div>
                <div className="p-6">
                  <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
                    IRASUBIZA Saly Nelson
                  </h3>
                  <p className="mb-3 text-base font-semibold text-bronze-600 dark:text-gold-500">
                    Co-Founder & CFO
                  </p>
                  <p className="mb-4 text-sm text-gray-600 dark:text-gray-300 line-clamp-3">
                    Nelson brings financial expertise and software development
                    skills to RCA ILEAD Initiative.
                  </p>
                  <div className="flex flex-wrap items-center gap-4">
                    <div className="flex space-x-3">
                      <Link
                        href="https://linkedin.com/in/nelson-irasubiza"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-bronze-600 dark:text-gray-300 dark:hover:text-gold-500"
                      >
                        <Linkedin className="h-5 w-5" />
                      </Link>
                      <Link
                        href="https://twitter.com/nelson_irasubiza"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-bronze-600 dark:text-gray-300 dark:hover:text-gold-500"
                      >
                        <Twitter className="h-5 w-5" />
                      </Link>
                      <Link
                        href="https://facebook.com/nelson.irasubiza"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-bronze-600 dark:text-gray-300 dark:hover:text-gold-500"
                      >
                        <Facebook className="h-5 w-5" />
                      </Link>
                      <Link
                        href="https://instagram.com/nelson_irasubiza"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-bronze-600 dark:text-gray-300 dark:hover:text-gold-500"
                      >
                        <Instagram className="h-5 w-5" />
                      </Link>
                    </div>
                    <Button
                      asChild
                      variant="outline"
                      size="sm"
                      className="ml-auto rounded-full border-bronze-600 text-bronze-600 hover:bg-bronze-600 hover:text-white dark:border-gray-700 dark:text-white dark:hover:bg-black"
                    >
                      <Link href="mailto:irasubizasalynelson@gmail.com">
                        <Mail className="mr-2 h-4 w-4" />
                        Message
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>

              {/* Livia - Assistant */}
              <div className="group overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 dark:bg-black dark:border dark:border-gray-800">
                <div className="relative h-80 overflow-hidden">
                  <Image
                    src="/liviaa.png"
                    alt="Livia - Assistant"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    priority
                  />
                </div>
                <div className="p-6">
                  <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
                    KIREZI Livia
                  </h3>
                  <p className="mb-3 text-base font-semibold text-bronze-600 dark:text-gold-500">
                    Assistant & Co-Founder
                  </p>
                  <p className="mb-4 text-sm text-gray-600 dark:text-gray-300 line-clamp-3">
                    Livia is a talented software developer who supports our
                    daily operations and team communication.
                  </p>
                  <div className="flex flex-wrap items-center gap-4">
                    <div className="flex space-x-3">
                      <Link
                        href="https://linkedin.com/in/livia kirezi"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-bronze-600 dark:text-gray-300 dark:hover:text-gold-500"
                      >
                        <Linkedin className="h-5 w-5" />
                      </Link>
                      <Link
                        href="https://twitter.com/livia_kirezi"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-bronze-600 dark:text-gray-300 dark:hover:text-gold-500"
                      >
                        <Twitter className="h-5 w-5" />
                      </Link>
                      <Link
                        href="https://facebook.com/livia kirezi"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-bronze-600 dark:text-gray-300 dark:hover:text-gold-500"
                      >
                        <Facebook className="h-5 w-5" />
                      </Link>
                      <Link
                        href="https://instagram.com/k.livia_25"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-bronze-600 dark:text-gray-300 dark:hover:text-gold-500"
                      >
                        <Instagram className="h-5 w-5" />
                      </Link>
                    </div>
                    <Button
                      asChild
                      variant="outline"
                      size="sm"
                      className="ml-auto rounded-full border-bronze-600 text-bronze-600 hover:bg-bronze-600 hover:text-white dark:border-gray-700 dark:text-white dark:hover:bg-black"
                    >
                      <Link href="mailto:kirezilivia@gmail.com">
                        <Mail className="mr-2 h-4 w-4" />
                        Message
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>

              {/* Bahati - Advisor */}
              <div className="group overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 dark:bg-black dark:border dark:border-gray-800">
                <div className="relative h-80 overflow-hidden">
                  <Image
                    src="/bahatii.png"
                    alt="Bahati - Advisor"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    priority
                  />
                </div>
                <div className="p-6">
                  <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
                    RUKUNDO B. Samuel
                  </h3>
                  <p className="mb-3 text-base font-semibold text-bronze-600 dark:text-gold-500">
                    Advisor & Co-Founder
                  </p>
                  <p className="mb-4 text-sm text-gray-600 dark:text-gray-300 line-clamp-3">
                    Bahati provides strategic guidance to our organization with
                    experience in community leadership.
                  </p>
                  <div className="flex flex-wrap items-center gap-4">
                    <div className="flex space-x-3">
                      <Link
                        href="https://linkedin.com/in/rukundo-bahati"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-bronze-600 dark:text-gray-300 dark:hover:text-gold-500"
                      >
                        <Linkedin className="h-5 w-5" />
                      </Link>
                      <Link
                        href="https://x.com/BahatiBaba"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-bronze-600 dark:text-gray-300 dark:hover:text-gold-500"
                      >
                        <Twitter className="h-5 w-5" />
                      </Link>
                      <Link
                        href="https://www.facebook.com/rukundo.bahatisamuel.3"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-bronze-600 dark:text-gray-300 dark:hover:text-gold-500"
                      >
                        <Facebook className="h-5 w-5" />
                      </Link>
                      <Link
                        href="https://www.instagram.com/ruku_nd0/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-bronze-600 dark:text-gray-300 dark:hover:text-gold-500"
                      >
                        <Instagram className="h-5 w-5" />
                      </Link>
                    </div>
                    <Button
                      asChild
                      variant="outline"
                      size="sm"
                      className="ml-auto rounded-full border-bronze-600 text-bronze-600 hover:bg-bronze-600 hover:text-white dark:border-gray-700 dark:text-white dark:hover:bg-black"
                    >
                      <Link href="mailto:rukundarca@gmail.com">
                        <Mail className="mr-2 h-4 w-4" />
                        Message
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 dark:bg-black">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
            Join Our Mission
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-gray-600 dark:text-gray-300">
            We&apos;re always looking for passionate individuals and
            organizations to join us in our mission to empower youth in Rwanda.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button
              asChild
              className="bg-bronze-600 text-white hover:bg-bronze-700 dark:bg-bronze-600 dark:text-white dark:hover:bg-bronze-700"
            >
              <Link href="/donate">Donate</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="dark:border-gray-700 dark:text-white dark:hover:bg-black"
            >
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
