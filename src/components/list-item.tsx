// packages
import React, { forwardRef } from 'react';

interface ListItemProps {
	description: string;
	more?: string;
}

type Ref = HTMLLIElement;

const ListItem = forwardRef<Ref, ListItemProps>(({ description, more }, ref) => {

	return (
		<li ref={ref}>
			<img src='/icons/radio-idle.svg' />
			<div>
				<span>{description}</span>
				{more && <small>{more}</small>}
			</div>
		</li>
	);
});

export default ListItem;