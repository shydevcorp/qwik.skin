import { FilterStore } from "@/app/stores/filterStore";
import { demoData } from "./demo-data";

const toDollars = (cents: number) => cents / 100;

export function applyFilters(data = demoData, f: FilterStore) {
  return data.filter((item: any) => {
    const price = toDollars(item.item.price ?? 0);
    const float = item.game730?.paintWear ?? 0;
    const fade = item.game730?.fadePercent ?? 100;

    if (price < f.priceRange[0] || price > f.priceRange[1]) return false;
    if (float < f.floatRange[0] || float > f.floatRange[1]) return false;
    if (fade < f.fadeRange[0] || fade > f.fadeRange[1]) return false;

    if (
      f.selectedTypes.length &&
      !f.selectedTypes.includes(item.item.details.type)
    )
      return false;

    if (
      f.selectedColors.length &&
      !f.selectedColors.some((c) => item.item.details.colors?.includes(c))
    )
      return false;

    if (
      f.selectedExteriors.length &&
      !f.selectedExteriors.includes(
        item.item.details.exterior?.replace("_", " ") as any,
      )
    )
      return false;

    if (f.tradeLocked !== null && Boolean(item.tradeLock) !== f.tradeLocked)
      return false;

    if (
      f.search &&
      !item.item.marketName.toLowerCase().includes(f.search.toLowerCase())
    )
      return false;

    return true;
  });
}
