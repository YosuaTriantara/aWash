import Card from "@/components/ui/card";
import Link from "next/link";
import {
  ChevronRight,
  Shirt,
  Package,
} from "lucide-react";

const services = [
  {
    id: 1,
    name: "Cuci Kiloan",
    description: "Layanan cuci pakaian harian",
    icon: Package,
  },
  {
    id: 2,
    name: "Dry Clean",
    description: "Perawatan pakaian khusus",
    icon: Shirt,
  },
];

export default function QuickService() {
  return (
    <Card className="p-4">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-bold text-slate-800">
          Layanan Cepat
        </h2>

        <Link
          href="/pesanan/baru"
          className="text-xs font-medium text-blue-600 hover:underline"
        >
          Lihat Semua
        </Link>
      </div>

      <div className="space-y-3">
        {services.map((service) => {
          const Icon = service.icon;

          return (
            <Link
              key={service.id}
              href="/pesanan/baru"
              className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-3 transition-all hover:border-blue-300 hover:bg-blue-50/30"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50">
                  <Icon className="h-5 w-5 text-orange-500" />
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-slate-800">
                    {service.name}
                  </h3>

                  <p className="mt-0.5 text-xs text-slate-400">
                    {service.description}
                  </p>
                </div>
              </div>

              <ChevronRight className="h-4 w-4 text-slate-300" />
            </Link>
          );
        })}
      </div>
    </Card>
  );
}