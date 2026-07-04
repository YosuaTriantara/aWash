"use client";

import Card from "@/components/ui/card";
import { Phone } from "lucide-react";

interface CourierInfoProps {
  orders: any[];
}

export default function CourierInfo({
  orders,
}: CourierInfoProps) {
  console.log(orders);
  return (
    <Card className="p-4">
      <h2 className="mb-4 text-xl font-bold text-slate-800">
        Informasi Kurir
      </h2>

      {/* Kurir */}
      <div className="mb-5 flex items-center gap-3">
        <div className="h-12 w-12 rounded-full bg-gray-200" />

        <div>
          <h3 className="text-base font-semibold text-slate-800">
            Made Wijaya
          </h3>

          <div className="mt-1 flex items-center gap-2 text-blue-600">
            <Phone className="h-4 w-4" />

            <span className="text-sm">
              08912345678
            </span>
          </div>
        </div>
      </div>

      {/* Estimasi */}
      <div className="rounded-xl bg-slate-50 p-4">
        <p className="text-sm text-slate-400">
          Estimasi Datang
        </p>

        <h2 className="mt-1 text-2xl font-bold text-green-600">
          15:30 - 16:00
        </h2>
      </div>
    </Card>
  );
}