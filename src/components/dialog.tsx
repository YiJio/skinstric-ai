'use client';

// packages
import React, { forwardRef, ReactNode, useEffect, useRef } from 'react';

export interface DialogProps {
	header: ReactNode;
	content: ReactNode;
	width?: number;
	height?: number;
	buttonStyle?: number;
	cancelText?: string;
	confirmText?: string;
	onCancel?: () => void;
	onConfirm?: () => void;
}

type Ref = HTMLDialogElement;

const Dialog = forwardRef<Ref, DialogProps>(({ header, content, confirmText = 'Confirm', cancelText = 'Cancel', onConfirm, onCancel, width = 320, height = 320, buttonStyle }, ref) => {
	// states

	// refs
	const dialogRef = useRef<HTMLDialogElement>(null);
	const borderRef = useRef<HTMLDivElement>(null);
	const wrapperRef = useRef<HTMLDivElement>(null);

	// opening animation
	const openDialogAnimation = async () => {
		const { gsap } = await import('gsap');
		if (dialogRef.current && borderRef.current && wrapperRef.current) {
			console.log('opening')
			const tl = gsap.timeline();
			tl.to(borderRef.current, {
				opacity: 1,
				width: width,
				duration: 0.5,
				ease: 'power2.out',
			}).to(wrapperRef.current, {
				opacity: 1,
				height: height,
				duration: 0.5,
				ease: 'power2.out',
				onComplete: () => {
					if (wrapperRef.current) wrapperRef.current.style.opacity = '1';
				}
			});
		}
	}

	// closing animation
	const closeDialogAnimation = async () => {
		const { gsap } = await import('gsap');
		if (dialogRef.current && borderRef.current && wrapperRef.current) {
			console.log('closing')
			const tl = gsap.timeline();
			tl.to(wrapperRef.current, {
				height: 0,
				duration: 0.5,
				ease: 'power2.in',
				onComplete: () => {
					if (wrapperRef.current) wrapperRef.current.style.opacity = '0';
				}
			}).to(borderRef.current, {
				width: 0,
				duration: 0.5,
				ease: 'power2.in',
			});
		}
	}

	const handleAction = (mode: number) => {
		console.log('trying action')
		closeDialogAnimation();
		setTimeout(() => {
			if (mode === 0) onCancel && onCancel();
			else if (mode === 1) onConfirm && onConfirm();
		}, 1000);
	}

	useEffect(() => {
		openDialogAnimation();
		//return () => { closeDialogAnimation(); }
	}, []);

	return (
		<div className='sai-portal'>
			<dialog ref={dialogRef} className='sai-dialog relative' style={{ width: width + 'px' }}>
				<div ref={borderRef} className='sai-dialog__border' />
				<div ref={wrapperRef} className='sai-dialog__wrapper'>
					<div className='sai-dialog__header'>{header}</div>
					<div className='sai-dialog__content'>{content}</div>
					<div className='sai-dialog__footer'>
						<button className='sai-button sai-button--aside' onClick={() => handleAction(0)}>
							<span>{cancelText}</span>
						</button>
						<button className={`sai-button${buttonStyle === 1 ? ' sai-button--outline' : ''}`} onClick={() => handleAction(1)}>
							<span>{confirmText}</span>
						</button>
					</div>
				</div>
			</dialog>
		</div>
	);
});

export default Dialog;