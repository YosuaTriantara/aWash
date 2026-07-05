'use client';

import Button from "@/components/ui/button";

interface ReviewModalProps {
  open: boolean;
  onClose: () => void;
}

export default function ReviewModal({
  open,
  onClose,
}: ReviewModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">

        <h2 className="text-xl font-semibold text-slate-800">
          Berikan Review
        </h2>

        <p className="mt-2 text-sm text-slate-500">
          Bagikan pengalaman Anda menggunakan layanan aWash.
        </p>

        <div className="mt-6">
          <label className="mb-2 block text-sm font-medium">
            Rating
          </label>

          <div className="flex gap-2 text-3xl">
            ⭐ ⭐ ⭐ ⭐ ⭐
          </div>
        </div>

        <div className="mt-6">
          <label className="mb-2 block text-sm font-medium">
            Ulasan
          </label>

          <textarea
            rows={4}
            placeholder="Tulis ulasan Anda..."
            className="w-full rounded-xl border border-gray-200 p-3 outline-none focus:border-blue-600"
          />
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <Button
            variant="secondary"
            onClick={onClose}
          >
            Batal
          </Button>

          <Button>
            Kirim Review
          </Button>
        </div>

      </div>
    </div>
  );
}