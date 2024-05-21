import ManagerDashboardCalendarComponent from "@/components/manager/dashboard/manager.dashboard.calendar.component";
// import ManagerDashboardTableComponent from "@/components/manager/dashboard/manager.dashboard.table.component";
import ManagerDashboardChartComponent from "@/components/manager/dashboard/manager.dashboard.chart.component";
import ManagerDashboardStatsComponent from "@/components/manager/dashboard/manager.dashboard.stats.component";
import ManagerDashboardTableComponent from "@/components/manager/dashboard/manager.dashboard.table.component";
import React from "react";
const ManagerDashboardPage = () => {
  return (
    <div>
      <div className='w-full h-96 flex flex-wrap mb-10 px-4 sm:px-6 md:px-8 mt-20'>
        <div className='w-full lg:w-1/2'>
          <ManagerDashboardChartComponent />
          <div className='my-10 lg:my-5'>
            <ManagerDashboardStatsComponent />
          </div>
          <div className='my-10 lg:my-5 border-none '>
            <ManagerDashboardTableComponent />
          </div>
        </div>
        <div className='w-full lg:w-1/2  '>
          <ManagerDashboardCalendarComponent />
        </div>
      </div>
    </div>
  );
};

export default ManagerDashboardPage;
