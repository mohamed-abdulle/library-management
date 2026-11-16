import {
  BookOpen,
  Users,
  ArrowLeftRight,
  TriangleAlert,
  MoveRight,
  UserRoundPlus,
  BookPlus,
  Undo,
} from "lucide-react";
import DashSummaryCard from "./DashSummaryCard";
import RentalsChart from "./RentalChart";
import RentalTable from "../rentals/RentalTable";
import "./dashboard.sass";
import DashBookTable from "./DashBookTable";
import { useEffect, useState } from "react";
import type { DashboardData } from "src/types/dashboardTypes";
import { getDashboardAPI } from "src/api/dashboardApi";
import Loading from "src/components/loading/Loading";
import MyButton from "src/components/my-button/MyButton";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState<DashboardData>();
  const [loading, setLoading] = useState(true);

  const getDashboardData = () => {
    getDashboardAPI().then((res) => {
      setLoading(false);

      setDashboardData(res.data);
    });
  };
  useEffect(getDashboardData, []);
  return (
    <>
      <div className="dashboard">
        {!loading && dashboardData ? (
          <>
            <div className="kpis_cards ">
              <DashSummaryCard
                title="Total Books"
                value={dashboardData.kpis.totalBooks}
                subtitle="Across all categories"
                icon={<BookOpen size={28} />}
                type="info"
              />

              <DashSummaryCard
                title="Customers"
                value={dashboardData.kpis.totalCustomers}
                subtitle="Registered members"
                icon={<Users size={28} />}
                type="success"
              />

              <DashSummaryCard
                title="Active Rentals"
                value={dashboardData.kpis.activeRentals}
                subtitle="Currently borrowed"
                icon={<ArrowLeftRight size={28} />}
                type="neutral"
              />

              <DashSummaryCard
                title="Overdue"
                value={dashboardData?.kpis.overdueRentals}
                subtitle="Need attention"
                icon={<TriangleAlert size={28} />}
                type="danger"
              />
            </div>

            <div className="flex flex-wrap gap-6 mb-6">
              <div className="basis-[400px] flex-grow-2  flex-shrink-0 flex-shrink-1 min-h-[300px]">
                <RentalsChart />
              </div>
              <div className="flex flex-wrap gap-6 flex-grow-1 basis-[520px]">
                <div className="dashboard-card text-xs flex-grow-2 basis-[320px] flex-shrink-1">
                  <div className="dash-card-title-bar ">
                    <h5>Running Low</h5>
                    <MyButton
                      title="See More"
                      link
                      icon={<MoveRight />}
                      iconRight
                      onClick={() => navigate("/books?status=runningLow")}
                    />
                  </div>

                  <DashBookTable books={dashboardData.runningLowBooks} />
                </div>

                <div className="dashboard-card dash-quick-actions">
                  <div className="dash-card-title-bar">
                    <h5>Quick Actions</h5>
                  </div>
                  <div className="dash-actions-wrapper">
                    <div className="dash-action">
                      <BookPlus />
                      <div>Add Book</div>
                    </div>
                    <div className=" dash-action">
                      <UserRoundPlus />
                      <div>Add Customer</div>
                    </div>
                    <div className="dash-action">
                      <ArrowLeftRight /> <div>Rent Book</div>
                    </div>
                    <div className="dash-action">
                      <Undo /> <div>Renturn Rental</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 gap-x-6 mb-4">
              <div className="dashboard-card">
                <div className="dash-card-title-bar">
                  <h5>Recent Rentals</h5>
                  <MyButton
                    title="See More"
                    link
                    icon={<MoveRight />}
                    iconRight
                    onClick={() => navigate("/rentals")}
                  />
                </div>
                <RentalTable
                  rentals={dashboardData.recentRentals}
                  getRentals={() => {}}
                  showColumns={["customer", "book", "rentedDate", "dueDate"]}
                  pagination={false}
                  isCompact
                />
              </div>
              <div className="dashboard-card">
                <div className="dash-card-title-bar">
                  <h5>Overdue Rentals</h5>
                  <MyButton
                    title="See More"
                    link
                    icon={<MoveRight />}
                    iconRight
                    onClick={() => navigate("/rentals?status=overdue")}
                  />
                </div>
                <RentalTable
                  rentals={dashboardData.overdueRentals}
                  getRentals={() => {}}
                  showColumns={["customer", "book", "dueDate", "overdueDays"]}
                  pagination={false}
                  isCompact
                />
              </div>
            </div>
          </>
        ) : (
          <Loading />
        )}
      </div>
    </>
  );
}
