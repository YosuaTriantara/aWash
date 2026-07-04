import Card from "@/components/ui/card";
import { Package } from "lucide-react";

interface Props {
  title: string;
  value: string;
}

function StatCard({ title, value }: Props) {
  return (
    <Card className="p-6">
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center">
          <Package className="text-blue-600" />
        </div>

        <div>
          <p className="text-gray-500 text-sm">
            {title}
          </p>

          <h2 className="text-4xl font-bold mt-1">
            {value}
          </h2>
        </div>
      </div>
    </Card>
  );
}

interface StatsCardsProps {
    orders: any[];
  }

  export default function StatsCards({
    orders,
  }: StatsCardsProps) {

    console.log(orders);

  return (
    <div className="grid grid-cols-3 gap-6">
      <StatCard
        title="Total Pesanan"
        value="12"
      />

      <StatCard
        title="Laundry Aktif"
        value="3"
      />

      <StatCard
        title="Total Pengeluaran"
        value="Rp500.000"
      />
    </div>
  );
}