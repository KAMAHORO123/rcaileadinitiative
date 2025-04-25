"use client";

import type React from "react";
import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Clock, Plus, Minus } from "lucide-react";
import { toast } from "sonner";

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to send message");
      }

      toast.success("Message sent successfully!");
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to send message"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  const faqs = [
    {
      question: "How can I get involved with RCA ILEAD?",
      answer:
        "There are many ways to get involved! You can volunteer, donate, or participate in our programs. Contact us to learn more about the opportunities available.",
    },
    {
      question: "What programs do you offer?",
      answer:
        "We offer various programs focused on education, leadership development, and community engagement. Visit our About page to learn more about our programs.",
    },
    {
      question: "How can I make a donation?",
      answer:
        "You can make a donation through our website using the Donate button, or contact us for other donation methods. Every contribution makes a difference!",
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
              Get in <span className="text-gradient">Touch</span>
            </h1>
            <p className="mb-8 text-lg text-gray-600 dark:text-gray-300">
              Have questions or want to get involved? We&apos;d love to hear
              from you. Reach out to us through any of the channels below.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 dark:bg-black">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <h2 className="mb-6 text-2xl font-bold text-gray-800 dark:text-white">
                Get in Touch
              </h2>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="mr-4 rounded-full bg-gray-100 p-3 dark:bg-gray-800">
                    <Phone className="h-6 w-6 text-bronze-600 dark:text-gold-500" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Phone Number
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      +250 796 060 684
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="mr-4 rounded-full bg-gray-100 p-3 dark:bg-gray-800">
                    <Mail className="h-6 w-6 text-bronze-600 dark:text-gold-500" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Email Address
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      ileadinitiativeteam@gmail.com
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="mr-4 rounded-full bg-gray-100 p-3 dark:bg-gray-800">
                    <Clock className="h-6 w-6 text-bronze-600 dark:text-gold-500" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Working Hours
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Monday - Sunday: 7:30 AM - 8:00 PM
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h2 className="mb-6 text-2xl font-bold text-gray-800 dark:text-white">
                Send us a Message
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name" className="dark:text-gray-300">
                    Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
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
                    placeholder="Your email"
                    required
                    className="dark:bg-black dark:border-gray-800 dark:text-white dark:placeholder-gray-500"
                  />
                </div>
                <div>
                  <Label htmlFor="subject" className="dark:text-gray-300">
                    Subject
                  </Label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="How can we help you?"
                    required
                    className="dark:bg-black dark:border-gray-800 dark:text-white dark:placeholder-gray-500"
                  />
                </div>
                <div>
                  <Label htmlFor="message" className="dark:text-gray-300">
                    Message
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your message here..."
                    rows={5}
                    required
                    className="dark:bg-black dark:border-gray-800 dark:text-white dark:placeholder-gray-500"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-bronze-600 text-white hover:bg-bronze-700 dark:bg-bronze-600 dark:text-white dark:hover:bg-bronze-700"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 dark:bg-black">
        <div className="container mx-auto px-4">
          <h2 className="mb-8 text-center text-3xl font-bold text-gray-800 dark:text-white">
            Frequently Asked Questions
          </h2>
          <div className="mx-auto max-w-3xl space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="rounded-lg border border-gray-200 dark:border-gray-800"
              >
                <button
                  className="flex w-full items-center justify-between p-4 text-left"
                  onClick={() => toggleFaq(index)}
                >
                  <span className="text-lg font-semibold text-gray-900 dark:text-white">
                    {faq.question}
                  </span>
                  {expandedFaq === index ? (
                    <Minus className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                  ) : (
                    <Plus className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                  )}
                </button>
                {expandedFaq === index && (
                  <div className="border-t border-gray-200 p-4 dark:border-gray-800">
                    <p className="text-gray-600 dark:text-gray-300">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
