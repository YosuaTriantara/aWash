'use client'
import Sidebar from '@/components/layout/sidebar';
import Header from '@/components/layout/header';
import { useAuthStore } from '@/store/auth.store';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
})
{
  const { user, hydrated } = useAuthStore();

  if (!hydrated) return <p>Loading...</p>;
  if (!user) return null;

  return (
    <div className="min-h-screen flex">

        <Sidebar role="ADMIN"/>

        <div className="flex-1 ml-64">

            <Header
              userName={user.nama}
              roleLabel="Admin Operasional"
            />

            <main className="p-8">
                {children}
            </main>

        </div>

    </div>
  )
}