'use client';

// packages
import React, { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
// css
import '../styles.css';
// components
import Header from '@/components/header';
import Footer from '@/components/footer';
import Loading from '@/components/loading';
import NavButton from '@/components/nav-button';
import { PageButton } from '../_components';

export default function Page() {
	// states
	const [isLoading, setIsLoading] = useState(true);
	// hooks
	const router = useRouter();

	useEffect(() => {
		const timer = setTimeout(async () => {
			setIsLoading(false);
		}, 100);
		return () => clearTimeout(timer);
	}, []);

	return (
		<>
			{isLoading ? (<Loading content={<></>} />) : (<>
				<Header title='Analysis' />
				<main>
					<div className='sai-layer'>
						<div className='sai-heading'>
							<strong>A.I. Analysis</strong>
							<h1>
								Skin type
								<div className='sai-button-group h-mt-4n h-ml-4 h-gap-5'>
									<PageButton position='left' onClick={() => router.push('/analysis/demographics')} />
									<PageButton position='right' onClick={() => router.push('/analysis/cosmetic')} />
								</div>
							</h1>
							<h3>Skin-related characteristics</h3>
						</div>
						<div className='sai-layer__content sai-layer__content--analysis'>
						</div>
					</div>
					<Footer left={<NavButton position='left' label='Back' onClick={() => router.push('/analysis')} noMargin />} />
				</main>
			</>)}
		</>
	);
}
