'use client';

// packages
import React, { forwardRef, useState } from 'react';
// utils
import { UtilHelpers } from '@/utils/util-helpers';
// types
import { DemographicsSection } from '../demographics/utils';
// components
import CircularProgressBar from '@/components/circular-progress-bar';
import AnalysisStatsValue from './analysis-stats-value';

interface AnalysisStatsProps {
	stats: DemographicsSection;
	category: string;
	activeItem: number;
	setActiveItem: (index: number) => void;
}

type Ref = HTMLInputElement;

const AnalysisStats = forwardRef<Ref, AnalysisStatsProps>(({ category, stats, activeItem, setActiveItem }, ref) => {
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
				{stats?.items?.map((stat, index) => (<AnalysisStatsValue key={index} label={stat.label} score={stat.value} isActive={activeItem === index} setActiveItem={() => setActiveItem(index)} />))}
			</div>
		</div>
	);
});

export default AnalysisStats;