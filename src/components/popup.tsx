'use client';

// packages
import React, { forwardRef, ReactNode, useEffect, useRef, useState } from 'react';

export interface PopupProps {
	content: ReactNode;
	width?: number;
	height?: number;
	cancelText?: string;
	confirmText?: string;
	onCancel?: () => void;
	onConfirm?: () => void;
}

type Ref = HTMLDivElement;

const Popup = forwardRef<Ref, PopupProps>(({ content, confirmText = 'Confirm', cancelText = 'Cancel', onConfirm, onCancel, width = 320, height = 320 }, ref) => {
	// states
	const [isOpen, setIsOpen] = useState(false);
	// refs
	const popupRef = useRef<HTMLDivElement>(null);

	// opening animation
	const openPopupAnimation = async () => {
		const { gsap } = await import('gsap');
		if (popupRef.current && !isOpen) {
			console.log('here?')
			gsap.to(popupRef.current, {
				opacity: 1,
				duration: 0.3,
				ease: 'power2.out',
			});
		}
		setIsOpen(true);
	}

	// closing animation
	const closePopupAnimation = async () => {
		const { gsap } = await import('gsap');
		console.log('ty close')
		if (popupRef.current) {
			gsap.to(popupRef.current, {
				opacity: 0,
				duration: 0.3,
				ease: 'power2.in',
			});
		}
		setIsOpen(false);
	}

	const handleAction = (mode: number) => {
		closePopupAnimation();
		setTimeout(() => {
			if (mode === 0) onCancel && onCancel();
			else if (mode === 1) onConfirm && onConfirm();
		}, 1000);
	}

	useEffect(() => {
		const parent = popupRef.current?.parentElement;
		if (parent) {
			parent.addEventListener('click', openPopupAnimation);
			return () => parent.removeEventListener('click', openPopupAnimation)
		}
	}, []);

	useEffect(() => {
		const handleOutsideClick = (e: any) => {
			if (popupRef.current && !popupRef.current.contains(e.target)) {
				closePopupAnimation();
			}
		}
		document.addEventListener('mousedown', handleOutsideClick);
		return () => { document.removeEventListener('mousedown', handleOutsideClick); }
	}, [popupRef]);

	return (
		<>
			<div ref={popupRef} className={`sai-popup`} style={{ pointerEvents: isOpen ? 'auto' : 'none' }}>
				<div className='sai-popup__wrapper'>
					<div className='sai-popup__content'>{content}</div>
					<div className='sai-popup__footer'>
						<button className='sai-button sai-button--aside' onClick={() => handleAction(0)}>
							<span>{cancelText}</span>
						</button>
						<button className='sai-button' onClick={() => handleAction(1)}>
							<span>{confirmText}</span>
						</button>
					</div>
				</div>
			</div>
		</>
	);
});

export default Popup;