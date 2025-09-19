import { create } from "zustand";

export const useMapStore = create((set) => ({
  showMap: false,
  toggleMap: () => set((s) => ({ showMap: !s.showMap })),
}));
