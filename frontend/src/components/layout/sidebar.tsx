'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { WashingMachine } from "lucide-react";
import { adminMenu } from "@/constants/sidebarMenu";

export default function Sidebar() {

  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 w-64 min-h-screen bg-[#163B72] text-white flex flex-col">

      {/* Logo */}
      <div className="px-6 py-8 border-b border-white/10">

        <div className="flex items-center gap-3">

          <div className="w-10 h-10 rounded-xl bg-[#2E7CF6] flex items-center justify-center">

            <WashingMachine size={20} />

          </div>

          <div>

            <h1 className="font-bold text-xl">
              aWash
            </h1>

            <p className="text-xs text-white/60">
              Admin Operasional
            </p>

          </div>

        </div>

      </div>

      {/* Menu */}

      <nav className="flex-1 px-4 py-6 space-y-2">

        {adminMenu.map((menu) => {

          const Icon = menu.icon;

          const active = pathname === menu.href;

          return (

            <Link
              key={menu.href}
              href={menu.href}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 transition
                ${
                  active
                    ? "bg-[#2E7CF6] text-white"
                    : "text-white/70 hover:bg-white/10 hover:text-white"
                }`}
            >

              <Icon size={20} />

              <span>{menu.title}</span>

            </Link>

          );

        })}

      </nav>

      {/* Footer */}

      <div className="border-t border-white/10 p-5">

        <div className="rounded-xl bg-white/5 p-4">

          <p className="font-medium">
            Admin Outlet
          </p>

          <p className="text-xs text-white/60 mt-1">
            Kelola seluruh operasional laundry.
          </p>

        </div>

      </div>

    </aside>
  );
}