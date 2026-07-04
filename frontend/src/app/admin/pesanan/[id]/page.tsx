'use client';

import { useParams } from 'next/navigation';

import OrderInfo from './components/orderInfo';
import ValidationForm from './components/validationForm';

import { useOrderDetail } from '@/hooks/admin/useOrderDetails';

export default function OrderDetailPage() {
  const params = useParams();

  const orderId = params.id as string;

  const { data, isLoading } = useOrderDetail(orderId);

  const order = data?.data;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          Detail Pesanan
        </h1>

        <p className="text-gray-500 mt-1">
          Pesanan {orderId}
        </p>
      </div>

      <OrderInfo order={order} />

      <ValidationForm order={order} />
    </div>
  );
}