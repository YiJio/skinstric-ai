'use client';

// packages
import React, { forwardRef } from 'react';
import Link from 'next/link';
// components
import NavButton from '@/components/nav-button';
import NavDotBg from './nav-dot-bg';

interface NavProps {
	position: string;
	href: string;
	label: string;
	isOtherHovered: boolean;
	isDisabled?: boolean;
}

type Ref = HTMLDivElement;

const Nav = forwardRef<Ref, NavProps>(({ position, href, label, isOtherHovered, isDisabled }, ref) => {

	return (
		<div ref={ref} className={`sai-home-nav ${position === 'left' ? 'sai-home-nav--left' : 'sai-home-nav--right'}${isDisabled ? ' is-disabled' : ''}`} style={{ opacity: isOtherHovered ? '0' : position === 'left' ? '0.5' : '1' }}>
			<Link className='sai-home-nav__anchor' href={href}>
				<NavButton position={position} label={label} />
			</Link>
			<NavDotBg position={position} />
		</div>
	);
});

export default Nav;