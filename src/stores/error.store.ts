import { create } from "zustand"
import type { ApiError } from "@app-types/api.types"

interface ErrorState {
  fatal: ApiError | null
  setFatal: (error: ApiError) => void
  clearFatal: () => void
}

export const useErrorStore = create<ErrorState>((set) => ({
  fatal: null,
  setFatal: (error) => set({ fatal: error }),
  clearFatal: () => set({ fatal: null }),
}))
