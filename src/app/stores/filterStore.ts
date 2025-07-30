import { create } from "zustand";

export type ExteriorOption =
  | "Other"
  | "Factory New"
  | "Minimal Wear"
  | "Field-Tested"
  | "Well-Worn"
  | "Battle-Scarred";

interface FilterStore {
  priceRange: [number, number];
  floatRange: [number, number];
  fadeRange: [number, number];
  selectedTypes: string[];
  selectedColors: string[];
  selectedExteriors: ExteriorOption[];
  selectedPhases: string[];
  selectedRarities: string[];
  selectedCollections: string[];
  statTrak: boolean | null;
  tradeLocked: boolean | null;
  search: string;
  sortOption: "Price: Max" | "Price: Min" | "Float: Max" | "Float: Min";
  set: (p: Partial<FilterStore>) => void;
  setPriceRange: (r: [number, number]) => void;
  setFloatRange: (r: [number, number]) => void;
  setFadeRange: (r: [number, number]) => void;
  toggleType: (t: string) => void;
  toggleColor: (c: string) => void;
  toggleExterior: (e: ExteriorOption) => void;
  togglePhase: (p: string) => void;
  toggleRarity: (r: string) => void;
  toggleCollection: (c: string) => void;
  setStatTrak: (s: boolean | null) => void;
  setTradeLocked: (t: boolean | null) => void;
  setSortOption: (
    o: "Price: Max" | "Price: Min" | "Float: Max" | "Float: Min",
  ) => void;
  setSearch: (v: string) => void;
  resetFilters: () => void;
}

const initialState = {
  priceRange: [0, 50000] as [number, number],
  floatRange: [0, 1] as [number, number],
  fadeRange: [0, 100] as [number, number],
  selectedTypes: [] as string[],
  selectedColors: [] as string[],
  selectedExteriors: [] as ExteriorOption[],
  selectedPhases: [] as string[],
  selectedRarities: [] as string[],
  selectedCollections: [] as string[],
  statTrak: null as boolean | null,
  tradeLocked: null as boolean | null,
  search: "",
  sortOption: "Price: Max" as const,
};

export const useFilterStore = create<FilterStore>()((set, get) => ({
  ...initialState,
  set: (p) => set(p),
  setPriceRange: (r) => set({ priceRange: r }),
  setFloatRange: (r) => set({ floatRange: r }),
  setFadeRange: (r) => set({ fadeRange: r }),
  toggleType: (t) => {
    const { selectedTypes } = get();
    set({
      selectedTypes: selectedTypes.includes(t)
        ? selectedTypes.filter((x) => x !== t)
        : [...selectedTypes, t],
    });
  },
  toggleColor: (c) => {
    const { selectedColors } = get();
    set({
      selectedColors: selectedColors.includes(c)
        ? selectedColors.filter((x) => x !== c)
        : [...selectedColors, c],
    });
  },
  toggleExterior: (e) => {
    const { selectedExteriors } = get();
    set({
      selectedExteriors: selectedExteriors.includes(e)
        ? (selectedExteriors.filter((x) => x !== e) as ExteriorOption[])
        : [...selectedExteriors, e],
    });
  },
  togglePhase: (p) => {
    const { selectedPhases } = get();
    set({
      selectedPhases: selectedPhases.includes(p)
        ? selectedPhases.filter((x) => x !== p)
        : [...selectedPhases, p],
    });
  },
  toggleRarity: (r) => {
    const { selectedRarities } = get();
    set({
      selectedRarities: selectedRarities.includes(r)
        ? selectedRarities.filter((x) => x !== r)
        : [...selectedRarities, r],
    });
  },
  toggleCollection: (c) => {
    const { selectedCollections } = get();
    set({
      selectedCollections: selectedCollections.includes(c)
        ? selectedCollections.filter((x) => x !== c)
        : [...selectedCollections, c],
    });
  },
  setStatTrak: (s) => set({ statTrak: s }),
  setTradeLocked: (t) => set({ tradeLocked: t }),
  setSortOption: (o) => set({ sortOption: o }),
  setSearch: (v) => set({ search: v }),
  resetFilters: () => set(initialState),
}));

export type { FilterStore };
