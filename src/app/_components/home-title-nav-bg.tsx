// packages
import React, { forwardRef } from 'react';

interface HomeTitleNavBgProps {
	position: string;
}

type Ref = HTMLDivElement;

const HomeTitleNavBg = forwardRef<Ref, HomeTitleNavBgProps>(({ position }, ref) => {

	return (
		<div className={`htn-bg rbg ${position === 'left' ? 'left-0 -translate-1/2' : 'right-0 translate-x-1/2 -translate-y-1/2'}`} />
	);
});

export default HomeTitleNavBg;