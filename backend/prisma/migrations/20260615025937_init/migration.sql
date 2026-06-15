-- CreateEnum
CREATE TYPE "StatusPembayaran" AS ENUM ('PAID', 'UNPAID', 'PENDING');

-- CreateEnum
CREATE TYPE "StatusPesanan" AS ENUM ('DIBUAT', 'DITERIMA', 'MENUNGGU', 'DIPROSES', 'SIAP', 'SELESAI', 'DIBATALKAN');

-- CreateEnum
CREATE TYPE "StatusPengantaran" AS ENUM ('MENUNGGU', 'DITUGASKAN', 'MENUJU_LOKASI', 'SAMPAI_LOKASI', 'SELESAI', 'DIBATALKAN');

-- CreateEnum
CREATE TYPE "JenisPengantaran" AS ENUM ('DIANTAR', 'DIJEMPUT');

-- CreateEnum
CREATE TYPE "StatusKurir" AS ENUM ('AKTIF', 'TIDAK_AKTIF');

-- CreateEnum
CREATE TYPE "KategoriLayanan" AS ENUM ('CUCI_KILOAN', 'DRY_CLEAN', 'CUCI_SEPATU');

-- CreateEnum
CREATE TYPE "SatuanLayanan" AS ENUM ('KG', 'PCS', 'PASANG');

-- CreateEnum
CREATE TYPE "SatuanDurasi" AS ENUM ('JAM', 'HARI');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('CUSTOMER', 'ADMIN', 'KURIR');

-- CreateEnum
CREATE TYPE "MetodeAntar" AS ENUM ('DIANTAR_SENDIRI', 'DIANTAR_KURIR');

-- CreateEnum
CREATE TYPE "MetodeAmbil" AS ENUM ('DIAMBIL_SENDIRI', 'DIJEMPUT_KURIR');

-- CreateEnum
CREATE TYPE "HariOperasional" AS ENUM ('SENIN', 'SELASA', 'RABU', 'KAMIS', 'JUMAT', 'SABTU', 'MINGGU');

-- CreateTable
CREATE TABLE "user" (
    "id_user" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "no_telepon" TEXT,
    "role" "Role" NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "last_login" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id_user")
);

-- CreateTable
CREATE TABLE "customer" (
    "id_customer" TEXT NOT NULL,
    "id_user" TEXT NOT NULL,
    "tanggal_lahir" TIMESTAMP(3),
    "tanggal_daftar" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "alamat" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "customer_pkey" PRIMARY KEY ("id_customer")
);

-- CreateTable
CREATE TABLE "outlet" (
    "id_outlet" TEXT NOT NULL,
    "nama_outlet" TEXT NOT NULL,
    "alamat_outlet" TEXT NOT NULL,
    "nomor_telepon_outlet" TEXT NOT NULL,
    "jam_buka" TEXT NOT NULL,
    "jam_tutup" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "outlet_pkey" PRIMARY KEY ("id_outlet")
);

-- CreateTable
CREATE TABLE "admin" (
    "id_admin" TEXT NOT NULL,
    "id_user" TEXT NOT NULL,
    "id_outlet" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "admin_pkey" PRIMARY KEY ("id_admin")
);

-- CreateTable
CREATE TABLE "kurir" (
    "id_kurir" TEXT NOT NULL,
    "id_user" TEXT NOT NULL,
    "id_outlet" TEXT NOT NULL,
    "jenis_kendaraan" TEXT NOT NULL,
    "nomor_kendaraan" TEXT NOT NULL,
    "status_kurir" "StatusKurir" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "kurir_pkey" PRIMARY KEY ("id_kurir")
);

-- CreateTable
CREATE TABLE "layanan" (
    "id_layanan" TEXT NOT NULL,
    "nama_layanan" TEXT NOT NULL,
    "kategori_layanan" "KategoriLayanan" NOT NULL,
    "satuan" "SatuanLayanan" NOT NULL,
    "harga" DECIMAL(12,2) NOT NULL,
    "estimasi_durasi" INTEGER NOT NULL,
    "satuan_durasi" "SatuanDurasi" NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "layanan_pkey" PRIMARY KEY ("id_layanan")
);

-- CreateTable
CREATE TABLE "pemesanan" (
    "id_pemesanan" TEXT NOT NULL,
    "id_customer" TEXT NOT NULL,
    "id_outlet" TEXT NOT NULL,
    "tanggal_pesan" TIMESTAMP(3) NOT NULL,
    "status_terkini" "StatusPesanan" NOT NULL,
    "estimasi_selesai" TIMESTAMP(3),
    "total_laundry" DECIMAL(12,2) NOT NULL,
    "total_pengantaran" DECIMAL(12,2) NOT NULL,
    "grand_total" DECIMAL(12,2) NOT NULL,
    "catatan" TEXT,
    "metode_antar" "MetodeAntar" NOT NULL,
    "metode_jemput" "MetodeAmbil" NOT NULL,
    "tanggal_antar_request" TIMESTAMP(3),
    "tanggal_jemput_request" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pemesanan_pkey" PRIMARY KEY ("id_pemesanan")
);

