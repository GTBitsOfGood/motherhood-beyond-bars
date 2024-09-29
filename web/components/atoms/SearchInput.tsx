import React from "react";
import "react-dropdown/style.css";
import ErrorText from "./ErrorText";
import Select from "react-select";

interface Option {
  label: string;
  value: any;
}

interface Props {
  options: Option[];
  label: string;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  onChange?: (selectedOption: Option | null) => void;
}

const SearchableDropdown: React.FC<Props> = ({
  options,
  label,
  placeholder,
  error,
  disabled,
  onChange,
}) => {
  const handleChange = (selectedOption: Option | null) => {
    if (onChange) {
      onChange(selectedOption);
    }
  };

  return (
    <div className="flex flex-col">
      <label className="mb-2">{label}</label>
      
      <Select
        options={options}
        placeholder={placeholder}
        isDisabled={disabled}
        unstyled
        maxMenuHeight={200}
        className="bg-[#FAFBFC] border-[#D9D9D9] border-2 rounded focus:outline-0"
        classNames={{
          control: () => 
            `flex items-center justify-between w-full py-2.5 px-2 rounded ${
              disabled ? "bg-light-gray" : "bg-secondary-background"
            } text-primary-text ${error ? "border-[#FF3939]" : "border-light-gray"}`,
          menu: () => "rounded bg-white border border-gray-300 shadow-md mt-[-1px] absolute top-full w-full z-50",
          option: () => "box-border text-gray-800 cursor-pointer block p-1.5 px-2.5 hover:bg-[#1f61c8] hover:text-white",
        }}
        onChange={handleChange}
      />
      
      {error && <ErrorText error={error} />}
    </div>
  );
};

export default SearchableDropdown;

