import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

const Modal = ({
	show,
	content,
}: {
	show: boolean;
	content: React.ReactNode;
}) => {
	const [isBrowser, setIsBrowser] = useState(false);

	useEffect(() => {
		if (typeof window !== 'undefined') {
			setIsBrowser(true);
		}
	}, []);

	const modalContent = show ? content : null;

	if (!isBrowser) {
		return null;
	} else {
		return createPortal(modalContent, document.getElementById('modals')!);
	}
};

export default Modal;
