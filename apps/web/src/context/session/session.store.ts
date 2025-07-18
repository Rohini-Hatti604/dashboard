import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ISessionState {
  user: any;
  session_id: string | null;
  setUser: (value: any) => void;
  setSessionId: (value: string | null) => void;
}

export const useSessionStore = create<ISessionState>()(
  persist(
    (set) => ({
      user: {},
      setUser: (value) =>
        set((state) => ({
          user: value,
        })),
      session_id: null,
      setSessionId: (value) =>
        set((state) => ({
          session_id: value,
        })),
    }),
    {
      name: "clean-start-session-storage", // name of the item in the storage (must be unique)
    }
  )
);
