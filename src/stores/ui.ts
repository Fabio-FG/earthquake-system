import { create } from "zustand";

export const useMapStore = create<{
  showMap: boolean;
  toggleMap: () => void;
}>((set) => ({
  showMap: false,
  toggleMap: () => set((s) => ({ showMap: !s.showMap })),
}));
