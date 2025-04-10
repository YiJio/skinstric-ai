'use client';

// packages
import React, { forwardRef, ReactNode, useRef } from 'react';
import { useRouter } from 'next/navigation';
// css
import './styles.css';

interface MenuProps {
	width?: number;
	content?: ReactNode;
	onChange?: (isNew: boolean, file: any) => void;
}

type Ref = HTMLInputElement;

const Menu = forwardRef<Ref, MenuProps>(({ }, ref) => {
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

export default Menu;