// packages
import { create } from 'zustand';
//import { createJSONStorage, persist } from 'zustand/middleware';

interface FormState {
	name: string;
	location: string;
}

interface FormActions {
	setName: (name: string) => void;
	setLocation: (location: string) => void;
}

// standard
export const useFormStore = create<FormState & FormActions>((set) => ({
	name: '',
	setName: (name) => set({ name }),
	location: '',
	setLocation: (location) => set({ location }),
}));

// persist
/*export const useFormStore = create(
	persist<FormState & FormActions>(
		(set) => ({
			name: '',
			setName: (name) => set({ name }),
			location: '',
			setLocation: (location) => set({ location }),
		}),
		{
			name: 'form-storage',
			storage: createJSONStorage(() => localStorage),
		},
	),
);*/