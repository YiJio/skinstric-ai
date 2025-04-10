// packages
import React, { ReactNode } from 'react';
import type { Metadata } from 'next';

interface CameraLayoutProps {
	children: ReactNode;
}

export const metadata: Metadata = {
  title: 'Skinstric | Camera',
  description: 'Skinstric uses A.I. algorithms to find the best ingredients for your skin profile and formulates a routine just for you.',
};

const CameraLayout = ({ children }: CameraLayoutProps) => {
	
	return (
		<>
			{children}
		</>
	);
}

export default CameraLayout;