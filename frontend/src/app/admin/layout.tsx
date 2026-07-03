import Sidebar from '@/components/layout/sidebar';
import Header from '@/components/layout/header';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex">

        <Sidebar />

        <div className="flex-1 ml-64">

            <Header />

            <main className="p-8">
                {children}
            </main>

        </div>

    </div>
  )
}