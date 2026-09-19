import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  className = "",
  ...props
}) => {
  const baseStyle = "px-4 py-2 rounded-lg font-medium transition text-sm";
  const variantStyle =
    variant === "secondary"
      ? "bg-gray-100 hover:bg-gray-200 text-gray-700"
      : "bg-blue-600 hover:bg-blue-700 text-white";

  return (
    <button className={`${baseStyle} ${variantStyle} ${className}`} {...props}>
      {children}
    </button>
  );
};
