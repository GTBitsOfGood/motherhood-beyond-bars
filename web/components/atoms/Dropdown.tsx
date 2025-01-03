import ReactDropdown, { Option, Group } from "react-dropdown";
import "react-dropdown/style.css";
import ErrorText from "./ErrorText";
import keyboardScroll from "@lib/utils/keyboardScroll";
import { useRef } from "react";
import SmallDownChevron from "@components/Icons/SmallDownChevron";

interface Props {
  options: (string | Option | Group)[];
  label: string;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  value?: string | Option;
  onChange?: (value: Option) => void;
  required?: boolean;
}

export default function Dropdown({
  options,
  disabled,
  label,
  onChange,
  value,
  error,
  placeholder = "Select",
  required = false,
}: Props) {
  return (
    <div className="flex flex-col w-full" onFocus={(e) => keyboardScroll(e)}>
      <label>
        {label}
        {required && <span className="text-asterisks-red text-sm">*</span>}
      </label>
      <ReactDropdown
        options={options}
        value={value}
        disabled={disabled}
        onChange={onChange}
        placeholder={placeholder}
        placeholderClassName={`!text-medium-gray`}
        controlClassName={`!flex !items-center !justify-between !w-full !mt-2 !py-2.5 !px-2 !rounded ${disabled ? "!bg-light-gray" : "!bg-secondary-background"} !text-primary-text ${error ? "!border-[#FF3939]" : "!border-light-gray"}`}
        menuClassName={`!rounded !py-2 !bg-white !text-primary-text`}
        arrowClosed={<SmallDownChevron />}
        arrowOpen={<SmallDownChevron />}
      />
      <ErrorText error={error} />
    </div>
  );
}
