"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Heart, Users, BookOpen } from "lucide-react";
import { toast } from "sonner";

export default function Donate() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    donor_name: "",
    email: "",
    amount: "",
    payment_method: "mobile_money", // Default payment method
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/donations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          amount: parseFloat(formData.amount),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to process donation");
      }

      if (data.emailSent) {
        toast.success(
          <div>
            <p className="font-bold">Thank you for your donation!</p>
            <p className="text-sm mt-1">{data.nextSteps}</p>
          </div>
        );
      } else {
        toast.warning(
          <div>
            <p className="font-bold">Thank you for your donation!</p>
            <p className="text-sm mt-1">{data.nextSteps}</p>
          </div>
        );
      }

      setFormData({
        donor_name: "",
        email: "",
        amount: "",
        payment_method: "mobile_money",
      });
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to process donation"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="dark:bg-black">
      {/* Hero Section */}
      <section className="bg-gray-50 py-20 dark:bg-black">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-2 md:items-center">
            <div>
              <h1 className="text-4xl font-bold text-gray-800 dark:text-white md:text-5xl">
                Support Our Mission
              </h1>
              <p className="mt-6 text-lg text-gray-600 dark:text-gray-300">
                Your donation helps us provide education, resources, and
                opportunities to underserved youth in Rwanda.
              </p>
              <div className="mt-8">
                <Button
                  asChild
                  className="bg-bronze-600 text-white hover:bg-bronze-700 dark:bg-bronze-600 dark:text-white dark:hover:bg-bronze-700"
                >
                  <a href="#donate-form">Donate Now</a>
                </Button>
              </div>
            </div>
            <div className="rounded-lg overflow-hidden">
              <Image
                src="/donate.png"
                alt="Students in Rwanda"
                width={600}
                height={400}
                className="w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-16 dark:bg-black">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold text-gray-800 dark:text-white">
            Your Impact
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
                <BookOpen className="h-8 w-8 text-bronze-600 dark:text-gold-500" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
                $25
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Provides school supplies for one student for a semester
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
                <Users className="h-8 w-8 text-bronze-600 dark:text-gold-500" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
                $100
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Sponsors a student&apos;s education for one month
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
                <Heart className="h-8 w-8 text-bronze-600 dark:text-gold-500" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
                $500
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Funds a community development project
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Donation Form */}
      <section id="donate-form" className="bg-gray-50 py-16 dark:bg-black">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl rounded-lg border bg-white p-8 shadow-sm dark:bg-black dark:border-gray-800">
            <h2 className="mb-6 text-center text-3xl font-bold text-gray-800 dark:text-white">
              Make a Donation
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="donor_name" className="dark:text-gray-300">
                  Full Name
                </Label>
                <Input
                  id="donor_name"
                  name="donor_name"
                  value={formData.donor_name}
                  onChange={handleChange}
                  placeholder="Your full name"
                  required
                  className="dark:bg-black dark:border-gray-800 dark:text-white dark:placeholder-gray-500"
                />
              </div>
              <div>
                <Label htmlFor="email" className="dark:text-gray-300">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your.email@example.com"
                  required
                  className="dark:bg-black dark:border-gray-800 dark:text-white dark:placeholder-gray-500"
                />
              </div>
              <div>
                <Label htmlFor="amount" className="dark:text-gray-300">
                  Donation Amount (USD)
                </Label>
                <Input
                  id="amount"
                  name="amount"
                  type="number"
                  min="1"
                  step="0.01"
                  value={formData.amount}
                  onChange={handleChange}
                  placeholder="Enter amount"
                  required
                  className="dark:bg-black dark:border-gray-800 dark:text-white dark:placeholder-gray-500"
                />
              </div>
              <div>
                <Label className="dark:text-gray-300">Payment Method</Label>
                <RadioGroup
                  defaultValue="mobile_money"
                  className="mt-2 space-y-2"
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, payment_method: value }))
                  }
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="mobile_money"
                      id="mobile_money"
                      className="dark:border-gray-700 dark:text-gold-500"
                    />
                    <Label
                      htmlFor="mobile_money"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-gray-300"
                    >
                      Mobile Money
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="bank_transfer"
                      id="bank_transfer"
                      className="dark:border-gray-700 dark:text-gold-500"
                    />
                    <Label
                      htmlFor="bank_transfer"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-gray-300"
                    >
                      Bank Transfer
                    </Label>
                  </div>
                </RadioGroup>
              </div>
              <Button
                type="submit"
                className="w-full bg-bronze-600 text-white hover:bg-bronze-700 dark:bg-bronze-600 dark:text-white dark:hover:bg-bronze-700"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Processing..." : "Donate Now"}
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* Other Ways to Give */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-8 text-center text-3xl font-bold text-gray-800">
            Other Ways to Give
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="rounded-lg border p-6 shadow-sm">
              <h3 className="mb-4 text-xl font-semibold">
                Corporate Partnerships
              </h3>
              <p className="mb-4 text-gray-600">
                Partner with us to make a significant impact on children
                education and development in Rwanda. We offer various
                partnership opportunities.
              </p>
              <Button asChild variant="outline" className="w-full">
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
            <div className="rounded-lg border p-6 shadow-sm">
              <h3 className="mb-4 text-xl font-semibold">Planned Giving</h3>
              <p className="mb-4 text-gray-600">
                Leave a lasting legacy by including RCA ILEAD Initiative in your
                planning. Your gift will support future generations of youth in
                Rwanda.
              </p>
              <Button asChild variant="outline" className="w-full">
                <Link href="/contact">Learn More</Link>
              </Button>
            </div>
            <div className="rounded-lg border p-6 shadow-sm">
              <h3 className="mb-4 text-xl font-semibold">In-Kind Donations</h3>
              <p className="mb-4 text-gray-600">
                Donate goods, services, or expertise to support our programs. We
                accept various in-kind donations that align with our mission.
              </p>
              <Button asChild variant="outline" className="w-full">
                <Link href="/contact">Get in Touch</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Stories */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-8 text-center text-3xl font-bold text-gray-800">
            Your Donations at Work
          </h2>
          <div className="grid gap-8 md:grid-cols-2">
            <div className="flex flex-col md:flex-row items-start gap-4">
              <div className="rounded-lg overflow-hidden w-full md:w-40 flex-shrink-0">
                <Image
                  src="kid1.png"
                  alt="Student portrait"
                  width={160}
                  height={160}
                  className="w-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-xl font-semibold">Maria&apos;s Story</h3>
                <p className="mt-2 text-gray-600">
                  &quot;Thanks to the scholarship provided by RCA ILEAD
                  Initiative, I was able to continue my education and pursue my
                  dreams. The support I received has changed my life.&quot;
                </p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-start gap-4">
              <div className="rounded-lg overflow-hidden w-full md:w-40 flex-shrink-0">
                <Image
                  src="/kid2.png"
                  alt="Student portrait"
                  width={160}
                  height={160}
                  className="w-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-xl font-semibold">Jean&apos;s Story</h3>
                <p className="mt-2 text-gray-600">
                  &quot;Thanks to the support I received I was able to pursue my
                  dreams of becoming a doctor in the future. I&apos;m now able
                  to focus on my studies.&quot;
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-800">
            Join Our Mission Today
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-gray-600">
            Your support makes a real difference in the lives of young kids in
            Rwanda. Together, we can create lasting change and empower the next
            generation of leaders.
          </p>
          <div className="mt-8">
            <Button
              asChild
              className="bg-bronze-600 text-white hover:bg-bronze-700"
            >
              <a href="#donate-form">Donate Now</a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
