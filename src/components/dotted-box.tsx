'use client';

// packages
import React, { useEffect, useRef } from 'react';
// css
import './styles.css';

interface DottedBoxProps {
	width?: number;
	speedMultiplier?: number;
	initRotations?: number[];
	isAnimated?: boolean;
}

const DottedBox: React.FC<DottedBoxProps> = ({ width = 400, speedMultiplier = 1, initRotations = [45, 45, 45], isAnimated = true }) => {
	// refs
	const boxRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const animateBox = async() => {
			const { gsap } = await import('gsap');
			if(boxRef.current) {
				const boxes = boxRef.current.querySelectorAll('.rbg');
				boxes.forEach((box, index) => {
					gsap.to(box, {
						rotation: 360,
						duration: index === 0 ? (180 / speedMultiplier) : ((120 * (index + 1)) / speedMultiplier),
						repeat: -1,
						ease: 'linear'
					});
				});
			}
		}
		if(isAnimated) animateBox();
	}, [isAnimated]);

	return (
		<div ref={boxRef} className='sai-layer__content' style={{ width: width + 'px', height: width + 'px' }}>
			<div className='rbg absolute inset-0 will-change-transform' style={{ transform:`rotate(${initRotations[0]}deg)` }} />
			<div className='rbg absolute inset-0 will-change-transform scale-[1.1] opacity-50' style={{ transform:`rotate(${initRotations[1]}deg)` }} />
			<div className='rbg absolute inset-0 will-change-transform scale-[1.2] opacity-30' style={{ transform:`rotate(${initRotations[2]}deg)` }} />
		</div>
	);
};

export default DottedBox;