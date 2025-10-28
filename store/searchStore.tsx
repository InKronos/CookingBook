import { create } from 'zustand';

type SearchState = {
  query: string;
  setQuery: (queryString: string) => void;
};

export const useSearchStore = create<SearchState>((set) => ({
  query: '',
  setQuery: (queryString) => set({ query: queryString }),
}));