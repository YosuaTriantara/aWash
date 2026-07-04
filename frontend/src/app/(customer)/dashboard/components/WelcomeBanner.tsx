"use client";

import Card from "@/components/ui/card";
import Button from "@/components/ui/button";
import { Truck } from "lucide-react";
import { useAuthStore } from "@/store/auth.store"; // sesuaikan path
export default function WelcomeBanner() {
  const { user } = useAuthStore();

  return (
    <Card className="relative overflow-hidden rounded-3xl border-0 !bg-[#1565D8]">
      <div className="relative flex min-h-[220px] items-center justify-between px-10 py-10">
        <div className="max-w-2xl">
          <h1 className="text-5xl font-bold text-white">
            Selamat Datang, {user?.nama ?? "Customer"}!
          </h1>

          <p className="mt-5 max-w-xl text-lg leading-8 text-blue-100">
            Pakaian Anda sedang kami tangani. Nikmati kesegaran kain seperti baru
            setiap saat bersama <span className="font-semibold">aWash.</span>
          </p>

          <Button
            className="mt-8 !bg-white !text-[#1565D8] hover:!bg-gray-100"
          >
            <Truck size={18} />
            Mulai Pesanan
          </Button>
        </div>

        {/* Watermark */}
        <div className="absolute -right-8 -bottom-12 select-none opacity-10">
          <span className="text-[260px] font-black text-white">a</span>
        </div>
      </div>
    </Card>
  );
}