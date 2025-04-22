import { useEffect, useRef } from "react";
import Layout from "../components/Layout";
import SearchBox from "../pageComponents/Index/SearchBox";
import BatteryFilter from "../pageComponents/Index/BatteryFilter"
import BatteryTable from "../pageComponents/Index/BatteryTable";

function Index() {
   const batteryContentRef = useRef(null);
   
   return ( 
      <Layout>
         <SearchBox batteryContentRef={batteryContentRef}/>
         <BatteryFilter />
         <div ref={batteryContentRef}>
            <BatteryTable  />
         </div>
      </Layout>
   );
}

export default Index;