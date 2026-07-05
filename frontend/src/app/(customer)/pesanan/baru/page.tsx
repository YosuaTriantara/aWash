'use client';

import { useEffect, useState } from 'react';

import { getOutlets } from '@/services/outlet.service';
import { getServices } from '@/services/layanan.service';
import { getSlots } from '@/services/slot.service';
import { getProfile } from '@/services/profile.service';
import { createOrder } from "@/services/order.service";
import { useRouter } from "next/navigation";

import Section from '@/components/ui/section';
import Select from '@/components/ui/select';
import ServiceCard from '@/components/ui/serviceCard';
import QuantityCard from '@/components/ui/QuantityCard';
import Button from "@/components/ui/button";
import AddressCard from './components/AddressCard';
import DeliveryMethodCard from "./components/DeliveryMethodCard";
import SummaryCard from "./components/SummaryCard";
import {
  Truck,
  Store,
} from "lucide-react";

export default function NewOrderPage() {
    const router = useRouter();
    const [outlets, setOutlets] = useState<any[]>([]);
    const [services, setServices] = useState<any[]>([]);

    const [selectedOutlet, setSelectedOutlet] = useState('');
    const [selectedService, setSelectedService] = useState('');
    const [quantity, setQuantity] = useState(1);
    const selectedServiceData = services.find(
    (service) => service.id_layanan === selectedService
    );
    const [profile, setProfile] = useState<any>(null);
    const [note, setNote] = useState("");
    const [metodeAntar, setMetodeAntar] = useState<
        "DIANTAR_SENDIRI" | "DIANTAR_KURIR"
    >("DIANTAR_KURIR");
    const [metodeJemput, setMetodeJemput] = useState<
        "DIAMBIL_SENDIRI" | "DIJEMPUT_KURIR"
    >("DIAMBIL_SENDIRI");

    // Penjemputan
    const [pickupSlots, setPickupSlots] = useState<any[]>([]);
    const [pickupDate, setPickupDate] = useState("");
    const [selectedPickupSlot, setSelectedPickupSlot] = useState("");

    // Pengantaran
    const [deliverySlots, setDeliverySlots] = useState<any[]>([]);
    const [returnDate, setReturnDate] = useState("");
    const [selectedDeliverySlot, setSelectedDeliverySlot] = useState("");

// Dynamic section numbering
let sectionNumber = 1;        

useEffect(() => {
  const fetchMasterData = async () => {
    try {
      const [outletData, serviceData] = await Promise.all([
        getOutlets(),
        getServices(),
      ]);

      setOutlets(outletData);
      setServices(serviceData);

      if (outletData.length > 0) {
        setSelectedOutlet(outletData[0].id_outlet);
      }
    } catch (error) {
      console.error(error);
    }
  };

  fetchMasterData();
}, []);

useEffect(() => {
  if (!selectedOutlet) return;

  const fetchSlots = async () => {
    try {
      const [pickupData, deliveryData] = await Promise.all([
        getSlots(selectedOutlet, "DIJEMPUT"),
        getSlots(selectedOutlet, "DIANTAR"),
      ]);

      setPickupSlots(pickupData);
      setDeliverySlots(deliveryData);
    } catch (err) {
      console.error(err);
    }
  };

  fetchSlots();
}, [selectedOutlet]);

useEffect(() => {
  const fetchProfile = async () => {
    try {
      const data = await getProfile();
      setProfile(data);
    } catch (err) {
      console.error(err);
    }
  };

  fetchProfile();
}, []);

const DAYS = [
  "MINGGU",
  "SENIN",
  "SELASA",
  "RABU",
  "KAMIS",
  "JUMAT",
  "SABTU",
];

// =========================
// Penjemputan
// =========================

const selectedPickupDay = pickupDate
  ? DAYS[new Date(pickupDate).getDay()]
  : "";

const availablePickupSlots = pickupSlots.filter(
  (slot) => slot.hari === selectedPickupDay
);

// =========================
// Pengantaran
// =========================

const selectedReturnDay = returnDate
  ? DAYS[new Date(returnDate).getDay()]
  : "";

const availableDeliverySlots = deliverySlots.filter(
  (slot) => slot.hari === selectedReturnDay
);

const DELIVERY_FEE = 10000;

const showAddress =
  metodeAntar === "DIANTAR_KURIR" ||
  metodeJemput === "DIJEMPUT_KURIR";

const selectedOutletData = outlets.find(
  (outlet) => outlet.id_outlet === selectedOutlet
);

const subtotal =
  Number(selectedServiceData?.harga ?? 0) * quantity;

const deliveryFee =
  (metodeAntar === "DIANTAR_KURIR" ? DELIVERY_FEE : 0) +
  (metodeJemput === "DIJEMPUT_KURIR" ? DELIVERY_FEE : 0);

const total = subtotal + deliveryFee;

const handleCreateOrder = async () => {

    if (!selectedOutlet) {
        alert("Silakan pilih outlet.");
        return;
    }

    if (!selectedService) {
        alert("Silakan pilih layanan.");
        return;
    }

    if (quantity <= 0) {
        alert("Jumlah laundry tidak valid.");
        return;
    }

    if (metodeAntar === "DIANTAR_KURIR") {
        if (!pickupDate) {
            alert("Silakan pilih tanggal penjemputan.");
            return;
        }

        if (!selectedPickupSlot) {
            alert("Silakan pilih jam penjemputan.");
            return;
        }
    }

    if (metodeJemput === "DIJEMPUT_KURIR") {
        if (!returnDate) {
            alert("Silakan pilih tanggal pengantaran.");
            return;
        }

        if (!selectedDeliverySlot) {
            alert("Silakan pilih jam pengantaran.");
            return;
        }
    }

  try {
    const payload = {
      id_outlet: selectedOutlet,

      metode_antar: metodeAntar,
      metode_jemput: metodeJemput,

      tanggal_jemput_request:
        metodeAntar === "DIANTAR_KURIR"
          ? new Date(pickupDate).toISOString()
          : null,

      tanggal_antar_request:
        metodeJemput === "DIJEMPUT_KURIR"
          ? new Date(returnDate).toISOString()
          : null,

      id_slot_jemput:
        metodeAntar === "DIANTAR_KURIR"
          ? selectedPickupSlot
          : null,

      id_slot_antar:
        metodeJemput === "DIJEMPUT_KURIR"
          ? selectedDeliverySlot
          : null,

      catatan: note || null,

      items: [
        {
          id_layanan: selectedService,
          kuantitas: quantity,
        },
      ],
    };

    console.log("Payload yang dikirim:", payload);

    await createOrder(payload);

    alert("Pesanan berhasil dibuat.");

    router.push("/riwayat");

  } 
  
    catch (error: any) {
        console.error(error);

        console.log("Response Backend:", error.response?.data);

        alert(
            error.response?.data?.message || "Gagal membuat pesanan."
        );
    }
};
  
  return (
    <div className="space-y-8">

      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-slate-800">
          Buat Pesanan Baru
        </h1>

        <p className="mt-2 text-slate-500">
          Pilih layanan laundry dan lengkapi informasi pemesanan.
        </p>
      </div>

      {/* Outlet */}
      <Section
        number={sectionNumber++}
        title="Pilih Outlet"
        description="Pilih outlet yang akan menangani pesanan laundry Anda."
        >
        <Select
        value={selectedOutlet}
        onChange={setSelectedOutlet}
        options={outlets.map((outlet) => ({
            label: outlet.nama_outlet,
            value: outlet.id_outlet,
        }))}
        />
        </Section>

      {/* Section 2 */}
      <Section
        number={sectionNumber++}
        title="Pilih Layanan dan Durasi"
        description="Pilih jenis layanan dan durasi laundry yang Anda butuhkan."
      >
        <p className="text-gray-500">
          Total layanan tersedia: {services.length}
        </p>

        <div className="grid grid-cols-3 gap-5">

        {services.map((service) => (

            <ServiceCard
            key={service.id_layanan}
            title={service.nama_layanan}
            category={service.kategori_layanan}
            duration={`${service.estimasi_durasi} ${service.satuan_durasi}`}
            price={`Rp ${Number(service.harga).toLocaleString('id-ID')}`}
            selected={selectedService === service.id_layanan}
            onClick={() => setSelectedService(service.id_layanan)}
            />

        ))}

        </div>

        {selectedServiceData && (
        <QuantityCard
            unit={selectedServiceData.satuan}
            quantity={quantity}
            price={Number(selectedServiceData.harga)}
            onIncrease={() => setQuantity(quantity + 1)}
            onDecrease={() => setQuantity(Math.max(1, quantity - 1))}
        />
        )}
      </Section>

      {/* Section 3 */}
      <Section
        number={sectionNumber++}
        title="Pilih Bagaimana Laundry Akan Sampai ke Outlet"
        >

        <div className="grid grid-cols-2 gap-6">

            <DeliveryMethodCard
            title="Dijemput Kurir"
            description="Kurir akan menjemput laundry ke alamat Anda."
            icon={<Truck className="text-blue-600" />}
            selected={metodeAntar === "DIANTAR_KURIR"}
            onClick={() => setMetodeAntar("DIANTAR_KURIR")}
            />

            <DeliveryMethodCard
            title="Antar Sendiri"
            description="Anda mengantar laundry langsung ke outlet."
            icon={<Store className="text-blue-600" />}
            selected={metodeAntar === "DIANTAR_SENDIRI"}
            onClick={() => setMetodeAntar("DIANTAR_SENDIRI")}
            />

        </div>

        {metodeAntar === "DIANTAR_KURIR" && (
            <div className="mt-8">

            {<div className="grid grid-cols-2 gap-6">

                <div>
                    <input
                    type="date"
                    value={pickupDate}
                    onChange={(e) => {
                        setPickupDate(e.target.value);
                        setSelectedPickupSlot("")
                    }}
                    className="h-14 w-full rounded-xl border border-gray-200 px-4 outline-none focus:border-blue-600"
                    />
                </div>

                <div>
                    <Select
                    value={selectedPickupSlot}
                    onChange={setSelectedPickupSlot}
                    placeholder={
                        pickupDate
                        ? 'Pilih Jam'
                        : 'Pilih tanggal terlebih dahulu'
                    }
                    options={availablePickupSlots.map((slot) => ({
                        value: slot.id_slot,
                        label: `${slot.jam_mulai} - ${slot.jam_selesai}`,
                    }))}
                    />
                </div>

            </div>}

            </div>
        )}

        </Section>

        {/* Section 4 */}
        <Section
            number={sectionNumber++}
            title="Pilih Bagaimana Laundry Akan Diterima Setelah Selesai."
            >
            <div className="grid grid-cols-2 gap-6">

                <DeliveryMethodCard
                title="Diantar Kurir"
                description="Laundry akan diantar ke alamat Anda."
                icon={<Truck className="text-blue-600" />}
                selected={metodeJemput === "DIJEMPUT_KURIR"}
                onClick={() => setMetodeJemput("DIJEMPUT_KURIR")}
                />
                
                <DeliveryMethodCard
                title="Ambil Sendiri"
                description="Anda mengambil laundry langsung di outlet."
                icon={<Store className="text-blue-600" />}
                selected={metodeJemput === "DIAMBIL_SENDIRI"}
                onClick={() => setMetodeJemput("DIAMBIL_SENDIRI")}
                />

            </div>

            {metodeJemput === "DIJEMPUT_KURIR" && (
                <div className="mt-8 grid grid-cols-2 gap-6">

                    <div>
                        <input
                            type="date"
                            value={returnDate}
                            onChange={(e) => {
                            setReturnDate(e.target.value);
                            setSelectedDeliverySlot("");
                            }}
                            className="h-14 w-full rounded-xl border border-gray-200 px-4 outline-none focus:border-blue-600"
                        />
                    </div>

                    <div>
                        <Select
                            value={selectedDeliverySlot}
                            onChange={setSelectedDeliverySlot}
                            placeholder={
                            returnDate
                                ? "Pilih Jam"
                                : "Pilih tanggal terlebih dahulu"
                            }
                            options={availableDeliverySlots.map((slot) => ({
                            value: slot.id_slot,
                            label: `${slot.jam_mulai} - ${slot.jam_selesai}`,
                            }))}
                        />
                    </div>

                </div>
            )}
        </Section>

        {showAddress && (
        <Section
            number={sectionNumber++}
            title="Alamat"
            description="Alamat ini diambil dari profil akun Anda."
        >
            {profile && (
            <AddressCard
                alamat={profile.alamat}
                telepon={profile.no_telepon}
            />
            )}
        </Section>
        )}

        <Section
            number={sectionNumber++}
            title="Catatan"
            description="Tambahkan catatan khusus untuk outlet (opsional)."
            >
            <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows={4}
                placeholder="Contoh: Jangan gunakan pewangi, pisahkan pakaian putih, atau catatan lainnya."
                className="
                w-full
                rounded-xl
                border
                border-gray-200
                p-4
                text-sm
                outline-none
                transition
                focus:border-blue-600
                resize-none
                "
            />
        </Section>

        <Section
            number={sectionNumber++}
            title="Ringkasan"
            description="Periksa kembali detail pesanan Anda."
            >
            <SummaryCard
                outlet={selectedOutletData?.nama_outlet ?? "-"}
                layanan={selectedServiceData?.nama_layanan ?? "-"}
                quantity={quantity}
                unit={selectedServiceData?.satuan ?? ""}
                subtotal={subtotal}
                deliveryFee={deliveryFee}
                total={total}
                metodeAntar={metodeAntar}
                metodeJemput={metodeJemput}
            />

            <Button
                type="button"
                variant="primary"
                fullWidth
                className="mt-6"
                onClick={handleCreateOrder}
                >
                Buat Pesanan
            </Button>

        </Section>

    </div>
  );
}