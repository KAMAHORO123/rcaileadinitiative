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
  created_at: string;
}

export default function AdminDonations() {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDonations();
  }, []);

  const fetchDonations = async () => {
    try {
      const response = await fetch("/api/donations");
      if (!response.ok) {
        throw new Error("Failed to fetch donations");
      }
      const data = await response.json();
      setDonations(data);
    } catch (error) {
      toast.error("Failed to load donations");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold">Donations Management</h1>

      {loading ? (
        <div className="text-center">Loading donations...</div>
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
