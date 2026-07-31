import { create } from "zustand"
import type { PayrollStatus } from "@constants/payroll-status"

interface Period {
  id: string
  month: number
  year: number
  status: PayrollStatus
}

interface PayrollPeriodState {
  activePeriod: Period | null
  setActivePeriod: (period: Period) => void
}

export const usePayrollStore = create<PayrollPeriodState>((set) => ({
  activePeriod: null,
  setActivePeriod: (period) => set({ activePeriod: period }),
}))
