'use client';

// packages
import React, { useState, useRef, useEffect } from 'react';
// components
import HomeTitleNav from './home-title-nav';
import HomeTitleSpan from './home-title-span';

interface HomeTitleProps {
}

const HomeTitle: React.FC<HomeTitleProps> = ({ }) => {
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
		<div ref={containerRef} className='w-full h-full flex'>
			<HomeTitleNav ref={leftRef} position='left' href='' label='Discover A.I.' isHovered={position === 'left'} isOtherHovered={position === 'right'} isDisabled />
			<div className='m-auto text-center'>
				<div className='font-normal text-[92px] leading-[0.945] tracking-[-6px]'>
					<HomeTitleSpan ref={textRef} text='Sophiscated' /><br/>
					<HomeTitleSpan ref={text2Ref} text='Skincare' />
				</div>
			</div>
			<HomeTitleNav ref={rightRef} position='right' href='/introduction' label='Take test' isHovered={position === 'right'} isOtherHovered={position === 'left'} />
		</div>
	);
}

export default HomeTitle;