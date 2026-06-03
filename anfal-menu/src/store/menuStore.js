import { create } from 'zustand'

const useMenuStore = create((set) => ({
  activeCategoryId:    null,
  setActiveCategoryId: (id) => set({ activeCategoryId: id }),

  searchQuery:    '',
  setSearchQuery: (q) => set({ searchQuery: q }),

  dietFilter:    'all',           // 'all' | 'veg' | 'non_veg'
  setDietFilter: (f) => set({ dietFilter: f }),

  selectedItem: null,
  openModal:    (item) => set({ selectedItem: item }),
  closeModal:   ()     => set({ selectedItem: null }),
}))

export default useMenuStore