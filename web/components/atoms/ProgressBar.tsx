interface Props {
	color?: string;
	/** A number between 0 and 100 indicating the progress percentage */
	progress: number;
}

export default function ProgressBar({
	color,
	progress
}: Props) {
	return (
		<div className="h-[6px] relative rounded-full">
			<div style={{ backgroundColor: color, width: `${progress}%` }} className="rounded-full absolute top-0 left-0 bottom-0 transition-all" />
		</div>
	)
}
