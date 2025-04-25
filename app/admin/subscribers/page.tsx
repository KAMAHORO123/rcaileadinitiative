"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";

interface Subscriber {
  id: number;
  email: string;
  status: string;
  created_at: string;
}

export default function AdminSubscribers() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchSubscribers();
  }, []);

  const fetchSubscribers = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch("/api/newsletter/subscribers");
      if (!response.ok) {
        throw new Error("Failed to fetch subscribers");
      }
      const data = await response.json();
      setSubscribers(data);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to load subscribers";
      setError(errorMessage);
      toast.error(errorMessage);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch (error) {
      console.error("Error formatting date:", error);
      return "Invalid date";
    }
  };

  const handleUnsubscribe = async (id: number) => {
    try {
      const response = await fetch(`/api/newsletter/unsubscribe/${id}`, {
        method: "POST",
      });
      if (!response.ok) {
        throw new Error("Failed to unsubscribe");
      }
      toast.success("Subscriber unsubscribed successfully");
      fetchSubscribers(); // Refresh the list
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to unsubscribe";
      toast.error(errorMessage);
      console.error(error);
    }
  };

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-800">
          <h2 className="mb-2 text-lg font-semibold">Error</h2>
          <p>{error}</p>
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => fetchSubscribers()}
          >
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold">Newsletter Subscribers</h1>

      {loading ? (
        <div className="text-center">Loading subscribers...</div>
      ) : subscribers.length === 0 ? (
        <div className="rounded-lg border p-4 text-center text-gray-500">
          No subscribers found
        </div>
      ) : (
        <div className="rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Email</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date Subscribed</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {subscribers.map((subscriber) => (
                <TableRow key={subscriber.id}>
                  <TableCell>{subscriber.email}</TableCell>
                  <TableCell>
                    <span
                      className={`inline-block rounded-full px-2 py-1 text-xs font-semibold ${
                        subscriber.status === "active"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {subscriber.status}
                    </span>
                  </TableCell>
                  <TableCell>{formatDate(subscriber.created_at)}</TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleUnsubscribe(subscriber.id)}
                      disabled={subscriber.status === "unsubscribed"}
                    >
                      Unsubscribe
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
