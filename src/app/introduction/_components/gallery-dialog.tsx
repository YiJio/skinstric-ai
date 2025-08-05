'use client';

// packages
import React, { useEffect } from 'react';
// hooks
//import usePersistStore from '@/hooks/use-persist-store';
// stores
import { useGalleryStore } from '@/stores/gallery.store';
// components
import { ImagePreview } from '@/components';

const GalleryDialogHeader = () => {
	return (<>Recently downloaded images</>);
}

interface GalleryDialogContentProps {
	onSelect?: (image: string | undefined) => void;
}

const GalleryDialogContent: React.FC<GalleryDialogContentProps> = ({ onSelect }) => {
	// stores
	const galleryStore = useGalleryStore((state) => state);
	//const galleryStore = usePersistStore(useGalleryStore, (state) => state);
	// variables
	const images = galleryStore?.gallery;	

	// doesn't really matter, it's just only picking an image to process
	// not really storing the selection (no need to persist this selection)
	// so just pass back the string
	/*const handleSelect = (index: number) => {
		onSelect && onSelect(index);
	}*/

	const handleSelect = (image: string | undefined) => {
		onSelect && onSelect(image);
	}

	return (
		<>
			<div className='sai-gallery'>
				{[1,2,3].map((_, index) => (<React.Fragment key={index}>
					<ImagePreview index={index} imageSrc={images?.[index] ? images?.[index] : 'NONE'} onClick={() => handleSelect(images?.[index])} onRemove={() => galleryStore?.removeImage(images?.[index] ? images?.[index] : '')} />
				</React.Fragment>))}
			</div>
		</>
	);
}

export { GalleryDialogHeader, GalleryDialogContent };