'use client';

// packages
import React, { useState, useRef, useEffect } from 'react';
// css
import './styles.css';
// components
import Heading from './heading';
import Nav from './nav';

interface HomeIntroProps {
}

const HomeIntro: React.FC<HomeIntroProps> = ({ }) => {
	// states
	const [position, setPosition] = useState('center');
	// refs
	const containerRef = useRef<HTMLDivElement>(null);
	const textRef = useRef<HTMLSpanElement>(null);
	const text2Ref = useRef<HTMLSpanElement>(null);
	const leftRef = useRef<HTMLDivElement>(null);
	const rightRef = useRef<HTMLDivElement>(null);

	const handleMouseEnter = (position: 'left' | 'right') => {
		if (position === 'left') { setPosition('left'); }
		else { setPosition('right'); }
	}

	const handleMouseLeave = () => {
		setPosition('center');
	}

	useEffect(() => {
		if (leftRef.current) {
			leftRef.current.addEventListener('mouseenter', () => handleMouseEnter('left'));
			leftRef.current.addEventListener('mouseleave', handleMouseLeave);
		}
		if (rightRef.current) {
			rightRef.current.addEventListener('mouseenter', () => handleMouseEnter('right'));
			rightRef.current.addEventListener('mouseleave', handleMouseLeave);
		}
		return () => {
			if (leftRef.current) {
				leftRef.current.removeEventListener('mouseenter', () => handleMouseEnter('left'));
				leftRef.current.removeEventListener('mouseleave', handleMouseLeave);
			}
			if (rightRef.current) {
				rightRef.current.removeEventListener('mouseenter', () => handleMouseEnter('right'));
				rightRef.current.removeEventListener('mouseleave', handleMouseLeave);
			}
		}
	}, [leftRef, rightRef]);

	useEffect(() => {
		if(containerRef.current && textRef.current && text2Ref.current) {
			if(position === 'left') {
				const right = containerRef.current.offsetWidth;
				textRef.current.style.transform = `translateX(${right - (textRef.current.offsetWidth + textRef.current.offsetLeft) - 20}px)`;
				text2Ref.current.style.transform = `translateX(${right - (text2Ref.current.offsetWidth + text2Ref.current.offsetLeft) - 20}px)`;
			} else if(position === 'right') {
				textRef.current.style.transform = `translateX(-${textRef.current.offsetLeft - 20}px)`;
				text2Ref.current.style.transform = `translateX(-${text2Ref.current.offsetLeft - 20}px)`;
			} else {
				textRef.current.style.transform = `translateX(0)`;
				text2Ref.current.style.transform = `translateX(0)`;				
			}
		}
	}, [position]);

	return (
		<div ref={containerRef} className='sai-home'>
			<Nav ref={leftRef} position='left' href='' label='Discover A.I.' isOtherHovered={position === 'right'} isDisabled />
			<div className='sai-home__wrapper'>
				<div className='sai-home__title'>
					<Heading ref={textRef} text='Sophiscated' /><br/>
					<Heading ref={text2Ref} text='Skincare' />
				</div>
			</div>
			<Nav ref={rightRef} position='right' href='/introduction' label='Take test' isOtherHovered={position === 'left'} />
		</div>
	);
}

export default HomeIntro;