'use client';

// packages
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
// css
import './styles.css';
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
import { Input, InputLocation, InputCamera, InputUpload } from './_components';
import Footer from '@/components/footer';

const MAX_STEPS = 3;
//const API_URL = 'https://us-central1-api-skinstric-ai.cloudfunctions.net';
const API_URL = 'https://us-central1-frontend-simplified.cloudfunctions.net';

export default function Page() {
	// states
	const [step, setStep] = useState(0);
	const [formFields, setFormFields] = useState({ name: '', location: '' }); // temp
	const [image, setImage] = useState(''); // temp
	const [isLoading, setIsLoading] = useState(false);
	const [loadingStates, setLoadingStates] = useState({ submitting: false, uploading: false, processing: false });
	// hooks
	const router = useRouter();
	const searchParams = useSearchParams();
	const formStore = usePersistStore(useFormStore, (state) => state);
	const galleryStore = usePersistStore(useGalleryStore, (state) => state);
	const demoStore = usePersistStore(useDemographicsStore, (state) => state);
	// variables
	const initStep = searchParams.get('s2') === 'y' ? 2 : 0;

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

	const handleFormChange = (field: string, value: string) => {
		setFormFields((prev) => ({ ...prev, [field]: value }));
		if (field === 'name') { formStore?.setName(value); }
		else { formStore?.setLocation(value); }
	}

	const handleSubmitForm = async () => {
		if (isValidFields(true)) {
			try {
				setLoadingStates((prev) => ({ ...prev, submitting: true }));
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
					setTimeout(() => {
						setLoadingStates((prev) => ({ ...prev, submitting: false }));
						handleNextStep();
					}, 1000);
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
				setLoadingStates((prev) => ({ ...prev, uploading: false, processing: true }));
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

	useEffect(() => {
		document.body.classList.remove('sai-analysis-fixed');
	}, []);

	useEffect(() => {
		if (initStep !== 0) setStep(initStep);
	}, [initStep]);

	useEffect(() => {
		setIsLoading(true);
		setTimeout(() => {
			setIsLoading(false);
		}, 100);
	}, [step]);

	useEffect(() => {
		if (formStore) {
			setFormFields({ name: formStore.name, location: formStore.location });
		}
	}, [formStore]);

	return (
		<>
			<Header />
			{(!loadingStates.submitting && !loadingStates.processing && !loadingStates.uploading) ? (<main>
				<div className='sai-heading'>
					<strong>To start analysis</strong>
				</div>
				{step < 2 && (<>
					{isLoading ? (<Loading content={<></>} />) : (<>
						<div className='sai-layer flex-col'>
							<DottedBox />
						</div>
						<div className='sai-layer'>
							{step === 0 && (<Input label='name' field={formFields?.name} hint='Introduce yourself' onChange={(value) => handleFormChange('name', value)} onSubmit={handleNextStep} />)}
							{step === 1 && (<InputLocation label='location' field={formFields?.location} hint='Where are you from?' placeholder='Enter a location' onChange={(value) => handleFormChange('location', value)} onSubmit={handleSubmitForm} />)}
						</div>
					</>)}
				</>)}
				{step === 2 && (<>
					<div className='sai-layer h-fr'>
						<DottedBox width={320} />
						<DottedBox width={320} />
					</div>
					<div className='sai-layer sai-layer--graph'>
						<InputCamera content={<>Allow A.I.<br />to scan your face</>} isCamera />
						<InputUpload content={<>Allow A.I.<br />to access gallery</>} onChange={(isNew, image) => handleImageChange(isNew, image)} />
					</div>
				</>)}
				<Footer left={step !== 0 ? (<NavButton position='left' label='Back' onClick={handlePrevStep} noMargin />) : (<span></span>)} right={step < MAX_STEPS && (<>
					{step !== 2 && (<NavButton position='right' label='Proceed' onClick={step === 1 ? handleSubmitForm : handleNextStep} noMargin />)}
				</>)} />
			</main>) : (<Loading content={loadingStates.submitting ? 'Please wait a moment...' : loadingStates.uploading ? 'Sending your image to our servers...' : 'Preparing your analysis'} />)}
		</>
	);
}
