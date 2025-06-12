import { useEffect, useRef } from "react";
import Layout from "../components/Layout";
import SearchBox from "../pageComponents/Index/SearchBox";
import BatteryFilter from "../pageComponents/Index/BatteryFilter";
import BatteryTable from "../pageComponents/Index/BatteryTable";

function Index() {
  const batteryContentRef = useRef(null);

  return (
    <Layout>
      <div className="mt-20 mb-40 grid gap-5">
        <SearchBox batteryContentRef={batteryContentRef} />
        <BatteryFilter />
        <div ref={batteryContentRef}>
          <BatteryTable />
        </div>
      </div>
    </Layout>
  );
}

export default Index;
