'use client';

// packages
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
// hooks
import usePersistStore from '@/hooks/use-persist-store';
// stores
import { useDemographicsStore } from '@/stores/demo-store';
import { useGalleryStore } from '@/stores/gallery-store';
// components
import Header from '@/components/header';
import Footer from '@/components/footer';
import ListItem from '@/components/list-item';
import Loading from '@/components/loading';
import NavButton from '@/components/nav-button';

// important variables
const API_URL = 'https://us-central1-frontend-simplified.cloudfunctions.net';

export default function Page() {
	// states
	const [image, setImage] = useState<string>('');
	const [isLoading, setIsLoading] = useState(true);
	const [isPhotoTaken, setIsPhotoTaken] = useState(false);
	// refs
	const videoRef = useRef<HTMLVideoElement>(null);
	// hooks
	const router = useRouter();
	const galleryStore = usePersistStore(useGalleryStore, (state) => state);
	const demoStore = usePersistStore(useDemographicsStore, (state) => state);

	const handleTakePhoto = async () => {
		if (videoRef.current) {
			const canvas = document.createElement('canvas');
			canvas.width = videoRef.current.videoWidth;
			canvas.height = videoRef.current.videoHeight;
			const ctx = canvas.getContext('2d');
			if (ctx) {
				ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
				const dataURL = canvas.toDataURL('image/jpeg');
				setIsPhotoTaken(true);
				setImage(dataURL);
				galleryStore?.addImage(dataURL);
			}
		}
	}

	const handleSubmitImage = async () => {
		try {
			setTimeout(async () => {
				const response = await fetch(`${API_URL}/skinstricPhaseTwo`, {
					method: 'POST',
					headers: { 'Content-Type': 'application/json', },
					body: JSON.stringify({ image }),
				});
				const data = await response.json();
				//console.log(data.data);
				demoStore?.setDemographics(data.data);
			}, 1000);
			setTimeout(() => {
				router.push('/analysis/demographics');
			}, 2000);
		} catch (e) {
			console.error(e);
		}
	}

	useEffect(() => {
		const timer = setTimeout(async () => {
			try {
				setIsLoading(false);
				const stream = await navigator.mediaDevices.getUserMedia({ video: true });
				if (videoRef.current) { videoRef.current.srcObject = stream; }
			} catch (error: any) {
				console.error(error);
			}
		}, 3000);
		return () => clearTimeout(timer);
	}, []);

	return (
		<>
			{isLoading ? (<Loading content={<>
				<img src='/icons/camera-icon.svg' />
				<span>Setting up camera...</span>
			</>} />) : (<>
				<Header inverted title='' />
				<video ref={videoRef} width='100%' height='100%' autoPlay />
				{isPhotoTaken ? (<div className='absolute top-32 w-full h-4 flex justify-center text-white uppercase'>Great shot!</div>) : (<div className='absolute top-1/2 right-8 transform translate-y-0.5 flex items-center gap-4 text-white uppercase text-sm cursor-pointer' onClick={handleTakePhoto}>
					<span>Take picture</span>
					<img src='/icons/take-picture-icon.svg' />
				</div>)}
			</>)}
			<div className={`w-full ${isLoading ? 'bottom-48 text-black' : 'bottom-8 text-white'} absolute flex flex-col items-center justify-center gap-3 uppercase text-sm`}>
				<p className='text-center'>To get better results make sure to have</p>
				<ul className='flex gap-5'>
					<ListItem inverse description='Neutral expression' />
					<ListItem inverse description='Frontal pose' />
					<ListItem inverse description='Adequate lighting' />
				</ul>
			</div>
			{!isLoading && (<Footer left={<NavButton inverse position='left' label='Back' onClick={() => router.push('/introduction?s2=y')} noMargin />} right={isPhotoTaken && (<NavButton inverse position='right' label='Proceed' onClick={handleSubmitImage} noMargin />)} />)}
		</>
	);
}
