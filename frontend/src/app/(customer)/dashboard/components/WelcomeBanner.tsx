import Card from "@/components/ui/card";
import Button from "@/components/ui/button";

export default function WelcomeBanner() {
  return (
    <Card className="bg-[#1565D8] text-white border-0 p-8">
      <div className="flex items-center justify-between">
        <div className="max-w-lg">
          <h1 className="text-3xl font-bold mb-3">
            Selamat Datang 👋
          </h1>

          <p className="text-blue-100 mb-6">
            Kelola laundry Anda dengan mudah. Pantau status pesanan,
            lakukan pemesanan baru, dan lihat riwayat transaksi di satu tempat.
          </p>

          <Button>
            Buat Pesanan
          </Button>
        </div>

        <div className="hidden lg:flex items-center justify-center w-52 h-52 rounded-full bg-white/10">
          👕
        </div>
      </div>
    </Card>
  );
}