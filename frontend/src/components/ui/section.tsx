import { ReactNode } from "react";

interface SectionProps {
  number: number;
  title: string;
  description?: string;
  children?: ReactNode;
}

export default function Section({
  number,
  title,
  description,
  children,
}: SectionProps) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

      <div className="mb-6 flex items-start gap-4">

        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-sm font-semibold text-white">
          {number}
        </div>

        <div>
          <h2 className="text-xl font-bold text-slate-800">
            {title}
          </h2>

          {description && (
            <p className="mt-1 text-sm text-slate-500">
              {description}
            </p>
          )}
        </div>

      </div>

      {children}

    </div>
  );
}