// packages
import React, { ReactNode } from 'react';
import type { Metadata } from 'next';

interface WeatherLayoutProps {
	children: ReactNode;
}

export const metadata: Metadata = {
  title: 'Skinstric | Introduction',
  description: 'Skinstric uses A.I. algorithms to find the best ingredients for your skin profile and formulates a routine just for you.',
};

const WeatherLayout = ({ children }: WeatherLayoutProps) => {
	
	return (
		<>
			{children}
		</>
	);
}

export default WeatherLayout;