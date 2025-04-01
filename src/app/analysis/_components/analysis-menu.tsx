'use client';

// packages
import React, { forwardRef, ReactNode, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
// hooks
// components

interface AnalysisMenuProps {
	width?: number;
	content?: ReactNode;
	onChange?: (isNew: boolean, file: any) => void;
}

type Ref = HTMLInputElement;

const AnalysisMenu = forwardRef<Ref, AnalysisMenuProps>(({ }, ref) => {
	// hooks	
	const router = useRouter();
	// refs
	const layerRef = useRef<HTMLDivElement>(null);

	const handleSelection = (type: number) => {
		switch (type) {
			case 0: router.push('/analysis/demographics'); break;
			case 1: router.push('/analysis/skin-details'); break;
			default: router.push('/analysis/demographics');
		}
	}

	return (
		<div ref={layerRef} className='sai-layer__content' style={{ flex: '1' }}>
			<div className='sai-menu'>
				<div className='sai-menu__option' onClick={() => handleSelection(0)}>
					<strong className='sai-menu__title'>Demographics</strong>
				</div>
				<div className='sai-menu__option'>
					<strong className='sai-menu__title'>Skin type details</strong>
				</div>
				<div className='sai-menu__option'>
					<strong className='sai-menu__title'>Cosmetic concerns</strong>
				</div>
				<div className='sai-menu__option'>
					<strong className='sai-menu__title'>Weather</strong>
				</div>
			</div>
		</div>
	);
});

export default AnalysisMenu;