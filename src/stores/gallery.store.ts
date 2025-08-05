// packages
import { create } from 'zustand';
//import { createJSONStorage, persist } from 'zustand/middleware';

interface GalleryState {
	gallery: string[];
}

interface GalleryActions {
	addImage: (image: string) => void;
	replaceImage: (image: string) => void;
	removeImageByIndex: (index: number) => void;
	removeImage: (image: string) => void;
	setImages: (images: string[]) => void;
}

// standard
export const useGalleryStore = create<GalleryState & GalleryActions>((set) => ({
	gallery: [],
	addImage: (image) => set((state) => ({ gallery: [image, ...state.gallery] })),
	replaceImage: (image) => set((state) => ({ gallery: state.gallery.map((img, i) => i === 0 ? image : img) })),
	removeImage: (image) => set((state) => ({ gallery: state.gallery.filter((i) => i !== image) })),
	removeImageByIndex: (index) => set((state) => ({ gallery: state.gallery.splice(index, 1) })),
	setImages: (images) => set((state) => ({ gallery: images })),
}));

// persist
/*export const useGalleryStore = create(
	persist<GalleryState & GalleryActions>(
		(set) => ({
			gallery: [],
			addImage: (image) => set((state) => ({ gallery: [ image, ...state.gallery] })),
			replaceImage: (image) => set((state) => ({ gallery: state.gallery.map((img, i) => i === 0 ? image : img) })),
			removeImage: (image) => set((state) => ({ gallery: state.gallery.filter((i) => i !== image) })),
			removeImageByIndex: (index) => set((state) => ({ gallery: state.gallery.splice(index, 1) })),
			setImages: (images) => set((state) => ({ gallery: images })),
		}),
		{
			name: 'gallery-storage',
			storage: createJSONStorage(() => localStorage),
		},
	),
);*/