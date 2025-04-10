'use client';

// packages
import React, { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
// hooks
import usePersistStore from '@/hooks/use-persist-store';
// stores
import { useDemographicsStore } from '@/stores/demo-store';
// utils
import { reduceDemographics } from './utils';
// components
import Header from '@/components/header';
import Footer from '@/components/footer';
import NavButton from '@/components/nav-button';
import { Stats, Tabs } from '../_components';

export default function Page() {
	// states
	const [activeCategory, setActiveCategory] = useState(0);
	const [activeItem, setActiveItem] = useState(0);
	// hooks
	const router = useRouter();
	const demoStore = usePersistStore(useDemographicsStore, (state) => state);
	// variables
	const demoSorted = useMemo(() => {
		if (demoStore?.demographics) return reduceDemographics(demoStore?.demographics);
		return [];
	}, [demoStore?.demographics]);

	const handleChangeTab = (index: number) => {
		setActiveCategory(index);
		setActiveItem(0);
	}

	return (
		<>
			<Header title='Analysis' />
			<main>
				<div className='sai-heading'>
					<strong>A.I. Analysis</strong>
					<h1>Demographics</h1>
					<h3>Predicted race & age</h3>
				</div>
				<div className='sai-layer'>
					<div className='sai-layer__content sai-layer__content--analysis'>
						<Tabs values={[demoSorted[0]?.items[0]?.label, demoSorted[1]?.items[0]?.label, demoSorted[2]?.items[0]?.label]} tabs={['Race', 'Age', 'Gender']} category={activeCategory} onChangeTab={(index) => handleChangeTab(index)} />
						<Stats category={demoSorted?.[activeCategory]?.category} stats={demoSorted?.[activeCategory]} activeItem={activeItem} setActiveItem={setActiveItem} />
					</div>
				</div>
				<Footer left={<NavButton position='left' label='Back' onClick={() => router.push('/analysis')} noMargin />} right={<div className='sai-button-group'>
					<button className='sai-button'>
						<span>Reset</span>
					</button>
					<button className='sai-button sai-button--primary'>
						<span>Confirm</span>
					</button>
				</div>} />
			</main>
		</>
	);
}
