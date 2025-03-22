'use client';

// packages
import React, { forwardRef } from 'react';
import { MdArrowLeft, MdArrowRight } from 'react-icons/md';
// components
import HomeTitleNavBg from './home-title-nav-bg';
import Link from 'next/link';

interface HomeTitleNavProps {
	position: string;
	href: string;
	label: string;
	isHovered: boolean;
	isOtherHovered: boolean;
	isDisabled?: boolean;
	onMouseEnter?: () => void;
	onMouseLeave?: () => void;
}

type Ref = HTMLDivElement;

const HomeTitleNav = forwardRef<Ref, HomeTitleNavProps>(({ position, href, label, onMouseEnter, onMouseLeave, isHovered, isOtherHovered, isDisabled }, ref) => {
	const spanMargin = position === 'left'
		? 'ml-10'
		: position === 'right'
			? 'mr-10'
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

	return (
		<div ref={ref} className={`htn${isDisabled ? ' is-disabled' : ''} ${position === 'left' ? 'left-0 -translate-y-1/2' : 'right-0'} -translate-y-1/2`} style={{ opacity: isOtherHovered ? '0' : '1' }}>
			<Link href={href}>
				<div className={`htn-ctrl ${spanMargin}`} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} style={{ flexDirection: position === 'left' ? 'row' : 'row-reverse' }}>
					<span className='htn-btn'>
						<span className='htn-btn-svg'>{position === 'left' ? <MdArrowLeft /> : <MdArrowRight />}</span>
					</span>
					<span className={`htn-btn-label ${spanPadding}`}>{label}</span>
				</div>
			</Link>
			<HomeTitleNavBg position={position} />
		</div>
	);
});

export default HomeTitleNav;