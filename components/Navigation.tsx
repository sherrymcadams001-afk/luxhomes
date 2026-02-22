"use client";

import React, { useState, useCallback, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Diamond,
  MapPin,
  Phone,
  Mail,
  Instagram,
  Lock,
  AlertCircle,
} from "lucide-react";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/collection", label: "Collection" },
  { href: "/contact", label: "Contact" },
];

const spring = { type: "spring" as const, stiffness: 60, damping: 20 };
const ADMIN_PIN = "2727";

export default function Navigation() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [logoClicks, setLogoClicks] = useState(0);
  const [showPinModal, setShowPinModal] = useState(false);
  const [pin, setPin] = useState("");
  const [pinError, setPinError] = useState(false);
  const clickTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pinInputRef = useRef<HTMLInputElement>(null);

  // Reset click counter after 2s of inactivity
  const handleLogoClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      if (clickTimer.current) clearTimeout(clickTimer.current);
      const next = logoClicks + 1;
      setLogoClicks(next);
      if (next >= 4) {
        setLogoClicks(0);
        setShowPinModal(true);
        setPin("");
        setPinError(false);
      } else {
        clickTimer.current = setTimeout(() => setLogoClicks(0), 2000);
      }
    },
    [logoClicks]
  );

  // Focus hidden input when modal opens
  useEffect(() => {
    if (showPinModal && pinInputRef.current) {
      setTimeout(() => pinInputRef.current?.focus(), 100);
    }
  }, [showPinModal]);

  // Body scroll lock when mobile drawer or PIN modal is open
  useEffect(() => {
    if (mobileOpen || showPinModal) {
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
    } else {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    };
  }, [mobileOpen, showPinModal]);

  // Escape key to close modals
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (showPinModal) {
          setShowPinModal(false);
          setPin('');
        } else if (mobileOpen) {
          setMobileOpen(false);
        }
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [showPinModal, mobileOpen]);

  const handlePinChange = (value: string) => {
    const clean = value.replace(/\D/g, "").slice(0, 4);
    setPin(clean);
    if (clean.length === 4) {
      setTimeout(() => {
        if (clean === ADMIN_PIN) {
          sessionStorage.setItem("envy-admin-auth", "true");
          setShowPinModal(false);
          setPin("");
          router.push("/admin");
        } else {
          setPinError(true);
          setPin("");
          setTimeout(() => setPinError(false), 2000);
        }
      }, 200);
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ ...spring, delay: 0.1 }}
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          borderBottom: "1px solid rgba(201,169,110,0.08)",
        }}
      >
        <div className="backdrop-blur-2xl bg-void/70">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
            <div className="flex items-center justify-between h-[72px]">
              {/* Logo */}
              <Link
                href="/"
                onClick={handleLogoClick}
                className="flex items-center gap-3 group select-none"
              >
                <Diamond className="w-5 h-5 text-champagne transition-transform duration-500 group-hover:rotate-45" />
                <div className="flex flex-col">
                  <span className="text-crisp text-[15px] font-display tracking-[0.15em] leading-none">
                    ENVY
                  </span>
                  <span className="text-silver text-[10px] tracking-[0.3em] uppercase leading-none mt-0.5">
                    Luxury Homes
                  </span>
                </div>
              </Link>

              {/* Desktop Nav */}
              <nav className="hidden md:flex items-center gap-1">
                {NAV_LINKS.map((link) => {
                  const active = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`relative px-5 py-2 text-[13px] tracking-[0.2em] uppercase transition-colors duration-300 ${
                        active
                          ? "text-champagne-light"
                          : "text-silver-light hover:text-crisp"
                      }`}
                    >
                      {link.label}
                      {active && (
                        <motion.div
                          layoutId="nav-indicator"
                          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-px bg-champagne"
                          transition={spring}
                        />
                      )}
                    </Link>
                  );
                })}
              </nav>

              <div className="flex items-center gap-4">
                <Link
                  href="/contact"
                  className="hidden md:inline-flex lux-button-secondary text-[11px] py-2 px-5"
                >
                  Enquire Now
                </Link>
                <button
                  onClick={() => setMobileOpen(!mobileOpen)}
                  className="md:hidden text-silver-light hover:text-crisp transition-colors p-2.5 -mr-2 min-w-[44px] min-h-[44px] flex items-center justify-center"
                  aria-label={mobileOpen ? "Close menu" : "Open menu"}
                  aria-expanded={mobileOpen}
                >
                  {mobileOpen ? <X size={22} /> : <Menu size={22} />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.header>

      {/* ─── Mobile Overlay ──────────────────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            <div
              className="absolute inset-0 bg-void/95 backdrop-blur-xl"
              onClick={() => setMobileOpen(false)}
            />
            <motion.nav
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={spring}
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation"
              className="absolute right-0 top-0 h-full w-[min(320px,85vw)] bg-navy/95 border-l border-champagne/10 flex flex-col"
            >
              <div className="flex items-center justify-between p-6 border-b border-white/[0.06]">
                <span className="text-champagne/70 text-[11px] tracking-[0.3em] uppercase">
                  Navigation
                </span>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="text-silver hover:text-crisp transition-colors p-2 -mr-2 min-w-[44px] min-h-[44px] flex items-center justify-center"
                  aria-label="Close menu"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="flex-1 flex flex-col justify-center px-8 gap-2">
                {NAV_LINKS.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ ...spring, delay: 0.1 + i * 0.08 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="block py-4 text-silver-bright hover:text-champagne-light text-2xl font-display tracking-wide transition-colors"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </div>

              <div className="p-8 border-t border-white/[0.06] space-y-3">
                <div className="flex items-center gap-3 text-silver text-xs">
                  <Phone size={12} />
                  <span>+27 21 000 0000</span>
                </div>
                <div className="flex items-center gap-3 text-silver text-xs">
                  <Mail size={12} />
                  <span>concierge@envyhomes.co.za</span>
                </div>
                <div className="flex items-center gap-3 text-silver text-xs">
                  <MapPin size={12} />
                  <span>7 Middle Road, Morningside, Sandton, 2191</span>
                </div>
                <div className="flex gap-3 pt-3">
                  <Instagram
                    size={16}
                    className="text-silver hover:text-champagne-light transition-colors cursor-pointer"
                  />
                </div>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── Secret Admin PIN Modal ──────────────────────────────── */}
      <AnimatePresence>
        {showPinModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-void/90 backdrop-blur-xl"
              onClick={() => {
                setShowPinModal(false);
                setPin("");
              }}
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={spring}
              role="dialog"
              aria-modal="true"
              aria-label="Admin PIN entry"
              className="relative w-full max-w-xs"
            >
              <div className="lux-card p-8">
                {/* Close */}
                <button
                  onClick={() => {
                    setShowPinModal(false);
                    setPin("");
                  }}
                  className="absolute top-3 right-3 text-silver/60 hover:text-crisp transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
                  aria-label="Close PIN modal"
                >
                  <X size={16} />
                </button>

                <div className="flex flex-col items-center mb-6">
                  <div
                    className="w-12 h-12 border border-champagne/15 flex items-center justify-center mb-4"
                    style={{
                      boxShadow: "0 0 30px rgba(201,169,110,0.08)",
                    }}
                  >
                    <Lock size={18} className="text-champagne" />
                  </div>
                  <h2 className="text-lg font-display text-crisp mb-1">
                    Admin Access
                  </h2>
                  <p className="text-silver text-[11px] tracking-wide">
                    Enter security PIN
                  </p>
                </div>

                {/* PIN Dots */}
                <div className="flex gap-3 justify-center mb-6">
                  {[0, 1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className={`w-10 h-12 border flex items-center justify-center text-lg font-display tabular-nums transition-all duration-300 ${
                        pin.length > i
                          ? "border-champagne/40 text-champagne bg-champagne/5"
                          : "border-white/[0.08] text-silver/30"
                      } ${pinError ? "border-red-500/50 animate-pulse" : ""}`}
                    >
                      {pin.length > i ? "•" : ""}
                    </div>
                  ))}
                </div>

                {/* Hidden input for keyboard entry */}
                <input
                  ref={pinInputRef}
                  type="password"
                  inputMode="numeric"
                  maxLength={4}
                  value={pin}
                  onChange={(e) => handlePinChange(e.target.value)}
                  className="sr-only"
                  aria-label="Enter admin PIN"
                />

                {/* Compact numpad */}
                <div className="grid grid-cols-3 gap-1.5">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, null, 0, "del"].map(
                    (key, i) => {
                      if (key === null)
                        return <div key={i} className="h-12" />;
                      return (
                        <button
                          key={i}
                          onClick={() => {
                            if (key === "del") {
                              setPin((prev) => prev.slice(0, -1));
                            } else if (pin.length < 4) {
                              handlePinChange(pin + key);
                            }
                          }}
                          className="h-12 min-w-[44px] border border-white/[0.06] flex items-center justify-center text-silver hover:text-crisp hover:border-white/[0.12] transition-all text-base font-light active:scale-95 touch-manipulation"
                          aria-label={key === "del" ? "Delete" : `Digit ${key}`}
                        >
                          {key === "del" ? <X size={14} /> : key}
                        </button>
                      );
                    }
                  )}
                </div>

                {/* Error */}
                <AnimatePresence>
                  {pinError && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="text-red-400/70 text-xs text-center flex items-center justify-center gap-1.5 mt-4"
                    >
                      <AlertCircle size={12} />
                      Invalid PIN
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
