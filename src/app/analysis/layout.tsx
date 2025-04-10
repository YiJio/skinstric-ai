// packages
import React, { ReactNode } from 'react';
import type { Metadata } from 'next';

interface AnalysisLayoutProps {
	children: ReactNode;
}

export const metadata: Metadata = {
  title: 'Skinstric | Analysis',
  description: 'Skinstric uses A.I. algorithms to find the best ingredients for your skin profile and formulates a routine just for you.',
};

const AnalysisLayout = ({ children }: AnalysisLayoutProps) => {
	
	return (
		<>
			{children}
		</>
	);
}

export default AnalysisLayout;