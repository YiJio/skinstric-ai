'use client';

// packages
import { useEffect, useState } from 'react';
// components
import Header from '@/components/header';
import NavButton from '@/components/nav-button';
import IntroDottedBox from './_components/intro-dotted-box';
import IntroInput from './_components/intro-input';
import IntroInputLocation from './_components/intro-input-location';
import IntroInputImage from './_components/intro-input-image';

const MAX_STEPS = 3;

export default function Page() {
	// states
	const [step, setStep] = useState(0);
	const [name, setName] = useState('');
	const [location, setLocation] = useState('');
	const [submitted, setSubmitted] = useState(false);

	const handlePrevStep = () => {
		setStep((prev) => prev === 0 ? 0 : step - 1);
	}

	const handleNextStep = () => {
		setStep((prev) => (prev + 1) % MAX_STEPS);
	}

	const handleSubmitForm = async () => {
		handleNextStep();
		// hit api with fields
	}

	useEffect(() => {
		console.log(name, location)
	}, [name, location]);

	return (
		<>
			<Header />
			<main>
				<div className='sai-heading top-20 left-8'>To start analysis</div>
				{step < 2 && (<>
					<div className='sai-layer flex-col'>
						<IntroDottedBox />
					</div>
					<div className='sai-layer'>
						{step === 0 && (<IntroInput label='name' field={name} hint='Introduce yourself' onChange={setName} onSubmit={handleNextStep} />)}
						{step === 1 && (<IntroInputLocation label='location' field={location} hint='Where are you from?' placeholder='Enter a location' onChange={setLocation} onSubmit={handleSubmitForm} />)}
					</div>
				</>)}
				{step === 2 && (<>
					<div className='sai-layer flex-row'>
						<IntroDottedBox width={320} />
						<IntroDottedBox width={320} />
					</div>
					<div className='sai-layer'>
						<IntroInputImage content={<>Allow A.I.<br/>to scan your face</>} isCamera />
						<IntroInputImage content={<>Allow A.I.<br/>to access gallery</>} />
					</div>
				</>)}
				{step !== 0 && (<div className='sai-stepnav bottom-8 left-8'>
					<NavButton position='left' label='Back' onClick={handlePrevStep} noMargin />
				</div>)}
				{step < MAX_STEPS && (<div className='sai-stepnav bottom-8 right-8'>
					{((step === 0 && name !== '') || (step === 1 && location !== '')) && (<NavButton position='right' label='Proceed' onClick={handleNextStep} noMargin />)}
				</div>)}
			</main>
		</>
	);
}
