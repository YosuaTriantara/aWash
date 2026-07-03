import { ReactNode } from 'react';

interface TableRowProps {
  children: ReactNode;
}

export default function TableRow({ children }: TableRowProps) {
  return (
    <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
      {children}
    </tr>
  );
}