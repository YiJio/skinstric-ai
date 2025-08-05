// packages
import React, { ReactNode } from 'react';
import type { Metadata } from 'next';
import { Toaster } from 'react-hot-toast';

interface IntroductionLayoutProps {
	children: ReactNode;
}

export const metadata: Metadata = {
  title: 'Skinstric | Introduction',
  description: 'Skinstric uses A.I. algorithms to find the best ingredients for your skin profile and formulates a routine just for you.',
};

const IntroductionLayout = ({ children }: IntroductionLayoutProps) => {
	
	return (
		<>
			<Toaster position='bottom-right' />
			{children}
		</>
	);
}

export default IntroductionLayout;