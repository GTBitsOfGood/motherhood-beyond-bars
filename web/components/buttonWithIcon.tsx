import React from 'react';

function ButtonWithIcon({
	icon,
	text,
	onClick,
}: {
	icon: React.ReactNode;
	text: string;
	onClick?: () => void;
}) {
	return (
		<button
			className='z-40 text-indigo-600 bg-white border-2 border-indigo-600 p-2 rounded flex'
			onClick={onClick}
		>
			<span className='mt-1 mr-2'>{icon}</span>
			<span>{text}</span>
		</button>
	);
}

export default ButtonWithIcon;
