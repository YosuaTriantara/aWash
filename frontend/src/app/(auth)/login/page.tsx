'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { login } from '@/services/auth.service';
import { Loader2, Eye, EyeOff, WashingMachine } from 'lucide-react';
import Link from 'next/link';
import Button from '@/components/ui/button'
import { useAuthStore } from '@/store/auth.store';


// ─── Validation Schema ────────────────────────────────────────────────────────

const loginSchema = z.object({
  email: z.string().email('Format email tidak valid'),
  password: z.string().min(1, 'Password wajib diisi'),
});

type LoginForm = z.infer<typeof loginSchema>;

// ─── Role Redirect Map ────────────────────────────────────────────────────────

const ROLE_REDIRECT: Record<string, string> = {
  CUSTOMER: '/',
  ADMIN: '/admin',
  KURIR: '/kurir',
};

// ─── Component ────────────────────────────────────────────────────────────────

export default function LoginPage() {
  const router = useRouter();
  const { user, hydrated } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  
  const { mutate, isPending, error } = useMutation({
    mutationFn: login,
    onSuccess: async (data) => {
      await new Promise(resolve => setTimeout(resolve, 100));
      router.replace(ROLE_REDIRECT[data.role] ?? '/');
    },
  });
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });
  
  useEffect(() => {
    if (hydrated && user) {
      router.replace(
        user.role === 'ADMIN' ? '/admin' :
        user.role === 'KURIR' ? '/kurir' : '/'
      );
    }
  }, [user, hydrated]);

  if (hydrated && user) return null;

  const onSubmit = (data: LoginForm) => mutate(data);

  const errorMessage =
    error instanceof Error ? error.message : error ? 'Login gagal, coba lagi.' : null;

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: '#F0F7FF' }}>
      {/* ── Left Panel (branding) ── */}
      <div
        className="hidden lg:flex flex-col justify-between w-1/2 p-12"
        style={{ backgroundColor: '#1A6FD4' }}
      >
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}
          >
            <WashingMachine className="w-6 h-6 text-white" />
          </div>
          <span className="text-white text-xl font-bold tracking-tight">aWash</span>
        </div>

        {/* Center copy */}
        <div>
          <div
            className="inline-block text-xs font-semibold tracking-widest uppercase mb-6 px-3 py-1 rounded-full"
            style={{ backgroundColor: 'rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.9)' }}
          >
            Laundry Online
          </div>
          <h1 className="text-5xl font-black text-white leading-tight mb-4">
            Bersih,<br />
            Rapi,<br />
            <span style={{ color: '#93C5FD' }}>Tepat Waktu.</span>
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.7)' }} className="text-base leading-relaxed max-w-xs">
            Pesan layanan laundry dari rumah. Kami jemput, cuci, dan antar balik — semuanya terlacak langsung di aplikasi.
          </p>
        </div>

        {/* Bottom stats */}
        <div className="flex gap-8">
          {[
            { value: '2.400+', label: 'Pesanan selesai' },
            { value: '98%', label: 'Tepat waktu' },
            { value: '4.9★', label: 'Rating rata-rata' },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="text-white text-2xl font-bold">{stat.value}</p>
              <p style={{ color: 'rgba(255,255,255,0.6)' }} className="text-xs mt-0.5">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Right Panel (form) ── */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-sm">

          {/* Mobile logo */}
          <div className="flex items-center gap-2 mb-10 lg:hidden">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: '#1A6FD4' }}
            >
              <WashingMachine className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold" style={{ color: '#1A6FD4' }}>aWash</span>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-1">Masuk ke akun</h2>
          <p className="text-sm text-gray-500 mb-8">
            Belum punya akun?{' '}
            <Link
              href="/register"
              className="font-medium"
              style={{ color: '#1A6FD4' }}
            >
              Daftar sekarang
            </Link>
          </p>

          {/* Error banner */}
          {errorMessage && (
            <div
              className="text-sm px-4 py-3 rounded-lg mb-6"
              style={{ backgroundColor: '#FEE2E2', color: '#991B1B' }}
            >
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1.5"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="nama@email.com"
                {...register('email')}
                className="w-full px-4 py-3 rounded-xl text-sm text-gray-900 border outline-none transition-all placeholder-gray-400"
                style={{
                  borderColor: errors.email ? '#EF4444' : '#E5E7EB',
                  backgroundColor: '#FFFFFF',
                }}
                onFocus={(e) => (e.target.style.borderColor = '#1A6FD4')}
                onBlur={(e) =>
                  (e.target.style.borderColor = errors.email ? '#EF4444' : '#E5E7EB')
                }
              />
              {errors.email && (
                <p className="text-xs mt-1.5" style={{ color: '#EF4444' }}>
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>

              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  placeholder="Masukkan password"
                  {...register('password')}
                  className="w-full px-4 py-3 pr-11 rounded-xl text-sm text-gray-900 border outline-none transition-all placeholder-gray-400"
                  style={{
                    borderColor: errors.password ? '#EF4444' : '#E5E7EB',
                    backgroundColor: '#FFFFFF',
                  }}
                  onFocus={(e) => (e.target.style.borderColor = '#1A6FD4')}
                  onBlur={(e) =>
                    (e.target.style.borderColor = errors.password ? '#EF4444' : '#E5E7EB')
                  }
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-xs mt-1.5" style={{ color: '#EF4444' }}>
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isPending}
              className="w-full py-3 rounded-xl text-sm font-semibold text-white transition-all flex items-center justify-center gap-2 mt-2"
              style={{
                backgroundColor: isPending ? '#93C5FD' : '#1A6FD4',
                cursor: isPending ? 'not-allowed' : 'pointer',
              }}
            >
              {isPending && <Loader2 className="w-4 h-4 animate-spin" />}
              {isPending ? 'Memproses...' : 'Masuk'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}