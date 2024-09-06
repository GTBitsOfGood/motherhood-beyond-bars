/**
 * This component is here to show how to make components with TypeScript
 */
interface Props {
	text: string;
}

export default function SampleComponent({ text }: Props) {
	return <div className='p-6 shadow-2xl bg-white rounded-lg w-44'>{text}</div>;
}
