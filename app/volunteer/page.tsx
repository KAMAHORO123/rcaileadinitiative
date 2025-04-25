import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle, Heart, Globe, BookOpen, Users, Lightbulb } from "lucide-react"

export default function Volunteer() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-2 md:items-center">
            <div>
              <h1 className="text-4xl font-bold text-gray-800 md:text-5xl">Volunteer With Us</h1>
              <p className="mt-6 text-lg text-gray-600">
                Join our team of dedicated volunteers and make a meaningful impact in the lives of young people in
                Rwanda.
              </p>
              <div className="mt-8">
                <Button asChild className="bg-black text-white hover:bg-gray-800">
                  <Link href="#opportunities">View Opportunities</Link>
                </Button>
              </div>
            </div>
            <div className="rounded-lg overflow-hidden">
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="Volunteers working together"
                width={600}
                height={400}
                className="w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Why Volunteer Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold text-gray-800">Why Volunteer With YUP?</h2>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 rounded-full bg-gray-100 p-4">
                <Heart className="h-8 w-8 text-gray-800" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Make a Difference</h3>
              <p className="text-gray-600">
                Your time and skills can directly impact the lives of young people and help create lasting change in
                communities.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 rounded-full bg-gray-100 p-4">
                <Globe className="h-8 w-8 text-gray-800" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Cultural Exchange</h3>
              <p className="text-gray-600">
                Experience Rwandan culture firsthand and share your own cultural perspectives in a meaningful way.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 rounded-full bg-gray-100 p-4">
                <Lightbulb className="h-8 w-8 text-gray-800" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Develop Skills</h3>
              <p className="text-gray-600">
                Gain valuable experience, develop new skills, and enhance your resume while making a positive impact.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Volunteer Opportunities */}
      <section id="opportunities" className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold text-gray-800">Volunteer Opportunities</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-lg border bg-white p-6 shadow-sm">
              <div className="mb-4 rounded-full bg-gray-100 p-3 w-12 h-12 flex items-center justify-center">
                <BookOpen className="h-6 w-6 text-gray-800" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Education Mentor</h3>
              <p className="mb-4 text-gray-600">
                Work with students to provide academic support, homework help, and guidance on educational pathways.
              </p>
              <ul className="mb-6 space-y-2">
                <li className="flex items-start">
                  <CheckCircle className="mr-2 h-5 w-5 text-gray-800 flex-shrink-0" />
                  <span className="text-gray-600">Minimum 3 hours per week</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="mr-2 h-5 w-5 text-gray-800 flex-shrink-0" />
                  <span className="text-gray-600">Background in education preferred</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="mr-2 h-5 w-5 text-gray-800 flex-shrink-0" />
                  <span className="text-gray-600">Remote or in-person options available</span>
                </li>
              </ul>
              <Button asChild className="w-full">
                <Link href="/volunteer/apply">Apply Now</Link>
              </Button>
            </div>

            <div className="rounded-lg border bg-white p-6 shadow-sm">
              <div className="mb-4 rounded-full bg-gray-100 p-3 w-12 h-12 flex items-center justify-center">
                <Users className="h-6 w-6 text-gray-800" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Community Outreach</h3>
              <p className="mb-4 text-gray-600">
                Help organize and facilitate community events, workshops, and service projects in local communities.
              </p>
              <ul className="mb-6 space-y-2">
                <li className="flex items-start">
                  <CheckCircle className="mr-2 h-5 w-5 text-gray-800 flex-shrink-0" />
                  <span className="text-gray-600">Flexible schedule, project-based</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="mr-2 h-5 w-5 text-gray-800 flex-shrink-0" />
                  <span className="text-gray-600">Strong communication skills required</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="mr-2 h-5 w-5 text-gray-800 flex-shrink-0" />
                  <span className="text-gray-600">In-person in Rwanda</span>
                </li>
              </ul>
              <Button asChild className="w-full">
                <Link href="/volunteer/apply">Apply Now</Link>
              </Button>
            </div>

            <div className="rounded-lg border bg-white p-6 shadow-sm">
              <div className="mb-4 rounded-full bg-gray-100 p-3 w-12 h-12 flex items-center justify-center">
                <Lightbulb className="h-6 w-6 text-gray-800" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Skills Trainer</h3>
              <p className="mb-4 text-gray-600">
                Share your expertise in areas such as digital literacy, entrepreneurship, or creative arts through
                workshops.
              </p>
              <ul className="mb-6 space-y-2">
                <li className="flex items-start">
                  <CheckCircle className="mr-2 h-5 w-5 text-gray-800 flex-shrink-0" />
                  <span className="text-gray-600">Short-term commitments available</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="mr-2 h-5 w-5 text-gray-800 flex-shrink-0" />
                  <span className="text-gray-600">Professional experience required</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="mr-2 h-5 w-5 text-gray-800 flex-shrink-0" />
                  <span className="text-gray-600">Remote or in-person options</span>
                </li>
              </ul>
              <Button asChild className="w-full">
                <Link href="/volunteer/apply">Apply Now</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Volunteer Process */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold text-gray-800">Volunteer Process</h2>
          <div className="grid gap-8 md:grid-cols-4">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-black text-white">
                <span className="text-xl font-bold">1</span>
              </div>
              <h3 className="mb-2 text-xl font-semibold">Apply</h3>
              <p className="text-gray-600">Complete our online application form with your information and interests.</p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-black text-white">
                <span className="text-xl font-bold">2</span>
              </div>
              <h3 className="mb-2 text-xl font-semibold">Interview</h3>
              <p className="text-gray-600">Participate in a virtual interview with our volunteer coordinator.</p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-black text-white">
                <span className="text-xl font-bold">3</span>
              </div>
              <h3 className="mb-2 text-xl font-semibold">Orientation</h3>
              <p className="text-gray-600">Complete our volunteer orientation and training program.</p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-black text-white">
                <span className="text-xl font-bold">4</span>
              </div>
              <h3 className="mb-2 text-xl font-semibold">Begin Volunteering</h3>
              <p className="text-gray-600">Start making an impact with your assigned role or project.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Volunteer Stories */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold text-gray-800">Volunteer Stories</h2>
          <div className="grid gap-8 md:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="rounded-lg bg-white p-6 shadow-sm">
                <div className="mb-4 flex items-center">
                  <div className="mr-4 h-16 w-16 overflow-hidden rounded-full">
                    <Image
                      src={`/placeholder.svg?height=64&width=64&text=V${i}`}
                      alt={`Volunteer ${i}`}
                      width={64}
                      height={64}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Volunteer Name {i}</h3>
                    <p className="text-sm text-gray-600">Role / Country</p>
                  </div>
                </div>
                <p className="mb-4 text-gray-600">
                  &quot;Volunteering with YUP has been one of the most rewarding experiences of my life. I&apos;ve
                  learned so much from the youth I work with and have gained a deeper appreciation for Rwandan
                  culture.&quot;
                </p>
                <Button asChild variant="link" className="p-0">
                  <Link href={`/stories/volunteer-${i}`}>Read Full Story</Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold text-gray-800">Frequently Asked Questions</h2>
          <div className="mx-auto max-w-3xl space-y-6">
            <div className="rounded-lg border p-6">
              <h3 className="mb-2 text-xl font-semibold">Do I need to speak Kinyarwanda to volunteer?</h3>
              <p className="text-gray-600">
                No, English is widely spoken in Rwanda, especially in urban areas. However, learning a few basic phrases
                in Kinyarwanda is always appreciated and can enhance your experience.
              </p>
            </div>
            <div className="rounded-lg border p-6">
              <h3 className="mb-2 text-xl font-semibold">Can I volunteer remotely?</h3>
              <p className="text-gray-600">
                Yes, we offer several remote volunteer opportunities, particularly in areas such as mentoring, tutoring,
                and content creation.
              </p>
            </div>
            <div className="rounded-lg border p-6">
              <h3 className="mb-2 text-xl font-semibold">Is there a minimum time commitment?</h3>
              <p className="text-gray-600">
                Time commitments vary by role. Some positions require a minimum of 3-6 months, while others can be
                project-based or short-term. We&apos;ll work with you to find an opportunity that fits your schedule.
              </p>
            </div>
            <div className="rounded-lg border p-6">
              <h3 className="mb-2 text-xl font-semibold">Do you provide accommodation for international volunteers?</h3>
              <p className="text-gray-600">
                For long-term international volunteers, we can assist with finding accommodation, though costs are
                typically the responsibility of the volunteer. We provide recommendations and support throughout the
                process.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-800">Ready to Make a Difference?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-gray-600">
            Join our team of dedicated volunteers and help us empower youth in Rwanda. Apply today to start your
            volunteer journey.
          </p>
          <div className="mt-8 flex justify-center">
            <Button asChild className="bg-black text-white hover:bg-gray-800">
              <Link href="/volunteer/apply">Apply to Volunteer</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
