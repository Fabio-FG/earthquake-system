import { create } from "zustand";
import type { EarthquakeFeature } from "../types";

type InitialState = {
  selectedEarthquake: EarthquakeFeature | null;
};

type StoreActions = {
  setSelectedEarthquake: (quake: EarthquakeFeature) => void;
};

const initialState: InitialState = {
  selectedEarthquake: null,
};

export const useEarthquakeStore = create<InitialState & StoreActions>(
  (set) => ({
    ...initialState,
    setSelectedEarthquake: (quake) => set({ selectedEarthquake: quake }),
  })
);
