'use client';

// packages
import React, { forwardRef, ReactNode, useEffect, useRef, useState } from 'react';

interface IntroInputImageProps {
	content?: ReactNode;
	width?: number;
	isCamera?: boolean;
	onClick?: () => void;
	onSubmit?: () => void;
}

type Ref = HTMLInputElement;

const IntroInputImage = forwardRef<Ref, IntroInputImageProps>(({ content, width = 320, onClick, onSubmit, isCamera }, ref) => {
	// states
	const [isTyping, setIsTyping] = useState(false);
	// refs
	const layerRef = useRef<HTMLDivElement>(null);
	const inputRef = useRef<HTMLInputElement>(null);

	const handleChange = (e: any) => {
		onClick && onClick();
	}

	const handleSubmit = (e: any) => {
		e.preventDefault();
		onSubmit && onSubmit();
	}

	return (
		<div ref={layerRef} className='sai-layer__content' style={{ flex: '1' }}>
			<div className='sai-imginput'>
				<div className='sai-datagrid' style={{ width: width + 'px', height: width + 'px' }}>
					<div className={`sai-dataquad sai-dataquad--${isCamera ? 'tr' : 'bl'}`}>
						<div className={`sai-datapt sai-datapt--${isCamera ? 'tr' : 'bl'}`}>{content}</div>
					</div>
				</div>				
				<div className='sai-imginput__img' onClick={handleChange}>
					<img src={`/icons/${isCamera ? 'camera' : 'gallery'}-icon.svg`} />
				</div>
			</div>
		</div>
	);
});

export default IntroInputImage;