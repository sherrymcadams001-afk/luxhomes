"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Send,
  Phone,
  Mail,
  MapPin,
  Clock,
  CheckCircle2,
} from "lucide-react";

const spring = { type: "spring" as const, stiffness: 60, damping: 20 };

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    interest: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate send
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    setForm({ name: "", email: "", phone: "", interest: "", message: "" });
  };

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
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-champagne/40" />
            <span className="text-champagne text-[10px] tracking-[0.5em] uppercase">
              Get in Touch
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-display text-crisp leading-tight">
            Private Enquiry
          </h1>
          <p className="text-silver-light text-sm mt-3 max-w-lg">
            Every inquiry receives a personal response from our concierge team
            within 24 hours.
          </p>
        </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
          {/* Contact Form — 3 cols */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={spring}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] tracking-[0.3em] uppercase text-champagne/70 mb-2">
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) =>
                      setForm({ ...form, name: e.target.value })
                    }
                    className="lux-input"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label className="block text-[10px] tracking-[0.3em] uppercase text-champagne/70 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                    className="lux-input"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] tracking-[0.3em] uppercase text-champagne/70 mb-2">
                    Phone (optional)
                  </label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) =>
                      setForm({ ...form, phone: e.target.value })
                    }
                    className="lux-input"
                    placeholder="+27 ..."
                  />
                </div>
                <div>
                  <label className="block text-[10px] tracking-[0.3em] uppercase text-champagne/70 mb-2">
                    Property of Interest
                  </label>
                  <select
                    value={form.interest}
                    onChange={(e) =>
                      setForm({ ...form, interest: e.target.value })
                    }
                    className="lux-input"
                  >
                    <option value="">Select a property...</option>
                    <option value="clifton-001">
                      Clifton Oceanfront Villa
                    </option>
                    <option value="clifton-002">
                      Clifton Heights Penthouse
                    </option>
                    <option value="camps-003">
                      Camps Bay Panorama Estate
                    </option>
                    <option value="camps-004">
                      Camps Bay Beach House
                    </option>
                    <option value="sandton-005">
                      Sandton Executive Mansion
                    </option>
                    <option value="sandton-006">
                      Sandhurst Heritage Estate
                    </option>
                    <option value="general">General Enquiry</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] tracking-[0.3em] uppercase text-champagne/70 mb-2">
                  Message
                </label>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) =>
                    setForm({ ...form, message: e.target.value })
                  }
                  className="lux-input resize-none"
                  placeholder="Tell us about your requirements, preferred dates, and any special requests..."
                />
              </div>

              <div className="pt-2">
                {sent ? (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-3 text-emerald-400/80"
                  >
                    <CheckCircle2 size={18} />
                    <span className="text-sm">
                      Your enquiry has been received. We&apos;ll be in touch
                      shortly.
                    </span>
                  </motion.div>
                ) : (
                  <button
                    type="submit"
                    className="lux-button-primary group inline-flex items-center gap-3"
                  >
                    <span>Send Enquiry</span>
                    <Send
                      size={14}
                      className="group-hover:translate-x-1 transition-transform duration-300"
                    />
                  </button>
                )}
              </div>
            </form>
          </motion.div>

          {/* Contact Info — 2 cols */}
          <motion.div
            className="lg:col-span-2 space-y-10"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...spring, delay: 0.15 }}
          >
            <div>
              <h2 className="font-display text-crisp text-lg mb-6">
                Direct Contact
              </h2>
              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 flex items-center justify-center border border-champagne/15 bg-navy-light/50">
                    <Phone size={14} className="text-champagne/60" />
                  </div>
                  <div>
                    <div className="text-[10px] tracking-[0.3em] uppercase text-champagne/50 mb-1">
                      Phone
                    </div>
                    <div className="text-silver-bright text-sm">
                      +27 (0) 21 438 0000
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 flex items-center justify-center border border-champagne/15 bg-navy-light/50">
                    <Mail size={14} className="text-champagne/60" />
                  </div>
                  <div>
                    <div className="text-[10px] tracking-[0.3em] uppercase text-champagne/50 mb-1">
                      Email
                    </div>
                    <div className="text-silver-bright text-sm">
                      concierge@envyluxuryhomes.co.za
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 flex items-center justify-center border border-champagne/15 bg-navy-light/50">
                    <MapPin size={14} className="text-champagne/60" />
                  </div>
                  <div>
                    <div className="text-[10px] tracking-[0.3em] uppercase text-champagne/50 mb-1">
                      Office
                    </div>
                    <div className="text-silver-bright text-sm leading-relaxed">
                      7 Middle Road, Morningside
                      <br />
                      Sandton, 2191
                      <br />
                      South Africa
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-white/[0.06] pt-8">
              <h2 className="font-display text-crisp text-lg mb-6">
                Concierge Hours
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 flex items-center justify-center border border-champagne/15 bg-navy-light/50">
                    <Clock size={14} className="text-champagne/60" />
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between gap-8">
                      <span className="text-silver">Mon – Fri</span>
                      <span className="text-silver-bright tabular-nums">
                        08:00 – 18:00
                      </span>
                    </div>
                    <div className="flex justify-between gap-8">
                      <span className="text-silver">Saturday</span>
                      <span className="text-silver-bright tabular-nums">
                        09:00 – 14:00
                      </span>
                    </div>
                    <div className="flex justify-between gap-8">
                      <span className="text-silver">Sunday</span>
                      <span className="text-silver/60">By appointment</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-white/[0.06] pt-8">
              <p className="text-silver text-xs leading-relaxed">
                For urgent matters outside office hours, please leave a message
                and we will respond as soon as possible. All enquiries submitted
                through this form receive a response within 24 hours.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
