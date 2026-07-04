'use client';

import { useState } from 'react';

import OrderTabs from './components/orderTabs';
import ValidationOrderTable from './components/validationOrderTable';
import ActiveOrderTable from './components/activeOrderTable';
import PickupPaymentTable from './components/pickupPaymentTable';

export default function OrderPage() {

  const [tab, setTab] = useState('validation');

  return (

    <div className="space-y-6">

      <div>

        <h1 className="text-3xl font-bold">
          Pesanan
        </h1>

        <p className="text-gray-500 mt-1">
          Kelola seluruh pesanan laundry.
        </p>

      </div>

      <OrderTabs
        value={tab}
        onChange={setTab}
      />

      {tab === 'validation' && (
        <ValidationOrderTable />
      )}

      {tab === 'active' && (
        <ActiveOrderTable />
      )}

      {tab === 'pickup' && (
        <PickupPaymentTable />
      )}

    </div>

  );
}