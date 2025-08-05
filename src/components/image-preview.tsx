// packages
import React, { forwardRef } from 'react';

interface ImagePreviewProps {
	index: number;
	imageSrc?: string | undefined;
	fileName?: string;
	onClick?: () => void;
	onRemove?: () => void;
}

type Ref = HTMLLIElement;

const ImagePreview = forwardRef<Ref, ImagePreviewProps>(({ index, imageSrc, fileName, onClick, onRemove }, ref) => {
	// variables
	const isValid = imageSrc !== 'NONE';

	const handleClick = () => {
		if(isValid && onClick) onClick();
	}

	const handleRemove = () => {
		//console.log('removing...',index);
		onRemove && onRemove();
	}

	return (
		<div className='sai-preview'>
			<div className='sai-preview__wrapper'>
				<img className={`sai-preview__img${!isValid ? ' sai-preview__img--empty' : ''}`} src={isValid ? imageSrc : '/icons/empty-image.png'} onClick={handleClick} />
			</div>
			<span>{fileName && (<span>{fileName}</span>)}</span>
			<span className='sai-preview__remove'>{isValid ? (<img onClick={handleRemove} src='/icons/plus.svg'/>) : ' '}</span>
		</div>
	);
});

export default ImagePreview;