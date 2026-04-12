import { create } from "zustand";
import { persist } from "zustand/middleware";

interface MarketItem {
  id: number;
  name: string;
  category: string;
  price: number;
  currency: string;
  isPremium: boolean;
  stock: number;
  rating: number;
  description: string;
  image: string;
}

interface MarketItemsStore {
  items: MarketItem[];
  addItem: (item: MarketItem) => void;
  removeItem: (name: string) => void;
}

export const useMarketItemsStore = create<MarketItemsStore>()(
  persist(
    (set) => ({
      items: [],

      addItem: (item) =>
        set((state) => ({
          items: [...state.items, item],
        })),

      removeItem: (name) =>
        set((state) => ({
          items: state.items.filter((item) => item.name !== name),
        })),
    }),
    {
      name: "market-items-storage",
    },
  ),
);
