'use client';

// packages
import React, { forwardRef, useEffect, useRef, useState } from 'react';
import { Libraries, useLoadScript } from '@react-google-maps/api';
// css
import './styles.css';

interface InputLocationProps {
	label: string;
	field?: string;
	hint?: string;
	placeholder?: string;
	onChange?: (e: any) => void;
	onSubmit: () => void;
}

type Ref = HTMLInputElement;

const libraries: Libraries = ['places'];

const InputLocation = forwardRef<Ref, InputLocationProps>(({ label, field, hint, placeholder, onChange, onSubmit }, ref) => {
	// states
	const [isTyping, setIsTyping] = useState(false);
	const [place, setPlace] = useState('');
	// refs
	const layerRef = useRef<HTMLDivElement>(null);
	const inputRef = useRef<HTMLInputElement>(null);
	// hooks
	//const { ready, value, setValue, suggestions: { status, data }, clearSuggestions } = usePlacesAutocomplete();

	const { isLoaded, loadError } = useLoadScript({
		googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY!,
		libraries
	});

	const handleChange = (e: any, mode: number) => {
		//if (mode === 1) { setValue(e.target.value); }
		setPlace(e.target.value);
		onChange && onChange(e.target.value);
	}

	const handleSubmit = (e: any) => {
		onChange && onSubmit();
	}

	useEffect(() => {
		if (isLoaded && inputRef.current) {
			const autocomplete = new google.maps.places.Autocomplete(inputRef.current, {
				types: ['(regions)'],
				//componentRestrictions: { country: 'us' },
			});
			autocomplete.addListener('place_changed', () => {
				const place = autocomplete.getPlace();
				onChange && onChange(place.name);
				console.log('Selected place:', place);
			});
		}
	}, [isLoaded]);

	if (!isLoaded) return <div className='sai-layer__content'>
		<form>
			<label>{hint}</label>
		</form>
	</div>;

	return (
		<div ref={layerRef} className='sai-layer__content sai-form__section'>
			<span className='sai-form__help'>
				{!isTyping
					? field !== '' ? hint : 'Click to type'
					: field !== '' ? hint : hint
				}
			</span>
			<form onSubmit={handleSubmit}>
				<input ref={inputRef} type='text' id={label} name={label} className={`sai-input${(field === '' && !isTyping) ? ' is-hidden ' : ''}`} value={field} placeholder={placeholder} onChange={(e) => handleChange(e, 1)} onFocus={() => setIsTyping(true)} onBlur={() => setIsTyping(false)} />
				<label htmlFor={label} className={`sai-label${field !== '' ? ' is-hidden ' : ''}`}>{hint}</label>
				<div className='auto-list'>
					<div className='auto-list-wrapper' />
				</div>
			</form>
		</div>
	);
});

export default InputLocation;