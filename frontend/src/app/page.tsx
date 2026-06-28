'use client';

import Link from 'next/link';
import { WashingMachine, Truck, Clock, Star, ShieldCheck, ArrowRight, Sparkles } from 'lucide-react';
import { useAuthStore } from '@/store/auth.store';
import { useRouter } from 'next/navigation';

// ─── Static Data ──────────────────────────────────────────────────────────────

const layanan = [
  {
    nama: 'Cuci Reguler',
    deskripsi: 'Cuci + keringkan. Siap dalam 2–3 hari kerja.',
    harga: 'Rp 7.000 / kg',
    icon: '🧺',
  },
  {
    nama: 'Cuci Express',
    deskripsi: 'Selesai dalam 6 jam. Cocok untuk kebutuhan mendesak.',
    harga: 'Rp 12.000 / kg',
    icon: '⚡',
  },
  {
    nama: 'Cuci + Setrika',
    deskripsi: 'Dicuci bersih, disetrika rapi, siap pakai.',
    harga: 'Rp 10.000 / kg',
    icon: '👔',
  },
  {
    nama: 'Dry Cleaning',
    deskripsi: 'Untuk pakaian berbahan halus & tidak boleh basah.',
    harga: 'Mulai Rp 25.000 / item',
    icon: '✨',
  },
];

const alurPemesanan = [
  { langkah: 'Pilih layanan', detail: 'Tentukan jenis cuci dan jadwal penjemputan.' },
  { langkah: 'Kami jemput', detail: 'Kurir kami datang ke lokasi Anda tepat waktu.' },
  { langkah: 'Proses laundry', detail: 'Pakaian dicuci, dikeringkan, dan dikemas rapi.' },
  { langkah: 'Diantar balik', detail: 'Bersih dan rapi kembali ke tangan Anda.' },
];

