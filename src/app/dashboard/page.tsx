import { StatsCard } from "@expo/components/stats-card";
import { ExpertsChart } from "./components/experts-chart";
import { Button } from "@expo/components/ui/button";
import Link from "next/link";
import { ExpertsTable } from "../resources/experts/components/experts-table";
import { getDashboardExperts } from "@expo/lib/actions/actions";
import { Header } from "@expo/components/header";
import { TopTitle } from "@expo/components/top-title";
export default async function DashboardPage() {
   const { experts, stats } = await getDashboardExperts();



  return (
    <>
      <Header />

      <div className="p-8 space-y-8">

      
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Total Experts"
            value={stats.total}
            trend={{ value: 12.5, isPositive: true }}
            period="vs last month"
          />
          <StatsCard
            title="Active Experts"
            value={stats.active}
            trend={{ value: 8.2, isPositive: true }}
            period="vs last month"
          />
          <StatsCard
            title="Projects Completed"
            value={stats.projectsCompleted}
            trend={{ value: 5.7, isPositive: true }}
            period="vs last month"
          />
          <StatsCard
            title="Average Response Rate"
            value={`${stats.averageResponseRate}%`}
            trend={{ value: 2.1, isPositive: false }}
            period="vs last month"
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg border p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold">Expert Growth</h3>
              <select className="text-sm border rounded-md px-2 py-1">
                <option>Last 12 months</option>
                <option>Last 6 months</option>
                <option>Last 30 days</option>
              </select>
            </div>
            <ExpertsChart data={stats.growthData} />
          </div>

          <div className="bg-white rounded-lg border p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold">Expertise Distribution</h3>
              <select className="text-sm border rounded-md px-2 py-1">
                <option>All Time</option>
                <option>This Year</option>
                <option>This Month</option>
              </select>
            </div>
            <ExpertsChart data={stats.expertiseData} />
          </div>
        </div>

        {/* Recent Experts Table */}
        <div className="bg-white rounded-lg border">
          <div className="p-6 border-b">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Recent Experts</h3>
              <Button variant="outline" size="sm" asChild>
                <Link href="/experts">View All</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
