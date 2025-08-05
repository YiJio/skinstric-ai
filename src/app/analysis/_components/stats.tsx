'use client';

// packages
import React, { forwardRef } from 'react';
// utils
import { UtilHelpers } from '@/utils/util-helpers';
// types
import { DemographicsSection } from '../demographics/utils';
// components
import { CircularProgressBar } from '@/components';
import StatsValue from './stats-value';

interface StatsProps {
	stats: DemographicsSection;
	category: string;
	activeItem: number;
	setActiveItem: (index: number) => void;
}

type Ref = HTMLInputElement;

const Stats = forwardRef<Ref, StatsProps>(({ category, stats, activeItem, setActiveItem }, ref) => {
	// states
	
	if(!stats) { return <>Loading...</>; }

	return (
		<div className='sai-stats'>
			<div className='sai-stats__score'>
				<h2 className='sai-stats__label'>{UtilHelpers.titleCase(stats?.items[activeItem]?.label)}{category === 'Age' ? ' y.o.' : ''}</h2>
				<CircularProgressBar percentage={Math.round(stats?.items[activeItem]?.value * 100)} />
			</div>
			<div className='sai-stats__list'>
				<div className='sai-stats__item'>
					<span>{category}</span>
					<span>A. I. confidence</span>
				</div>
				{stats?.items?.map((stat, index) => (<StatsValue key={index} label={stat.label} score={stat.value} isActive={activeItem === index} setActiveItem={() => setActiveItem(index)} />))}
			</div>
		</div>
	);
});

export default Stats;