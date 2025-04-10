// packages
import React, { forwardRef } from 'react';
// css
import './styles.css';

interface NavDotBgProps {
	position: string;
}

type Ref = HTMLDivElement;

const NavDotBg = forwardRef<Ref, NavDotBgProps>(({ position }, ref) => {

	return (
		<div className={`sai-rbg sai-home-nav__dot ${position === 'left' ? 'sai-home-nav__dot--left' : 'sai-home-nav__dot--right'}`} />
	);
});

export default NavDotBg;