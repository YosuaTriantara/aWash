# Panduan Membangun Frontend aWash

## Daftar Isi

1. [Tech Stack](#1-tech-stack)
2. [Struktur Folder](#2-struktur-folder)
3. [Instalasi & Setup](#3-instalasi--setup)
4. [Konfigurasi Penting](#4-konfigurasi-penting)
5. [Manajemen State (Zustand)](#5-manajemen-state-zustand)
6. [API Service Layer](#6-api-service-layer)
7. [Routing & Auth (Next.js App Router)](#7-routing--auth-nextjs-app-router)
8. [Halaman per Role](#8-halaman-per-role)
9. [Server vs Client Components](#9-server-vs-client-components)
10. [Konvensi & Best Practices](#10-konvensi--best-practices)

---

## 1. Tech Stack

### Sudah Ada di `package.json`

| Kegunaan | Library | Versi |
|---|---|---|
| Framework | Next.js | 16.2.6 |
| Bahasa | TypeScript | ^5 |
| UI Runtime | React | 19.2.4 |
| HTTP Client | Axios | ^1.16.1 |
| Form Handling | React Hook Form | ^7.76.0 |
| Validasi Skema | Zod | ^4.4.3 |
| Resolver RHF + Zod | @hookform/resolvers | ^5.4.0 |
| Styling | Tailwind CSS | ^4 (via PostCSS) |

### Perlu Ditambahkan (install manual)

| Kegunaan | Library | Keterangan |
|---|---|---|
| State Management | Zustand | Auth store, persist ke localStorage |
| Data Fetching & Cache | TanStack Query (React Query) v5 | Cache data server |
| Icons | Lucide React | Icon set ringan |

```bash
npm install zustand @tanstack/react-query lucide-react
```

---

## 2. Struktur Folder

Next.js App Router menggunakan struktur berbasis file. Setiap folder di dalam `src/app/` merepresentasikan sebuah URL segment.

```
frontend/
├── public/                        # Aset statis (favicon, logo)
├── src/
│   ├── app/                       # Next.js App Router (routing berbasis file)
│   │   ├── (auth)/                # Route group: tidak muncul di URL
│   │   │   ├── login/
│   │   │   │   └── page.tsx       # URL: /login
│   │   │   └── register/
│   │   │       └── page.tsx       # URL: /register
│   │   │
│   │   ├── (customer)/            # Route group: URL tetap tanpa prefix
│   │   │   ├── layout.tsx         # Layout customer (Navbar)
│   │   │   ├── page.tsx           # URL: /  (Dashboard customer)
│   │   │   ├── profil/
│   │   │   │   └── page.tsx       # URL: /profil
│   │   │   └── pesanan/
│   │   │       ├── page.tsx       # URL: /pesanan
│   │   │       ├── baru/
│   │   │       │   └── page.tsx   # URL: /pesanan/baru
│   │   │       └── [id]/
│   │   │           ├── page.tsx   # URL: /pesanan/:id
│   │   │           └── ulasan/
│   │   │               └── page.tsx  # URL: /pesanan/:id/ulasan
│   │   │
│   │   ├── admin/
│   │   │   ├── layout.tsx         # Layout admin (Sidebar)
│   │   │   ├── page.tsx           # URL: /admin
│   │   │   ├── pesanan/
│   │   │   │   ├── page.tsx       # URL: /admin/pesanan
│   │   │   │   └── [id]/
│   │   │   │       └── page.tsx   # URL: /admin/pesanan/:id
│   │   │   ├── layanan/
│   │   │   │   ├── page.tsx       # URL: /admin/layanan
│   │   │   │   ├── baru/
│   │   │   │   │   └── page.tsx   # URL: /admin/layanan/baru
│   │   │   │   └── [id]/
│   │   │   │       └── edit/
│   │   │   │           └── page.tsx  # URL: /admin/layanan/:id/edit
│   │   │   ├── outlet/
│   │   │   │   └── page.tsx       # URL: /admin/outlet
│   │   │   ├── kurir/
│   │   │   │   ├── page.tsx       # URL: /admin/kurir
│   │   │   │   └── baru/
│   │   │   │       └── page.tsx   # URL: /admin/kurir/baru
│   │   │   ├── transaksi/
│   │   │   │   └── page.tsx       # URL: /admin/transaksi
│   │   │   └── slot-operasional/
│   │   │       ├── page.tsx       # URL: /admin/slot-operasional
│   │   │       └── baru/
│   │   │           └── page.tsx   # URL: /admin/slot-operasional/baru
│   │   │
│   │   ├── kurir/
│   │   │   ├── layout.tsx         # Layout kurir (Sidebar)
│   │   │   ├── page.tsx           # URL: /kurir
│   │   │   └── tugas/
│   │   │       ├── page.tsx       # URL: /kurir/tugas
│   │   │       └── [id]/
│   │   │           └── page.tsx   # URL: /kurir/tugas/:id
│   │   │
│   │   ├── globals.css            # Tailwind base import
│   │   └── layout.tsx             # Root layout (QueryProvider, dll)
│   │
│   ├── components/
│   │   ├── common/                # Komponen reusable generik
│   │   │   # Button.tsx
│   │   │   # Input.tsx
│   │   │   # Modal.tsx
│   │   │   # Badge.tsx
│   │   │   # Card.tsx
│   │   │   # Spinner.tsx
│   │   │   # EmptyState.tsx
│   │   ├── layout/                # Komponen tata letak
│   │   │   # Navbar.tsx
│   │   │   # Sidebar.tsx
│   │   └── ui/                    # Komponen UI domain-spesifik
│   │       # StatusBadge.tsx      <- badge warna untuk status pesanan
│   │       # PesananCard.tsx
│   │       # LayananCard.tsx
│   │       # TimelineStatus.tsx   <- riwayat status pesanan
│   │
│   ├── hooks/                     # Custom React hooks
│   │   # useAuth.ts
│   │
│   ├── lib/                       # Konfigurasi library
│   │   # axios.ts                 <- Axios instance + interceptor
│   │   # query-client.ts          <- TanStack QueryClient
│   │
│   ├── services/                  # Fungsi API call per resource
│   │   # auth.service.ts
│   │   # pemesanan.service.ts
│   │   # layanan.service.ts
│   │   # outlet.service.ts
│   │   # kurir.service.ts
│   │   # transaksi.service.ts
│   │   # ulasan.service.ts
│   │   # pengantaran.service.ts
│   │
│   ├── store/                     # Zustand stores
│   │   # auth.store.ts
│   │
│   ├── types/                     # TypeScript type definitions
│   │   # index.ts                 <- re-export semua types
│   │   # user.types.ts
│   │   # pemesanan.types.ts
│   │   # layanan.types.ts
│   │
│   ├── utils/                     # Helper & konstanta
│   │   # formatCurrency.ts
│   │   # formatDate.ts
│   │   # constants.ts
│   │
│   └── middleware.ts              # Auth guard Next.js (PENTING)
│
├── .env.local                     # Variabel environment (tidak di-commit)
├── .env.example
├── next.config.ts
├── postcss.config.mjs
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

> **Route Group `(nama)`**: Folder dengan kurung tidak membentuk URL segment.  
> Contoh: `app/(customer)/pesanan/page.tsx` → URL-nya tetap `/pesanan`.  
> **Segmen Dinamis `[id]`**: Folder dengan kurung siku menjadi parameter URL.

---

## 3. Instalasi & Setup

### 3.1 Inisialisasi Proyek Next.js

> Karena `frontend/` sudah ada, inisialisasi dilakukan dengan cara manual **atau** buat di tempat lain lalu pindahkan.

```bash
# Opsi A: Buat proyek baru di folder sementara, lalu salin konfigurasinya
npx create-next-app@latest awash-temp --typescript --tailwind --eslint --app --src-dir

# Opsi B: Langsung pakai package.json yang sudah ada
# Masuk ke folder frontend/ dan install dependensi
cd frontend
npm install
```

Jika menggunakan Opsi B (package.json sudah ada), pastikan file-file konfigurasi Next.js berikut sudah ada:
- `next.config.ts`
- `tsconfig.json`
- `postcss.config.mjs`

### 3.2 Install Dependensi Tambahan

```bash
npm install zustand @tanstack/react-query lucide-react
```

### 3.3 Konfigurasi Tailwind CSS

Tailwind v4 di Next.js menggunakan **PostCSS** (bukan Vite plugin).

**`postcss.config.mjs`:**
```js
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

export default config;
```

**`src/app/globals.css`:**
```css
@import "tailwindcss";
```

### 3.4 File `.env.local`

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000/api
```

> Di Next.js, variabel yang diawali `NEXT_PUBLIC_` dapat diakses di sisi client.  
> Variabel **tanpa** prefix hanya tersedia di server (Server Components, API Routes).

---

## 4. Konfigurasi Penting

### 4.1 Axios Instance (`src/lib/axios.ts`)

```ts
import axios from 'axios';
import { useAuthStore } from '@/store/auth.store';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      useAuthStore.getState().logout();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
```

### 4.2 Auth Store (`src/store/auth.store.ts`)

```ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id_user: string;
  nama: string;
  email: string;
  role: 'CUSTOMER' | 'ADMIN' | 'KURIR';
}

interface AuthState {
  user: User | null;
  token: string | null;
  login: (user: User, token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      login: (user, token) => set({ user, token }),
      logout: () => set({ user: null, token: null }),
    }),
    { name: 'awash-auth' }
  )
);
```

### 4.3 QueryClient (`src/lib/query-client.ts`)

```ts
import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 menit
      retry: 1,
    },
  },
});
```

### 4.4 Root Layout dengan Providers (`src/app/layout.tsx`)

```tsx
import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import './globals.css';
import Providers from './providers'; // komponen client wrapper

const geist = Geist({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'aWash',
  description: 'Aplikasi Laundry Online',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className={geist.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
```

**`src/app/providers.tsx`** (Client Component karena Zustand & React Query butuh context):

```tsx
'use client';

import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/lib/query-client';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}
```

---

## 5. Manajemen State (Zustand)

Gunakan **Zustand** hanya untuk state global yang perlu di-persist atau dibagi banyak komponen. Data dari server dikelola oleh **TanStack Query**.

| Data | Disimpan di |
|---|---|
| User login & token JWT | Zustand + `persist` (localStorage) |
| Daftar pesanan, layanan, dll | TanStack Query cache |
| State form | React Hook Form (lokal) |
| State UI (modal buka/tutup) | `useState` lokal |

> **Catatan**: Zustand store hanya bisa diakses di **Client Components** (`'use client'`).  
> Jangan import store di Server Component.

---

## 6. API Service Layer

Satu file service per resource. Selalu gunakan `api` dari `src/lib/axios.ts`.

**`src/services/pemesanan.service.ts`:**

```ts
import api from '@/lib/axios';
import type { Pemesanan, BuatPesananDTO } from '@/types/pemesanan.types';

export const getPesananSaya = (): Promise<Pemesanan[]> =>
  api.get('/pemesanan/saya').then((r) => r.data);

export const getPesananById = (id: string): Promise<Pemesanan> =>
  api.get(`/pemesanan/${id}`).then((r) => r.data);

export const buatPesanan = (data: BuatPesananDTO): Promise<Pemesanan> =>
  api.post('/pemesanan', data).then((r) => r.data);

export const updateStatusPesanan = (id: string, status: string) =>
  api.patch(`/pemesanan/${id}/status`, { status }).then((r) => r.data);
```

**Penggunaan di Client Component dengan React Query:**

```tsx
'use client';

import { useQuery } from '@tanstack/react-query';
import { getPesananSaya } from '@/services/pemesanan.service';

export default function PesananListPage() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['pesanan', 'saya'],
    queryFn: getPesananSaya,
  });

  if (isLoading) return <Spinner />;
  if (isError) return <p>Gagal memuat data.</p>;

  return (
    <div>
      {data?.map((p) => (
        <PesananCard key={p.id_pemesanan} pesanan={p} />
      ))}
    </div>
  );
}
```

---

## 7. Routing & Auth (Next.js App Router)

Di Next.js tidak ada React Router. Routing diatur oleh **struktur folder** di `src/app/`, dan proteksi halaman dilakukan via **`middleware.ts`**.

### 7.1 Middleware Auth (`src/middleware.ts`)

File ini diletakkan di `src/` (sejajar dengan folder `app/`). Berjalan di Edge Runtime sebelum halaman dirender.

```ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Halaman yang TIDAK perlu login
const PUBLIC_PATHS = ['/login', '/register'];

// Mapping role ke prefix URL yang boleh diakses
const ROLE_PATHS: Record<string, string> = {
  CUSTOMER: '/',
  ADMIN: '/admin',
  KURIR: '/kurir',
};

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Baca token dari cookie (simpan token di cookie saat login)
  const token = request.cookies.get('awash-token')?.value;
  const role = request.cookies.get('awash-role')?.value;

  const isPublicPath = PUBLIC_PATHS.some((p) => pathname.startsWith(p));

  // Belum login & akses halaman privat -> redirect ke login
  if (!token && !isPublicPath) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Sudah login & akses halaman publik -> redirect ke dashboard
  if (token && isPublicPath) {
    const destination = role ? ROLE_PATHS[role] ?? '/' : '/';
    return NextResponse.redirect(new URL(destination, request.url));
  }

  // Akses halaman yang tidak sesuai role
  if (token && role) {
    if (pathname.startsWith('/admin') && role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/', request.url));
    }
    if (pathname.startsWith('/kurir') && role !== 'KURIR') {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  // Jalankan middleware di semua path kecuali aset statis & API
  matcher: ['/((?!_next/static|_next/image|favicon.ico|api/).*)'],
};
```

> **Penting**: Karena middleware berjalan di server (Edge), ia tidak bisa membaca `localStorage`.  
> Simpan token di **cookie** saat login, bukan hanya di Zustand/localStorage.

### 7.2 Simpan Token ke Cookie saat Login

Saat proses login berhasil di Client Component:

```ts
import Cookies from 'js-cookie'; // npm install js-cookie @types/js-cookie

// Di fungsi handleLogin:
Cookies.set('awash-token', token, { expires: 7 });
Cookies.set('awash-role', user.role, { expires: 7 });
useAuthStore.getState().login(user, token);
```

### 7.3 Layout per Role

Setiap role punya `layout.tsx` sendiri yang berisi navigasi-nya.

**`src/app/(customer)/layout.tsx`:**
```tsx
import Navbar from '@/components/layout/Navbar';

export default function CustomerLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Navbar />
      <main className="container mx-auto px-4 py-6">{children}</main>
    </div>
  );
}
```

**`src/app/admin/layout.tsx`:**
```tsx
import Sidebar from '@/components/layout/Sidebar';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <Sidebar role="ADMIN" />
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
```

### 7.4 Navigasi Antar Halaman

Gunakan `next/link` dan `next/navigation`, **bukan** React Router:

```tsx
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// Link statis
<Link href="/pesanan">Lihat Pesanan</Link>

// Navigasi programatik
const router = useRouter();
router.push('/pesanan/baru');
router.replace('/login'); // tanpa history entry
```

---

## 8. Halaman per Role

### 8.1 CUSTOMER

| File | URL | Deskripsi |
|---|---|---|
| `(customer)/page.tsx` | `/` | Dashboard: layanan tersedia, pesanan aktif |
| `(customer)/pesanan/page.tsx` | `/pesanan` | Riwayat pesanan + filter status |
| `(customer)/pesanan/baru/page.tsx` | `/pesanan/baru` | Form pesan: pilih layanan, antar/jemput, jadwal |
| `(customer)/pesanan/[id]/page.tsx` | `/pesanan/:id` | Detail pesanan + timeline status |
| `(customer)/pesanan/[id]/ulasan/page.tsx` | `/pesanan/:id/ulasan` | Form ulasan: rating + komentar |
| `(customer)/profil/page.tsx` | `/profil` | Edit data diri |

### 8.2 ADMIN

| File | URL | Deskripsi |
|---|---|---|
| `admin/page.tsx` | `/admin` | Dashboard: ringkasan pesanan & pendapatan |
| `admin/pesanan/page.tsx` | `/admin/pesanan` | Tabel semua pesanan, filter & update status |
| `admin/pesanan/[id]/page.tsx` | `/admin/pesanan/:id` | Detail pesanan, ubah status, assign kurir |
| `admin/layanan/page.tsx` | `/admin/layanan` | Tabel layanan laundry |
| `admin/layanan/baru/page.tsx` | `/admin/layanan/baru` | Form tambah layanan |
| `admin/layanan/[id]/edit/page.tsx` | `/admin/layanan/:id/edit` | Form edit layanan |
| `admin/outlet/page.tsx` | `/admin/outlet` | Data & jam operasional outlet |
| `admin/kurir/page.tsx` | `/admin/kurir` | Tabel kurir + status aktif/nonaktif |
| `admin/kurir/baru/page.tsx` | `/admin/kurir/baru` | Form tambah kurir |
| `admin/transaksi/page.tsx` | `/admin/transaksi` | Riwayat pembayaran, konfirmasi PAID |
| `admin/slot-operasional/page.tsx` | `/admin/slot-operasional` | Tabel slot pengantaran & penjemputan |
| `admin/slot-operasional/baru/page.tsx` | `/admin/slot-operasional/baru` | Form tambah slot |

### 8.3 KURIR

| File | URL | Deskripsi |
|---|---|---|
| `kurir/page.tsx` | `/kurir` | Dashboard: ringkasan tugas hari ini |
| `kurir/tugas/page.tsx` | `/kurir/tugas` | List pengantaran yang ditugaskan |
| `kurir/tugas/[id]/page.tsx` | `/kurir/tugas/:id` | Detail + update status pengantaran, upload foto |

---

## 9. Server vs Client Components

Next.js App Router membedakan **Server Component** (default) dan **Client Component** (`'use client'`).

| Kebutuhan | Gunakan |
|---|---|
| Fetch data langsung tanpa useState/useEffect | Server Component (default) |
| `useState`, `useEffect`, event handler | Client Component (`'use client'`) |
| Zustand store, React Query hooks | Client Component |
| Form dengan React Hook Form | Client Component |
| Layout statis, wrapper | Server Component |

**Pola yang dianjurkan**: buat `page.tsx` sebagai Server Component untuk shell/layout, lalu buat komponen child `*-client.tsx` untuk bagian interaktif.

```tsx
// app/(customer)/pesanan/page.tsx  <- Server Component (tidak perlu 'use client')
import PesananList from '@/components/ui/PesananList'; // Client Component

export default function PesananPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Pesanan Saya</h1>
      <PesananList />  {/* fetching & interaksi ada di sini */}
    </div>
  );
}
```

```tsx
// components/ui/PesananList.tsx  <- Client Component
'use client';

import { useQuery } from '@tanstack/react-query';
import { getPesananSaya } from '@/services/pemesanan.service';

export default function PesananList() {
  const { data, isLoading } = useQuery({ ... });
  // ...
}
```

---

## 10. Konvensi & Best Practices

### Penamaan File

| Jenis | Konvensi | Contoh |
|---|---|---|
| Komponen | PascalCase | `PesananCard.tsx` |
| Hook | camelCase + `use` prefix | `useAuth.ts` |
| Service | camelCase + `.service.ts` | `pemesanan.service.ts` |
| Store | camelCase + `.store.ts` | `auth.store.ts` |
| Types | camelCase + `.types.ts` | `pemesanan.types.ts` |
| Util | camelCase | `formatCurrency.ts` |
| Next.js khusus | lowercase | `page.tsx`, `layout.tsx`, `middleware.ts` |

### Alias Path (`tsconfig.json`)

Pastikan `@/` sudah dikonfigurasi agar import lebih rapi:

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

Penggunaan: `import api from '@/lib/axios'` — bukan `../../lib/axios`.

### Konstanta Status (`src/utils/constants.ts`)

```ts
export const STATUS_PESANAN = {
  DIBUAT: 'DIBUAT',
  DITERIMA: 'DITERIMA',
  MENUNGGU: 'MENUNGGU',
  DIPROSES: 'DIPROSES',
  SIAP: 'SIAP',
  SELESAI: 'SELESAI',
  DIBATALKAN: 'DIBATALKAN',
} as const;

export const STATUS_PEMBAYARAN = {
  PAID: 'PAID',
  UNPAID: 'UNPAID',
  PENDING: 'PENDING',
} as const;

export const ROLE = {
  CUSTOMER: 'CUSTOMER',
  ADMIN: 'ADMIN',
  KURIR: 'KURIR',
} as const;
```

### Helper Format (`src/utils/formatCurrency.ts`)

```ts
export const formatCurrency = (amount: number | string): string =>
  new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(Number(amount));

export const formatDate = (date: string | Date): string =>
  new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(date));
```

### Urutan Pengerjaan yang Disarankan

1. ✅ Init Next.js + install dependensi (termasuk Zustand, TanStack Query, Lucide)
2. ✅ Konfigurasi Tailwind (PostCSS), `tsconfig.json` alias `@/`
3. ✅ Buat `src/lib/axios.ts`, `src/lib/query-client.ts`
4. ✅ Buat `src/store/auth.store.ts` + `src/app/providers.tsx`
5. ✅ Buat `src/middleware.ts` untuk auth guard
6. ✅ Buat halaman **Auth** (Login, Register) — termasuk simpan token ke cookie
7. ✅ Buat **Layout** per role (`(customer)/layout.tsx`, `admin/layout.tsx`, `kurir/layout.tsx`)
8. ✅ Kerjakan fitur **Customer**: dashboard → pesan → riwayat → detail → ulasan
9. ✅ Kerjakan fitur **Admin**: pesanan → layanan → outlet → kurir → transaksi → slot
10. ✅ Kerjakan fitur **Kurir**: dashboard → daftar tugas → detail & update status
11. ✅ Polish: loading skeleton, error boundary, responsif mobile
