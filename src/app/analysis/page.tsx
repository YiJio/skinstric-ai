'use client';

// packages
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
// components
import DottedBox from '@/components/dotted-box';
import Header from '@/components/header';
import Loading from '@/components/loading';
import NavButton from '@/components/nav-button';
import AnalysisMenu from './_components/analysis-menu';

export default function Page() {
	// states
	const [loadingStates, setLoadingStates] = useState({ uploading: false, processing: false });
	// hooks
	const router = useRouter();

	const handlePrevStep = () => {
		router.push('/introduction?s2=y');
	}

	const handleNextStep = () => {
		router.push('/analysis/demographics');
	}

	return (
		<>
			<Header title='Anlysis' />
			{(!loadingStates.processing && !loadingStates.uploading) ? (<main>
				<div className='sai-heading top-20 left-8'>
					<strong>A. I. Analysis</strong>
					<div className='sai-heading__desc'>
						<span>A. I. has estimated the following.</span>
						<span>Fix estimated information if needed.</span>
					</div>
				</div>
				<div className='sai-layer flex-col'>
					<DottedBox isAnimated={false} />
				</div>
				<div className='sai-layer'>
					<AnalysisMenu />
				</div>
				<div className='sai-stepnav bottom-8 left-8'>
					<NavButton position='left' label='Back' onClick={handlePrevStep} noMargin />
				</div>
				<div className='sai-stepnav bottom-8 right-8'>
					<NavButton position='right' label='Get summary' onClick={handleNextStep} noMargin />
				</div>
			</main>) : (<Loading content={loadingStates.uploading ? 'Sending your image to our servers...' : 'Preparing your analysis'} />)}
		</>
	);
}
