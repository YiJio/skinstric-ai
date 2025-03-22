'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Libraries, useLoadScript } from '@react-google-maps/api';
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY;

const libraries: Libraries = ['places'];
const Autocomplete: React.FC = () => {
	const [selected, setSelected] = useState(null);
	const inputRef = useRef<HTMLInputElement>(null);
	const { isLoaded, loadError } = useLoadScript({
		googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY!,
		libraries
	});

	if(!isLoaded) return <div>Loading...</div>;
	//const [place, setPlace] = useState<google.maps.places.PlaceResult | null>(null);
	//const [apiLoaded, setApiLoaded] = useState(false);
	// refs

	/*const loader = new Loader({
		apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
		libraries: ['places']
	});

	loader.load().then(() => {
		const autocomplete = new google.maps.places.Autocomplete(inputRef.current, {
			types: ['(regions)'],
		});
	}).catch(e => console.log(e))*/
	
	/*useEffect(() => {
    const loadPlacesLibrary = () => {
      // Check if API is already loaded to prevent multiple loads
      if (apiLoaded) return;

      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&libraries=places&callback=initAutocomplete`; // Add callback
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);

      // Callback function to initialize after API loads
      const initMap = () => {
        setApiLoaded(true);
        const autocomplete = new google.maps.places.Autocomplete(inputRef.current, {
          types: ['(regions)'],
          componentRestrictions: { country: 'us' },
        });

        autocomplete.addListener('place_changed', () => {
          const place = autocomplete.getPlace();
          setPlace(place);
          console.log('Selected place:', place);
        });
      };
			initMap();
    };

    loadPlacesLibrary();
  }, [apiLoaded]);*/

	return (
    <div>
			{/*<InputAuto setSelected={setSelected} />*/}
      {/*<input type="text" ref={inputRef} placeholder="Enter a location..." />
      {place && (
        <div>
          <h2>Selected Place:</h2>
          <p>Name: {place.name}</p>
          <p>Address Components: {JSON.stringify(place.address_components)}</p>
          {/* Access other place details as needed 
        </div>
      )*/}
    </div>
  );

}

const InputAuto = ({ setSelected }) => {
	const { ready, value, setValue, suggestions: { status, data }, clearSuggestions } = usePlacesAutocomplete();

	return (
		<div className='auto'>
			<input type='text' value={value} onChange={(e) => setValue(e.target.value)} disabled={!ready} placeholder='Search' />
			<div className='auto-list'>
				<div className='auto-list-wrapper'>
					{status === 'OK' && data.map((place) => (
						<div key={place.place_id} className='auto-list-item'>{place.description}</div>
					))}
				</div>
			</div>
		</div>
	);
}

export default Autocomplete;