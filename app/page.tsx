"use client";

import React, { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Bed,
  Bath,
  Maximize,
  MapPin,
  ChevronDown,
  Shield,
  Eye,
  Compass,
  Play,
  Pause,
} from "lucide-react";
import { useStore, formatZAR } from "@/lib/store";

const spring = { type: "spring" as const, stiffness: 60, damping: 20 };

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1920&q=80";

/*
 * ── AI VIDEO GENERATION PROMPT (Sora / Runway Gen‑3 / Kling) ─────────
 *
 * "Cinematic slow dolly through the living room of an ultra-luxury
 *  penthouse apartment in Cape Town, South Africa. Floor-to-ceiling
 *  windows reveal a panoramic Atlantic Ocean view at golden hour.
 *  The interior features polished Nero Marquina marble floors
 *  reflecting warm light, a Ndebele-patterned accent cushion resting
 *  on a cream Italian leather sectional sofa, a hand-carved Shona
 *  stone sculpture on a floating walnut console, and a massive
 *  abstract Esther Mahlangu-inspired geometric artwork on the feature
 *  wall. Warm amber pendant lights cast soft pools of light across
 *  the space. Camera glides past a brass-rimmed Waterford crystal
 *  whiskey decanter and Rooibos-toned dried protea arrangement toward
 *  the terrace balcony overlooking Clifton Fourth Beach at sunset.
 *  Slow, cinematic movement with subtle parallax. Anamorphic lens
 *  flare, shallow depth of field, 24 fps, 7 seconds. Color grade:
 *  warm champagne highlights, deep navy shadows, desaturated midtones."
 *
 * ───────────────────────────────────────────────────────────────────────
 * Place your generated video at /public/hero.mp4 and it will auto-play.
 * The fallback uses a curated Pexels luxury interior video.
 */

const HERO_VIDEO_FALLBACK =
  "https://videos.pexels.com/video-files/6394054/6394054-uhd_2560_1440_25fps.mp4";

