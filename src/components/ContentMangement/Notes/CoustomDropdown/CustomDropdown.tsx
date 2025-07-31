import React, { useState, useEffect, useRef } from "react";
import { RiArrowDownSLine } from "react-icons/ri";

interface CustomDropdownProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
  width?: string;
  className?: string;
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({
  options,
  value,
  onChange,
  label,
  className,
  placeholder = "Select an option",
  width = "w-full",
}) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isTailwindWidth = width.startsWith("w-");

  // 🔸 Detect clicks outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      ref={dropdownRef}
      className={`relative inline-block text-sm text-[#7D7D7D] ${
        isTailwindWidth ? width : ""
      } ${className || ""}`}
      style={!isTailwindWidth ? { width } : undefined}
    >
      {label && (
        <label className="block mb-1 text-gray-700 font-medium bg-[#1BBFCA] px-2 py-1 rounded">
          {label}
        </label>
      )}

      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="w-full text-left bg-white border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-100"
      >
        {value || placeholder}
        <span className="float-right">
          <RiArrowDownSLine size={24} />
        </span>
      </button>

      {open && (
        <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-xl shadow-md max-h-60 overflow-y-auto">
          {options.map((option) => (
            <div
              key={option}
              onClick={() => {
                onChange(option);
                setOpen(false);
              }}
              className={`border border-gray-300 rounded-md mx-2 my-2 px-4 py-3 cursor-pointer hover:bg-[#1BBFCA] hover:text-white transition ${
                value === option ? "bg-[#1BBFCA] text-white font-semibold" : ""
              }`}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;
