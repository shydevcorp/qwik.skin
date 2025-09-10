import { create } from "zustand";

interface AccordionStore {
  priceRange: number[];
  setPriceRange: (priceRange: number[]) => void;
  minInput: string;
  setMinInput: (minInput: string) => void;
  maxInput: string;
  setMaxInput: (maxInput: string) => void;
  text: string;

  FloatRange: number[];
  setFloatRange: (FloatRange: number[]) => void;
  FloatMinInput: string;
  setFloatMinInput: (FloatMinInput: string) => void;
  FloatMaxInput: string;
  setFloatMaxInput: (FloatMaxInput: string) => void;
  FloatText: string;

  FadeRange: number[];
  setFadeRange: (FadeRange: number[]) => void;
  FadeMinInput: string;
  setFadeMinInput: (FadeMinInput: string) => void;
  FadeMaxInput: string;
  setFadeMaxInput: (FadeMaxInput: string) => void;
  FadeText: string;

  modalGun: any;
  setModalGun: (modalGun: any) => void;

  resetFilters: () => void;
}

const useAccordionStore = create<AccordionStore>((set) => ({
  priceRange: [0, 50000],
  setPriceRange: (priceRange) => set({ priceRange }),
  minInput: "0.00",
  setMinInput: (minInput) => set({ minInput }),
  maxInput: "50000",
  setMaxInput: (maxInput) => set({ maxInput }),
  text: "Price",

  FloatRange: [0, 1],
  setFloatRange: (FloatRange) => set({ FloatRange }),
  FloatMinInput: "0.00",
  setFloatMinInput: (FloatMinInput) => set({ FloatMinInput }),
  FloatMaxInput: "1.00",
  setFloatMaxInput: (FloatMaxInput) => set({ FloatMaxInput }),
  FloatText: "Float",

  FadeRange: [78, 100],
  setFadeRange: (FadeRange) => set({ FadeRange }),
  FadeMinInput: "78",
  setFadeMinInput: (FadeMinInput) => set({ FadeMinInput }),
  FadeMaxInput: "100",
  setFadeMaxInput: (FadeMaxInput) => set({ FadeMaxInput }),
  FadeText: "Fade",

  modalGun: null,
  setModalGun: (modalGun) => set({ modalGun }),

  resetFilters: () =>
    set({
      priceRange: [0, 10000],
      minInput: "0.00",
      maxInput: "10000",
      FloatRange: [0, 1],
      FloatMinInput: "0.00",
      FloatMaxInput: "1.00",
      FadeRange: [78, 100],
      FadeMinInput: "78",
      FadeMaxInput: "100",
    }),
}));

export default useAccordionStore;
