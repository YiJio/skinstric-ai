// packages
import React from 'react';
// components
import ListItem from '@/components/list-item';
import ImagePreview from '@/components/image-preview';

const GalleryDialogHeader = ({ }) => {
	return (
		<div>Downloaded</div>
	);
}

interface GalleryDialogContentProps {
	images: string[] | undefined;
	onSelect?: (image: string | undefined) => void;
	onRemove?: (index: number) => void;
}

const GalleryDialogContent: React.FC<GalleryDialogContentProps> = ({ images, onSelect, onRemove }) => {

	// doesn't really matter, it's just only picking an image to process
	// not really storing the selection (no need to persist this selection)
	// so just pass back the string
	/*const handleSelect = (index: number) => {
		onSelect && onSelect(index);
	}*/

	const handleSelect = (image: string | undefined) => {
		onSelect && onSelect(image);
	}

	const handleRemove = (index: number) => {
		onRemove && onRemove(index);
	}

	return (
		<>
			<div className='flex justify-center gap-4'>
				{[1,2,3].map((slot, index) => (<React.Fragment key={index}>
					<ImagePreview index={index} imageSrc={images?.[index] ? images?.[index] : 'NONE'} onClick={(index) => handleSelect(images?.[index])} onRemove={(index) => handleRemove(index)} />
				</React.Fragment>))}
			</div>
		</>
	);
}

export { GalleryDialogHeader, GalleryDialogContent };