"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { CheckCircle, ArrowRight, Download, Calendar, MapPin, User, Mail, Phone } from "lucide-react";
import Link from "next/link";
import { useStore, formatZAR } from "@/lib/store";

export const runtime = "edge";

const spring = { type: "spring" as const, stiffness: 60, damping: 20 };

export default function BookingConfirmedPage() {
  const searchParams = useSearchParams();
  const { bookings, updateBookingStatus } = useStore();
  const [confirmed, setConfirmed] = useState(false);

  // Get the most recent booking
  const latestBooking = bookings.length > 0 ? bookings[bookings.length - 1] : null;

  // Auto-confirm the latest pending booking when arriving from PayFast
  useEffect(() => {
    const paymentStatus = searchParams.get("payment");
    if (paymentStatus === "success" && latestBooking && latestBooking.status === "pending") {
      updateBookingStatus(latestBooking.id, "confirmed");
      setConfirmed(true);
    } else if (latestBooking?.status === "confirmed") {
      setConfirmed(true);
    }
  }, [searchParams, latestBooking, updateBookingStatus]);

  if (!latestBooking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-silver text-sm mb-6">No reservation found.</p>
          <Link href="/" className="lux-button-secondary inline-flex">
            <ArrowRight size={14} />
            Browse Collection
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={spring}
          className="text-center mb-12"
        >
          {/* Success Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ ...spring, delay: 0.2 }}
            className="w-20 h-20 mx-auto mb-6 border border-green-500/30 bg-green-500/5 flex items-center justify-center"
          >
            <CheckCircle size={36} className="text-green-400" />
          </motion.div>

          <h1 className="text-3xl font-display text-crisp mb-3">
            Reservation Confirmed
          </h1>
          <p className="text-silver text-sm leading-relaxed">
            Your booking has been secured. A confirmation email will be sent to{" "}
            <span className="text-champagne">{latestBooking.clientDetails.email}</span>.
          </p>
        </motion.div>

        {/* Booking Details Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...spring, delay: 0.3 }}
          className="lux-card p-6 sm:p-8 mb-6"
        >
          <div className="text-[11px] tracking-[0.25em] uppercase text-champagne/80 mb-6">
            Booking Reference
          </div>

          <div className="font-mono text-champagne-light text-lg mb-6 pb-6 border-b border-white/[0.06]">
            {latestBooking.id.toUpperCase()}
          </div>

          {/* Property */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <MapPin size={13} className="text-champagne/60" />
              <span className="text-[11px] tracking-[0.2em] uppercase text-champagne/70">
                Estate
              </span>
            </div>
            <p className="text-crisp font-display text-lg">
              {latestBooking.propertyTitle}
            </p>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <div className="flex items-center gap-1.5 mb-1">
                <Calendar size={12} className="text-champagne/60" />
                <span className="text-[10px] tracking-[0.2em] uppercase text-champagne/70">
                  Check-in
                </span>
              </div>
              <p className="text-silver-light text-sm tabular-nums">
                {new Date(latestBooking.checkIn).toLocaleDateString("en-ZA", {
                  weekday: "short",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
            <div>
              <div className="flex items-center gap-1.5 mb-1">
                <Calendar size={12} className="text-champagne/60" />
                <span className="text-[10px] tracking-[0.2em] uppercase text-champagne/70">
                  Check-out
                </span>
              </div>
              <p className="text-silver-light text-sm tabular-nums">
                {new Date(latestBooking.checkOut).toLocaleDateString("en-ZA", {
                  weekday: "short",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>

          {/* Duration & Total */}
          <div className="flex justify-between items-baseline pt-4 border-t border-white/[0.06] mb-6">
            <span className="text-silver text-sm">
              {latestBooking.nights} night{latestBooking.nights !== 1 ? "s" : ""}
            </span>
            <span className="text-champagne-light font-display text-xl tabular-nums">
              {formatZAR(
                latestBooking.totalCost +
                  Math.round(latestBooking.totalCost * 0.05) +
                  Math.round(latestBooking.totalCost * 0.15)
              )}
            </span>
          </div>

          {/* Guest Details */}
          <div className="pt-4 border-t border-white/[0.06]">
            <div className="text-[11px] tracking-[0.25em] uppercase text-champagne/80 mb-4">
              Guest
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <User size={13} className="text-silver/40" />
                <span className="text-silver-light text-sm">{latestBooking.clientDetails.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={13} className="text-silver/40" />
                <span className="text-silver-light text-sm">{latestBooking.clientDetails.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={13} className="text-silver/40" />
                <span className="text-silver-light text-sm">{latestBooking.clientDetails.phone}</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Status Badge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex items-center justify-center gap-2 mb-8"
        >
          <div className={`w-2 h-2 rounded-full ${confirmed ? "bg-green-400" : "bg-amber-400"}`} />
          <span className={`text-[11px] tracking-[0.2em] uppercase ${confirmed ? "text-green-400" : "text-amber-400"}`}>
            {confirmed ? "Payment Confirmed" : "Payment Pending"}
          </span>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...spring, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-3"
        >
          <Link href="/" className="lux-button-secondary flex-1 justify-center">
            Browse More Estates
          </Link>
          <Link href="/contact" className="lux-button-primary flex-1 justify-center">
            Contact Concierge
            <ArrowRight size={14} />
          </Link>
        </motion.div>

        <p className="text-silver/50 text-[11px] text-center mt-8 leading-relaxed">
          For any changes to your reservation, please contact our concierge team.
          <br />
          We look forward to welcoming you.
        </p>
      </div>
    </div>
  );
}
