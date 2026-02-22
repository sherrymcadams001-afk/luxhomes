"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";

// ─── Models ────────────────────────────────────────────────────────────────

export interface Property {
  id: string;
  title: string;
  price: number; // ZAR per night
  location: string;
  images: string[];
  description: string;
  bedrooms: number;
  bathrooms: number;
  size: number; // sqm
}

export interface ClientDetails {
  name: string;
  email: string;
  phone: string;
}

export interface Booking {
  id: string;
  propertyId: string;
  propertyTitle: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  totalCost: number;
  clientDetails: ClientDetails;
  createdAt: string;
  status: "pending" | "confirmed" | "cancelled";
}

// ─── Seed Data ──────────────────────────────────────────────────────────────

const SEED_PROPERTIES: Property[] = [
  {
    id: "clifton-001",
    title: "Villa Aurelia — Clifton First Beach",
    price: 45000,
    location: "Clifton, Cape Town",
    images: [
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&q=80",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=80",
    ],
    description:
      "Set above Clifton's renowned First Beach, Villa Aurelia offers sweeping Atlantic views through expansive windows. Premium finishes and open-plan living spaces create a refined coastal retreat designed for comfort and privacy.",
    bedrooms: 6,
    bathrooms: 7,
    size: 1200,
  },
  {
    id: "camps-bay-002",
    title: "The Obsidian — Camps Bay Ridge",
    price: 38000,
    location: "Camps Bay, Cape Town",
    images: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
      "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=1200&q=80",
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1200&q=80",
    ],
    description:
      "Nestled along the Camps Bay ridge with uninterrupted mountain and ocean views, The Obsidian pairs contemporary design with natural textures. An infinity pool, open-plan interiors, and generous terraces make the most of the setting.",
    bedrooms: 5,
    bathrooms: 5,
    size: 980,
  },
  {
    id: "sandton-003",
    title: "Maison Éternelle — Sandton Estate",
    price: 32000,
    location: "Sandton, Johannesburg",
    images: [
      "https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=1200&q=80",
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1200&q=80",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&q=80",
    ],
    description:
      "Located in the heart of Sandton, Maison Éternelle combines modern architecture with landscaped gardens and generous entertaining spaces. A secure, private estate ideal for families or executive retreats.",
    bedrooms: 8,
    bathrooms: 9,
    size: 1850,
  },
  {
    id: "clifton-004",
    title: "Seraph House — Clifton Fourth Beach",
    price: 52000,
    location: "Clifton, Cape Town",
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80",
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&q=80",
    ],
    description:
      "A striking Clifton residence with layered living areas that follow the coastline. Seraph House features a private pool, direct beach proximity, and panoramic views — one of the most sought-after positions on the Atlantic Seaboard.",
    bedrooms: 7,
    bathrooms: 8,
    size: 1500,
  },
  {
    id: "camps-bay-005",
    title: "Onda — Camps Bay Beachfront",
    price: 41000,
    location: "Camps Bay, Cape Town",
    images: [
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1200&q=80",
      "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=1200&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
    ],
    description:
      "Onda sits right on the Camps Bay beachfront with a distinctive contemporary design. Fluid open-plan living connects indoor and outdoor entertaining areas, with the beach just steps away.",
    bedrooms: 4,
    bathrooms: 4,
    size: 750,
  },
  {
    id: "sandton-006",
    title: "Kgosi Manor — Sandhurst",
    price: 28000,
    location: "Sandhurst, Johannesburg",
    images: [
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=1200&q=80",
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&q=80",
    ],
    description:
      "A grand Sandhurst estate set on expansive grounds with manicured gardens. Kgosi Manor offers generous living and entertaining spaces, multiple bedroom suites, and the privacy expected of Johannesburg's most prestigious address.",
    bedrooms: 10,
    bathrooms: 12,
    size: 2200,
  },
];

// ─── Store Shape ────────────────────────────────────────────────────────────

export type HeroMode = "video" | "image";

interface StoreState {
  properties: Property[];
  bookings: Booking[];
  currentBooking: Booking | null;
  heroMode: HeroMode;
}

interface StoreActions {
  addProperty: (property: Omit<Property, "id">) => void;
  updateProperty: (id: string, updates: Partial<Property>) => void;
  deleteProperty: (id: string) => void;
  getProperty: (id: string) => Property | undefined;
  addBooking: (booking: Omit<Booking, "id" | "createdAt">) => void;
  updateBookingStatus: (id: string, status: Booking["status"]) => void;
  setCurrentBooking: (booking: Booking | null) => void;
  setHeroMode: (mode: HeroMode) => void;
  resetStore: () => void;
}

