import api from '@/lib/axios';
import { AxiosResponse } from 'axios';
import Cookies from 'js-cookie';
import { useAuthStore, AuthUser } from '@/store/auth.store';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface RegisterDTO {
  nama: string;
  email: string;
  password: string;
  no_telepon: string;
  alamat?: string;
  tanggal_lahir?: string;
}

export interface LoginDTO {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  role: 'CUSTOMER' | 'ADMIN' | 'KURIR';
  user: AuthUser;
}

export interface RegisterResponse {
  id_user: string;
  email: string;
  role: 'CUSTOMER';
}

export interface MeResponse {
  success: boolean;
  message: string;
  data: AuthUser;
}

// ─── Service Functions ────────────────────────────────────────────────────────

export const register = async (data: RegisterDTO): Promise<RegisterResponse> => {
  try {
    const response = await api.post('/auth/register', data);

    return response.data;

  } catch (error: any) {

    throw new Error(
      error.response?.data?.message || 'Register gagal'
    );

  }
};

export const login = async (data: LoginDTO): Promise<LoginResponse> => {
  const response = await api.post('/auth/login', data);
  const res = response.data.data;

  Cookies.set('awash-token', res.token, { expires: 7 });
  Cookies.set('awash-role', res.role, { expires: 7 });
  api.defaults.headers.common.Authorization = `Bearer ${res.token}`;

  const me = await getMe();
  useAuthStore.getState().login(me.data, res.token);

  return {
    ...res,
    user: me.data
  };
};

export const logout = (): void => {
  Cookies.remove('awash-token');
  Cookies.remove('awash-role');
  useAuthStore.getState().logout();
};

export const getMe = (): Promise<MeResponse> =>
  api.get('/auth/me').then((r) => r.data);
