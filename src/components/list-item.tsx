// packages
import React, { forwardRef } from 'react';

interface ListItemProps {
	description: string;
	more?: string;
	inverse?: boolean;
}

type Ref = HTMLLIElement;

const ListItem = forwardRef<Ref, ListItemProps>(({ description, more, inverse }, ref) => {

	return (
		<li ref={ref}>
			<img className='h-inverted' src='/icons/radio-idle.svg' />
			<div>
				<span>{description}</span>
				{more && <small>{more}</small>}
			</div>
		</li>
	);
});

export default ListItem;