'use client';

// packages
import React, { forwardRef, ReactNode, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
// types
import { DemographicsSection } from '../demographics/utils';
// components
import AnalysisStatsValue from './analysis-stats-value';

interface AnalysisStatsProps {
	stats: DemographicsSection;
	activeTab: number;
}

type Ref = HTMLInputElement;

const AnalysisStats = forwardRef<Ref, AnalysisStatsProps>(({ activeTab, stats }, ref) => {
	// hooks	
	const router = useRouter();
	// refs
	const layerRef = useRef<HTMLDivElement>(null);

	return (
		<div className='sai-stats'>
			<div className='sai-stats__score'></div>
			<div className='sai-stats__list'>
				<div className='sai-stats__item'>
					<span>{activeTab}</span>
					<span>A. I. confidence</span>
				</div>
				{stats.items.map((stat, index) => (<AnalysisStatsValue key={index} label={stat.label} score={stat.value} />))}
			</div>
		</div>
	);
});

export default AnalysisStats;