'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { WashingMachine } from "lucide-react";
import { adminMenu, customerMenu, kurirMenu } from "@/constants/sidebarMenu";

type Role = "ADMIN" | "CUSTOMER" | "KURIR";

interface SidebarProps {
  role: Role;
}

export default function Sidebar({ role }: SidebarProps) {

  const pathname = usePathname();

  const menu =
    role === "ADMIN"
      ? adminMenu
      : role === "CUSTOMER"
      ? customerMenu
      : kurirMenu;

  return (
    <aside className="fixed left-0 top-0 w-64 min-h-screen bg-[#163B72] text-white flex flex-col">

      {/* Logo */}
      <div className="px-6 py-8 border-b border-white/10">

        <div className="flex items-center gap-3">

          <div className="w-10 h-10 rounded-xl bg-[#2E7CF6] flex items-center justify-center">
            <WashingMachine size={20} />
          </div>

          <div>
            <h1 className="font-bold text-xl">aWash</h1>

            <p className="text-xs text-white/60">
              {role === "ADMIN"
                ? "Admin Operasional"
                : role === "CUSTOMER"
                ? "Customer"
                : "Kurir"}
            </p>

          </div>

        </div>

      </div>

      {/* Menu */}
      <nav className="flex-1 px-4 py-6 space-y-2">

        {menu.map((item) => {

          const Icon = item.icon;
          const active = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 transition
                ${active
                  ? "bg-[#2E7CF6] text-white"
                  : "text-white/70 hover:bg-white/10 hover:text-white"
                }`}
            >
              <Icon size={20} />
              <span>{item.title}</span>
            </Link>
          );
        })}

      </nav>

      {/* Footer */}
      <div className="border-t border-white/10 p-5">
        <div className="rounded-xl bg-white/5 p-4">
          <p className="font-medium">
            {role}
          </p>

          <p className="text-xs text-white/60 mt-1">
            Kelola sistem sesuai role Anda.
          </p>
        </div>
      </div>

    </aside>
  );
}