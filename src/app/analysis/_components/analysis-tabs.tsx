'use client';

// packages
import React, { forwardRef, ReactNode, useEffect, useRef, useState } from 'react';
// hooks
// components

interface AnalysisTabsProps {
	values?: string[];
	tabs?: string[];
	category: number;
	onChangeTab: (index: number) => void;
}

type Ref = HTMLInputElement;

const AnalysisTabs = forwardRef<Ref, AnalysisTabsProps>(({ values, tabs, category, onChangeTab }, ref) => {
	// refs

	const handleChangeTab = (index: number) => {
		onChangeTab && onChangeTab(index);
	}

	return (
		<div className='sai-tabs'>
			{tabs?.map((tab, index) => (<div key={index} className={`sai-tabs__tab${category === index ? ' isActive' : ''}`} onClick={() => handleChangeTab(index)}>
				<strong>{values?.[index] ? values[index] : ''}</strong>
				<strong>{tab}</strong>
			</div>))}
		</div>
	);
});

export default AnalysisTabs;