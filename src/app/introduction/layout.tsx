// packages
import React, { ReactNode } from 'react';

interface IntroductionLayoutProps {
	children: ReactNode;
}

const IntroductionLayout = ({ children }: IntroductionLayoutProps) => {
	
	return (
		<>
			{children}
		</>
	);
}

export default IntroductionLayout;