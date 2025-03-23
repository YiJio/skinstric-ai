// packages
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface AgeData {
	'0-2': number;
	'3-9': number;
	'10-19': number;
	'20-29': number;
	'30-39': number;
	'40-49': number;
	'50-59': number;
	'60-69': number;
	'70+': number;
}

interface GenderData {
	male: number;
	female: number;
}

interface RaceData {
	'black': number;
	'east asian': number;
	'latino hispanic': number;
	'middle eastern': number;
	'south asian': number;
	'southeast asian': number;
	'white': number;
}

interface DemographicsState {
	demographics: {
		age: AgeData;
		gender: GenderData;
		race: RaceData;
	};
}

interface DemographicsActions {
	//setAge: (race: Partial<AgeData>) => void;
	//setGender: (gender: Partial<GenderData>) => void;
	//setRace: (race: Partial<RaceData>) => void;
	setDemographics: (demographics: Partial<DemographicsState['demographics']>) => void;
}

export const useDemographicsStore = create(
	persist<DemographicsState & DemographicsActions>(
		(set) => ({
			//age: { '0-2': 0, '3-9': 0, '10-19': 0, '20-29': 0, '30-39': 0, '40-49': 0, '50-59': 0, '60-69': 0, '70+': 0 },
			//setAge: (age) => set((state) => ({ age: { ...state.age, ...age } })),
			//gender: { male: 0, female: 0 },
			//setGender: (gender) => set((state) => ({ gender: { ...state.gender, ...gender } })),
			//race: { 'black': 0, 'east asian': 0, 'latino hispanic': 0, 'middle eastern': 0, 'south asian': 0, 'southeast asian': 0, 'white': 0 },
			//setRace: (race) => set((state) => ({ race: { ...state.race, ...race } })),
			demographics: {
				age: { '0-2': 0, '3-9': 0, '10-19': 0, '20-29': 0, '30-39': 0, '40-49': 0, '50-59': 0, '60-69': 0, '70+': 0 },
				gender: { male: 0, female: 0 },
				race: { 'black': 0, 'east asian': 0, 'latino hispanic': 0, 'middle eastern': 0, 'south asian': 0, 'southeast asian': 0, 'white': 0 },
			},
			setDemographics: (demographics) => {
				if(isValid(demographics)) {
					set((state) => ({ demographics: { ...state.demographics, ...demographics } }));
				} else {
					console.error('Invalid demographics data.');
				}
			},
		}),
		{
			name: 'demo-storage',
			storage: createJSONStorage(() => localStorage),
		}
	),
);

const isValid = (demographics: Partial<DemographicsState['demographics']>): boolean => {
	return (
    demographics.race &&
    typeof demographics.race['black'] === 'number' &&
    typeof demographics.race['east asian'] === 'number' &&
    typeof demographics.race['latino hispanic'] === 'number' &&
    typeof demographics.race['middle eastern'] === 'number' &&
    typeof demographics.race['south asian'] === 'number' &&
    typeof demographics.race['southeast asian'] === 'number' &&
    typeof demographics.race['white'] === 'number' &&
    demographics.gender &&
    typeof demographics.gender.female === 'number' &&
    typeof demographics.gender.male === 'number' &&
    demographics.age &&
    typeof demographics.age['0-2'] === 'number' &&
    typeof demographics.age['10-19'] === 'number' &&
    typeof demographics.age['20-29'] === 'number' &&
    typeof demographics.age['30-39'] === 'number' &&
    typeof demographics.age['40-49'] === 'number' &&
    typeof demographics.age['50-59'] === 'number' &&
    typeof demographics.age['60-69'] === 'number' &&
    typeof demographics.age['70+'] === 'number'
  );
}