import WelcomeBanner from "./components/WelcomeBanner";
import StatsCards from "./components/StatsCards";
import ActiveOrder from "./components/ActiveOrder";
import CourierInfo from "./components/CourierInfo";
import QuickService from "./components/QuickService";
import HistoryTable from "./components/HistoryTable";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <WelcomeBanner />

      <StatsCards />

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2">
          <ActiveOrder />
        </div>

        <div className="space-y-6">
          <CourierInfo />
          <QuickService />
        </div>
      </div>

      <HistoryTable />
    </div>
  );
}