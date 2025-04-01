'use client';

// packages
import React, { forwardRef, ReactNode, useEffect, useRef, useState } from 'react';
// hooks
import { useDialog } from '@/hooks/use-dialog';
// components
import Dialog from '@/components/dialog';
import { UploadRulesDialogContent, UploadRulesDialogHeader } from './upload-rules-dialog';
import { GalleryDialogContent, GalleryDialogHeader } from './gallery-dialog';

interface IntroInputUploadProps {
	width?: number;
	content?: ReactNode;
	onChange?: (isNew: boolean, file: any) => void;
}

type Ref = HTMLInputElement;

const IntroInputUpload = forwardRef<Ref, IntroInputUploadProps>(({ content, width = 320, onChange }, ref) => {
	// states
	const [image, setImage] = useState<string | undefined>('');
	// refs
	const layerRef = useRef<HTMLDivElement>(null);
	const inputRef = useRef<HTMLInputElement>(null);
	// hooks
	const { showDialog, openDialog, closeDialog, dialogContent, dialogRef } = useDialog();

	const handleOpen = (mode: string) => {
		if(mode === 'rules') {
			console.log('trying to open upload rules');
			openDialog({
				height: 332,
				header: <UploadRulesDialogHeader />,
				content: <UploadRulesDialogContent />,
				confirmText: 'Upload',
				onConfirm: () => handleOpen('gallery'),
				onCancel: closeDialog
			});
		} else if(mode === 'gallery') {
			closeDialog();
			console.log('trying to open gallery');
			setTimeout(() => {
				openDialog({
					width: 400,
					height: 260,
					header: <GalleryDialogHeader />,
					content: <GalleryDialogContent onSelect={(image) => handleSelectFromChild(image)} />,
					confirmText: 'Upload new',
					onConfirm: handleUploadFromChild,
					onCancel: closeDialog,
					centeredFooter: true
				});
			}, 100);
		}
	}

	const handleSelectFromChild = (image: string | undefined) => {
		closeDialog();
		if(image) {
			setImage(image);
			onChange && onChange(false, image);
		}
	}

	const handleUploadFromChild = () => {
		closeDialog();
		if (inputRef.current) inputRef.current.click();
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
		onChange && onChange(true, file);
	}
	

	return (
		<div ref={layerRef} className='sai-layer__content' style={{ flex: '1' }}>
			<div className='sai-imginput'>
				<div className='sai-datagrid' style={{ width: width + 'px', height: width + 'px' }}>
					<div className='sai-dataquad sai-dataquad--bl'>
						<div className='sai-datapt sai-datapt--bl'>{content}</div>
					</div>
				</div>
				<div className='sai-imginput__img'>
					<img src='/icons/gallery-icon.svg' onClick={() => handleOpen('rules')} />
					<input ref={inputRef} type='file' accept='image/*' onChange={handleImageUpload} hidden />
				</div>
			</div>
			{showDialog && (<div ref={dialogRef}>{dialogContent && <Dialog {...dialogContent} />}</div>)}
		</div>
	);
});

export default IntroInputUpload;