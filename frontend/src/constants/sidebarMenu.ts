import {
  LayoutDashboard,
  ClipboardList,
  Truck,
  Package,
  History,
  User,
} from "lucide-react";

export const adminMenu = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Pesanan Baru",
    href: "/admin/pesanan-baru",
    icon: ClipboardList,
  },
  {
    title: "Pengantaran",
    href: "/admin/pengantaran",
    icon: Truck,
  },
  {
    title: "Kelola Pesanan",
    href: "/admin/pesanan",
    icon: Package,
  },
  {
    title: "Riwayat Pesanan",
    href: "/admin/riwayat",
    icon: History,
  },
  {
    title: "Profil",
    href: "/admin/profil",
    icon: User,
  },
];