import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-64 border-r min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-10">
        aWash
      </h1>

      <nav className="flex flex-col gap-4">
        <Link href="/dashboard">Dashboard</Link>

        <Link href="/pesanan">
          New Order
        </Link>

        <Link href="/riwayat">
          Order History
        </Link>

        <Link href="/profil">
          My Profile
        </Link>
      </nav>

      <div className="mt-auto pt-20">
        Help
      </div>
    </aside>
  );
}