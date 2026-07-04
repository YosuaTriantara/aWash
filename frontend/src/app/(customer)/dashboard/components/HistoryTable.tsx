import Table from "@/components/ui/table";
import TableHead from "@/components/ui/tableHead";
import TableRow from "@/components/ui/tableRow";
import TableCell from "@/components/ui/tableCell";
import StatusBadge from "@/components/ui/badge";
import ServiceBadge from "@/components/ui/service-badge";
import ReviewBadge from "@/components/ui/review-badge";

const histories = [
  {
    id: "12344",
    tanggal: "08 Mei 2024",
    layanan: "Cuci Kering",
    total: "Rp 60.000",
    status: "DIPROSES",
    reviewed: false,
  },
  {
    id: "12344",
    tanggal: "08 Mei 2024",
    layanan: "Cuci Kering",
    total: "Rp 60.000",
    status: "SELESAI",
    reviewed: true,
  },
  {
    id: "12344",
    tanggal: "08 Mei 2024",
    layanan: "Cuci Kering",
    total: "Rp 60.000",
    status: "SELESAI",
    reviewed: false,
  },
];

interface HistoryTableProps {
  orders: any[];
}

export default function HistoryTable({
  orders,
}: HistoryTableProps) {
  console.log(orders);
  return (
    <Table
      title="Riwayat Pesanan Terakhir"
      action={
        <button className="text-sm font-semibold text-blue-600 hover:underline">
          Lihat Semua
        </button>
      }
    >
      <TableHead>
        <TableRow hover={false}>
          <TableCell header>ID Pesanan</TableCell>
          <TableCell header>Tanggal</TableCell>
          <TableCell header>Jenis Layanan</TableCell>
          <TableCell header>Total</TableCell>
          <TableCell header>Status</TableCell>
          <TableCell header>Review</TableCell>
        </TableRow>
      </TableHead>

      <tbody>
        {histories.map((item, index) => (
          <TableRow key={index}>
            <TableCell>
              <span className="font-semibold text-slate-800">
                #{item.id}
              </span>
            </TableCell>

            <TableCell>{item.tanggal}</TableCell>

            <TableCell>
              <ServiceBadge service={item.layanan} />
            </TableCell>

            <TableCell>
              <span className="font-semibold text-slate-800">
                {item.total}
              </span>
            </TableCell>

            <TableCell>
              <StatusBadge status={item.status} />
            </TableCell>

            <TableCell>
              <ReviewBadge reviewed={item.reviewed} />
            </TableCell>
          </TableRow>
        ))}
      </tbody>
    </Table>
  );
}