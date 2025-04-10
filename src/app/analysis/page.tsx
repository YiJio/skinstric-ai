'use client';

// packages
import { useRouter } from 'next/navigation';
// css
import './styles.css';
// components
import DottedBox from '@/components/dotted-box';
import Header from '@/components/header';
import NavButton from '@/components/nav-button';
import { Menu } from './_components';

export default function Page() {
	// hooks
	const router = useRouter();

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
				<div className='sai-layer h-flex h-fc'>
					<DottedBox isAnimated={false} />
				</div>
				<div className='sai-layer'>
					<Menu />
				</div>
				<div className='sai-stepnav bottom-8 left-8'>
					<NavButton position='left' label='Back' onClick={() => router.push('/introduction?s2=y')} noMargin />
				</div>
				<div className='sai-stepnav bottom-8 right-8'>
					<NavButton position='right' label='Get summary' onClick={() => router.push('/analysis/demographics')} noMargin />
				</div>
			</main>
		</>
	);
}
