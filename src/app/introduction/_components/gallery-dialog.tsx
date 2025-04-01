// packages
import React, { useEffect } from 'react';
// hooks
import usePersistStore from '@/hooks/use-persist-store';
// stores
import { useGalleryStore } from '@/stores/gallery-store';
// components
import ImagePreview from '@/components/image-preview';

const GalleryDialogHeader = ({ }) => {
	return (
		<div>Recently downloaded images</div>
	);
}

interface GalleryDialogContentProps {
	onSelect?: (image: string | undefined) => void;
}

const GalleryDialogContent: React.FC<GalleryDialogContentProps> = ({ onSelect }) => {
	// stores
	const galleryStore = usePersistStore(useGalleryStore, (state) => state);
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
			<div className='flex justify-center gap-4'>
				{[1,2,3].map((slot, index) => (<React.Fragment key={index}>
					<ImagePreview index={index} imageSrc={images?.[index] ? images?.[index] : 'NONE'} onClick={() => handleSelect(images?.[index])} onRemove={() => galleryStore?.removeImage(images?.[index] ? images?.[index] : '')} />
				</React.Fragment>))}
			</div>
		</>
	);
}

export { GalleryDialogHeader, GalleryDialogContent };