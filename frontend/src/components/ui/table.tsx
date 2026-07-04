import { ReactNode } from "react";
import clsx from "clsx";

interface TableProps {
  children: ReactNode;
  className?: string;
  title?: string;
  subtitle?: string;
  action?: ReactNode;
}

export default function Table({
  children,
  className,
  title,
  subtitle,
  action,
}: TableProps) {
  return (
    <div
      className={clsx(
        "overflow-hidden rounded-2xl border border-gray-200 bg-white",
        className
      )}
    >
      {(title || subtitle || action) && (
        <div className="flex items-start justify-between px-8 py-6">
          <div>
            {title && (
              <h2 className="text-2xl font-bold text-slate-800">
                {title}
              </h2>
            )}

            {subtitle && (
              <p className="mt-1 text-sm text-slate-500">
                {subtitle}
              </p>
            )}
          </div>

          {action}
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          {children}
        </table>
      </div>
    </div>
  );
}