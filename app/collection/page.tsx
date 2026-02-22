"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowLeft,
  Bed,
  Bath,
  Maximize,
  MapPin,
  SlidersHorizontal,
} from "lucide-react";
import { useStore, formatZAR } from "@/lib/store";

const spring = { type: "spring" as const, stiffness: 60, damping: 20 };

const LOCATIONS = [
  "All Locations",
  "Clifton, Cape Town",
  "Camps Bay, Cape Town",
  "Sandton, Johannesburg",
  "Sandhurst, Johannesburg",
];

export default function CollectionPage() {
  const { properties } = useStore();
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [locationFilter, setLocationFilter] = useState("All Locations");
  const [sortBy, setSortBy] = useState<"default" | "price-asc" | "price-desc">(
    "default"
  );

  const filtered = properties
    .filter(
      (p) =>
        locationFilter === "All Locations" || p.location === locationFilter
    )
    .sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      return 0;
    });

  return (
    <div className="min-h-screen">
      {/* Page Header */}
      <div className="relative" style={{ borderBottom: "1px solid rgba(201,169,110,0.08)" }}>
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 30% 100%, rgba(201,169,110,0.04) 0%, transparent 60%)",
          }}
        />
        <div className="relative bg-navy/60 backdrop-blur-sm">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-6">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-silver hover:text-champagne-light text-sm transition-colors mb-6"
            >
              <ArrowLeft size={14} />
              <span className="text-[11px] tracking-[0.15em] uppercase">
                Home
              </span>
            </Link>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-px bg-champagne/40" />
                  <span className="text-champagne text-[11px] tracking-[0.4em] uppercase">
                    The Collection
                  </span>
                </div>
                <h1 className="text-4xl md:text-5xl font-display text-crisp leading-tight">
                  Available Estates
                </h1>
                <p className="text-silver-light text-sm mt-3 max-w-lg">
                  Each residence has been selected for its prime location,
                  quality finishes, and ability to provide a memorable stay.
                </p>
              </div>

              {/* Filters */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal size={13} className="text-champagne/70" />
                  <select
                    value={locationFilter}
                    onChange={(e) => setLocationFilter(e.target.value)}
                    className="lux-input py-2 px-3 text-xs w-auto min-w-[180px]"
                  >
                    {LOCATIONS.map((loc) => (
                      <option key={loc} value={loc}>
                        {loc}
                      </option>
                    ))}
                  </select>
                </div>
                <select
                  value={sortBy}
                  onChange={(e) =>
                    setSortBy(e.target.value as typeof sortBy)
                  }
                  className="lux-input py-2 px-3 text-xs w-auto min-w-[140px]"
                >
                  <option value="default">Default</option>
                  <option value="price-asc">Price: Low → High</option>
                  <option value="price-desc">Price: High → Low</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Results count */}
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-6">
        <p className="text-silver text-xs tabular-nums">
          {filtered.length} estate{filtered.length !== 1 ? "s" : ""} available
        </p>
      </div>

      {/* Properties Grid */}
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((property, i) => (
            <motion.div
              key={property.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ ...spring, delay: i * 0.08 }}
              onHoverStart={() => setHoveredId(property.id)}
              onHoverEnd={() => setHoveredId(null)}
              className={`group transition-opacity duration-700 ${
                hoveredId && hoveredId !== property.id
                  ? "opacity-40"
                  : "opacity-100"
              }`}
            >
              <Link href={`/properties/${property.id}`}>
                <div className="lux-card overflow-hidden hover:border-silver/[0.15] transition-colors duration-500">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <motion.div
                      className="absolute inset-0 bg-cover bg-center"
                      role="img"
                      aria-label={`Photo of ${property.title}`}
                      style={{
                        backgroundImage: `url(${property.images[0]})`,
                      }}
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-void via-transparent to-transparent opacity-90" />

                    <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1.5 bg-void/60 backdrop-blur-md border border-white/[0.08]">
                      <MapPin size={10} className="text-champagne" />
                      <span className="text-[10px] tracking-[0.2em] uppercase text-crisp/90">
                        {property.location}
                      </span>
                    </div>

                    <div className="absolute bottom-4 right-4 text-right">
                      <div className="text-champagne-light text-lg font-display tabular-nums">
                        {formatZAR(property.price)}
                      </div>
                      <div className="text-silver/70 text-[10px] tracking-wider uppercase">
                        per night
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-crisp font-display text-lg mb-3 group-hover:text-champagne-light transition-colors duration-500">
                      {property.title}
                    </h3>

                    <p className="text-silver text-sm leading-relaxed mb-4 line-clamp-2">
                      {property.description}
                    </p>

                    <div className="flex items-center gap-6 pt-4 border-t border-white/[0.06]">
                      <div className="flex items-center gap-1.5">
                        <Bed size={13} className="text-champagne/60" />
                        <span className="text-silver-light text-xs tabular-nums">
                          {property.bedrooms}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Bath size={13} className="text-champagne/60" />
                        <span className="text-silver-light text-xs tabular-nums">
                          {property.bathrooms}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Maximize size={13} className="text-champagne/60" />
                        <span className="text-silver-light text-xs tabular-nums">
                          {property.size}m²
                        </span>
                      </div>
                      <div className="ml-auto">
                        <ArrowRight
                          size={14}
                          className="text-silver/30 group-hover:text-champagne group-hover:translate-x-1 transition-all duration-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="py-24 text-center">
            <p className="text-silver text-sm">
              No estates match your filters.
            </p>
            <button
              onClick={() => {
                setLocationFilter("All Locations");
                setSortBy("default");
              }}
              className="lux-button-secondary mt-6"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
