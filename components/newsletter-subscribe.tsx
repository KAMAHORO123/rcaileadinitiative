"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export function NewsletterSubscribe() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const testApiConnection = async () => {
    try {
      const response = await fetch("/api/test");
      const data = await response.json();
      console.log("API Test Response:", data);
      return true;
    } catch (error) {
      console.error("API Test Error:", error);
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    console.log("Form submitted with email:", email);
    setIsSubmitting(true);

    // Test API connection first
    const isApiWorking = await testApiConnection();
    if (!isApiWorking) {
      setError("Unable to connect to the server. Please try again later.");
      setIsSubmitting(false);
      return;
    }

    try {
      console.log("Sending request to /api/newsletter");
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      console.log("Response status:", response.status);
      const data = await response.json();
      console.log("Response data:", data);

      if (!response.ok) {
        const errorMessage = data.error || "Failed to subscribe";
        console.error("API Error:", errorMessage);
        setError(errorMessage);
        throw new Error(errorMessage);
      }

      toast.success("Successfully subscribed to newsletter!");
      setEmail("");
    } catch (error) {
      console.error("Subscription error:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Failed to subscribe";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full"
            aria-label="Email address for newsletter subscription"
          />
          {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
        </div>
        <Button
          type="submit"
          className="w-full bg-bronze-600 text-white hover:bg-bronze-700"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Subscribing..." : "Subscribe to Newsletter"}
        </Button>
      </form>
    </div>
  );
}
