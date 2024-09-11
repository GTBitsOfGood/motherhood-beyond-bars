import ReactDropdown, { Option, Group, ReactDropdownProps } from 'react-dropdown';
import 'react-dropdown/style.css';

interface Props {
	options: (string | Option | Group)[];
	label: string;
	placeholder?: string;
	error?: string;
	disabled?: boolean;
	value?: string | Option;
	onChange?: (value: Option) => void;
}

const arrow = (
	<svg xmlns='http://www.w3.org/2000/svg' width='17' height='17' viewBox='0 0 17 17' fill='none'>
		<path
			fill-rule='evenodd'
			clip-rule='evenodd'
			d='M13.0384 6.71967C13.3313 7.01256 13.3313 7.48744 13.0384 7.78033L8.78838 12.0303C8.49549 12.3232 8.02061 12.3232 7.72772 12.0303L3.47772 7.78033C3.18483 7.48744 3.18483 7.01256 3.47772 6.71967C3.77061 6.42678 4.24549 6.42678 4.53838 6.71967L8.25805 10.4393L11.9778 6.71967C12.2707 6.42678 12.7455 6.42678 13.0384 6.71967Z'
			className='fill-dark-gray'
		/>
	</svg>
);

export default function Dropdown({
	options,
	disabled,
	label,
	onChange,
	value,
	error,
	placeholder = 'Select',
}: Props) {
	return (
		<div className='flex-col gap-[8px]'>
			<label>{label}</label>
			<ReactDropdown
				options={options}
				value={value}
				disabled={disabled}
				onChange={onChange}
				placeholder={placeholder}
				placeholderClassName={`text-medium-gray`}
				controlClassName={`!flex !items-center !justify-between !p-[8px] ${disabled ? '!bg-light-gray' : '!bg-secondary-background'} !text-black ${error ? '!border-[#FF3939]' : '!border-light-gray'} !rounded-[4px]`}
				menuClassName={`!rounded-[4px] !py-[8px] !bg-white !text-black`}
				arrowClosed={arrow}
				arrowOpen={arrow}
			/>
			{error && (
				<div className='flex items-center gap-[8px] text-[#FF3939]'>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						width='16'
						height='16'
						viewBox='0 0 16 16'
						fill='none'
					>
						<path
							d='M14.1782 13.9994H1.8229C1.58473 13.9994 1.36465 13.8723 1.24556 13.6661C1.12648 13.4598 1.12648 13.2057 1.24557 12.9994L7.4229 2.33273C7.54208 2.1268 7.76197 2 7.9999 2C8.23783 2 8.45772 2.1268 8.5769 2.33273L14.7542 12.9994C14.8733 13.2056 14.8733 13.4595 14.7544 13.6658C14.6355 13.872 14.4156 13.9991 14.1776 13.9994H14.1782ZM7.33423 10.6661V11.9994H7.95623H7.99957H8.0429H8.66623V10.6661H7.33423ZM7.33423 5.99939V9.33273H8.66757V5.99939H7.33423Z'
							className='fill-[#FF3939]'
						/>
					</svg>
					<span>{error}</span>
				</div>
			)}
		</div>
	);
}