const ulasan = [
  {
    nama: 'Dewi R.',
    rating: 5,
    teks: 'Hasilnya bersih banget, tepat waktu pula. Sekarang langganan tiap minggu!',
    tanggal: '2 hari lalu',
  },
  {
    nama: 'Budi S.',
    rating: 5,
    teks: 'Express-nya beneran 6 jam. Pakaian kantor saya jadi rapi semua.',
    tanggal: '5 hari lalu',
  },
  {
    nama: 'Rina M.',
    rating: 4,
    teks: 'Aplikasinya gampang dipakai dan status pesanan selalu terupdate.',
    tanggal: '1 minggu lalu',
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function HomePage() {
  const { user, hydrated } = useAuthStore();
  const logout = useAuthStore((state) => state.logout);
  const router = useRouter();

  if (!hydrated) return null;

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F8FAFF', fontFamily: 'system-ui, sans-serif' }}>

      {/* ── Navbar ── */}
      <nav
        className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 border-b"
        style={{ backgroundColor: 'rgba(248,250,255,0.9)', backdropFilter: 'blur(12px)', borderColor: '#E8EDFF' }}
      >
        <div className="flex items-center gap-2.5">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={{ backgroundColor: '#1A6FD4' }}
          >
            <WashingMachine className="w-5 h-5 text-white" />
          </div>
          <span className="text-lg font-bold" style={{ color: '#1A3A6B' }}>aWash</span>
        </div>
        <div className="flex items-center gap-3">
          {
          user ? (
            <>
              <span className="text-sm">
                Halo, {user.nama}
              </span>

              <button
                onClick={() => {
                  logout();
                  router.push('/login');
                }}
                className="text-sm font-semibold"
              >
                Keluar
              </button>
            </>
          )
          :
          (
            <>
              <Link
                href="/login"
                className="text-sm font-medium px-4 py-2 rounded-lg"
                style={{ color:'#1A6FD4' }}
              >
                Masuk
              </Link>

              <Link
                href="/register"
                className="text-sm font-semibold px-4 py-2 rounded-xl text-white"
                style={{ backgroundColor:'#1A6FD4' }}
              >
                Daftar
              </Link>
            </>
          )
          }
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="px-6 pt-20 pb-24 text-center max-w-3xl mx-auto">
        <div
          className="inline-flex items-center gap-2 text-xs font-semibold tracking-wide uppercase px-4 py-2 rounded-full mb-8"
          style={{ backgroundColor: '#DBEAFE', color: '#1A6FD4' }}
        >
          <Sparkles className="w-3.5 h-3.5" />
          Antar jemput gratis area Bali
        </div>

        <h1
          className="text-5xl font-black leading-tight mb-6"
          style={{ color: '#1A3A6B' }}
        >
          Laundry beres,<br />
          <span style={{ color: '#1A6FD4' }}>waktu Anda kembali.</span>
        </h1>

        <p className="text-lg text-gray-500 leading-relaxed mb-10 max-w-xl mx-auto">
          Pesan sekali, kurir kami jemput pakaian Anda, cuci bersih, dan antar balik — semua terlacak real-time.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/register"
            className="flex items-center gap-2 px-7 py-3.5 rounded-2xl text-white font-semibold text-sm shadow-lg transition-transform hover:scale-105"
            style={{ backgroundColor: '#1A6FD4', boxShadow: '0 8px 24px rgba(26,111,212,0.3)' }}
          >
            Pesan Sekarang
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/login"
            className="px-7 py-3.5 rounded-2xl font-semibold text-sm border-2 transition-colors"
            style={{ color: '#1A6FD4', borderColor: '#BFDBFE' }}
          >
            Sudah punya akun
          </Link>
        </div>

        {/* Quick stats */}
        <div className="flex justify-center gap-10 mt-14">
          {[
            { value: '2.400+', label: 'Pesanan selesai' },
            { value: '98%', label: 'Tepat waktu' },
            { value: '4.9', label: 'Rating' },
          ].map((s) => (
            <div key={s.label}>
              <p className="text-2xl font-black" style={{ color: '#1A3A6B' }}>{s.value}</p>
              <p className="text-xs text-gray-400 mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Keunggulan ── */}
      <section
        className="py-16 px-6"
        style={{ backgroundColor: '#EFF6FF' }}
      >
        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            { icon: <Truck className="w-5 h-5" />, judul: 'Jemput & Antar', teks: 'Gratis di area layanan. Kurir tiba sesuai slot yang Anda pilih.' },
            { icon: <Clock className="w-5 h-5" />, judul: 'Status Real-Time', teks: 'Pantau posisi laundry Anda dari dijemput hingga diantar balik.' },
            { icon: <ShieldCheck className="w-5 h-5" />, judul: 'Dijamin Bersih', teks: 'Jika tidak bersih, kami cuci ulang tanpa biaya tambahan.' },
          ].map((item) => (
            <div
              key={item.judul}
              className="rounded-2xl p-6"
              style={{ backgroundColor: '#FFFFFF', border: '1px solid #DBEAFE' }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                style={{ backgroundColor: '#EFF6FF', color: '#1A6FD4' }}
              >
                {item.icon}
              </div>
              <h3 className="font-bold text-gray-900 mb-1.5">{item.judul}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{item.teks}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Layanan ── */}
      <section className="py-20 px-6 max-w-4xl mx-auto">
        <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: '#1A6FD4' }}>Layanan</p>
        <h2 className="text-3xl font-black mb-10" style={{ color: '#1A3A6B' }}>Pilih yang Anda butuhkan</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {layanan.map((l) => (
            <div
              key={l.nama}
              className="rounded-2xl p-6 flex gap-4 transition-shadow hover:shadow-md"
              style={{ backgroundColor: '#FFFFFF', border: '1px solid #E8EDFF' }}
            >
              <div className="text-3xl">{l.icon}</div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">{l.nama}</h3>
                <p className="text-sm text-gray-500 mb-3 leading-relaxed">{l.deskripsi}</p>
                <span
                  className="text-xs font-bold px-3 py-1 rounded-full"
                  style={{ backgroundColor: '#EFF6FF', color: '#1A6FD4' }}
                >
                  {l.harga}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Cara Kerja ── */}
      <section className="py-20 px-6" style={{ backgroundColor: '#1A3A6B' }}>
        <div className="max-w-4xl mx-auto">
          <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: '#93C5FD' }}>Cara Kerja</p>
          <h2 className="text-3xl font-black text-white mb-12">4 langkah, selesai.</h2>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
            {alurPemesanan.map((item, i) => (
              <div key={item.langkah} className="relative">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-black mb-4"
                  style={{ backgroundColor: '#1A6FD4', color: 'white' }}
                >
                  {i + 1}
                </div>
                <h3 className="font-bold text-white mb-1.5">{item.langkah}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.6)' }}>
                  {item.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Ulasan ── */}
      <section className="py-20 px-6 max-w-4xl mx-auto">
        <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: '#1A6FD4' }}>Ulasan</p>
        <h2 className="text-3xl font-black mb-10" style={{ color: '#1A3A6B' }}>Kata pelanggan kami</h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {ulasan.map((u) => (
            <div
              key={u.nama}
              className="rounded-2xl p-6"
              style={{ backgroundColor: '#FFFFFF', border: '1px solid #E8EDFF' }}
            >
              <div className="flex gap-0.5 mb-3">
                {Array.from({ length: u.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" style={{ color: '#FBBF24' }} />
                ))}
              </div>
              <p className="text-sm text-gray-600 leading-relaxed mb-4">"{u.teks}"</p>
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-gray-900">{u.nama}</span>
                <span className="text-xs text-gray-400">{u.tanggal}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section
        className="mx-6 mb-16 rounded-3xl py-16 px-8 text-center"
        style={{ backgroundColor: '#1A6FD4' }}
      >
        <h2 className="text-3xl font-black text-white mb-3">Siap mencoba?</h2>
        <p className="text-sm mb-8" style={{ color: 'rgba(255,255,255,0.75)' }}>
          Daftar gratis dan buat pesanan pertama Anda sekarang.
        </p>
        <Link
          href="/register"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl font-semibold text-sm transition-transform hover:scale-105"
          style={{ backgroundColor: '#FFFFFF', color: '#1A6FD4' }}
        >
          Mulai Sekarang
          <ArrowRight className="w-4 h-4" />
        </Link>
      </section>

      {/* ── Footer ── */}
      <footer className="px-6 pb-10 text-center">
        <p className="text-xs text-gray-400">© 2025 aWash. Layanan laundry online terpercaya.</p>
      </footer>
    </div>
  );
}