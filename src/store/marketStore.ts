import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ItemsBin {
  id: number[];
  counter: number;
}

interface MarketBin {
  items: ItemsBin[];
  totalCount: number;
  totalItems: number;
  counterInc: (item: ItemsBin) => void;
  counterDec: (id: number[]) => void;
}

export const useMarketBin = create<MarketBin>()(
  persist(
    (set) => ({
      items: [],
      totalCount: 0,
      totalItems: 0,

      counterInc: (item) =>
        set((state) => {
          const existingItemIndex = state.items.findIndex(
            (existingItem) =>
              existingItem.id.length === item.id.length &&
              existingItem.id.every((value, index) => value === item.id[index]),
          );

          let updatedItems;

          if (existingItemIndex !== -1) {
            updatedItems = [...state.items];
            updatedItems[existingItemIndex] = {
              ...updatedItems[existingItemIndex],
              counter: updatedItems[existingItemIndex].counter + 1,
            };
          } else {
            updatedItems = [...state.items, { ...item, counter: 1 }];
          }

          const totalItemsSum = updatedItems.reduce(
            (sum, item) => sum + item.counter,
            0,
          );

          return {
            items: updatedItems,
            totalCount: updatedItems.length,
            totalItems: totalItemsSum,
          };
        }),

      counterDec: (id) =>
        set((state) => {
          const existingItemIndex = state.items.findIndex(
            (existingItem) =>
              existingItem.id.length === id.length &&
              existingItem.id.every((value, index) => value === id[index]),
          );

          if (existingItemIndex !== -1) {
            const updatedItems = [...state.items];
            const currentCounter = updatedItems[existingItemIndex].counter;

            if (currentCounter > 1) {
              updatedItems[existingItemIndex] = {
                ...updatedItems[existingItemIndex],
                counter: currentCounter - 1,
              };
              const totalItemsSum = updatedItems.reduce(
                (sum, item) => sum + item.counter,
                0,
              );
              return {
                items: updatedItems,
                totalCount: updatedItems.length,
                totalItems: totalItemsSum,
              };
            } else {
              const filteredItems = updatedItems.filter(
                (_, index) => index !== existingItemIndex,
              );
              const totalItemsSum = filteredItems.reduce(
                (sum, item) => sum + item.counter,
                0,
              );
              return {
                items: filteredItems,
                totalCount: filteredItems.length,
                totalItems: totalItemsSum,
              };
            }
          }

          return state;
        }),
    }),
    {
      name: "market-bin-storage",
    },
  ),
);
