// packages
import React, { useEffect, useRef } from 'react';

interface IntroDottedBoxProps {
	width?: number;
}

const IntroDottedBox: React.FC<IntroDottedBoxProps> = ({ width = 400 }) => {
	const boxRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const animateBox = async() => {
			const { gsap } = await import('gsap');
			//const tl = gsap.timeline({ repeat:-1 });
			if(boxRef.current) {
				const boxes = boxRef.current.querySelectorAll('.rbg');
				/*tl.to(boxes[0], { rotation:360, duration:24 }, 0);
				tl.to(boxes[1], { rotation:360, duration:36 }, 0);
				tl.to(boxes[2], { rotation:360, duration:48 }, 0);*/
				boxes.forEach((box, index) => {
					gsap.to(box, {
						rotation: 360,
						duration: index === 0 ? 180 : 120 * (index + 1),
						repeat: -1,
						ease: 'linear'
					});
				});
			}
		}
		animateBox();
	}, []);

	return (
		<div ref={boxRef} className='sai-layer__content' style={{ width: width + 'px', height: width + 'px' }}>
			<div className='rbg absolute inset-0 will-change-transform rotate-45' />
			<div className='rbg absolute inset-0 will-change-transform rotate-45 scale-[1.1] opacity-50' />
			<div className='rbg absolute inset-0 will-change-transform rotate-45 scale-[1.2] opacity-30' />
		</div>
	);
};

export default IntroDottedBox;