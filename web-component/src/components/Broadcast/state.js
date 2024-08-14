import { create } from "zustand";

export const useStore = create((set) => ({
  streamKey: "",
  setStreamKey: (value) => set(() => ({ streamKey: value })),
  playbackId: "",
  setPlaybackId: (value) => set(() => ({ playbackId: value })),
  error: "",
  setError: (value) => set(() => ({ error: value })),
  apiKey: "",
  setApiKey: (value) => set(() => ({ apiKey: value })),
}));
