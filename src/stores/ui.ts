import { create } from "zustand";

type InitialState = {
  mapView: boolean;
  listView: boolean;
};

type StoreActions = {
  toggleMapView: () => void;
  toggleListView: () => void;
};

const initialState: InitialState = {
  mapView: false,
  listView: true,
};

export const useDisplayView = create<InitialState & StoreActions>((set) => ({
  ...initialState,
  toggleMapView: () =>
    set((state) => ({ mapView: !state.mapView, listView: !state.listView })),
  toggleListView: () =>
    set((state) => ({ listView: !state.listView, mapView: !state.mapView })),
}));
