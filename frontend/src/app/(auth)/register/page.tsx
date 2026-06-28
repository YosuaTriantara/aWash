'use client';

import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { register as registerUser } from '@/services/auth.service';
import { Loader2 } from 'lucide-react';

// validation
const registerSchema = z.object({
  nama: z.string().min(1, 'Nama wajib diisi'),
  email: z.string().email('Email tidak valid'),
  password: z.string().min(6, 'Password minimal 8 karakter'),
  no_telepon: z.string().min(10, 'Nomor telepon tidak valid'),
  alamat: z.string().min(1, 'Alamat wajib diisi'),
});

type RegisterForm = z.infer<typeof registerSchema>;

export default function RegisterPage(){
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState:{errors}
  } = useForm<RegisterForm>({
    resolver:zodResolver(registerSchema)
  });

  const {mutate,isPending,error}=useMutation({
    mutationFn: registerUser,
    onSuccess:()=>{
      router.push('/');
    }
  });

  const onSubmit=(data:RegisterForm)=>{
    console.log(data)
    mutate(data);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded-2xl w-full max-w-md space-y-4"
      >
        <h1 className="text-2xl font-bold">
          Daftar akun
        </h1>
        <input
          placeholder="Nama"
          {...register('nama')}
          className="w-full border p-3 rounded"
        />
        {errors.nama &&
          <p className="text-red-500 text-sm">
            {errors.nama.message}
          </p>
        }

        <input
          placeholder="Email"
          {...register('email')}
          className="w-full border p-3 rounded"
        />
        {errors.email &&
          <p className="text-red-500 text-sm">
            {errors.email.message}
          </p>
        }

        <input
          placeholder="Password"
          type="password"
          {...register('password')}
          className="w-full border p-3 rounded"
        />
        {errors.password &&
          <p className="text-red-500 text-sm">
            {errors.password.message}
          </p>
        }

        <input
          placeholder="No Telepon"
          {...register('no_telepon')}
          className="w-full border p-3 rounded"
        />
        {errors.no_telepon &&
          <p className="text-red-500 text-sm">
            {errors.no_telepon.message}
          </p>
        }
        {error && (
          <p className="text-red-500">
            {error.message}
          </p>
        )}

        <input
            placeholder="Alamat"
            {...register('alamat')}
            className="w-full border p-3 rounded"
        />
        {errors.alamat && (
            <p className="text-red-500 text-sm">
                {errors.alamat.message}
            </p>
        )}

        <button
          disabled={isPending}
          className="w-full bg-blue-600 text-white p-3 rounded"
        >
          {isPending &&
            <Loader2 className="inline animate-spin mr-2"/>
          }
          Daftar
        </button>
      </form>
    </div>
  )
}