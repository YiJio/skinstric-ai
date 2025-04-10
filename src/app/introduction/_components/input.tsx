'use client';

// packages
import React, { forwardRef, useEffect, useRef, useState } from 'react';

interface InputProps {
	label: string;
	field?: string;
	hint?: string;
	placeholder?: string;
	onChange?: (e: any) => void;
	onSubmit: () => void;
}

type Ref = HTMLInputElement;

const WIDTH = 420;

const Input = forwardRef<Ref, InputProps>(({ label, field, hint, placeholder, onChange, onSubmit }, ref) => {
	// states
	const [width, setWidth] = useState(0);
	const [isTyping, setIsTyping] = useState(false);
	// refs
	const layerRef = useRef<HTMLDivElement>(null);
	const inputRef = useRef<HTMLInputElement>(null);

	const handleChange = (e: any) => {
		const newValue = e.target.value.replace(/[^a-zA-Z]/g, '');
		onChange && onChange(newValue);
	}

	const handleSubmit = (e: any) => {
		e.preventDefault();
		onSubmit && onSubmit();
	}

	useEffect(() => {
		const handleResize = () => {
			const isMobile = window.innerWidth <= 460;
			if(isMobile) setWidth(window.innerWidth - 64);
			else { setWidth(WIDTH); }
		}
		handleResize();
		window.addEventListener('resize', handleResize);
		return () => { window.removeEventListener('resize', handleResize); }
	}, []);

	useEffect(() => {
		const animateLayer = async () => {
			const { gsap } = await import('gsap');
			if (layerRef.current) {
				const elements = layerRef.current.querySelectorAll('.sai-layer__element');
				elements.forEach((element) => {
					gsap.to(element, {
						opacity: 1,
						width: width,
						duration: 1,
						ease: 'power2.out'
					});
				});
			}
		}
		const animateLayerOut = async () => {
			const { gsap } = await import('gsap');
			if (layerRef.current) {
				const elements = layerRef.current.querySelectorAll('.sai-layer__element');
				elements.forEach((element) => {
					gsap.to(element, {
						opacity: 0,
						width: 0,
						duration: 1,
						ease: 'power2.in'
					});
				});
			}
		}
		animateLayer();
		return () => { animateLayerOut(); }
	}, [width]);

	return (
		<div ref={layerRef} className='sai-layer__content sai-form__section'>
			<span className='sai-layer__element sai-form__help'>
				{!isTyping
					? field !== '' ? hint : 'Click to type'
					: field !== '' ? hint : hint
				}
			</span>
			<form className='sai-layer__element' onSubmit={handleSubmit}>
				<input ref={inputRef} type='text' id={label} name={label} className={`sai-input${(field === '' && !isTyping) ? ' is-hidden ' : ''}`} value={field} placeholder={placeholder} onChange={handleChange} onFocus={() => setIsTyping(true)} onBlur={() => setIsTyping(false)} />
				<label htmlFor={label} className={`sai-label${field !== '' ? ' is-hidden ' : ''}`}>{hint}</label>
			</form>
		</div>
	);
});

export default Input;