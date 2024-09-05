import { MouseEventHandler } from "react";

interface Props {
	onClick?: MouseEventHandler<HTMLButtonElement>;
	disabled?: boolean;
}

export default function BackButton({ onClick, disabled }: Props) {
	return (
		<button className="group flex items-center gap-[2px] text-[#8C8C8C]" onClick={onClick} disabled={disabled}>
			<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
				<path d="M15 18L9 12L15 6" className={`${disabled ? 'stroke-gray-500' : "group-hover:stroke-gray-500"}`} stroke="#8C8C8C" stroke-width="3" stroke-linecap="square" stroke-linejoin="round"/>
			</svg>
			<div className={`${disabled ? 'text-gray-500' :'group-hover:text-gray-500'}`}>Back</div>
		</button>
	);
}
