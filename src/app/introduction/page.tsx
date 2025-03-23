'use client';

// packages
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
// hooks
import usePersistStore from '@/hooks/use-persist-store';
// stores
import { useDemographicsStore } from '@/stores/demo-store';
import { useGalleryStore } from '@/stores/gallery-store';
import { useFormStore } from '@/stores/form-store';
// components
import DottedBox from '@/components/dotted-box';
import Header from '@/components/header';
import Loading from '@/components/loading';
import NavButton from '@/components/nav-button';
import IntroInput from './_components/intro-input';
import IntroInputLocation from './_components/intro-input-location';
import IntroInputImage from './_components/intro-input-image';
import IntroInputUpload from './_components/intro-input-upload';

const MAX_STEPS = 3;
const API_URL = 'https://us-central1-api-skinstric-ai.cloudfunctions.net';

export default function Page() {
	// states
	const [step, setStep] = useState(0);
	const [image, setImage] = useState('');
	const [loadingStates, setLoadingStates] = useState({ uploading: false, processing: false });
	// hooks
	const router = useRouter();
	const formStore = usePersistStore(useFormStore, (state) => state);
	const galleryStore = usePersistStore(useGalleryStore, (state) => state);
	const demoStore = usePersistStore(useDemographicsStore, (state) => state);

	const handlePrevStep = () => {
		setStep((prev) => prev === 0 ? 0 : step - 1);
	}

	const handleNextStep = () => {
		const isValid = isValidFields(false);
		if (isValid) setStep((prev) => (prev + 1) % MAX_STEPS);
	}

	const isValidFields = (isSubmit: boolean) => {
		if (!isSubmit) {
			const currStep = step;
			if (currStep === 0 && formStore?.name === '') return false;
			if (currStep === 1 && formStore?.location === '') return false;
		} else {
			return formStore?.name !== '' && formStore?.location !== '';
		}
		return true;
	}

	const handleSubmitForm = async () => {
		if (isValidFields(true)) {
			try {
				const response = await fetch(`${API_URL}/skinstricPhaseOne`, {
					method: 'POST',
					headers: { 'Content-Type': 'application/json', },
					body: JSON.stringify({ name: formStore?.name, location: formStore?.location }),
				});
				const data = await response.json();
				if (data.success) {
					// use a toast
					console.log(data);
					console.log(`Added ${formStore?.name} from ${formStore?.location}.`);
					handleNextStep();
				}
			} catch (e) {
				console.error(e);
			}
		}
	}

	const handleImageChange = async (isNew: boolean, file: any) => {
		if (!file) return;
		if (isNew) {
			try {
				setLoadingStates((prev) => ({ ...prev, uploading: true }));
				const reader = new FileReader();
				reader.onload = (e) => {
					if (e.target?.result) {
						galleryStore?.addImage(e.target.result as string);
						handleSubmitImage(e.target.result as string);
					}
				}
				reader.readAsDataURL(file);
			} catch (e) {
				console.log(e);
			}
		} else {
			setImage(file);
			handleSubmitImage(file);
		}
	}

	const handleSubmitImage = async (image: string) => {
		try {
			setTimeout(async () => {
				setLoadingStates({ uploading: false, processing: true });
				const response = await fetch(`${API_URL}/skinstricPhaseTwo`, {
					method: 'POST',
					headers: { 'Content-Type': 'application/json', },
					body: JSON.stringify({ image }),
				});
				const data = await response.json();
				console.log(data.data);
				demoStore?.setDemographics(data.data);
			}, 1000);
			setTimeout(() => {
				setLoadingStates((prev) => ({ ...prev, processing: false }));
				router.push('/analysis/demographics');
			}, 2000);
		} catch (e) {
			console.error(e);
		}
	}

	return (
		<>
			<Header />
			{(!loadingStates.processing && !loadingStates.uploading) ? (<main>
				<div className='sai-heading top-20 left-8'>To start analysis</div>
				{step < 2 && (<>
					<div className='sai-layer flex-col'>
						<DottedBox />
					</div>
					<div className='sai-layer'>
						{step === 0 && (<IntroInput label='name' field={formStore?.name} hint='Introduce yourself' onChange={formStore?.setName} onSubmit={handleNextStep} />)}
						{step === 1 && (<IntroInputLocation label='location' field={formStore?.location} hint='Where are you from?' placeholder='Enter a location' onChange={formStore?.setLocation} onSubmit={handleSubmitForm} />)}
					</div>
				</>)}
				{step === 2 && (<>
					<div className='sai-layer flex-row'>
						<DottedBox width={320} />
						<DottedBox width={320} />
					</div>
					<div className='sai-layer'>
						<IntroInputImage content={<>Allow A.I.<br />to scan your face</>} isCamera />
						<IntroInputUpload content={<>Allow A.I.<br />to access gallery</>} onChange={(isNew, image) => handleImageChange(isNew, image)} />
					</div>
				</>)}
				{step !== 0 && (<div className='sai-stepnav bottom-8 left-8'>
					<NavButton position='left' label='Back' onClick={handlePrevStep} noMargin />
				</div>)}
				{step < MAX_STEPS && (<div className='sai-stepnav bottom-8 right-8'>
					{(step !== 2 && isValidFields(false)) && (<NavButton position='right' label='Proceed' onClick={step === 1 ? handleSubmitForm : handleNextStep} noMargin />)}
				</div>)}
			</main>) : (<Loading content={loadingStates.uploading ? 'Sending your image to our servers...' : 'Preparing your analysis'} />)}
		</>
	);
}
