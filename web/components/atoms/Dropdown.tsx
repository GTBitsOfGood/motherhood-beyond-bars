import ReactDropdown, {
  Option,
  Group,
  ReactDropdownProps,
} from "react-dropdown";
import "react-dropdown/style.css";
import ErrorText from "./ErrorText";

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
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="17"
    height="17"
    viewBox="0 0 17 17"
    fill="none"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M13.0384 6.71967C13.3313 7.01256 13.3313 7.48744 13.0384 7.78033L8.78838 12.0303C8.49549 12.3232 8.02061 12.3232 7.72772 12.0303L3.47772 7.78033C3.18483 7.48744 3.18483 7.01256 3.47772 6.71967C3.77061 6.42678 4.24549 6.42678 4.53838 6.71967L8.25805 10.4393L11.9778 6.71967C12.2707 6.42678 12.7455 6.42678 13.0384 6.71967Z"
      className="fill-dark-gray"
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
  placeholder = "Select",
}: Props) {
  return (
    <div className="flex flex-col">
      <label>{label}</label>
      <ReactDropdown
        options={options}
        value={value}
        disabled={disabled}
        onChange={onChange}
        placeholder={placeholder}
        placeholderClassName={`!text-medium-gray`}
        controlClassName={`!flex !items-center !justify-between !w-full !mt-2 !py-2.5 !px-2 !rounded ${disabled ? "!bg-light-gray" : "!bg-secondary-background"} !text-black ${error ? "!border-[#FF3939]" : "!border-light-gray"}`}
        menuClassName={`!rounded !py-2 !bg-white !text-black`}
        arrowClosed={arrow}
        arrowOpen={arrow}
      />
      {error && <ErrorText error={error} />}
    </div>
  );
}
