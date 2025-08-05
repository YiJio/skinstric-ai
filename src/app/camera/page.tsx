'use client';

// packages
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
// css
import './styles.css';
// hooks
//import usePersistStore from '@/hooks/use-persist-store';
// stores
import { useDemographicsStore } from '@/stores/demo.store';
import { useGalleryStore } from '@/stores/gallery.store';
// components
import { Header, Footer, ListItem, Loading, NavButton } from '@/components';

// important variables
const API_URL = 'https://us-central1-frontend-simplified.cloudfunctions.net';

export default function Page() {
	// states
	const [image, setImage] = useState<string>('');
	const [isLoading, setIsLoading] = useState(true);
	const [loadingStates, setLoadingStates] = useState({ uploading: false, processing: false });
	const [isPhotoTaken, setIsPhotoTaken] = useState(false);
	// refs
	const videoRef = useRef<HTMLVideoElement>(null);
	// hooks
	const router = useRouter();
	const galleryStore = useGalleryStore((state) => state);
	const demoStore = useDemographicsStore((state) => state);
	//const galleryStore = usePersistStore(useGalleryStore, (state) => state);
	//const demoStore = usePersistStore(useDemographicsStore, (state) => state);

	const handleTakePhoto = async (isRetake = false) => {
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
				if (isRetake) { galleryStore?.replaceImage(dataURL); }
				else { galleryStore?.addImage(dataURL); }
			}
		}
	}

	const handleSubmitImage = async () => {
		try {
			setTimeout(() => {
				setLoadingStates((prev) => ({ ...prev, uploading: true, processing: false }));
			}, 2000);
			setTimeout(async () => {
				setLoadingStates((prev) => ({ ...prev, uploading: false, processing: true }));
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
				setLoadingStates((prev) => ({ ...prev, processing: false }));
				router.push('/analysis/demographics');
			}, 2000);
		} catch (e) {
			console.error(e);
		}
	}

	useEffect(() => {
		document.body.classList.remove('sai-analysis-fixed');
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

	// update gallery in user whenever gallery store changes
  useEffect(() => {
    const updateGallery = async() => {
			//console.log('updating gallery from /camera')
      await fetch('/api/gallery', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ gallery: galleryStore.gallery })
      });
    }
		if(galleryStore?.gallery) updateGallery();
  }, [galleryStore?.gallery]);

	const isNotLoadingOther = !loadingStates.processing && !loadingStates.uploading;

	return (
		<>
			{isLoading ? (<Loading content={<>
				<img src='/icons/camera-icon.svg' />
				<span>Setting up camera...</span>
			</>} />) : (<>
				{isNotLoadingOther ? (<>
					<Header inverted title='' />
					<video ref={videoRef} className='sai-camera' width='100%' height='100%' autoPlay />
					{isPhotoTaken ? (<>
						<div className='sai-marquee'>Great shot!</div>
						<div className='sai-snap' onClick={() => handleTakePhoto(true)}>
							<span>Retake</span>
							<img src='/icons/take-picture-icon.svg' />
						</div>
					</>) : (<div className='sai-snap' onClick={() => handleTakePhoto(false)}>
						<span>Take picture</span>
						<img src='/icons/take-picture-icon.svg' />
					</div>)}
				</>) : (<Loading content={loadingStates.uploading ? 'Sending your image to our servers...' : 'Preparing your analysis'} />)}
			</>)}
			{isNotLoadingOther && (<div className={`sai-rules${isLoading ? ' is-loading' : ''}`}>
				<p style={{ textAlign:'center' }}>To get better results make sure to have</p>
				<ul className='h-flex h-gap-5'>
					<ListItem inverse={!isLoading} description='Neutral expression' />
					<ListItem inverse={!isLoading} description='Frontal pose' />
					<ListItem inverse={!isLoading} description='Adequate lighting' />
				</ul>
			</div>)}
			{!isLoading && isNotLoadingOther && (<Footer left={<NavButton inverse position='left' label='Back' onClick={() => router.push('/introduction?s2=y')} noMargin />} right={isPhotoTaken && (<NavButton inverse position='right' label='Proceed' onClick={handleSubmitImage} noMargin />)} />)}
		</>
	);
}
