import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface AuthUser {
  id_user: string;
  nama: string;
  email: string;
  no_telepon: string;
  role: 'CUSTOMER' | 'ADMIN' | 'KURIR';
  last_login: string | null;
  // CUSTOMER
  id_customer?: string;
  alamat?: string;
  tanggal_lahir?: string | null;
  tanggal_daftar?: string;
  // ADMIN
  id_admin?: string;
  id_outlet?: string;
  // KURIR
  id_kurir?: string;
  jenis_kendaraan?: string;
  nomor_kendaraan?: string;
  status_kurir?: string;
}

interface AuthState {
  user: AuthUser | null;
  token: string | null;
  hydrated: boolean;

  login: (user: AuthUser, token: string) => void;
  logout: () => void;
  setHydrated: (val: boolean) => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      hydrated: false,
      login: (user, token) => set({ user, token }),
      logout: () => set({ user: null, token: null }),
      setHydrated: (val) => set({hydrated: val}),
    }),
    {
      name: 'awash-auth',
      onRehydrateStorage: () => (state) => {
        state?.setHydrated(true);
      },
    }
  )
);