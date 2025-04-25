import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Events() {
  const pastEvents = [
    {
      id: 1,
      title: "Visit to GS NANGA PRIMARY SCHOOL",
      date: "March 15, 2025",
      time: "4:00 PM - 5:30 PM",
      location: "Nyabihu, Rwanda",
      description:
        "At GS Nanga, we visited students and inspired students strengthening their leadership and community spirit.",
      image: "/img5.jpg",
    },
  ];

  return (
    <div className="dark:bg-black">
      {/* Hero Section */}
      <section className="hero-pattern relative overflow-hidden py-20 md:py-32 dark:bg-black">
        <div className="absolute -right-64 -top-64 h-[500px] w-[500px] rounded-full bg-gold-100 opacity-60 blur-3xl dark:bg-black"></div>
        <div className="absolute -bottom-32 -left-32 h-[300px] w-[300px] rounded-full bg-gold-100 opacity-60 blur-3xl dark:bg-black"></div>
        <div className="container relative mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-4 text-4xl font-extrabold leading-tight tracking-tight text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
              <span className="text-gradient">Events</span>
            </h1>
            <p className="mb-8 text-lg text-gray-600 dark:text-gray-300">
              Explore highlights from our past events and see how we're
              empowering young leaders in Rwanda.
            </p>
          </div>
        </div>
      </section>

      {/* Events List */}
      <section className="py-16 dark:bg-black">
        <div className="container mx-auto px-4">
          <h2 className="mb-10 text-2xl font-bold text-gray-800 dark:text-white">
            Past Events
          </h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {pastEvents.map((event) => (
              <div
                key={event.id}
                className="overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 dark:bg-black dark:border dark:border-gray-800"
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 hover:scale-110"
                    priority
                  />
                </div>
                <div className="p-6">
                  <h3 className="mb-3 text-xl font-bold text-gray-900 dark:text-white">
                    {event.title}
                  </h3>
                  <div className="mb-4 space-y-2">
                    <div className="flex items-center text-gray-600 dark:text-gray-300">
                      <Calendar className="mr-2 h-5 w-5 text-bronze-600 dark:text-gold-500" />
                      {event.date}
                    </div>
                    <div className="flex items-center text-gray-600 dark:text-gray-300">
                      <Clock className="mr-2 h-5 w-5 text-bronze-600 dark:text-gold-500" />
                      {event.time}
                    </div>
                    <div className="flex items-center text-gray-600 dark:text-gray-300">
                      <MapPin className="mr-2 h-5 w-5 text-bronze-600 dark:text-gold-500" />
                      {event.location}
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300">
                    {event.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-50 py-16 dark:bg-black">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-800 dark:text-white">
            Want to Host an Event?
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-gray-600 dark:text-gray-300">
            We're always looking for partners to help us organize events that
            benefit our community. Contact us to discuss potential
            collaborations.
          </p>
          <Button
            asChild
            className="bg-bronze-600 text-white hover:bg-bronze-700 dark:bg-bronze-600 dark:text-white dark:hover:bg-bronze-700"
          >
            <Link href="/contact">Contact Us</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
