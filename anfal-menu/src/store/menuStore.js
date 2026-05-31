import { create } from 'zustand'

const useMenuStore = create((set) => ({
  // Active category ID for CategoryNav highlight
  activeCategoryId: null,
  setActiveCategoryId: (id) => set({ activeCategoryId: id }),

  // Selected item for modal
  selectedItem: null,
  openModal:  (item) => set({ selectedItem: item }),
  closeModal: ()     => set({ selectedItem: null }),

  // Search
  searchQuery: '',
  setSearchQuery: (q) => set({ searchQuery: q }),
}))

export default useMenuStore