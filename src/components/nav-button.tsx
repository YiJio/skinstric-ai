'use client';

// packages
import React, { forwardRef, useEffect, useRef, useState } from 'react';
// css
import './styles.css';

interface NavButtonProps {
	position: string;
	label: string;
	noMargin?: boolean;
	isDisabled?: boolean;
	inverse?: boolean;
	onClick?: () => void;
}

type Ref = HTMLElement;

const NavButton = forwardRef<Ref, NavButtonProps>(({ position, label, noMargin, isDisabled, inverse = false, onClick }, ref) => {
	// states
	const [isHovered, setIsHovered] = useState(false);
	// refs
	const buttonRef = useRef<HTMLDivElement>(null);

	const spanMargin = !noMargin ?
		position === 'left'
			? 'ml-10'
			: position === 'right'
				? 'mr-10'
				: ''
		: '';
	const spanPadding = isHovered ?
		position === 'left'
			? 'pl-10'
			: position === 'right'
				? 'pr-10'
				: ''
		: position === 'left'
			? 'pl-4'
			: position === 'right'
				? 'pr-4'
				: '';

	const handleClick = () => {
		onClick && onClick();
	}

	return (
		<div ref={buttonRef} className={`sai-nav-btn${isDisabled ? ' is-disabled' : ''}${inverse ? ' h-inverted' : ''} ${spanMargin}`} onClick={handleClick} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} style={{ flexDirection: position === 'left' ? 'row' : 'row-reverse' }}>
			<span className='sai-nav-btn__icon'>
				<span className='sai-nav-btn__svg'>
					<img className={`${position === 'left' ? 'h-flipped' : ''}`} src='/icons/arrow.svg' />
				</span>
			</span>
			<span className={`sai-nav-btn__label ${spanPadding}`}>{label}</span>
		</div>
	);
});

export default NavButton;