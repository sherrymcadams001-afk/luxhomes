"use client";

import React, { useState, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Bed,
  Bath,
  Maximize,
  MapPin,
  Calendar,
  Shield,
  Star,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import Link from "next/link";
import {
  useStore,
  formatZAR,
  calculateNights,
  type ClientDetails,
} from "@/lib/store";

const spring = { type: "spring" as const, stiffness: 60, damping: 20 };

export default function PropertyDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { getProperty, addBooking } = useStore();

  const propertyId = params.id as string;
  const property = getProperty(propertyId);

  const [selectedImage, setSelectedImage] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [clientDetails, setClientDetails] = useState<ClientDetails>({
    name: "",
    email: "",
    phone: "",
  });

  const nights = useMemo(() => {
    if (!checkIn || !checkOut) return 0;
    return calculateNights(checkIn, checkOut);
  }, [checkIn, checkOut]);

  const totalCost = useMemo(() => {
    if (!property || nights <= 0) return 0;
    return property.price * nights;
  }, [property, nights]);

  const handleReserve = () => {
    if (!property || nights <= 0) return;
    if (!clientDetails.name || !clientDetails.email || !clientDetails.phone) {
      alert("Please complete all guest details.");
      return;
    }

    addBooking({
      propertyId: property.id,
      propertyTitle: property.title,
      checkIn,
      checkOut,
      nights,
      totalCost,
      clientDetails,
      status: "pending",
    });

    router.push("/checkout");
  };

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-display text-crisp mb-4">
            Estate Not Found
          </h1>
          <p className="text-silver text-sm mb-8">
            This property may have been removed from our collection.
          </p>
          <Link href="/" className="lux-button-secondary">
            <ArrowLeft size={14} />
            Return to Showroom
          </Link>
        </div>
      </div>
    );
  }

  const todayStr = new Date().toISOString().split("T")[0];

  return (
    <>
      <div className="min-h-screen">
        {/* ─── Back Bar ─────────────────────────────────────── */}
        <div className="relative" style={{ borderBottom: "1px solid rgba(201,169,110,0.08)" }}>
          <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 20% 100%, rgba(201,169,110,0.04) 0%, transparent 60%)" }} />
          <div className="relative bg-navy/60 backdrop-blur-sm">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-4">
            <Link
              href="/collection"
              className="inline-flex items-center gap-2 text-silver hover:text-champagne-light text-sm transition-colors"
            >
              <ArrowLeft size={14} />
              <span className="text-[11px] tracking-[0.15em] uppercase">
                Back to Collection
              </span>
            </Link>
          </div>
          </div>
        </div>

        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-8 lg:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-8 lg:gap-12">
            {/* ─── Left: Gallery ──────────────────────────────── */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={spring}
            >
              {/* Main Image */}
              <div
                className="relative aspect-[16/10] overflow-hidden lux-border cursor-pointer mb-4"
                onClick={() => setLightboxOpen(true)}
              >
                <motion.div
                  key={selectedImage}
                  initial={{ opacity: 0, scale: 1.02 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: `url(${property.images[selectedImage]})`,
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/30 to-transparent" />

                {/* Nav arrows */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedImage((prev) =>
                      prev > 0 ? prev - 1 : property.images.length - 1
                    );
                  }}
                  className="absolute left-2 top-1/2 -translate-y-1/2 w-11 h-11 bg-void/50 backdrop-blur-sm border border-white/[0.08] flex items-center justify-center text-crisp/60 hover:text-crisp transition-colors touch-manipulation"
                  aria-label="Previous image"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedImage((prev) =>
                      prev < property.images.length - 1 ? prev + 1 : 0
                    );
                  }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-11 h-11 bg-void/50 backdrop-blur-sm border border-white/[0.08] flex items-center justify-center text-crisp/60 hover:text-crisp transition-colors touch-manipulation"
                  aria-label="Next image"
                >
                  <ChevronRight size={16} />
                </button>
              </div>

              {/* Thumbnail Strip */}
              <div className="grid grid-cols-4 gap-2">
                {property.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`relative aspect-[4/3] overflow-hidden border transition-all duration-300 ${
                      selectedImage === i
                        ? "border-champagne/50"
                        : "border-white/[0.06] opacity-50 hover:opacity-80"
                    }`}
                  >
                    <div
                      className="absolute inset-0 bg-cover bg-center"
                      style={{ backgroundImage: `url(${img})` }}
                    />
                  </button>
                ))}
              </div>

              {/* ─── Property Info ────────────────────────────── */}
              <div className="mt-10">
                <div className="flex items-center gap-2 mb-4">
                  <MapPin size={13} className="text-champagne" />
                  <span className="text-champagne text-[11px] tracking-[0.2em] uppercase">
                    {property.location}
                  </span>
                </div>

                <h1 className="text-3xl md:text-4xl font-display text-crisp leading-tight mb-6">
                  {property.title}
                </h1>

                <div className="flex flex-wrap items-center gap-4 sm:gap-8 pb-6 mb-6 border-b border-white/[0.06]">
                  <div className="flex items-center gap-2">
                    <Bed size={15} className="text-champagne/40" />
                    <span className="text-silver-light text-sm tabular-nums">
                      {property.bedrooms} Bedrooms
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Bath size={15} className="text-champagne/40" />
                    <span className="text-silver-light text-sm tabular-nums">
                      {property.bathrooms} Bathrooms
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Maximize size={15} className="text-champagne/40" />
                    <span className="text-silver-light text-sm tabular-nums">
                      {property.size}m²
                    </span>
                  </div>
                </div>

                <p className="text-silver text-[15px] leading-[1.8]">
                  {property.description}
                </p>

                {/* Amenities */}
                <div className="mt-10 pt-8 border-t border-white/[0.06]">
                  <h3 className="text-[10px] tracking-[0.3em] uppercase text-champagne/70 mb-6">
                    Estate Amenities
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      "Infinity Pool",
                      "Private Cinema",
                      "Wine Cellar",
                      "Smart Home",
                      "24/7 Security",
                      "Helipad Access",
                      "Staff Quarters",
                      "Gym & Spa",
                    ].map((amenity) => (
                      <div
                        key={amenity}
                        className="flex items-center gap-2 py-2"
                      >
                        <Star size={10} className="text-champagne/40" />
                        <span className="text-silver text-sm">{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* ─── Right: Booking Widget ──────────────────────── */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ ...spring, delay: 0.2 }}
              className="lg:sticky lg:top-[100px] lg:self-start"
            >
              <div className="lux-card p-6 lg:p-8">
                {/* Price Header */}
                <div className="flex items-baseline justify-between mb-8">
                  <div>
                    <div className="text-champagne-light text-2xl font-display tabular-nums">
                      {formatZAR(property.price)}
                    </div>
                    <div className="text-silver/60 text-[10px] tracking-[0.2em] uppercase mt-1">
                      per night
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        size={11}
                        className="text-champagne fill-champagne"
                      />
                    ))}
                  </div>
                </div>

                {/* Dates */}
                <div className="space-y-4 mb-6">
                  <div>
                    <label className="lux-label">
                      <Calendar
                        size={10}
                        className="inline mr-1 -mt-0.5"
                      />
                      Check-in
                    </label>
                    <input
                      type="date"
                      value={checkIn}
                      min={todayStr}
                      onChange={(e) => setCheckIn(e.target.value)}
                      className="lux-input tabular-nums"
                    />
                  </div>
                  <div>
                    <label className="lux-label">
                      <Calendar
                        size={10}
                        className="inline mr-1 -mt-0.5"
                      />
                      Check-out
                    </label>
                    <input
                      type="date"
                      value={checkOut}
                      min={checkIn || todayStr}
                      onChange={(e) => setCheckOut(e.target.value)}
                      className="lux-input tabular-nums"
                    />
                  </div>
                </div>

                {/* Cost Breakdown */}
                {nights > 0 && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    transition={spring}
                    className="border-t border-white/[0.06] pt-4 mb-6"
                  >
                    <div className="flex justify-between text-sm text-silver mb-2">
                      <span>
                        {formatZAR(property.price)} × {nights} night
                        {nights !== 1 ? "s" : ""}
                      </span>
                      <span className="tabular-nums">
                        {formatZAR(totalCost)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm text-silver mb-2">
                      <span>Service fee</span>
                      <span className="tabular-nums">
                        {formatZAR(Math.round(totalCost * 0.05))}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm text-silver mb-4">
                      <span>Levy &amp; VAT</span>
                      <span className="tabular-nums">
                        {formatZAR(Math.round(totalCost * 0.15))}
                      </span>
                    </div>
                    <div className="flex justify-between pt-3 border-t border-white/[0.06]">
                      <span className="text-silver-light text-sm font-medium">
                        Total
                      </span>
                      <span className="text-champagne-light font-display text-lg tabular-nums">
                        {formatZAR(
                          totalCost +
                            Math.round(totalCost * 0.05) +
                            Math.round(totalCost * 0.15)
                        )}
                      </span>
                    </div>
                  </motion.div>
                )}

                {/* Guest Details */}
                <div className="space-y-4 mb-6">
                  <div className="text-[10px] tracking-[0.3em] uppercase text-champagne/70 mt-4">
                    Guest Details
                  </div>
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={clientDetails.name}
                    onChange={(e) =>
                      setClientDetails((d) => ({ ...d, name: e.target.value }))
                    }
                    className="lux-input"
                  />
                  <input
                    type="email"
                    placeholder="Email Address"
                    value={clientDetails.email}
                    onChange={(e) =>
                      setClientDetails((d) => ({
                        ...d,
                        email: e.target.value,
                      }))
                    }
                    className="lux-input"
                  />
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    value={clientDetails.phone}
                    onChange={(e) =>
                      setClientDetails((d) => ({
                        ...d,
                        phone: e.target.value,
                      }))
                    }
                    className="lux-input"
                  />
                </div>

                {/* Reserve Button */}
                <button
                  onClick={handleReserve}
                  disabled={
                    nights <= 0 ||
                    !clientDetails.name ||
                    !clientDetails.email ||
                    !clientDetails.phone
                  }
                  className="lux-button-primary w-full"
                >
                  <Shield size={14} />
                  Reserve Estate
                </button>

                <p className="text-silver/50 text-[10px] text-center mt-4 leading-relaxed">
                  Secure reservation. You will be directed to our
                  <br />
                  payment gateway to complete your booking.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ─── Lightbox ──────────────────────────────────────────── */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-label="Image lightbox"
            className="fixed inset-0 z-[99] bg-void/95 backdrop-blur-xl flex items-center justify-center"
            onClick={() => setLightboxOpen(false)}
          >
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute top-4 right-4 min-w-[44px] min-h-[44px] flex items-center justify-center text-crisp/40 hover:text-crisp transition-colors touch-manipulation"
              aria-label="Close lightbox"
            >
              <X size={24} />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage((prev) =>
                  prev > 0 ? prev - 1 : property.images.length - 1
                );
              }}
              className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 w-12 h-12 border border-white/[0.1] flex items-center justify-center text-crisp/40 hover:text-crisp transition-colors touch-manipulation"
              aria-label="Previous image"
            >
              <ChevronLeft size={20} />
            </button>

            <motion.img
              key={selectedImage}
              src={property.images[selectedImage]}
              alt={property.title}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={spring}
              className="max-w-[90vw] max-h-[85vh] object-contain"
              onClick={(e) => e.stopPropagation()}
            />

            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage((prev) =>
                  prev < property.images.length - 1 ? prev + 1 : 0
                );
              }}
              className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 w-12 h-12 border border-white/[0.1] flex items-center justify-center text-crisp/40 hover:text-crisp transition-colors touch-manipulation"
              aria-label="Next image"
            >
              <ChevronRight size={20} />
            </button>

            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
              {property.images.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedImage(i);
                  }}
                  className={`w-3 h-3 rounded-full transition-colors touch-manipulation ${
                    selectedImage === i
                      ? "bg-champagne"
                      : "bg-white/20 hover:bg-white/40"
                  }`}
                  aria-label={`View image ${i + 1}`}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
