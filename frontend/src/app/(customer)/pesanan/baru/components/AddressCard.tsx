'use client';

import { Info, MapPin, Phone } from 'lucide-react';

interface AddressCardProps {
  alamat: string;
  telepon: string;
}

export default function AddressCard({
  alamat,
  telepon,
}: AddressCardProps) {
  return (
    <div>

      {/* Card Alamat */}

      <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6">

        <div className="flex items-start gap-4">

          <div className="rounded-xl bg-blue-50 p-3">
            <MapPin
              size={22}
              className="text-blue-600"
            />
          </div>

          <div className="flex-1">

            <h3 className="font-semibold text-slate-800">
              Alamat Penjemputan
            </h3>

            <p className="mt-2 whitespace-pre-line text-slate-500">
              {alamat}
            </p>

            <div className="mt-4 flex items-center gap-2 text-slate-600">
              <Phone size={16} />
              <span>{telepon}</span>
            </div>

          </div>

        </div>

      </div>

      {/* Alert */}

      <div className="mt-4 flex items-center gap-2 rounded-xl bg-blue-50 px-4 py-3">

        <Info
          size={16}
          className="flex-shrink: 0 text-blue-600"
        />

        <p className="text-sm text-blue-600">
          Ingin mengganti alamat? Anda dapat mengubahnya di halaman profil.
        </p>

      </div>

    </div>
  );
}