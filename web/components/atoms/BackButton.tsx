import { MouseEventHandler } from "react";

interface Props {
	onClick?: MouseEventHandler<HTMLButtonElement>;
	disabled?: boolean;
}

export default function BackButton({ onClick, disabled }: Props) {
	return (
		<button
			className='group flex items-center gap-[2px] text-medium-gray'
			onClick={onClick}
			disabled={disabled}
		>
			<svg
				xmlns='http://www.w3.org/2000/svg'
				width='24'
				height='24'
				viewBox='0 0 24 24'
				fill='none'
			>
				<path
					d='M15 18L9 12L15 6'
					className={`${disabled ? 'stroke-dark-gray' : 'group-hover:stroke-dark-gray'}`}
					stroke-width='3'
					stroke-linecap='square'
					stroke-linejoin='round'
				/>
			</svg>
			<div
				className={`${disabled ? 'text-stroke-dark-gray' : 'group-hover:text-stroke-dark-gray'}`}
			>
				Back
			</div>
		</button>
	);
}
