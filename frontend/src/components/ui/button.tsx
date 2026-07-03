import { ButtonHTMLAttributes, ReactNode } from 'react';
import clsx from 'clsx';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'success';
  fullWidth?: boolean;
}

export default function Button({
  children,
  variant = 'primary',
  fullWidth = false,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx(
        'rounded-xl px-5 py-2.5 font-medium text-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed',

        {
          'bg-blue-600 text-white hover:bg-blue-700': variant === 'primary',

          'bg-gray-200 text-gray-700 hover:bg-gray-300':
            variant === 'secondary',

          'border border-gray-300 text-gray-700 hover:bg-gray-100':
            variant === 'outline',

          'bg-red-600 text-white hover:bg-red-700':
            variant === 'danger',

          'bg-green-600 text-white hover:bg-green-700':
            variant === 'success',
        },

        fullWidth && 'w-full',

        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}