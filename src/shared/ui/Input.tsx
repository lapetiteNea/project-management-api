import React, { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  touched?: boolean;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  touched,
  className = "",
  value,
  name,
  onChange,
  onBlur,
  ...props
}) => {
  const hasError = Boolean(error && (touched === undefined || touched));

  return (
    <div className="flex flex-col gap-1 w-full">
      {label && (
        <label className="text-sm font-medium text-gray-700">{label}</label>
      )}
      <input
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className={`px-3 py-2 border rounded-md outline-none transition-colors ${
          hasError
            ? "border-red-500 focus:border-red-500"
            : "border-gray-300 focus:border-blue-500"
        } ${className}`}
        {...props}
      />
      {hasError && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
};

export default Input;
