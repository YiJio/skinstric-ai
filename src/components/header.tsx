// packages
import React, { forwardRef } from 'react';
import Link from 'next/link';

interface HeaderProps {
	title?: string;
	inverted?: boolean;
}

type Ref = HTMLElement;

const Header = forwardRef<Ref, HeaderProps>(({ title = 'Intro', inverted = false }, ref) => {

	return (
		<header className='sai-header'>
			<div className={`sai-header__wrapper${inverted ? ' h-inverted' : ''}`}>
				<Link href='/'>Skinstric</Link>
				<div className='sai-header__title'>
					<div className='sai-header__bracket sai-header__bracket--l' />
					<span>{title}</span>
					<div className='sai-header__bracket sai-header__bracket--r' />
				</div>
			</div>
			<div className='h-flex h-ac'>
				<button className='sai-button sai-button--primary sai-button--black'>Enter Code</button>
			</div>
		</header>
	);
});

export default Header;