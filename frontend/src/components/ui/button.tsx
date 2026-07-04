import { ButtonHTMLAttributes, ReactNode } from "react";
import clsx from "clsx";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline" | "danger" | "success";
  fullWidth?: boolean;
}

export default function Button({
  children,
  variant = "primary",
  fullWidth = false,
  className,
  ...props
}: ButtonProps) {
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-200 text-gray-700 hover:bg-gray-300",
    outline: "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50",
    danger: "bg-red-600 text-white hover:bg-red-700",
    success: "bg-green-600 text-white hover:bg-green-700",
  };

  return (
    <button
      className={clsx(
        "inline-flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-medium transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-50",
        variants[variant],
        fullWidth && "w-full",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}