type Store = StoreState & StoreActions;

const STORAGE_KEY = "envy-estate-db";

const defaultState: StoreState = {
  properties: SEED_PROPERTIES,
  bookings: [],
  currentBooking: null,
  heroMode: "video",
};

// ─── Context ────────────────────────────────────────────────────────────────

const StoreContext = createContext<Store | null>(null);

export function useStore(): Store {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}

// ─── Provider ───────────────────────────────────────────────────────────────

export function StoreProvider({ children }: { children: ReactNode }) {
  const [hydrated, setHydrated] = useState(false);
  const [state, setState] = useState<StoreState>(defaultState);

  // Hydrate from localStorage on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as StoreState;
        setState({
          properties:
            parsed.properties && parsed.properties.length > 0
              ? parsed.properties
              : SEED_PROPERTIES,
          bookings: parsed.bookings || [],
          currentBooking: parsed.currentBooking || null,
          heroMode: parsed.heroMode || "video",
        });
      }
    } catch {
      // Corrupted — reset
      localStorage.removeItem(STORAGE_KEY);
    }
    setHydrated(true);
  }, []);

  // Persist to localStorage on state change (after hydration)
  useEffect(() => {
    if (hydrated) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    }
  }, [state, hydrated]);

  const generateId = () =>
    `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;

  const addProperty = useCallback(
    (property: Omit<Property, "id">) => {
      setState((prev) => ({
        ...prev,
        properties: [...prev.properties, { ...property, id: generateId() }],
      }));
    },
    []
  );

  const updateProperty = useCallback(
    (id: string, updates: Partial<Property>) => {
      setState((prev) => ({
        ...prev,
        properties: prev.properties.map((p) =>
          p.id === id ? { ...p, ...updates } : p
        ),
      }));
    },
    []
  );

  const deleteProperty = useCallback((id: string) => {
    setState((prev) => ({
      ...prev,
      properties: prev.properties.filter((p) => p.id !== id),
    }));
  }, []);

  const getProperty = useCallback(
    (id: string) => state.properties.find((p) => p.id === id),
    [state.properties]
  );

  const addBooking = useCallback(
    (booking: Omit<Booking, "id" | "createdAt">) => {
      const newBooking: Booking = {
        ...booking,
        id: generateId(),
        createdAt: new Date().toISOString(),
      };
      setState((prev) => ({
        ...prev,
        bookings: [...prev.bookings, newBooking],
        currentBooking: newBooking,
      }));
    },
    []
  );

  const updateBookingStatus = useCallback(
    (id: string, status: Booking["status"]) => {
      setState((prev) => ({
        ...prev,
        bookings: prev.bookings.map((b) =>
          b.id === id ? { ...b, status } : b
        ),
      }));
    },
    []
  );

  const setCurrentBooking = useCallback((booking: Booking | null) => {
    setState((prev) => ({ ...prev, currentBooking: booking }));
  }, []);

  const setHeroMode = useCallback((mode: HeroMode) => {
    setState((prev) => ({ ...prev, heroMode: mode }));
  }, []);

  const resetStore = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setState(defaultState);
  }, []);

  const store: Store = {
    ...state,
    addProperty,
    updateProperty,
    deleteProperty,
    getProperty,
    addBooking,
    updateBookingStatus,
    setCurrentBooking,
    setHeroMode,
    resetStore,
  };

  // Prevent hydration mismatch: render nothing or a skeleton until hydrated
  if (!hydrated) {
    return (
      <div className="min-h-screen bg-void flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-2 border-silver/20 border-t-silver rounded-full animate-spin" />
          <p className="text-silver/40 text-sm tracking-[0.3em] uppercase font-light">
            Loading
          </p>
        </div>
      </div>
    );
  }

  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
}

// ─── Utility ────────────────────────────────────────────────────────────────

export function formatZAR(amount: number): string {
  return `R ${amount.toLocaleString("en-ZA", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })}`;
}

export function calculateNights(checkIn: string, checkOut: string): number {
  const start = new Date(checkIn);
  const end = new Date(checkOut);
  const diff = end.getTime() - start.getTime();
  return Math.max(1, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}
