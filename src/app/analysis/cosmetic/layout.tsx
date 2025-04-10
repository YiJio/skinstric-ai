// packages
import React, { ReactNode } from 'react';
import type { Metadata } from 'next';

interface CosmeticLayoutProps {
	children: ReactNode;
}

export const metadata: Metadata = {
  title: 'Skinstric | Cosmetic concerns',
  description: 'Skinstric uses A.I. algorithms to find the best ingredients for your skin profile and formulates a routine just for you.',
};

const CosmeticLayout = ({ children }: CosmeticLayoutProps) => {
	
	return (
		<>
			{children}
		</>
	);
}

export default CosmeticLayout;