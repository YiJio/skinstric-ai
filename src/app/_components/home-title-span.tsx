// packages
import React, { forwardRef } from 'react';

interface HomeTitleSpanProps {
	text: string;
}

type Ref = HTMLSpanElement;

const HomeTitleSpan = forwardRef<Ref, HomeTitleSpanProps>(({ text }, ref) => {

	return (
		<span ref={ref} className='inline-block will-change-transform duration-700 ease-in-out'>{text}</span>
	);
});

export default HomeTitleSpan;