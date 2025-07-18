import { create } from 'zustand';

interface DashboardStore {
  globalQuery: any;
  alertFilters: any;
  setGlobalQuery: (query: any) => void;
  setAlertFilters: (filters: any) => void;
}

export const useDashboardStore = create<DashboardStore>((set) => ({
  globalQuery: {
    timeBounds: {
      from: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      to: new Date().toISOString(),
    },
    query: "*",
    queryJson: {},
  },
  alertFilters: {},
  setGlobalQuery: (query) => set({ globalQuery: query }),
  setAlertFilters: (filters) => set({ alertFilters: filters }),
}));
