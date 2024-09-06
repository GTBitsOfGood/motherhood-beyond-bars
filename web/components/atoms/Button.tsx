import React from 'react';

interface Props {
	text: string;
	type?: 'primary' | 'secondary';
	onClick?: () => any;
	submit?: boolean;
	icon?: React.ReactNode;
	disabled?: boolean;
}

export default function Button({
	text,
	type = 'primary',
	onClick,
	submit = false,
	icon = undefined,
	disabled = false,
}: Props) {
	return (
		<button
			className={`
        flex bg-background justify-center items-center w-full px-4 pt-2 pb-[9px]
        ${type == 'primary' ? ' border border-mbb-pink rounded ' : null}
      `}
			onClick={onClick}
			disabled={disabled}
			type={submit ? 'submit' : 'button'}
		>
			{icon ? <span className='mt-1 mr-2'>{icon}</span> : null}
			<span className='text-base font-semibold text-mbb-pink'>{text}</span>
		</button>
	);
}
