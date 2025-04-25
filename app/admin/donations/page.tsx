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

interface Donation {
  id: number;
  donor_name: string;
  email: string;
  amount: number;
  payment_method: string;
  status: string;
  transaction_id: string;
  created_at: string;
}

export default function AdminDonations() {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updatingStatus, setUpdatingStatus] = useState<number | null>(null);

  useEffect(() => {
    fetchDonations();
  }, []);

  const fetchDonations = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch("/api/donations");
      if (!response.ok) {
        throw new Error("Failed to fetch donations");
      }
      const data = await response.json();
      setDonations(data);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to load donations";
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

  const formatAmount = (amount: number) => {
    try {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);
    } catch (error) {
      console.error("Error formatting amount:", error);
      return "Invalid amount";
    }
  };

  const handleStatusUpdate = async (id: number, newStatus: string) => {
    try {
      setUpdatingStatus(id);
      const response = await fetch(`/api/donations/${id}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        throw new Error("Failed to update donation status");
      }

      toast.success("Donation status updated successfully");
      fetchDonations(); // Refresh the list
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to update donation status";
      toast.error(errorMessage);
      console.error(error);
    } finally {
      setUpdatingStatus(null);
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
            onClick={() => fetchDonations()}
          >
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold">Donations Management</h1>

      {loading ? (
        <div className="text-center">Loading donations...</div>
      ) : donations.length === 0 ? (
        <div className="rounded-lg border p-4 text-center text-gray-500">
          No donations found
        </div>
      ) : (
        <div className="rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Donor</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Payment Method</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {donations.map((donation) => (
                <TableRow key={donation.id}>
                  <TableCell>{donation.donor_name}</TableCell>
                  <TableCell>{donation.email}</TableCell>
                  <TableCell>{formatAmount(donation.amount)}</TableCell>
                  <TableCell>{donation.payment_method}</TableCell>
                  <TableCell>
                    <span
                      className={`inline-block rounded-full px-2 py-1 text-xs font-semibold ${
                        donation.status === "completed"
                          ? "bg-green-100 text-green-800"
                          : donation.status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {donation.status}
                    </span>
                  </TableCell>
                  <TableCell>{formatDate(donation.created_at)}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      {donation.status === "pending" && (
                        <>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              handleStatusUpdate(donation.id, "completed")
                            }
                            className="bg-green-50 text-green-700 hover:bg-green-100"
                            disabled={updatingStatus === donation.id}
                          >
                            {updatingStatus === donation.id
                              ? "Updating..."
                              : "Approve"}
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              handleStatusUpdate(donation.id, "failed")
                            }
                            className="bg-red-50 text-red-700 hover:bg-red-100"
                            disabled={updatingStatus === donation.id}
                          >
                            {updatingStatus === donation.id
                              ? "Updating..."
                              : "Reject"}
                          </Button>
                        </>
                      )}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          // Handle view details
                          toast.info("View donation details");
                        }}
                      >
                        View
                      </Button>
                    </div>
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
