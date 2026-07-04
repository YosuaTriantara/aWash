interface ServiceBadgeProps {
  service: string;
}

export default function ServiceBadge({
  service,
}: ServiceBadgeProps) {
  return (
    <span className="inline-flex items-center rounded-full bg-blue-100 px-4 py-1.5 text-xs font-medium text-slate-600">
      {service}
    </span>
  );
}