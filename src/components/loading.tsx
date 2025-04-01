'use client';

// packages
import React, { forwardRef, ReactNode, useEffect, useRef, useState } from 'react';
// components
import DottedBox from './dotted-box';

interface LoadingProps {
	width?: number;
	content: ReactNode;
	other?: ReactNode;
	isClosing?: boolean;
}

type Ref = HTMLElement;

const Loading = forwardRef<Ref, LoadingProps>(({ width = 400, content, other, isClosing }, ref) => {
	// refs
	const layerRef = useRef<HTMLDivElement>(null);
	const elementRef = useRef<HTMLDivElement>(null);
	const contentRef = useRef<HTMLDivElement>(null);

	const animateLayer = async () => {
		const { gsap } = await import('gsap');
		if (layerRef.current && elementRef.current) {
			const tl = gsap.timeline();
			tl.to(elementRef.current, {
				opacity: 1,
				width: width,
				duration: 0.5,
				ease: 'power2.out',
				onComplete: () => {
					if (contentRef.current) contentRef.current.style.opacity = '1';
				}
			});
		}
	}

	const animateLayerOut = async () => {
		const { gsap } = await import('gsap');
		if (layerRef.current && elementRef.current && contentRef.current) {
			const tl = gsap.timeline();
			tl.to(elementRef.current, {
				opacity: 0,
				width: 0,
				duration: 0.5,
				ease: 'power2.out',
				onComplete: () => {
					if (contentRef.current) contentRef.current.style.opacity = '0';
				}
			});
		}
	}

	useEffect(() => {
		animateLayer();
		//return () => { animateLayerOut(); }
	}, [content]);

	useEffect(() => {
		console.log('isclosing', isClosing)
		if (isClosing) animateLayerOut();
	}, [isClosing]);

	return (
		<div className='sai-loading'>
			<div className='sai-layer flex-col'>
				<DottedBox speedMultiplier={48} width={width} initRotations={[45, 60, 75]} />
			</div>
			<div className='sai-layer'>
				<div ref={layerRef} className='sai-layer__content'>
					<div ref={elementRef} className='sai-layer__element flex flex-col gap-4 items-center'>
						{content}
						{/*<div ref={contentRef} style={{ opacity:'0' }}>{content}</div>*/}
					</div>
				</div>
			</div>
			{other && (<div className='sai-layer'>
				{other}
			</div>)}
		</div>
	);
});

export default Loading;