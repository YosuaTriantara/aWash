import { ReactNode } from "react";

interface TableHeadProps {
  children: ReactNode;
}

export default function TableHead({
  children,
}: TableHeadProps) {
  return (
    <thead className="border-b border-gray-100 bg-white">
      {children}
    </thead>
  );
}