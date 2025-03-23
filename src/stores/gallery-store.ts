// packages
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface GalleryState {
	gallery: string[];
}

interface GalleryActions {
	addImage: (image: string) => void;
	removeImage: (index: number) => void;
}

export const useGalleryStore = create(
	persist<GalleryState & GalleryActions>(
		(set) => ({
			gallery: [],
			addImage: (image) => set((state) => ({ gallery: [...state.gallery, image] })),
			removeImage: (index) => set((state) => ({ gallery: state.gallery.splice(index, 1) })),
		}),
		{
			name: 'gallery-storage',
			storage: createJSONStorage(() => localStorage),
		},
	),
);