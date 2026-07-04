import { ReactNode } from "react";
import clsx from "clsx";

interface TableRowProps {
  children: ReactNode;
  hover?: boolean;
}

export default function TableRow({
  children,
  hover = true,
}: TableRowProps) {
  return (
    <tr
      className={clsx(
        "border-b border-gray-100 last:border-b-0",
        hover && "transition-colors hover:bg-slate-50"
      )}
    >
      {children}
    </tr>
  );
}