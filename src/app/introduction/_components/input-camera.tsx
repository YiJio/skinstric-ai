'use client';

// packages
import React, { forwardRef, ReactNode, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
// css
import './styles.css';
// components
import Popup from '@/components/popup';

interface InputCameraProps {
	image?: string;
	content?: ReactNode;
	width?: number;
	isCamera?: boolean;
	onChange?: (file: any) => void;
	onSubmit?: () => void;
	setLoading?: (status: boolean) => void;
}

type Ref = HTMLInputElement;

const InputCamera = forwardRef<Ref, InputCameraProps>(({ content, width = 320 }, ref) => {
	// refs
	const layerRef = useRef<HTMLDivElement>(null);
	// hooks
	const router = useRouter();

	const handleAccessCamera = () => {
		console.log('opened?')
		router.push('/camera');
	}

	return (
		<div ref={layerRef} className='sai-layer__content' style={{ flex: '1' }}>
			<div className='sai-imgslot'>
				<div className='sai-graph' style={{ width: width + 'px', height: width + 'px' }}>
					<div className='sai-graph__quadrant sai-graph__quadrant--tr'>
						<div className='sai-graph__point sai-graph__point--tr'>{content}</div>
					</div>
				</div>
				<div className='sai-imgslot__img sai-imgslot__img--cam'>
					<img src='/icons/camera-icon.svg' />
					<Popup content={'Allow A.I. to access your camera'} cancelText='Deny' confirmText='Allow' onConfirm={handleAccessCamera} />
				</div>
			</div>
		</div>
	);
});

export default InputCamera;