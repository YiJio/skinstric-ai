'use client';

// packages
import React, { forwardRef } from 'react';
import Link from 'next/link';
// components
import NavButton from '@/components/nav-button';
import HomeTitleNavBg from './home-title-nav-bg';

interface HomeTitleNavProps {
	position: string;
	href: string;
	label: string;
	isOtherHovered: boolean;
	isDisabled?: boolean;
}

type Ref = HTMLDivElement;

const HomeTitleNav = forwardRef<Ref, HomeTitleNavProps>(({ position, href, label, isOtherHovered, isDisabled }, ref) => {

	return (
		<div ref={ref} className={`htn${isDisabled ? ' is-disabled' : ''} ${position === 'left' ? 'left-0 -translate-y-1/2' : 'right-0'} -translate-y-1/2`} style={{ opacity: isOtherHovered ? '0' : '1' }}>
			<Link href={href}>
				<NavButton position={position} label={label} />
			</Link>
			<HomeTitleNavBg position={position} />
		</div>
	);
});

export default HomeTitleNav;