"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Shield,
  Lock,
  CheckCircle,
  CreditCard,
  ArrowLeft,
  AlertTriangle,
} from "lucide-react";
import Link from "next/link";
import { useStore, formatZAR } from "@/lib/store";

const spring = { type: "spring" as const, stiffness: 60, damping: 20 };

// PayFast sandbox credentials — replace with live keys in production
const PAYFAST_MERCHANT_ID = "10000100";
const PAYFAST_MERCHANT_KEY = "46f0cd694581a";
const PAYFAST_SANDBOX_URL = "https://sandbox.payfast.co.za/eng/process";

export default function CheckoutPage() {
  const router = useRouter();
  const { currentBooking } = useStore();
  const [vaultLocking, setVaultLocking] = useState(false);
  const [lockPhase, setLockPhase] = useState(0);

  useEffect(() => {
    if (!currentBooking) {
      router.push("/");
    }
  }, [currentBooking, router]);

  if (!currentBooking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <AlertTriangle size={32} className="text-champagne mx-auto mb-4" />
          <p className="text-silver text-sm">No active reservation found.</p>
          <Link href="/" className="lux-button-secondary mt-6 inline-flex">
            <ArrowLeft size={14} />
            Return to Showroom
          </Link>
        </div>
      </div>
    );
  }

  const serviceFee = Math.round(currentBooking.totalCost * 0.05);
  const levyVat = Math.round(currentBooking.totalCost * 0.15);
  const grandTotal = currentBooking.totalCost + serviceFee + levyVat;
  const grandTotalCents = (grandTotal / 100).toFixed(2); // PayFast expects rands
  const grandTotalForPayfast = grandTotal.toFixed(2);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setVaultLocking(true);

    // Phase animation
    const phases = [
      { delay: 0, phase: 1 },
      { delay: 600, phase: 2 },
      { delay: 1200, phase: 3 },
      { delay: 2000, phase: 4 },
    ];

    phases.forEach(({ delay, phase }) => {
      setTimeout(() => setLockPhase(phase), delay);
    });

    // Submit form after animation
    setTimeout(() => {
      (e.target as HTMLFormElement).submit();
    }, 2800);
  };

  return (
    <div className="min-h-screen">
      {/* ─── Vault Locking Overlay ──────────────────────────── */}
      <AnimatePresence>
        {vaultLocking && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-[100] bg-void flex items-center justify-center"
          >
            <div className="flex flex-col items-center gap-8">
              <motion.div
                animate={{
                  rotate: lockPhase >= 2 ? 360 : 0,
                  scale: lockPhase >= 3 ? [1, 1.1, 1] : 1,
                }}
                transition={spring}
              >
                <Lock
                  size={48}
                  className={`transition-colors duration-500 ${
                    lockPhase >= 3 ? "text-champagne-light" : "text-silver/40"
                  }`}
                />
              </motion.div>

              <div className="flex flex-col items-center gap-3">
                {[
                  "Processing transaction...",
                  "Securing payment channel...",
                  "Verifying details...",
                  "Redirecting to payment gateway...",
                ].map((text, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{
                      opacity: lockPhase > i ? 1 : 0.2,
                      y: lockPhase > i ? 0 : 10,
                    }}
                    transition={spring}
                    className="flex items-center gap-3"
                  >
                    {lockPhase > i ? (
                      <CheckCircle size={12} className="text-champagne-light" />
                    ) : (
                      <div className="w-3 h-3 border border-white/10 rounded-full" />
                    )}
                    <span
                      className={`text-sm tracking-wide ${
                        lockPhase > i ? "text-silver-light" : "text-silver/30"
                      }`}
                    >
                      {text}
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* Progress bar */}
              <div className="w-64 h-px bg-white/[0.06] overflow-hidden mt-4">
                <motion.div
                  className="h-full bg-champagne"
                  initial={{ width: "0%" }}
                  animate={{ width: `${(lockPhase / 4) * 100}%` }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── Header ─────────────────────────────────────────── */}
      <div className="relative" style={{ borderBottom: "1px solid rgba(201,169,110,0.08)" }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 100%, rgba(201,169,110,0.04) 0%, transparent 60%)" }} />
        <div className="relative bg-navy/60 backdrop-blur-sm">
        <div className="max-w-[900px] mx-auto px-6 py-4">
          <Link
            href={`/properties/${currentBooking.propertyId}`}
            className="inline-flex items-center gap-2 text-silver hover:text-champagne-light text-sm transition-colors"
          >
            <ArrowLeft size={14} />
            <span className="text-[11px] tracking-[0.15em] uppercase">
              Back to Estate
            </span>
          </Link>
        </div>
        </div>
      </div>

      <div className="max-w-[900px] mx-auto px-6 py-12 lg:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={spring}
        >
          {/* Title */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Shield size={16} className="text-champagne/60" />
              <span className="text-champagne text-[10px] tracking-[0.5em] uppercase">
                Secure Checkout
              </span>
              <Shield size={16} className="text-champagne/60" />
            </div>
            <h1 className="text-3xl md:text-4xl font-display text-crisp">
              Reservation Summary
            </h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8">
            {/* ─── Order Summary ────────────────────────────── */}
            <div className="space-y-6">
              {/* Property Card */}
              <div className="lux-card p-6">
                <div className="text-[10px] tracking-[0.3em] uppercase text-champagne/70 mb-4">
                  Estate
                </div>
                <h2 className="text-xl font-display text-crisp mb-2">
                  {currentBooking.propertyTitle}
                </h2>

                <div className="grid grid-cols-2 gap-4 mt-6 pt-4 border-t border-white/[0.06]">
                  <div>
                    <div className="text-[9px] tracking-[0.3em] uppercase text-champagne/50 mb-1">
                      Check-in
                    </div>
                    <div className="text-silver-light text-sm tabular-nums">
                      {new Date(currentBooking.checkIn).toLocaleDateString(
                        "en-ZA",
                        {
                          weekday: "short",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }
                      )}
                    </div>
                  </div>
                  <div>
                    <div className="text-[9px] tracking-[0.3em] uppercase text-champagne/50 mb-1">
                      Check-out
                    </div>
                    <div className="text-silver-light text-sm tabular-nums">
                      {new Date(currentBooking.checkOut).toLocaleDateString(
                        "en-ZA",
                        {
                          weekday: "short",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }
                      )}
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-white/[0.06]">
                  <div className="text-[9px] tracking-[0.3em] uppercase text-champagne/50 mb-1">
                    Duration
                  </div>
                  <div className="text-silver-light text-sm tabular-nums">
                    {currentBooking.nights} night
                    {currentBooking.nights !== 1 ? "s" : ""}
                  </div>
                </div>
              </div>

              {/* Guest Details */}
              <div className="lux-card p-6">
                <div className="text-[10px] tracking-[0.3em] uppercase text-champagne/70 mb-4">
                  Guest Details
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-silver text-sm">Name</span>
                    <span className="text-silver-bright text-sm">
                      {currentBooking.clientDetails.name}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-silver text-sm">Email</span>
                    <span className="text-silver-bright text-sm">
                      {currentBooking.clientDetails.email}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-silver text-sm">Phone</span>
                    <span className="text-silver-bright text-sm">
                      {currentBooking.clientDetails.phone}
                    </span>
                  </div>
                </div>
              </div>

              {/* Security Notice */}
              <div className="flex items-start gap-3 px-5 py-4 border border-champagne/10 bg-champagne/[0.02]">
                <Lock size={14} className="text-champagne/50 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-silver text-xs leading-relaxed">
                    Your payment is processed via PayFast&apos;s 256-bit SSL
                    encrypted gateway. ENVY Luxury Homes never stores your card
                    details. PCI DSS Level 1 compliant.
                  </p>
                </div>
              </div>
            </div>

            {/* ─── Payment Widget ───────────────────────────── */}
            <div className="lg:sticky lg:top-[100px] lg:self-start">
              <div className="lux-card p-6">
                <div className="flex items-center gap-2 mb-6">
                  <CreditCard size={14} className="text-champagne/60" />
                  <span className="text-[10px] tracking-[0.3em] uppercase text-champagne/70">
                    Payment
                  </span>
                </div>

                {/* Cost Lines */}
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-silver">
                      Estate ({currentBooking.nights} nights)
                    </span>
                    <span className="text-silver-light tabular-nums">
                      {formatZAR(currentBooking.totalCost)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-silver">Service fee</span>
                    <span className="text-silver-light tabular-nums">
                      {formatZAR(serviceFee)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-silver">Levy &amp; VAT (15%)</span>
                    <span className="text-silver-light tabular-nums">
                      {formatZAR(levyVat)}
                    </span>
                  </div>
                </div>

                <div className="border-t border-white/[0.06] pt-4 mb-8">
                  <div className="flex justify-between items-baseline">
                    <span className="text-silver-light text-sm font-medium">
                      Grand Total
                    </span>
                    <span className="text-champagne-light font-display text-2xl tabular-nums">
                      {formatZAR(grandTotal)}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-silver/40 text-[10px] tracking-wider">
                      ZAR (South African Rand)
                    </span>
                  </div>
                </div>

                {/* PayFast Form */}
                <form
                  action={PAYFAST_SANDBOX_URL}
                  method="POST"
                  onSubmit={handleSubmit}
                >
                  {/* Required PayFast Hidden Inputs */}
                  <input
                    type="hidden"
                    name="merchant_id"
                    value={PAYFAST_MERCHANT_ID}
                  />
                  <input
                    type="hidden"
                    name="merchant_key"
                    value={PAYFAST_MERCHANT_KEY}
                  />
                  <input
                    type="hidden"
                    name="amount"
                    value={grandTotalForPayfast}
                  />
                  <input
                    type="hidden"
                    name="item_name"
                    value={`ENVY — ${currentBooking.propertyTitle} (${currentBooking.nights} nights)`}
                  />
                  <input
                    type="hidden"
                    name="item_description"
                    value={`Luxury estate reservation: ${currentBooking.checkIn} to ${currentBooking.checkOut}`}
                  />
                  <input
                    type="hidden"
                    name="name_first"
                    value={currentBooking.clientDetails.name.split(" ")[0]}
                  />
                  <input
                    type="hidden"
                    name="name_last"
                    value={
                      currentBooking.clientDetails.name.split(" ").slice(1).join(" ") || ""
                    }
                  />
                  <input
                    type="hidden"
                    name="email_address"
                    value={currentBooking.clientDetails.email}
                  />
                  <input
                    type="hidden"
                    name="cell_number"
                    value={currentBooking.clientDetails.phone}
                  />
                  <input
                    type="hidden"
                    name="return_url"
                    value={
                      typeof window !== "undefined"
                        ? `${window.location.origin}/?payment=success`
                        : ""
                    }
                  />
                  <input
                    type="hidden"
                    name="cancel_url"
                    value={
                      typeof window !== "undefined"
                        ? `${window.location.origin}/checkout?payment=cancelled`
                        : ""
                    }
                  />
                  <input
                    type="hidden"
                    name="notify_url"
                    value={
                      typeof window !== "undefined"
                        ? `${window.location.origin}/api/payfast-notify`
                        : ""
                    }
                  />

                  <button
                    type="submit"
                    className="lux-button-primary w-full"
                    disabled={vaultLocking}
                  >
                    <Lock size={14} />
                    {vaultLocking ? "Securing Vault..." : "Pay Securely via PayFast"}
                  </button>
                </form>

                <div className="flex items-center justify-center gap-4 mt-6 pt-4 border-t border-white/[0.06]">
                  <span className="text-[9px] tracking-[0.2em] uppercase text-silver/40">
                    256-bit SSL
                  </span>
                  <span className="text-silver/20">·</span>
                  <span className="text-[9px] tracking-[0.2em] uppercase text-silver/40">
                    PCI DSS
                  </span>
                  <span className="text-silver/20">·</span>
                  <span className="text-[9px] tracking-[0.2em] uppercase text-silver/40">
                    PayFast
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
