'use client';

// packages
import React, { useEffect, useRef, useState } from 'react';
// types
import { DialogProps } from '@/components/dialog';

export const useDialog = () => {
	// states
	const [showDialog, setShowDialog] = useState(false);
	const [dialogContent, setDialogContent] = useState<DialogProps | null>(null);
	// refs
	const dialogRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if(!dialogRef.current) return;
		//console.log('dialog',dialogRef.current)
		const portal = document.getElementById('root-portal');
		//console.log('porta;',portal)
		if(!portal) return;
		portal.appendChild(dialogRef.current);
		return () => {
			if(portal && dialogRef.current) portal.removeChild(dialogRef.current);
		}
	}, []);

	const openDialog = (props: DialogProps) => {
		setDialogContent(props);
		setShowDialog(true);
	}

	const closeDialog = () => {
		setShowDialog(false);
		setDialogContent(null);
	}

	return { showDialog, openDialog, closeDialog, dialogContent, dialogRef };
}