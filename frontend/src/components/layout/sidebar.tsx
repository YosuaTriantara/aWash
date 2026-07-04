'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { WashingMachine, CircleHelp } from "lucide-react";
import {
  adminMenu,
  customerMenu,
  kurirMenu,
} from "@/constants/sidebarMenu";

type Role = "ADMIN" | "CUSTOMER" | "KURIR";

interface SidebarProps {
  role: Role;
}

export default function Sidebar({
  role,
}: SidebarProps) {
  const pathname = usePathname();

  const menu =
    role === "ADMIN"
      ? adminMenu
      : role === "CUSTOMER"
      ? customerMenu
      : kurirMenu;

  return (
    <aside className="fixed left-0 top-0 flex h-screen w-60 flex-col border-r border-gray-200 bg-white">

      {/* Logo */}
      <div className="px-10 pt-8">

        <div className="flex items-center gap-3">

          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#1565D8]">
            <WashingMachine className="h-5 w-5 text-white" />
          </div>

          <div>
            <h1 className="text-3xl font-bold text-[#1565D8]">
              aWash
            </h1>

            <p className="text-sm text-slate-500">
              Renewed Clarity
            </p>
          </div>

        </div>

      </div>

      {/* Menu */}
      <nav className="mt-14 flex-1 px-5">

        <div className="space-y-2">

          {menu.map((item) => {
            const Icon = item.icon;

            const active =
              pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 text-base font-medium transition-all
                ${
                  active
                    ? "bg-[#EAF2FF] text-[#1565D8]"
                    : "text-slate-700 hover:bg-slate-100"
                }`}
              >
                <Icon size={20} />

                {item.title}
              </Link>
            );
          })}

        </div>

      </nav>

      {/* Help */}
      <div className="px-5 pb-8">

        <button className="flex items-center gap-3 text-slate-600 hover:text-[#1565D8] transition">

          <CircleHelp size={20} />

          <span className="font-medium">
            Help
          </span>

        </button>

      </div>

    </aside>
  );
}