export default function HomePage() {
  const { properties, heroMode } = useStore();
  const featured = properties.slice(0, 3);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoPaused, setVideoPaused] = useState(false);
  const isVideo = heroMode === "video";

  const toggleVideo = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setVideoPaused(false);
    } else {
      videoRef.current.pause();
      setVideoPaused(true);
    }
  };

  return (
    <>
      {/* ─── Hero Section with Video ───────────────────────────── */}
      <section className="relative h-[100dvh] -mt-[72px] flex items-center justify-center overflow-hidden">
        {/* Hero Background — Video or Image (admin-controlled) */}
        <div className="absolute inset-0">
          {isVideo ? (
            <video
              ref={videoRef}
              autoPlay
              muted
              loop
              playsInline
              poster={HERO_IMAGE}
              className="absolute inset-0 w-full h-full object-cover scale-105"
            >
              <source src="/vid.mp4" type="video/mp4" />
              <source src={HERO_VIDEO_FALLBACK} type="video/mp4" />
            </video>
          ) : (
            <div
              className="absolute inset-0 w-full h-full bg-cover bg-center scale-105"
              style={{ backgroundImage: `url(${HERO_IMAGE})` }}
            />
          )}

          {/* Layered cinematic overlays */}
          <div className="absolute inset-0 bg-gradient-to-b from-void/70 via-navy/20 to-void" />
          <div className="absolute inset-0 bg-gradient-to-r from-void/80 via-navy/10 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-void to-transparent" />

          {/* Warm vignette */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at 30% 50%, rgba(201,169,110,0.06) 0%, transparent 60%)",
            }}
          />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-12 w-full">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...spring, delay: 0.3 }}
            className="max-w-2xl"
          >
            {/* Accent rule + eyebrow */}
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-px bg-gradient-to-r from-champagne to-champagne/20" />
              <span className="text-champagne-light text-[10px] tracking-[0.5em] uppercase">
                Est. 2024 — South Africa
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-display text-crisp leading-[0.92] mb-8">
              Covet the
              <br />
              <span className="text-gradient-gold italic">Exceptional</span>
            </h1>

            <p className="text-silver-light text-lg md:text-xl font-light leading-relaxed max-w-lg mb-12">
              South Africa&apos;s most coveted addresses. Curated estates in
              Clifton, Camps Bay &amp; Sandton — where architecture ascends to
              art.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/collection" className="lux-button-primary">
                Explore Collection
                <ArrowRight size={14} />
              </Link>
              <Link href="/contact" className="lux-button-secondary">
                Private Enquiry
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Video toggle (only shown in video mode) */}
        {isVideo && (
          <button
            onClick={toggleVideo}
            className="absolute bottom-8 right-8 z-10 w-11 h-11 border border-white/10 bg-void/40 backdrop-blur-sm flex items-center justify-center text-silver-light/60 hover:text-champagne-light hover:border-champagne/20 transition-all duration-500 touch-manipulation"
            aria-label={videoPaused ? "Play video" : "Pause video"}
          >
            {videoPaused ? <Play size={14} /> : <Pause size={14} />}
          </button>
        )}

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-champagne/30 text-[9px] tracking-[0.4em] uppercase">
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown size={16} className="text-champagne/30" />
          </motion.div>
        </motion.div>
      </section>

      {/* ─── Trust Pillars ─────────────────────────────────────── */}
      <section className="relative border-y lux-border-warm lux-section-elevated bg-navy/80">
        {/* Subtle warm ambient glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 50% 0%, rgba(201,169,110,0.04) 0%, transparent 50%)",
          }}
        />
        <div className="relative max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/[0.06]">
            {[
              {
                icon: Shield,
                title: "Vault-Grade Security",
                desc: "Biometric access, 24/7 armed response, and military-grade surveillance at every estate.",
              },
              {
                icon: Eye,
                title: "Private Viewings",
                desc: "Helicopter transfers, chauffeured arrivals, and bespoke walkthroughs at your convenience.",
              },
              {
                icon: Compass,
                title: "Full Concierge",
                desc: "Private chefs, yacht charters, safari bookings — our service transforms stays into narratives.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ ...spring, delay: i * 0.12 }}
                className="py-12 px-8 flex items-start gap-5 group"
              >
                <div className="w-11 h-11 border border-champagne/15 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:border-champagne/30 transition-colors duration-500">
                  <item.icon
                    size={17}
                    className="text-champagne/70 group-hover:text-champagne-light transition-colors duration-500"
                  />
                </div>
                <div>
                  <h3 className="text-crisp text-sm font-medium tracking-wide mb-2">
                    {item.title}
                  </h3>
                  <p className="text-silver text-[13px] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Featured Estates ──────────────────────────────────── */}
      <section className="relative py-28 lg:py-36">
        {/* Background ambient */}
        <div className="absolute inset-0 bg-radial-warm pointer-events-none" />
        <div className="absolute inset-0 bg-radial-cool pointer-events-none" />

        <div className="relative max-w-[1440px] mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={spring}
            className="flex flex-col md:flex-row md:items-end md:justify-between mb-16"
          >
            <div>
              <div className="flex items-center gap-4 mb-5">
                <div className="w-8 h-px bg-champagne/40" />
                <span className="text-champagne text-[10px] tracking-[0.5em] uppercase">
                  Featured
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-display text-crisp leading-tight">
                Distinguished Estates
              </h2>
              <p className="text-silver-light mt-3 text-[15px] max-w-md">
                Three extraordinary residences from our curated portfolio.
              </p>
            </div>
            <Link
              href="/collection"
              className="lux-button-secondary mt-6 md:mt-0"
            >
              View Full Collection
              <ArrowRight size={13} />
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            {featured.map((property, i) => (
              <motion.div
                key={property.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ ...spring, delay: i * 0.12 }}
                className="group"
              >
                <Link href={`/properties/${property.id}`}>
                  <div className="lux-card overflow-hidden">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <motion.div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{
                          backgroundImage: `url(${property.images[0]})`,
                        }}
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                      />
                      {/* Image overlays */}
                      <div className="absolute inset-0 bg-gradient-to-t from-void via-transparent to-transparent opacity-90" />
                      <div className="absolute inset-0 bg-gradient-to-tr from-void/40 to-transparent" />

                      {/* Location badge */}
                      <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1.5 bg-void/60 backdrop-blur-md border border-white/[0.08]">
                        <MapPin size={10} className="text-champagne" />
                        <span className="text-[9px] tracking-[0.2em] uppercase text-crisp/80">
                          {property.location}
                        </span>
                      </div>

                      {/* Price tag */}
                      <div className="absolute bottom-4 right-4 text-right">
                        <div className="text-champagne-light text-lg font-display tabular-nums">
                          {formatZAR(property.price)}
                        </div>
                        <div className="text-silver/60 text-[9px] tracking-wider uppercase">
                          per night
                        </div>
                      </div>
                    </div>

                    <div className="p-6">
                      <h3 className="text-crisp font-display text-lg mb-3 group-hover:text-champagne-light transition-colors duration-500">
                        {property.title}
                      </h3>
                      <div className="flex items-center gap-6 pt-4 border-t border-white/[0.06]">
                        <div className="flex items-center gap-1.5">
                          <Bed size={13} className="text-champagne/40" />
                          <span className="text-silver-light text-xs tabular-nums">
                            {property.bedrooms}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Bath size={13} className="text-champagne/40" />
                          <span className="text-silver-light text-xs tabular-nums">
                            {property.bathrooms}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Maximize size={13} className="text-champagne/40" />
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
        </div>
      </section>
    </>
  );
}
