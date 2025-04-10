// packages
import React, { forwardRef } from 'react';

interface HeadingProps {
	text: string;
}

type Ref = HTMLSpanElement;

const Heading = forwardRef<Ref, HeadingProps>(({ text }, ref) => {

	return (
		<span ref={ref} className='sai-home__heading'>{text}</span>
	);
});

export default Heading;