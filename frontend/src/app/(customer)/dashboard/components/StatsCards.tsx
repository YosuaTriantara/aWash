import Card from "@/components/ui/card";

interface StatCardProps {
  title: string;
  value: string;
}

function StatCard({ title, value }: StatCardProps) {
  return (
    <Card className="p-6">
      <p className="text-sm text-gray-500">{title}</p>

      <h2 className="text-2xl font-bold mt-2">
        {value}
      </h2>
    </Card>
  );
}

export default function StatsCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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