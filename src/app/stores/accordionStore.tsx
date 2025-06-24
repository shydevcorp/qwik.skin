import { create } from "zustand";

interface AccordionStore {
  // Price related states
  priceRange: number[];
  setPriceRange: (priceRange: number[]) => void;
  minInput: string;
  setMinInput: (minInput: string) => void;
  maxInput: string;
  setMaxInput: (maxInput: string) => void;
  text: string;

  // Float related states
  FloatRange: number[];
  setFloatRange: (FloatRange: number[]) => void;
  FloatMinInput: string;
  setFloatMinInput: (FloatMinInput: string) => void;
  FloatMaxInput: string;
  setFloatMaxInput: (FloatMaxInput: string) => void;
  FloatText: string;

  // Fade related states
  FadeRange: number[];
  setFadeRange: (FadeRange: number[]) => void;
  FadeMinInput: string;
  setFadeMinInput: (FadeMinInput: string) => void;
  FadeMaxInput: string;
  setFadeMaxInput: (FadeMaxInput: string) => void;
  FadeText: string;

  // Modal related states
  modalGun: any;
  setModalGun: (modalGun: any) => void;

  resetFilters: () => void;
}

const useAccordionStore = create<AccordionStore>((set) => ({
  // Price related states
  priceRange: [0, 10000],
  setPriceRange: (priceRange) => set({ priceRange }),
  minInput: "0.00",
  setMinInput: (minInput) => set({ minInput }),
  maxInput: "10000",
  setMaxInput: (maxInput) => set({ maxInput }),
  text: "Price",

  // Float related states
  FloatRange: [0, 1],
  setFloatRange: (FloatRange) => set({ FloatRange }),
  FloatMinInput: "0.00",
  setFloatMinInput: (FloatMinInput) => set({ FloatMinInput }),
  FloatMaxInput: "1.00",
  setFloatMaxInput: (FloatMaxInput) => set({ FloatMaxInput }),
  FloatText: "Float",

  // Fade related states
  FadeRange: [78, 100],
  setFadeRange: (FadeRange) => set({ FadeRange }),
  FadeMinInput: "78",
  setFadeMinInput: (FadeMinInput) => set({ FadeMinInput }),
  FadeMaxInput: "100",
  setFadeMaxInput: (FadeMaxInput) => set({ FadeMaxInput }),
  FadeText: "Fade",

  // Modal related states
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
