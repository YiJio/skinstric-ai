'use client';

// packages
import React, { forwardRef, ReactNode, useEffect, useRef, useState } from 'react';
// hooks
import { useDialog } from '@/hooks/use-dialog';
// components
import Dialog from '@/components/dialog';

interface IntroInputImageProps {
	image?: string;
	content?: ReactNode;
	width?: number;
	isCamera?: boolean;
	onChange?: (file: any) => void;
	onSubmit?: () => void;
	setLoading?: (status: boolean) => void;
}

type Ref = HTMLInputElement;

const IntroInputImage = forwardRef<Ref, IntroInputImageProps>(({ image, content, width = 320, onChange, onSubmit, setLoading, isCamera }, ref) => {
	// states
	const [isTyping, setIsTyping] = useState(false);
	const [base64, setBase64] = useState<string | null>(null);
	// refs
	const layerRef = useRef<HTMLDivElement>(null);
	const inputRef = useRef<HTMLInputElement>(null);
	// hooks
	const { showDialog, openDialog, closeDialog, dialogContent, dialogRef } = useDialog();

	const handleClick = () => {
		console.log('opened?')
		
	}

	const handleImageUpload = async (e: any) => {
		//if(!e.target.files) return;
		/*const file = e.target?.files[0];
		if (!file) return;
		try {
			setLoading && setLoading(true);
			const reader = new FileReader();
			reader.onload = (e) => {
				if (e.target?.result) { setBase64(e.target.result as string); }
			}
			reader.readAsDataURL(file);
			setLoading && setLoading(false);
		} catch (e) {
			console.log(e);
		}*/
		const file = e.target?.files[0];
		if (!file) return;
		onChange && onChange(file);
	}

	return (
		<div ref={layerRef} className='sai-layer__content' style={{ flex: '1' }}>
			<div className='sai-imginput'>
				<div className='sai-datagrid' style={{ width: width + 'px', height: width + 'px' }}>
					<div className='sai-dataquad sai-dataquad--tr'>
						<div className='sai-datapt sai-datapt--tr'>{content}</div>
					</div>
				</div>
				<div className='sai-imginput__img sai-imginput__img--cam'>
					<img src='/icons/camera-icon.svg' onClick={handleClick} />
				</div>
			</div>
			{/*showDialog && (<div ref={dialogRef}>{dialogContent && <Dialog {...dialogContent} onConfirm={handleAccessGallery} onCancel={closeDialog} height={332} />}</div>)*/}
		</div>
	);
});

export default IntroInputImage;