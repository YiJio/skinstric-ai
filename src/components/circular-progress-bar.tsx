'use client';

// packages
import React, { useRef, useEffect, useState } from 'react';
// css
import './styles.css';

interface CircularProgressBarProps {
	percentage: number;
}

const CircularProgressBar: React.FC<CircularProgressBarProps> = ({ percentage }) => {
	// states
	//const [isAnimating, setIsAnimating] = useState(false);
	// refs
	const circleRef = useRef<SVGCircleElement>(null);

	useEffect(() => {
		const animateProgress = async () => {
			if(circleRef.current) {
				//setIsAnimating(true); // too late to update when clicking fast
				const circumference = 2 * Math.PI * 45;
				const { gsap } = await import('gsap');
				gsap.to(circleRef.current, {
					strokeDashoffset: circumference - (circumference * percentage) / 100,
					duration: 1,
					ease: 'power2.out',
					//onComplete: () => setIsAnimating(false),
				});
			}
		}
		if(circleRef.current) {
			const circumference = 2 * Math.PI * 45;
			circleRef.current.style.strokeDasharray = circumference.toString();
		}
		animateProgress();
	}, [percentage]);

	return (
		<svg className='sai-progress' viewBox='0 0 100 100'>
			<circle className='sai-progress__track' cx='50' cy='50' r='45' strokeWidth='1.5' fill='transparent' />
			<circle ref={circleRef} className='sai-progress__percent' cx='50' cy='50' r='45' strokeWidth='1.5' fill='transparent' strokeLinecap='round' strokeDasharray='0' strokeDashoffset='0' />
			<text className='sai-progress__label' x='50' y='50' textAnchor='middle' dominantBaseline='middle'>{percentage}%</text>
		</svg>
	);
}

export default CircularProgressBar;