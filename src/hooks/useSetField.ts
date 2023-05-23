'use client';

import { create } from 'zustand';

interface Props {
  clientId: string | undefined;
  setField: (field: string | undefined) => void;
}

const useSetField = create<Props>((set) => ({
  clientId: undefined,
  setField: async (prop: string | undefined) => {
    set({ clientId: prop });
  },
}));

export default useSetField;