-- CreateTable
CREATE TABLE "detail_pemesanan" (
    "id_detail" TEXT NOT NULL,
    "id_pemesanan" TEXT NOT NULL,
    "id_layanan" TEXT NOT NULL,
    "nama_layanan" TEXT NOT NULL,
    "kategori_layanan" "KategoriLayanan" NOT NULL,
    "satuan" "SatuanLayanan" NOT NULL,
    "harga_satuan" DECIMAL(12,2) NOT NULL,
    "estimasi_durasi" INTEGER NOT NULL,
    "satuan_durasi" "SatuanDurasi" NOT NULL,
    "kuantitas" DECIMAL(8,2) NOT NULL,
    "subtotal" DECIMAL(12,2) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "detail_pemesanan_pkey" PRIMARY KEY ("id_detail")
);

-- CreateTable
CREATE TABLE "pengantaran" (
    "id_pengantaran" TEXT NOT NULL,
    "id_pemesanan" TEXT NOT NULL,
    "id_slot_operasional" TEXT NOT NULL,
    "id_kurir" TEXT,
    "tanggal_pengantaran" TIMESTAMP(3) NOT NULL,
    "status_pengantaran" "StatusPengantaran" NOT NULL,
    "ongkir" DECIMAL(12,2) NOT NULL,
    "waktu_mulai" TIMESTAMP(3),
    "waktu_selesai" TIMESTAMP(3),
    "bukti_foto" TEXT,
    "catatan" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pengantaran_pkey" PRIMARY KEY ("id_pengantaran")
);

-- CreateTable
CREATE TABLE "transaksi" (
    "id_transaksi" TEXT NOT NULL,
    "id_pemesanan" TEXT NOT NULL,
    "tanggal_pembayaran" TIMESTAMP(3) NOT NULL,
    "nominal_pembayaran" DECIMAL(12,2) NOT NULL,
    "status_pembayaran" "StatusPembayaran" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "transaksi_pkey" PRIMARY KEY ("id_transaksi")
);

-- CreateTable
CREATE TABLE "riwayat_pesanan" (
    "id_history" TEXT NOT NULL,
    "id_pemesanan" TEXT NOT NULL,
    "id_transaksi" TEXT,
    "status_pesanan" "StatusPesanan" NOT NULL,
    "waktu_update" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "riwayat_pesanan_pkey" PRIMARY KEY ("id_history")
);

-- CreateTable
CREATE TABLE "slot_operasional" (
    "id_slot" TEXT NOT NULL,
    "id_outlet" TEXT NOT NULL,
    "jenis_pengantaran" "JenisPengantaran" NOT NULL,
    "hari" "HariOperasional" NOT NULL,
    "jam_mulai" TEXT NOT NULL,
    "jam_selesai" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "slot_operasional_pkey" PRIMARY KEY ("id_slot")
);

