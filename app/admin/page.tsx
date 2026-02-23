"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Lock,
  Unlock,
  Plus,
  Trash2,
  Edit3,
  Save,
  X,
  Building,
  CalendarDays,
  Eye,
  EyeOff,
  AlertCircle,
  CheckCircle,
  RotateCcw,
  Settings,
  Film,
  Image,
  CreditCard,
  Shield,
  ExternalLink,
} from "lucide-react";
import { useStore, formatZAR, type Property, type HeroMode, type PayFastConfig } from "@/lib/store";

const spring = { type: "spring" as const, stiffness: 60, damping: 20 };
const ADMIN_PIN = "2727";

type Tab = "properties" | "bookings" | "settings";

interface PropertyFormData {
  title: string;
  price: string;
  location: string;
  images: string;
  description: string;
  bedrooms: string;
  bathrooms: string;
  size: string;
}

const emptyForm: PropertyFormData = {
  title: "",
  price: "",
  location: "Clifton, Cape Town",
  images: "",
  description: "",
  bedrooms: "4",
  bathrooms: "4",
  size: "500",
};

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [pin, setPin] = useState("");
  const [pinError, setPinError] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>("properties");

  // Check sessionStorage for auth from secret logo trigger
  useEffect(() => {
    if (typeof window !== "undefined") {
      const auth = sessionStorage.getItem("envy-admin-auth");
      if (auth === "true") {
        setAuthenticated(true);
      }
    }
  }, []);

  // Clear sessionStorage when locking
  const handleLock = useCallback(() => {
    setAuthenticated(false);
    sessionStorage.removeItem("envy-admin-auth");
  }, []);

  const handlePinSubmit = useCallback(() => {
    if (pin === ADMIN_PIN) {
      setAuthenticated(true);
      setPinError(false);
      sessionStorage.setItem("envy-admin-auth", "true");
    } else {
      setPinError(true);
      setPin("");
      setTimeout(() => setPinError(false), 2000);
    }
  }, [pin]);

  // ─── PIN Screen ──────────────────────────────────────────
  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={spring}
          className="w-full max-w-sm"
        >
          <div className="lux-card p-8">
            <div className="flex flex-col items-center mb-8">
              <div className="w-14 h-14 border border-champagne/15 flex items-center justify-center mb-4">
                <Lock size={22} className="text-champagne" />
              </div>
              <h1 className="text-xl font-display text-crisp mb-1">
                Admin Access
              </h1>
              <p className="text-silver text-xs tracking-wide">
                Enter your security PIN
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex gap-3 justify-center">
                {[0, 1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className={`w-12 h-14 border flex items-center justify-center text-xl font-display tabular-nums transition-all duration-300 ${
                      pin.length > i
                        ? "border-champagne/40 text-champagne bg-champagne/5"
                        : "border-white/[0.08] text-silver/30"
                    } ${pinError ? "border-red-500/50 animate-pulse" : ""}`}
                  >
                    {pin.length > i ? "•" : ""}
                  </div>
                ))}
              </div>

              <input
                type="password"
                inputMode="numeric"
                maxLength={4}
                value={pin}
                onChange={(e) => setPin(e.target.value.replace(/\D/g, ""))}
                onKeyDown={(e) => e.key === "Enter" && handlePinSubmit()}
                className="sr-only"
                autoFocus
              />

              {/* Numpad */}
              <div className="grid grid-cols-3 gap-2 pt-2">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, null, 0, "del"].map(
                  (key, i) => {
                    if (key === null)
                      return <div key={i} className="aspect-square" />;
                    return (
                      <button
                        key={i}
                        onClick={() => {
                          if (key === "del") {
                            setPin((prev) => prev.slice(0, -1));
                          } else if (pin.length < 4) {
                            const newPin = pin + key;
                            setPin(newPin);
                            if (newPin.length === 4) {
                              setTimeout(() => {
                                if (newPin === ADMIN_PIN) {
                                  setAuthenticated(true);
                                  sessionStorage.setItem("envy-admin-auth", "true");
                                } else {
                                  setPinError(true);
                                  setPin("");
                                  setTimeout(() => setPinError(false), 2000);
                                }
                              }, 200);
                            }
                          }
                        }}
                        className="aspect-square border border-white/[0.06] flex items-center justify-center text-silver hover:text-crisp hover:border-white/[0.12] transition-all text-lg font-light"
                      >
                        {key === "del" ? <X size={16} /> : key}
                      </button>
                    );
                  }
                )}
              </div>

              {pinError && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-400/70 text-xs text-center flex items-center justify-center gap-1.5"
                >
                  <AlertCircle size={12} />
                  Invalid PIN
                </motion.p>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  // ─── Dashboard ───────────────────────────────────────────
  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="relative" style={{ borderBottom: "1px solid rgba(201,169,110,0.08)" }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 100%, rgba(201,169,110,0.04) 0%, transparent 60%)" }} />
        <div className="relative bg-navy/60 backdrop-blur-sm">
        <div className="max-w-[1200px] mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Unlock size={14} className="text-champagne" />
            <span className="text-[11px] tracking-[0.2em] uppercase text-silver-light">
              Concierge Dashboard
            </span>
          </div>
          <button
            onClick={handleLock}
            className="text-silver hover:text-champagne-light text-[11px] tracking-[0.15em] uppercase transition-colors"
          >
            Lock
          </button>
        </div>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-6 py-8">
        {/* Tabs */}
        <div className="flex gap-1 mb-8 border-b border-white/[0.06]">
          {[
            { id: "properties" as Tab, label: "Properties", icon: Building },
            { id: "bookings" as Tab, label: "Bookings", icon: CalendarDays },
            { id: "settings" as Tab, label: "Settings", icon: Settings },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative flex items-center gap-2 px-6 py-3 text-[12px] tracking-[0.15em] uppercase transition-colors ${
                activeTab === tab.id
                  ? "text-champagne-light"
                  : "text-silver/60 hover:text-silver"
              }`}
            >
              <tab.icon size={14} />
              {tab.label}
              {activeTab === tab.id && (
                <motion.div
                  layoutId="admin-tab"
                  className="absolute bottom-0 left-0 right-0 h-px bg-champagne"
                  transition={spring}
                />
              )}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {activeTab === "properties" ? (
            <PropertiesTab key="properties" />
          ) : activeTab === "bookings" ? (
            <BookingsTab key="bookings" />
          ) : (
            <SettingsTab key="settings" />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// Properties Tab
// ═══════════════════════════════════════════════════════════════

function PropertiesTab() {
  const { properties, addProperty, updateProperty, deleteProperty, resetStore } =
    useStore();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<PropertyFormData>(emptyForm);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const handleEdit = (property: Property) => {
    setEditingId(property.id);
    setForm({
      title: property.title,
      price: property.price.toString(),
      location: property.location,
      images: property.images.join("\n"),
      description: property.description,
      bedrooms: property.bedrooms.toString(),
      bathrooms: property.bathrooms.toString(),
      size: property.size.toString(),
    });
    setShowForm(true);
  };

  const handleSave = () => {
    const data = {
      title: form.title,
      price: parseInt(form.price) || 0,
      location: form.location,
      images: form.images
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean),
      description: form.description,
      bedrooms: parseInt(form.bedrooms) || 0,
      bathrooms: parseInt(form.bathrooms) || 0,
      size: parseInt(form.size) || 0,
    };

    if (editingId) {
      updateProperty(editingId, data);
    } else {
      addProperty(data);
    }

    setForm(emptyForm);
    setShowForm(false);
    setEditingId(null);
  };

  const handleDelete = (id: string) => {
    deleteProperty(id);
    setDeleteConfirm(null);
  };

  const updateField = (field: keyof PropertyFormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={spring}
    >
      {/* Actions Bar */}
      <div className="flex items-center justify-between mb-6">
        <div className="text-silver text-sm tabular-nums">
          {properties.length} estate{properties.length !== 1 ? "s" : ""}
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => {
              if (confirm("Reset all data to defaults? This cannot be undone.")) {
                resetStore();
              }
            }}
            className="lux-button-secondary text-[10px] py-2 px-4"
          >
            <RotateCcw size={12} />
            Reset
          </button>
          <button
            onClick={() => {
              setEditingId(null);
              setForm(emptyForm);
              setShowForm(true);
            }}
            className="lux-button-primary text-[10px] py-2 px-4"
          >
            <Plus size={12} />
            Add Estate
          </button>
        </div>
      </div>

      {/* ─── Form Modal ────────────────────────────────────── */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-void/80 backdrop-blur-sm flex items-start justify-center pt-[100px] px-4 overflow-y-auto"
            onClick={() => setShowForm(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.98 }}
              transition={spring}
              role="dialog"
              aria-modal="true"
              aria-label={editingId ? "Edit estate" : "New estate"}
              className="lux-card p-6 sm:p-8 w-full max-w-2xl mb-12"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display text-lg text-crisp">
                  {editingId ? "Edit Estate" : "New Estate"}
                </h2>
                <button
                  onClick={() => setShowForm(false)}
                  className="text-silver/60 hover:text-silver transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center -mr-2"
                  aria-label="Close form"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="space-y-5">
                <div>
                  <label className="lux-label">Title</label>
                  <input
                    value={form.title}
                    onChange={(e) => updateField("title", e.target.value)}
                    className="lux-input"
                    placeholder="Villa Aurelia — Clifton First Beach"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="lux-label">Price (ZAR / night)</label>
                    <input
                      type="number"
                      value={form.price}
                      onChange={(e) => updateField("price", e.target.value)}
                      className="lux-input tabular-nums"
                      placeholder="45000"
                    />
                  </div>
                  <div>
                    <label className="lux-label">Location</label>
                    <select
                      value={form.location}
                      onChange={(e) => updateField("location", e.target.value)}
                      className="lux-input"
                    >
                      <option value="Clifton, Cape Town">
                        Clifton, Cape Town
                      </option>
                      <option value="Camps Bay, Cape Town">
                        Camps Bay, Cape Town
                      </option>
                      <option value="Sandton, Johannesburg">
                        Sandton, Johannesburg
                      </option>
                      <option value="Sandhurst, Johannesburg">
                        Sandhurst, Johannesburg
                      </option>
                      <option value="Constantia, Cape Town">
                        Constantia, Cape Town
                      </option>
                      <option value="Umhlanga, Durban">
                        Umhlanga, Durban
                      </option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="lux-label">Bedrooms</label>
                    <input
                      type="number"
                      value={form.bedrooms}
                      onChange={(e) => updateField("bedrooms", e.target.value)}
                      className="lux-input tabular-nums"
                    />
                  </div>
                  <div>
                    <label className="lux-label">Bathrooms</label>
                    <input
                      type="number"
                      value={form.bathrooms}
                      onChange={(e) => updateField("bathrooms", e.target.value)}
                      className="lux-input tabular-nums"
                    />
                  </div>
                  <div>
                    <label className="lux-label">Size (m²)</label>
                    <input
                      type="number"
                      value={form.size}
                      onChange={(e) => updateField("size", e.target.value)}
                      className="lux-input tabular-nums"
                    />
                  </div>
                </div>

                <div>
                  <label className="lux-label">
                    Image URLs (one per line)
                  </label>
                  <textarea
                    value={form.images}
                    onChange={(e) => updateField("images", e.target.value)}
                    className="lux-input min-h-[100px] resize-none font-mono text-xs"
                    placeholder={"https://images.unsplash.com/photo-...\nhttps://images.unsplash.com/photo-..."}
                  />
                </div>

                <div>
                  <label className="lux-label">Description</label>
                  <textarea
                    value={form.description}
                    onChange={(e) => updateField("description", e.target.value)}
                    className="lux-input min-h-[120px] resize-none"
                    placeholder="A vivid description of the estate..."
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <button onClick={handleSave} className="lux-button-primary">
                    <Save size={13} />
                    {editingId ? "Update Estate" : "Create Estate"}
                  </button>
                  <button
                    onClick={() => setShowForm(false)}
                    className="lux-button-secondary"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── Properties Table ──────────────────────────────── */}
      <div className="lux-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/[0.06]">
                <th className="text-left px-6 py-4 text-[9px] tracking-[0.3em] uppercase text-champagne/60 font-normal">
                  Estate
                </th>
                <th className="text-left px-4 py-4 text-[9px] tracking-[0.3em] uppercase text-champagne/60 font-normal">
                  Location
                </th>
                <th className="text-right px-4 py-4 text-[9px] tracking-[0.3em] uppercase text-champagne/60 font-normal">
                  Rate
                </th>
                <th className="text-center px-4 py-4 text-[9px] tracking-[0.3em] uppercase text-champagne/60 font-normal">
                  Details
                </th>
                <th className="text-right px-6 py-4 text-[9px] tracking-[0.3em] uppercase text-champagne/60 font-normal">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {properties.map((property) => (
                <tr
                  key={property.id}
                  className="border-b border-white/[0.03] hover:bg-white/[0.01] transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 bg-cover bg-center border border-white/[0.06] flex-shrink-0"
                        style={{
                          backgroundImage: `url(${property.images[0]})`,
                        }}
                      />
                      <span className="text-silver-light text-sm font-display truncate max-w-[200px]">
                        {property.title}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span className="text-silver text-xs">
                      {property.location}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-right">
                    <span className="text-champagne-light text-sm tabular-nums">
                      {formatZAR(property.price)}
                    </span>
                    <span className="text-silver/50 text-[9px] block">
                      /night
                    </span>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <div className="flex items-center justify-center gap-3 text-silver text-xs tabular-nums">
                      <span>{property.bedrooms}bd</span>
                      <span>{property.bathrooms}ba</span>
                      <span>{property.size}m²</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <a
                        href={`/properties/${property.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="min-w-[44px] min-h-[44px] border border-white/[0.06] flex items-center justify-center text-silver/60 hover:text-champagne hover:border-champagne/20 transition-all touch-manipulation"
                        aria-label="View property"
                      >
                        <Eye size={13} />
                      </a>
                      <button
                        onClick={() => handleEdit(property)}
                        className="min-w-[44px] min-h-[44px] border border-white/[0.06] flex items-center justify-center text-silver/60 hover:text-champagne hover:border-champagne/20 transition-all touch-manipulation"
                        aria-label="Edit property"
                      >
                        <Edit3 size={13} />
                      </button>
                      {deleteConfirm === property.id ? (
                        <div className="flex gap-1">
                          <button
                            onClick={() => handleDelete(property.id)}
                            className="min-w-[44px] min-h-[44px] border border-red-500/30 bg-red-500/10 flex items-center justify-center text-red-400 transition-all touch-manipulation"
                            aria-label="Confirm delete"
                          >
                            <CheckCircle size={13} />
                          </button>
                          <button
                            onClick={() => setDeleteConfirm(null)}
                            className="min-w-[44px] min-h-[44px] border border-white/[0.06] flex items-center justify-center text-silver/40 transition-all touch-manipulation"
                            aria-label="Cancel delete"
                          >
                            <X size={13} />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setDeleteConfirm(property.id)}
                          className="min-w-[44px] min-h-[44px] border border-white/[0.06] flex items-center justify-center text-silver/60 hover:text-red-400/60 hover:border-red-400/20 transition-all touch-manipulation"
                          aria-label="Delete property"
                        >
                          <Trash2 size={13} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {properties.length === 0 && (
          <div className="py-16 text-center">
            <Building size={32} className="text-champagne/30 mx-auto mb-4" />
            <p className="text-silver text-sm">No estates in collection</p>
            <button
              onClick={() => {
                setEditingId(null);
                setForm(emptyForm);
                setShowForm(true);
              }}
              className="lux-button-secondary mt-4 text-[10px]"
            >
              <Plus size={12} />
              Add First Estate
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════════════════
// Bookings Tab
// ═══════════════════════════════════════════════════════════════

function BookingsTab() {
  const { bookings, updateBookingStatus } = useStore();

  const statusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "text-emerald-400 border-emerald-400/20 bg-emerald-400/5";
      case "cancelled":
        return "text-red-400 border-red-400/20 bg-red-400/5";
      default:
        return "text-champagne border-champagne/20 bg-champagne/5";
    };
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={spring}
    >
      <div className="flex items-center justify-between mb-6">
        <div className="text-silver text-sm tabular-nums">
          {bookings.length} reservation{bookings.length !== 1 ? "s" : ""}
        </div>
      </div>

      <div className="lux-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/[0.06]">
                <th className="text-left px-6 py-4 text-[9px] tracking-[0.3em] uppercase text-champagne/60 font-normal">
                  Booking ID
                </th>
                <th className="text-left px-4 py-4 text-[9px] tracking-[0.3em] uppercase text-champagne/60 font-normal">
                  Estate
                </th>
                <th className="text-left px-4 py-4 text-[9px] tracking-[0.3em] uppercase text-champagne/60 font-normal">
                  Guest
                </th>
                <th className="text-center px-4 py-4 text-[9px] tracking-[0.3em] uppercase text-champagne/60 font-normal">
                  Dates
                </th>
                <th className="text-right px-4 py-4 text-[9px] tracking-[0.3em] uppercase text-champagne/60 font-normal">
                  Total
                </th>
                <th className="text-center px-4 py-4 text-[9px] tracking-[0.3em] uppercase text-champagne/60 font-normal">
                  Status
                </th>
                <th className="text-right px-6 py-4 text-[9px] tracking-[0.3em] uppercase text-champagne/60 font-normal">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr
                  key={booking.id}
                  className="border-b border-white/[0.03] hover:bg-white/[0.01] transition-colors"
                >
                  <td className="px-6 py-4">
                    <span className="text-silver text-xs font-mono tabular-nums">
                      {booking.id}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <span className="text-silver-light text-sm font-display truncate max-w-[150px] block">
                      {booking.propertyTitle}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <div>
                      <div className="text-silver-light text-sm">
                        {booking.clientDetails.name}
                      </div>
                      <div className="text-silver/60 text-xs">
                        {booking.clientDetails.email}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <div className="text-silver text-xs tabular-nums">
                      {booking.checkIn} → {booking.checkOut}
                    </div>
                    <div className="text-silver/50 text-[10px] tabular-nums">
                      {booking.nights} night{booking.nights !== 1 ? "s" : ""}
                    </div>
                  </td>
                  <td className="px-4 py-4 text-right">
                    <span className="text-champagne-light text-sm font-display tabular-nums">
                      {formatZAR(booking.totalCost)}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <span
                      className={`inline-flex px-3 py-1 text-[9px] tracking-[0.2em] uppercase border ${statusColor(
                        booking.status
                      )}`}
                    >
                      {booking.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-1">
                      {booking.status === "pending" && (
                        <>
                          <button
                            onClick={() =>
                              updateBookingStatus(booking.id, "confirmed")
                            }
                            className="w-7 h-7 border border-emerald-400/20 flex items-center justify-center text-emerald-400/60 hover:bg-emerald-400/10 transition-all"
                            title="Confirm"
                          >
                            <CheckCircle size={12} />
                          </button>
                          <button
                            onClick={() =>
                              updateBookingStatus(booking.id, "cancelled")
                            }
                            className="w-7 h-7 border border-red-400/20 flex items-center justify-center text-red-400/60 hover:bg-red-400/10 transition-all"
                            title="Cancel"
                          >
                            <X size={12} />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {bookings.length === 0 && (
          <div className="py-16 text-center">
            <CalendarDays size={32} className="text-champagne/30 mx-auto mb-4" />
            <p className="text-silver text-sm">No reservations yet</p>
            <p className="text-silver/50 text-xs mt-2">
              Bookings will appear here when guests reserve an estate
            </p>
          </div>
        )}
      </div>

      {/* Stats */}
      {bookings.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          {[
            {
              label: "Total Revenue",
              value: formatZAR(bookings.reduce((s, b) => s + b.totalCost, 0)),
            },
            {
              label: "Pending",
              value: bookings.filter((b) => b.status === "pending").length,
            },
            {
              label: "Confirmed",
              value: bookings.filter((b) => b.status === "confirmed").length,
            },
            {
              label: "Avg. Stay",
              value: `${Math.round(
                bookings.reduce((s, b) => s + b.nights, 0) / bookings.length
              )} nights`,
            },
          ].map((stat) => (
            <div key={stat.label} className="lux-card p-5 text-center">
              <div className="text-xl text-crisp font-display tabular-nums">
                {stat.value}
              </div>
              <div className="text-[9px] tracking-[0.3em] uppercase text-champagne/50 mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════════════════
// Settings Tab
// ═══════════════════════════════════════════════════════════════

function SettingsTab() {
  const { heroMode, setHeroMode, payfast, setPayFastConfig } = useStore();
  const [saved, setSaved] = useState(false);
  const [showKey, setShowKey] = useState(false);
  const [showPassphrase, setShowPassphrase] = useState(false);

  const handlePayFastChange = (field: keyof PayFastConfig, value: string | boolean) => {
    setPayFastConfig({ [field]: value });
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const isConfigured = payfast.merchantId.trim() !== "" && payfast.merchantKey.trim() !== "";

  const modes: { id: HeroMode; label: string; description: string; icon: typeof Film }[] = [
    {
      id: "video",
      label: "Video Background",
      description: "Cinematic auto-playing video loop (vid.mp4)",
      icon: Film,
    },
    {
      id: "image",
      label: "Static Image",
      description: "High-resolution luxury interior photograph",
      icon: Image,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={spring}
      className="space-y-8 max-w-2xl"
    >
      {/* ─── PayFast Integration ────────────────────────── */}
      <div className="lux-card p-6 sm:p-8">
        <div className="flex items-center gap-3 mb-6">
          <CreditCard size={16} className="text-champagne" />
          <h3 className="text-[11px] tracking-[0.25em] uppercase text-champagne/80">
            PayFast Integration
          </h3>
          <div className={`ml-auto px-2.5 py-1 text-[10px] tracking-wider uppercase border ${
            isConfigured
              ? "border-green-500/30 text-green-400 bg-green-500/5"
              : "border-amber-500/30 text-amber-400 bg-amber-500/5"
          }`}>
            {isConfigured ? "Configured" : "Not Set Up"}
          </div>
        </div>

        <p className="text-silver text-sm leading-relaxed mb-6">
          Enter your PayFast merchant credentials below. You can find these in your{" "}
          <a
            href="https://www.payfast.co.za/dashboard"
            target="_blank"
            rel="noopener noreferrer"
            className="text-champagne hover:text-champagne-light underline underline-offset-2 inline-flex items-center gap-1"
          >
            PayFast Dashboard
            <ExternalLink size={11} />
          </a>{" "}
          under Settings → Merchant Settings.
        </p>

        <div className="space-y-5">
          {/* Sandbox / Live Toggle */}
          <div className="flex items-center gap-4 p-4 border border-white/[0.06] bg-navy-light/30">
            <Shield size={16} className={payfast.sandbox ? "text-amber-400" : "text-green-400"} />
            <div className="flex-1">
              <div className="text-sm text-silver-light font-medium">
                {payfast.sandbox ? "Sandbox Mode" : "Live Mode"}
              </div>
              <div className="text-[11px] text-silver/60 mt-0.5">
                {payfast.sandbox
                  ? "Test transactions only — no real charges"
                  : "Real transactions — customers will be charged"}
              </div>
            </div>
            <button
              onClick={() => handlePayFastChange("sandbox", !payfast.sandbox)}
              className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${
                payfast.sandbox ? "bg-amber-500/30" : "bg-green-500/30"
              }`}
              aria-label={`Switch to ${payfast.sandbox ? "live" : "sandbox"} mode`}
            >
              <div
                className={`absolute top-0.5 w-5 h-5 rounded-full transition-all duration-300 ${
                  payfast.sandbox
                    ? "left-0.5 bg-amber-400"
                    : "left-[calc(100%-22px)] bg-green-400"
                }`}
              />
            </button>
          </div>

          {/* Merchant ID */}
          <div>
            <label htmlFor="pf-merchant-id" className="block text-[11px] tracking-[0.25em] uppercase text-champagne/80 mb-2">
              Merchant ID
            </label>
            <input
              id="pf-merchant-id"
              type="text"
              value={payfast.merchantId}
              onChange={(e) => handlePayFastChange("merchantId", e.target.value)}
              placeholder="e.g. 10000100"
              className="lux-input font-mono tabular-nums"
            />
          </div>

          {/* Merchant Key */}
          <div>
            <label htmlFor="pf-merchant-key" className="block text-[11px] tracking-[0.25em] uppercase text-champagne/80 mb-2">
              Merchant Key
            </label>
            <div className="relative">
              <input
                id="pf-merchant-key"
                type={showKey ? "text" : "password"}
                value={payfast.merchantKey}
                onChange={(e) => handlePayFastChange("merchantKey", e.target.value)}
                placeholder="e.g. 46f0cd694581a"
                className="lux-input font-mono tabular-nums pr-12"
              />
              <button
                type="button"
                onClick={() => setShowKey(!showKey)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-silver/40 hover:text-silver transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center -mr-3"
                aria-label={showKey ? "Hide merchant key" : "Show merchant key"}
              >
                {showKey ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>

          {/* Passphrase (optional) */}
          <div>
            <label htmlFor="pf-passphrase" className="block text-[11px] tracking-[0.25em] uppercase text-champagne/80 mb-2">
              Passphrase <span className="text-silver/50 normal-case tracking-normal">(optional)</span>
            </label>
            <div className="relative">
              <input
                id="pf-passphrase"
                type={showPassphrase ? "text" : "password"}
                value={payfast.passphrase}
                onChange={(e) => handlePayFastChange("passphrase", e.target.value)}
                placeholder="Your PayFast passphrase"
                className="lux-input pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassphrase(!showPassphrase)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-silver/40 hover:text-silver transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center -mr-3"
                aria-label={showPassphrase ? "Hide passphrase" : "Show passphrase"}
              >
                {showPassphrase ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
            <p className="text-silver/40 text-[10px] mt-1.5">
              Required if you have set a passphrase in your PayFast dashboard.
            </p>
          </div>

          {/* Save Button */}
          <button
            onClick={handleSave}
            className="lux-button-primary"
          >
            {saved ? (
              <>
                <CheckCircle size={14} />
                Saved
              </>
            ) : (
              <>
                <Save size={14} />
                Save PayFast Settings
              </>
            )}
          </button>
        </div>

        {!isConfigured && (
          <div className="flex items-start gap-3 mt-6 p-4 border border-amber-500/15 bg-amber-500/[0.03]">
            <AlertCircle size={14} className="text-amber-400 mt-0.5 flex-shrink-0" />
            <p className="text-silver text-[12px] leading-relaxed">
              Checkout is disabled until you enter your Merchant ID and Key.
              For testing, use PayFast sandbox credentials:
              ID <code className="text-champagne font-mono">10000100</code>,
              Key <code className="text-champagne font-mono">46f0cd694581a</code>.
            </p>
          </div>
        )}
      </div>

      {/* ─── Hero Section ──────────────────────────────── */}
      <div className="lux-card p-6 sm:p-8">
        <h3 className="text-[11px] tracking-[0.25em] uppercase text-champagne/80 mb-6">
          Hero Section
        </h3>

        <div className="space-y-3">
          {modes.map((mode) => {
            const active = heroMode === mode.id;
            return (
              <button
                key={mode.id}
                onClick={() => setHeroMode(mode.id)}
                className={`w-full flex items-center gap-4 p-4 border transition-all duration-300 text-left touch-manipulation ${
                  active
                    ? "border-champagne/30 bg-champagne/5"
                    : "border-white/[0.06] hover:border-white/[0.12]"
                }`}
              >
                <div
                  className={`w-11 h-11 flex items-center justify-center border transition-colors ${
                    active
                      ? "border-champagne/30 text-champagne"
                      : "border-white/[0.08] text-silver/40"
                  }`}
                >
                  <mode.icon size={18} />
                </div>
                <div className="flex-1">
                  <div
                    className={`text-sm font-medium transition-colors ${
                      active ? "text-champagne-light" : "text-silver-light"
                    }`}
                  >
                    {mode.label}
                  </div>
                  <div className="text-[11px] text-silver/60 mt-0.5">
                    {mode.description}
                  </div>
                </div>
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                    active
                      ? "border-champagne bg-champagne"
                      : "border-white/20"
                  }`}
                >
                  {active && (
                    <div className="w-2 h-2 rounded-full bg-void" />
                  )}
                </div>
              </button>
            );
          })}
        </div>

        <p className="text-silver/40 text-[10px] mt-4 leading-relaxed">
          Changes apply immediately to the homepage hero section.
        </p>
      </div>
    </motion.div>
  );
}
