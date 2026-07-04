import Card from '@/components/ui/card';
import { Order } from '@/types/order';

interface OrderInfoProps {
  order?: Order;
}

export default function OrderInfo({ order }: OrderInfoProps) {
if (!order) return null;
    
  return (
    <Card className="p-6">

      <h2 className="text-lg font-semibold mb-6">
        Informasi Pesanan
      </h2>

      <div className="grid grid-cols-2 gap-6">

        <div>
          <p className="text-sm text-gray-500">ID Pesanan</p>
            <p className="font-medium">
                {order.id_pemesanan}
            </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Tanggal Pesanan</p>
          <p className="font-medium">
            {new Date(order.tanggal_pesan).toLocaleDateString('id-ID')}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Tanggal Pesan</p>
          <p className="font-medium">
            {new Date(order.tanggal_pesan).toLocaleDateString('id-ID')}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Customer</p>
          <p className="font-medium">
            {new Date(order.tanggal_pesan).toLocaleDateString('id-ID')}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Layanan</p>
          <p className="font-medium">
            {order.detail_pemesanan
                .map((item) => item.nama_layanan)
                .join(', ')}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Durasi</p>
          <p className="font-medium">
            {order.detail_pemesanan
                .map(
                (item) =>
                    `${item.estimasi_durasi} ${item.satuan_durasi}`
                )
                .join(', ')}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Jumlah</p>
          <p className="font-medium">
            {order.detail_pemesanan
                .map((item) => item.kuantitas)
                .join(', ')}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Satuan</p>
          <p className="font-medium">
            {order.detail_pemesanan
                .map((item) => item.satuan)
                .join(', ')}
          </p>
        </div>

      </div>

    </Card>
  );
}