-- CreateTable
CREATE TABLE "ulasan" (
    "id_ulasan" TEXT NOT NULL,
    "id_customer" TEXT NOT NULL,
    "id_pemesanan" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "komen" TEXT NOT NULL,
    "tanggal_ulasan" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ulasan_pkey" PRIMARY KEY ("id_ulasan")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "customer_id_user_key" ON "customer"("id_user");

-- CreateIndex
CREATE INDEX "customer_id_user_idx" ON "customer"("id_user");

-- CreateIndex
CREATE INDEX "outlet_id_outlet_idx" ON "outlet"("id_outlet");

-- CreateIndex
CREATE UNIQUE INDEX "admin_id_user_key" ON "admin"("id_user");

-- CreateIndex
CREATE INDEX "admin_id_outlet_idx" ON "admin"("id_outlet");

-- CreateIndex
CREATE UNIQUE INDEX "kurir_id_user_key" ON "kurir"("id_user");

-- CreateIndex
CREATE INDEX "kurir_id_outlet_idx" ON "kurir"("id_outlet");

-- CreateIndex
CREATE INDEX "pemesanan_id_customer_idx" ON "pemesanan"("id_customer");

-- CreateIndex
CREATE INDEX "pemesanan_id_outlet_idx" ON "pemesanan"("id_outlet");

-- CreateIndex
CREATE INDEX "pemesanan_status_terkini_idx" ON "pemesanan"("status_terkini");

-- CreateIndex
CREATE INDEX "detail_pemesanan_id_pemesanan_idx" ON "detail_pemesanan"("id_pemesanan");

-- CreateIndex
CREATE INDEX "detail_pemesanan_id_layanan_idx" ON "detail_pemesanan"("id_layanan");

-- CreateIndex
CREATE INDEX "pengantaran_id_pemesanan_idx" ON "pengantaran"("id_pemesanan");

-- CreateIndex
CREATE INDEX "pengantaran_id_slot_operasional_idx" ON "pengantaran"("id_slot_operasional");

-- CreateIndex
CREATE INDEX "pengantaran_id_kurir_idx" ON "pengantaran"("id_kurir");

-- CreateIndex
CREATE UNIQUE INDEX "transaksi_id_pemesanan_key" ON "transaksi"("id_pemesanan");

-- CreateIndex
CREATE INDEX "riwayat_pesanan_id_pemesanan_idx" ON "riwayat_pesanan"("id_pemesanan");

-- CreateIndex
CREATE INDEX "riwayat_pesanan_id_transaksi_idx" ON "riwayat_pesanan"("id_transaksi");

-- CreateIndex
CREATE INDEX "slot_operasional_id_outlet_idx" ON "slot_operasional"("id_outlet");

-- CreateIndex
CREATE UNIQUE INDEX "ulasan_id_pemesanan_key" ON "ulasan"("id_pemesanan");

-- CreateIndex
CREATE INDEX "ulasan_id_customer_idx" ON "ulasan"("id_customer");

-- AddForeignKey
ALTER TABLE "customer" ADD CONSTRAINT "customer_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "user"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "admin" ADD CONSTRAINT "admin_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "user"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "admin" ADD CONSTRAINT "admin_id_outlet_fkey" FOREIGN KEY ("id_outlet") REFERENCES "outlet"("id_outlet") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "kurir" ADD CONSTRAINT "kurir_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "user"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "kurir" ADD CONSTRAINT "kurir_id_outlet_fkey" FOREIGN KEY ("id_outlet") REFERENCES "outlet"("id_outlet") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pemesanan" ADD CONSTRAINT "pemesanan_id_customer_fkey" FOREIGN KEY ("id_customer") REFERENCES "customer"("id_customer") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pemesanan" ADD CONSTRAINT "pemesanan_id_outlet_fkey" FOREIGN KEY ("id_outlet") REFERENCES "outlet"("id_outlet") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "detail_pemesanan" ADD CONSTRAINT "detail_pemesanan_id_pemesanan_fkey" FOREIGN KEY ("id_pemesanan") REFERENCES "pemesanan"("id_pemesanan") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "detail_pemesanan" ADD CONSTRAINT "detail_pemesanan_id_layanan_fkey" FOREIGN KEY ("id_layanan") REFERENCES "layanan"("id_layanan") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pengantaran" ADD CONSTRAINT "pengantaran_id_pemesanan_fkey" FOREIGN KEY ("id_pemesanan") REFERENCES "pemesanan"("id_pemesanan") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pengantaran" ADD CONSTRAINT "pengantaran_id_slot_operasional_fkey" FOREIGN KEY ("id_slot_operasional") REFERENCES "slot_operasional"("id_slot") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pengantaran" ADD CONSTRAINT "pengantaran_id_kurir_fkey" FOREIGN KEY ("id_kurir") REFERENCES "kurir"("id_kurir") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transaksi" ADD CONSTRAINT "transaksi_id_pemesanan_fkey" FOREIGN KEY ("id_pemesanan") REFERENCES "pemesanan"("id_pemesanan") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "riwayat_pesanan" ADD CONSTRAINT "riwayat_pesanan_id_pemesanan_fkey" FOREIGN KEY ("id_pemesanan") REFERENCES "pemesanan"("id_pemesanan") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "riwayat_pesanan" ADD CONSTRAINT "riwayat_pesanan_id_transaksi_fkey" FOREIGN KEY ("id_transaksi") REFERENCES "transaksi"("id_transaksi") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "slot_operasional" ADD CONSTRAINT "slot_operasional_id_outlet_fkey" FOREIGN KEY ("id_outlet") REFERENCES "outlet"("id_outlet") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ulasan" ADD CONSTRAINT "ulasan_id_customer_fkey" FOREIGN KEY ("id_customer") REFERENCES "customer"("id_customer") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ulasan" ADD CONSTRAINT "ulasan_id_pemesanan_fkey" FOREIGN KEY ("id_pemesanan") REFERENCES "pemesanan"("id_pemesanan") ON DELETE RESTRICT ON UPDATE CASCADE;
