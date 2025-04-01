'use client';

// packages
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
// components
import { default as LoadingSkeleton } from '@/components/loading';

export default function Loading() {

	return (
		<>
			<LoadingSkeleton content={'Setting up camera...'} />
			<div className='absolute'>
				<p>To get better results make sure to have</p>
				<ul>
					<li>Neutral expression</li>
					<li>Frontal pose</li>
					<li>Adequate lighting</li>
				</ul>
			</div>
		</>
	);
}
