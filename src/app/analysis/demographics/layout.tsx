// packages
import React, { ReactNode } from 'react';
import type { Metadata } from 'next';

interface DemographicsLayoutProps {
	children: ReactNode;
}

export const metadata: Metadata = {
  title: 'Skinstric | Demographics',
  description: 'Skinstric uses A.I. algorithms to find the best ingredients for your skin profile and formulates a routine just for you.',
};

const DemographicsLayout = ({ children }: DemographicsLayoutProps) => {
	
	return (
		<>
			{children}
		</>
	);
}

export default DemographicsLayout;