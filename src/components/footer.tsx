// packages
import React, { forwardRef, ReactNode } from 'react';

interface FooterProps {
	left?: ReactNode;
	center?: ReactNode;
	right?: ReactNode;
}

type Ref = HTMLElement;

const Footer = forwardRef<Ref, FooterProps>(({ left, center, right }, ref) => {

	return (
		<footer className='sai-footer'>
			<div className='sai-footer__wrapper'>
				{left && left}
				{center && center}
				{right && right}
			</div>
		</footer>
	);
});

export default Footer;