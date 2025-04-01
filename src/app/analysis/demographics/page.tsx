'use client';

// packages
import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
// hooks
import usePersistStore from '@/hooks/use-persist-store';
// stores
import { useDemographicsStore } from '@/stores/demo-store';
// components
import DottedBox from '@/components/dotted-box';
import Header from '@/components/header';
import Loading from '@/components/loading';
import NavButton from '@/components/nav-button';
import AnalysisTabs from '../_components/analysis-tabs';
import { reduceDemographics } from './utils';
import AnalysisStats from '../_components/analysis-stats';
import Footer from '@/components/footer';

export default function Page() {
	// states
	const [activeCategory, setActiveCategory] = useState(0);
	const [activeItem, setActiveItem] = useState(0);
	const [loadingStates, setLoadingStates] = useState({ uploading: false, processing: false });
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
				<div className='sai-heading top-20 left-8'>
					<strong>A.I. Analysis</strong>
					<h1>Demographics</h1>
					<h3>Predicted race & age</h3>
				</div>
				<div className='sai-layer'>
					<div className='sai-layer__content sai-layer__content--analysis'>
						<AnalysisTabs values={[demoSorted[0]?.items[0]?.label, demoSorted[1]?.items[0]?.label, demoSorted[2]?.items[0]?.label]} tabs={['Race', 'Age', 'Gender']} category={activeCategory} onChangeTab={(index) => handleChangeTab(index)} />
						<AnalysisStats category={demoSorted?.[activeCategory]?.category} stats={demoSorted?.[activeCategory]} activeItem={activeItem} setActiveItem={setActiveItem} />
					</div>
					{/*<div className='sai-layer__content'>
						<strong>Race</strong><br/>
						Black: {demoStore?.demographics.race.black}<br/>
						East asian: {demoStore?.demographics.race['east asian']}<br/>
						Latino Hispanic: {demoStore?.demographics.race['latino hispanic']}<br/>
						Middle Eastern: {demoStore?.demographics.race['middle eastern']}<br/>
						South Asian: {demoStore?.demographics.race['south asian']}<br/>
						Southeast Asian: {demoStore?.demographics.race['southeast asian']}<br/>
						White: {demoStore?.demographics.race.white}<br/>
					</div>
					<div>
						<strong>Gender</strong><br/>
						Male: {demoStore?.demographics.gender.male}<br/>
						Female: {demoStore?.demographics.gender.female}<br/>
					</div>*/}
				</div>
				<Footer left={<NavButton position='left' label='Back' onClick={() => router.push('/analysis')} noMargin />} right={<div className='sai-button-group'>
					<button className='sai-button'>
						<span>Reset</span>
					</button>
					<button className='sai-button sai-button--primary'>
						<span>Confirm</span>
					</button>
				</div>} />
				{/*<div className='sai-stepnav bottom-8 left-8'>
					<NavButton position='left' label='Back' onClick={() => router.push('/analysis')} noMargin />
				</div>
				<div className='sai-stepnav bottom-8 left-1/2'>
					<span>If A.I. estimate is wrong, selec the correct one.</span>
				</div>
				<div className='sai-stepnav bottom-8 right-8'>
					buttons
				</div>*/}
			</main>
		</>
	);
}
