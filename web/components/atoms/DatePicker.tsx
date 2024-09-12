import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ErrorText from "./ErrorText";
import keyboardScroll from "@lib/utils/KeyboardScroll";

interface Props {
  label: string;
  value?: Date;
  onChange?: (newDate: Date | null) => void;
  disabled?: boolean;
  error?: string;
}

export default function DatePicker({
  label,
  value,
  onChange,
  disabled,
  error,
}: Props) {
  return (
    <div className="flex flex-col">
      <label htmlFor={label}>{label}</label>
      <ReactDatePicker
        name={label}
        onFocus={(e) => keyboardScroll(e)}
        selected={value}
        onChange={onChange}
        disabled={disabled}
        className={`w-full mt-2 py-2.5 px-2 items-center border-[1px] rounded ${disabled ? "bg-light-gray" : "bg-secondary-background"} ${error ? "border-[#FF3939]" : "border-light-gray"}`}
      />
      <ErrorText error={error} />
    </div>
  );
}
