import { create } from "zustand";

interface IVariableState {
  variables: any;
  setVariables: (key: string, value: any) => void;
}

export const useVariableStore = create<IVariableState>((set) => ({
  variables: {
  },
  setVariables: (key, value) =>
    set((state) => ({
      variables: {
        ...state.variables,
        [key]: value,
      },
    })),
}));
