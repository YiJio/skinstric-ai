'use client';

// packages
import React, { forwardRef, useEffect, useRef, useState } from 'react';

import { Libraries, useLoadScript } from '@react-google-maps/api';
//import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';

interface IntroInputLocationProps {
	label: string;
	field: string;
	hint?: string;
	placeholder?: string;
	onChange: (e: any) => void;
	onSubmit: (place: string) => void;
}

type Ref = HTMLInputElement;

const libraries: Libraries = ['places'];

const IntroInputLocation = forwardRef<Ref, IntroInputLocationProps>(({ label, field, hint, placeholder, onChange, onSubmit }, ref) => {
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

	const handleChange2 = (place: string) => {
		//if (mode === 1) { setValue(e.target.value); }
		onChange && onChange(place);
	}

	const handleSubmit = (e: any) => {
		e.preventDefault();
		onSubmit && onSubmit(place);
	}

	const handleSelect = async (place: any) => {
		//setValue(place, false);
		onChange && onChange(place.description);
		//clearSuggestions();
		//const results = await getGeocode({ address: place.description });
		//const { lat, lng } = await getLatLng(results[0]);
		//console.log(results, lat, lng)

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

	if(!isLoaded) return <div>Loading...</div>;

	return (
		<div ref={layerRef} className='sai-layer__content flex flex-col gap-1 max-w-[30vw]'>
			<span className='uppercase opacity-40 text-center text-sm'>
				{!isTyping
					? field !== '' ? hint : 'Click to type'
					: field !== '' ? hint : hint
				}
			</span>
			<form onSubmit={handleSubmit}>
				<input ref={inputRef} type='text' id={label} name={label} className={`input tracking-tighter w-full${(field === '' && !isTyping) ? ' is-hidden ' : ''}`} value={field} placeholder={placeholder} onChange={(e) => handleChange(e, 1)} onFocus={() => setIsTyping(true)} onBlur={() => setIsTyping(false)} />
				<label htmlFor={label} className={`${field !== '' ? 'is-hidden ' : ''}absolute -top-1 left-0 w-full h-full cursor-text text-center tracking-tighter`}>{hint}</label>
				<div className='auto-list'>
					<div className='auto-list-wrapper'>
						{/*status === 'OK' && data.map((place) => (
							<div key={place.place_id} className='auto-list-item' onClick={() => handleSelect(place)}>{place.description}</div>
						))*/}
					</div>
				</div>
			</form>
		</div>
	);
});

export default IntroInputLocation;