import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

import { updateLivepeerInstance } from "./LivepeerInstance";

export const useStore = create(
  subscribeWithSelector((set) => ({
    src: "",
    setSrc: (value) => set(() => ({ src: value })),
    assetName: "",
    setAssetName: (value) => set(() => ({ assetName: value })),
    playbackId: "",
    setPlaybackId: (value) => set(() => ({ playbackId: value })),
    livepeer: {},
    setLivepeer: (value) => set(() => ({ livepeer: value })),
    uploadUrl: "",
    setUploadUrl: (value) => set(() => ({ uploadUrl: value })),
    resumableUploadUrl: "",
    setResumableUploadUrl: (value) =>
      set(() => ({ resumableUploadUrl: value })),
    error: "",
    setError: (value) => set(() => ({ error: value })),
    apiKey: "",
    setApiKey: (value) => set(() => ({ apiKey: value })),
    loading: false,
    setLoading: (value) => set(() => ({ loading: value })),
    clearState: () =>
      set(() => ({
        src: null,
        livepeer: null,
      })),
  }))
);

useStore.subscribe(
  (state) => state.apiKey,
  (newApiKey, previousApiKey) => {
    if (newApiKey !== previousApiKey) {
      updateLivepeerInstance(newApiKey);
    }
  }
);
