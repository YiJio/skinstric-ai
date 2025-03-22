'use client';

// packages
import React, { forwardRef, useEffect, useRef, useState } from 'react';

interface IntroInputProps {
	label: string;
	field: string;
	hint?: string;
	placeholder?: string;
	onChange: (e: any) => void;
	onSubmit: () => void;
}

type Ref = HTMLInputElement;

const IntroInput = forwardRef<Ref, IntroInputProps>(({ label, field, hint, placeholder, onChange, onSubmit }, ref) => {
	// states
	const [isTyping, setIsTyping] = useState(false);
	// refs
	const layerRef = useRef<HTMLDivElement>(null);
	const inputRef = useRef<HTMLInputElement>(null);

	const handleChange = (e: any) => {
		onChange && onChange(e.target.value);
	}

	const handleSubmit = (e: any) => {
		e.preventDefault();
		onSubmit && onSubmit();
	}

	return (
		<div ref={layerRef} className='sai-layer__content flex flex-col gap-1 max-w-[30vw]'>
			<span className='uppercase opacity-40 text-center text-sm'>
				{!isTyping
					? field !== '' ? hint : 'Click to type'
					: field !== '' ? hint : hint
				}
			</span>
			<form onSubmit={handleSubmit}>
				<input ref={inputRef} type='text' id={label} name={label} className={`input tracking-tighter w-full${(field === '' && !isTyping) ? ' is-hidden ' : ''}`} value={field} placeholder={placeholder} onChange={handleChange} onFocus={() => setIsTyping(true)} onBlur={() => setIsTyping(false)} />
				<label htmlFor={label} className={`${field !== '' ? 'is-hidden ' : ''}absolute -top-1 left-0 w-full h-full cursor-text text-center tracking-tighter`}>{hint}</label>
			</form>
		</div>
	);
});

export default IntroInput;