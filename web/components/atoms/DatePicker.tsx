import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ErrorText from "./ErrorText";
import keyboardScroll from "@lib/utils/keyboardScroll";

interface Props {
  label: string;
  value?: Date;
  onChange?: (newDate: Date | null) => void;
  disabled?: boolean;
  error?: string;
  required?: boolean;
}

export default function DatePicker({
  label,
  value,
  onChange,
  disabled,
  error,
  required = false,
}: Props) {
  return (
    <div className="flex flex-col w-full">
      <label htmlFor={label}>
        {label}
        {required && <span className="text-asterisks-red text-sm">*</span>}
      </label>
      <ReactDatePicker
        name={label}
        onFocus={(e) => keyboardScroll(e)}
        selected={value}
        onChange={onChange}
        disabled={disabled}
        className={`w-full py-2 px-2 items-center border-2 rounded ${disabled ? "bg-light-gray" : "bg-secondary-background"} ${error ? "border-error-red" : "border-light-gray"}`}
      />
      <ErrorText error={error} />
    </div>
  );
}
