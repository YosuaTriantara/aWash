'use client';

import { useEffect, useRef, useState } from 'react';
import { Check, ChevronDown } from 'lucide-react';
import clsx from 'clsx';

interface Option {
  label: string;
  value: string;
}

interface SelectProps {
  label?: string;
  value: string;
  options: Option[];
  placeholder?: string;
  onChange: (value: string) => void;
}

export default function Select({
  label,
  value,
  options,
  placeholder = 'Pilih',
  onChange,
}: SelectProps) {
  const [open, setOpen] = useState(false);

  const ref = useRef<HTMLDivElement>(null);

  const selected = options.find(
    (option) => option.value === value
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        ref.current &&
        !ref.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () =>
      document.removeEventListener(
        'mousedown',
        handleClickOutside
      );
  }, []);

  return (
    <div
      ref={ref}
      className="relative w-full"
    >
      {label && (
        <p className="mb-2 text-sm font-semibold text-slate-700">
          {label}
        </p>
      )}

      {/* Trigger */}

      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={clsx(
          'flex h-14 w-full items-center justify-between rounded-xl border bg-white px-4 transition',
          open
            ? 'border-blue-600'
            : 'border-gray-200 hover:border-blue-400'
        )}
      >
        <span className="text-slate-700">
          {selected?.label ?? placeholder}
        </span>

        <ChevronDown
          size={18}
          className={clsx(
            'transition',
            open && 'rotate-180'
          )}
        />
      </button>

      {/* Dropdown */}

        {open && (
        <div
            className="
            absolute
            left-0
            top-[calc(100%+8px)]
            z-[9999]
            w-full
            overflow-hidden
            rounded-xl
            border
            border-gray-200
            bg-white
            shadow-xl
            "
        >
            {options.length === 0 ? (
            <div className="px-4 py-3 text-sm text-gray-400">
                Tidak ada slot tersedia
            </div>
            ) : (
            options.map((option) => {
                const active = option.value === value;

                return (
                <button
                    key={option.value}
                    type="button"
                    onClick={() => {
                    onChange(option.value);
                    setOpen(false);
                    }}
                    className={clsx(
                    "flex w-full items-center justify-between px-4 py-3 text-left transition-colors",
                    active
                        ? "bg-blue-50 text-blue-700"
                        : "hover:bg-gray-50"
                    )}
                >
                    <span>{option.label}</span>

                    {active && (
                    <Check
                        size={18}
                        className="text-blue-600"
                    />
                    )}
                </button>
                );
            })
            )}
        </div>
        )}
    </div>
  );
}