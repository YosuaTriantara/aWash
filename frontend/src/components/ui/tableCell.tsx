import { ReactNode } from "react";
import clsx from "clsx";

interface TableCellProps {
  children: ReactNode;
  header?: boolean;
  className?: string;
}

export default function TableCell({
  children,
  header = false,
  className,
}: TableCellProps) {
  if (header) {
    return (
      <th
        className={clsx(
          "px-6 py-4 text-left text-sm font-semibold text-slate-400",
          className
        )}
      >
        {children}
      </th>
    );
  }

  return (
    <td
      className={clsx(
        "px-6 py-5 text-sm text-slate-700",
        className
      )}
    >
      {children}
    </td>
  );
}