import { create } from "zustand";

export const useCam = create((set) => ({
  cam: false,
  setCam: (value) => set({ cam: value }),
  priceModal: false,
  setPriceModal: (value) => set({ priceModal: value }),
}));
