// packages
import React, { ReactNode } from 'react';
import type { Metadata } from 'next';

interface SkinLayoutProps {
	children: ReactNode;
}

export const metadata: Metadata = {
  title: 'Skinstric | Skin type',
  description: 'Skinstric uses A.I. algorithms to find the best ingredients for your skin profile and formulates a routine just for you.',
};

const SkinLayout = ({ children }: SkinLayoutProps) => {
	
	return (
		<>
			{children}
		</>
	);
}

export default SkinLayout;