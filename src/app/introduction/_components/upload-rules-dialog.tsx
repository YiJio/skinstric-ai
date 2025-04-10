// packages
import React from 'react';
// components
import ListItem from '@/components/list-item';

const UploadRulesDialogHeader = () => {
	return (<>Please ensure your selfie has:</>);
}

const UploadRulesDialogContent = () => {
	return (
		<ul>
			<ListItem description='Neutral expression' more='smiling may distort wrinkles' />
			<ListItem description='Frontal pose' more={`take the image from an arm's length away at eye level`} />
			<ListItem description='Adequate lighting' more='avoid harsh downlighting and aim for natural or soft light' />
		</ul>
	);
}

export { UploadRulesDialogHeader, UploadRulesDialogContent };