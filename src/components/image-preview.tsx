// packages
import React, { forwardRef } from 'react';

interface ImagePreviewProps {
	index: number;
	imageSrc?: string | undefined;
	fileName?: string;
	onClick?: (index: number) => void;
	onRemove?: (index: number) => void;
}

type Ref = HTMLLIElement;

const ImagePreview = forwardRef<Ref, ImagePreviewProps>(({ index, imageSrc, fileName, onClick, onRemove }, ref) => {
	// variables
	const isValid = imageSrc !== 'NONE';

	const handleClick = () => {
		if(isValid && onClick) onClick(index);
	}

	const handleRemove = () => {
		onRemove && onRemove(index);
	}

	return (
		<div className='sai-preview'>
			<div className='sai-preview__wrapper'>
				<img className={`sai-preview__img${!isValid ? ' sai-preview__img--empty' : ''}`} src={isValid ? imageSrc : '/icons/empty-image.png'} onClick={handleClick} />
			</div>
			{fileName && (<span>{fileName}</span>)}
			{isValid && (<span onClick={handleRemove}></span>)}
		</div>
	);
});

export default ImagePreview;