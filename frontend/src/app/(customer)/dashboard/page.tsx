'use client';

import { useEffect, useState } from "react";

import WelcomeBanner from "./components/WelcomeBanner";
import StatsCards from "./components/StatsCards";
import ActiveOrder from "./components/ActiveOrder";
import CourierInfo from "./components/CourierInfo";
import QuickService from "./components/QuickService";
import HistoryTable from "./components/HistoryTable";

import { getOrders } from "@/services/order.service";

export default function DashboardPage() {

  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getOrders();
        setOrders(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="space-y-8">

      <WelcomeBanner />

      <StatsCards orders={orders} />

      <div className="grid grid-cols-3 gap-6">

        <div className="col-span-2">
          <ActiveOrder orders={orders} />
        </div>

        <div className="space-y-6">
          <CourierInfo orders={orders} />
          <QuickService />
        </div>

      </div>

      <HistoryTable orders={orders} />

    </div>
  );
}