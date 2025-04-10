'use client';

// packages
import React, { forwardRef } from 'react';

interface PageButtonProps {
	position: string;
	onClick?: () => void;
}

type Ref = HTMLElement;

const PageButton = forwardRef<Ref, PageButtonProps>(({ position, onClick }, ref) => {

	const handleClick = () => {
		onClick && onClick();
	}

	return (
		<button className='sai-page-btn' onClick={handleClick}>
			<span className={`sai-page-btn__icon h-p${position === 'left' ? 'r' : 'l'}-1`}>
				<img className={`${position === 'left' ? 'h-flipped' : ''}`} src='/icons/arrow.svg' />
			</span>
		</button>
	);
});

export default PageButton;