import clsx from "clsx";

interface ReviewBadgeProps {
  reviewed: boolean;
}

export default function ReviewBadge({
  reviewed,
}: ReviewBadgeProps) {
  return (
    <button
      className={clsx(
        "inline-flex min-w-[150px] justify-center rounded-xl px-4 py-2 text-sm font-semibold transition",
        reviewed
          ? "bg-green-50 text-green-600 hover:bg-green-100"
          : "bg-blue-100 text-blue-700 hover:bg-blue-200"
      )}
    >
      {reviewed ? "Lihat Review" : "Berikan Review"}
    </button>
  );
}