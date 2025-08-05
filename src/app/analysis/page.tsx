'use client';

// packages
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
// css
import './styles.css';
// components
import { DottedBox, Header, Footer, NavButton } from '@/components';
import { Menu } from './_components';

export default function Page() {
	// hooks
	const router = useRouter();

	useEffect(() => {
		document.body.classList.add('sai-analysis-fixed');
	}, []);

	return (
		<>
			<Header title='Anlysis' />
			<main>
				<div className='sai-heading'>
					<strong>A. I. Analysis</strong>
					<div className='sai-heading__desc'>
						<span>A. I. has estimated the following.</span>
						<span>Fix estimated information if needed.</span>
					</div>
				</div>
				<div className='sai-layer sai-layer--dot'>
					<DottedBox isAnimated={false} />
				</div>
				<div className='sai-layer'>
					<Menu />
				</div>
				<Footer left={<NavButton position='left' label='Back' onClick={() => router.push('/introduction?s2=y')} noMargin />} right={<NavButton position='right' label='Get summary' onClick={() => router.push('/analysis/demographics')} noMargin />} />
			</main>
		</>
	);
}
