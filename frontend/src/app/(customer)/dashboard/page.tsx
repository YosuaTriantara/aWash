import WelcomeBanner from "@/components/customer/dashboard/WelcomeBanner";
import StatsCards from "@/components/customer/dashboard/StatsCards";
import ActiveOrder from "@/components/customer/dashboard/ActiveOrder";

export default function DashboardPage() {
  return (
    <>
      <WelcomeBanner />
      <StatsCards />

      <ActiveOrder />
    </>
  );
}