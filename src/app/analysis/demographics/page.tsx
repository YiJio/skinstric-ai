'use client';

// packages
import { useEffect, useState } from 'react';
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

export default function Page() {
	// states
	const [step, setStep] = useState(0);
	const [loadingStates, setLoadingStates] = useState({ uploading: false, processing: false });
	// hooks
	const router = useRouter();
	const demoStore = usePersistStore(useDemographicsStore, (state) => state);

	return (
		<>
			<Header />
			<main>
				<div className='sai-heading top-20 left-8'>
					<span>A.I. Analysis</span>
					<h1>Demographics</h1>
					<h3>Predicted race & age</h3>
				</div>
				<div>
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
				</div>
			</main>
		</>
	);
}
