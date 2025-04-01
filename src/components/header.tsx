// packages
import React, { forwardRef } from 'react';
import Link from 'next/link';

interface HeaderProps {
	title?: string;
}

type Ref = HTMLElement;

const Header = forwardRef<Ref, HeaderProps>(({ title = 'Intro' }, ref) => {

	return (
		<header className='flex items-center justify-between fixed left-0 top-0 w-full h-[64px] z-3 pl-[32px] pr-[32px]'>
			<div className='flex items-center gap-[16px] uppercase font-semibold text-[11px] leading-[1.6] tracking-tight'>
				<Link href='/'>Skinstric</Link>
				<div className='flex gap-[6px] opacity-60'>
					<div className='w-[4px] h-[16px] rounded-s-[2px] border-1 border-r-0' />
					<span>{title}</span>
					<div className='w-[4px] h-[16px] rounded-e-[2px] border-1 border-l-0' />
				</div>
			</div>
			<div className='flex items-center'>
				<button className='bg-[var(--button-background)] hover:bg-[var(--button-background-hover)] text-[var(--button-foreground)] w-[92px] h-8 py-2 px-4 text-[10px] uppercase font-semibold tracking-tight cursor-pointer'>Enter Code</button>
			</div>
		</header>
	);
});

export default Header;