import { create } from "zustand";
import { demoData } from "@/lib/demo-data";

interface GunStore {
  guns: string[];
  totalValue: number;
  setGuns: (guns: string[]) => void;
  toggleGun: (uniqueId: string, item: any) => void;
}

// Helper function to ensure we always work with valid numbers
const ensureNumber = (value: number | string | undefined): number => {
  if (typeof value === "undefined") return 0;
  const num = typeof value === "string" ? parseFloat(value) : value;
  return isNaN(num) ? 0 : Math.round(num * 100) / 100; // Round to 2 decimal places
};

const useGunStore = create<GunStore>((set, get) => ({
  guns: [],
  totalValue: 0,
  setGuns: (guns) => {
    const newTotalValue = guns.reduce((total, uniqueId) => {
      const item = demoData.find((item) => item.uniqueId === uniqueId);
      return total + ensureNumber(item?.item.price);
    }, 0);

    set({ guns, totalValue: ensureNumber(newTotalValue) });
  },
  toggleGun: (uniqueId, item) => {
    const currentGuns = get().guns;
    let newGuns: string[];
    const safePrice = ensureNumber(item?.item?.price);

    if (currentGuns.includes(uniqueId)) {
      newGuns = currentGuns.filter((gun) => gun !== uniqueId);
      set({
        guns: newGuns,
        totalValue: ensureNumber(get().totalValue - safePrice),
      });
    } else {
      newGuns = [...currentGuns, uniqueId];
      set({
        guns: newGuns,
        totalValue: ensureNumber(get().totalValue + safePrice),
      });
    }
  },
}));

export default useGunStore;
