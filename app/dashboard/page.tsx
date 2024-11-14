import { getServerSession } from 'next-auth'
import React from 'react'
import { RadialChart } from '../components/charts/mini-chart/RadialChart';
import BlockDetails from '../components/mini-component/BlockDetails';
import {
  Users,
  PhilippinePeso
} from "lucide-react"
import { LineChartComponent } from '../components/charts/large-chart/LineChart';
import { PieChartComponent } from '../components/charts/mini-chart/PieChart';
import BarChartComp from '../components/charts/mini-chart/Chart';

const page = async () => {
  const session = await getServerSession();

  return (
    <div id="main" className="space-y-7 ">
      <h1 className="text-2xl text-slate-600">Dashboard</h1>

      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-9 space-y-10">
          <div className="grid grid-cols-3" >
            <BarChartComp/>
            <BarChartComp/>

            <BarChartComp/>

            {/* <BarChartComp/> */}

            {/* <BlockDetails field="money" icon={PhilippinePeso} title="Today's Revenue" total={1500} description="Total revenue as of the moment." />
            <BlockDetails icon={Users} title="Today's Number of Attendee" total={65} description="Total number of attendee as of the moment." />
            <BlockDetails icon={Users} title="Today's Number of Non-Member Today" total={65} description="Total number of attendee as of the moment." />
            <BlockDetails icon={Users} title="Today's Number of Member Today" total={65} description="Total number of attendee as of the moment." /> */}

          </div>
          <LineChartComponent />
        </div>
        <div className="col-span-3">
          <PieChartComponent/>
        </div>
      </div>

    </div>
  )
}

export default page