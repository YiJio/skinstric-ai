export interface DemographicsItem {
	label: string;
	value: number;
}

export interface DemographicsSection {
	category: string;
	items: DemographicsItem[];
}

export const reduceDemographics = (demographics: any): DemographicsSection[] => {
	const sections: DemographicsSection[] = [];
	sections.push({
		category: 'Race',
		items: Object.entries(demographics?.race)
			.map(([label, value]: [string, number]) => ({ label, value }))
			.sort((a, b) => b.value - a.value),
	});
	sections.push({
		category: 'Age',
		items: Object.entries(demographics?.age)
			.map(([label, value]: [string, number]) => ({ label, value }))
			.sort((a, b) => b.value - a.value),
	});
	sections.push({
		category: 'Gender',
		items: Object.entries(demographics?.gender)
			.map(([label, value]: [string, number]) => ({ label, value }))
			.sort((a, b) => b.value - a.value),
	});
	return sections;
}