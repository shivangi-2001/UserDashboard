import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Layout from "../components/Layout";
import PageTitle from "../components/PageTitle";
import { useBatteryIdMutation } from "../services/BatteryData";
import { cell_information, extractValue, materialColumn, performanceColumn, researchColumn, testingColumn } from "../utilis/batteryColumns";
import RelatedResearch from "../pageComponents/BatteryId/relatedResearch";

const BatteryID = () => {
    const ContentRef = useRef(null);

    const { id } = useParams();  
    const { batteryId } = useSelector(state => state.batteryContentTable);
    const [BatteryIdAPI, {isLoading}] = useBatteryIdMutation();

    const [perfrom, setPerform] = useState({
        "Active cathode volume expansion (%)" :'',
        "Active anode volume expansion (%)" :'',
        "Cycle number" :'',
        "Retention Percentage of Capacity" :'',
        "Discharge Gravimetric Specific  Capacity (mAh/g)" :'',
        "Discharge Gravimetric  Specific Energy (WhKg-1)" :'',
        "Discharge  Gravimetric  Specific  Capacitance (F/g)" :'',
        "Discharge Areal  Specific Capacitance  (F/cm2)" :'',
        "Charge Gravimetric Specific  Capacity (mAh/g)" :'',
        "Charge Gravimetric   Specific  Energy (WhK/g)" :'',
        "Energy Effeciency" :'',
        "Coulombic Effeciency" :'',
        "Open Circuit Voltage (Volt)" :'',
    })

    const [material, setMaterial] = useState({
        "Active Cathode": '',
        "Elements in Cathode": '',
        "Active Anode": '',
        "Elements in Anode": '',
        "Electrolyte Salt & Solvent": '',
        "Separator": '',
        "Shuttling Ion": '',
    })

    const [testing, setTesting] = useState({
        "Current Density (mA/g)": '',
        "Current Density (C)": '',
        "Temperature (K)": '',
        "Testing Environment": '',
        "Minium Voltage (V)": '',
        "Maximum Voltage (V)": '',
    })


    const [cell, setCell] = useState({
        "Measurement Method": '',
        "Cell Component Weight (specific gravimetric calculation)": '',
        "Total weight of active anode (g)": '',
        "Total weight of active cathode (g)": '',
        "Total weight of anode (g)": '',
        "Total weight of cathode (g)": '',
        "Total weight of cell without casing (g)": '',
        "Total weight of cell (g)": '',
        "Total volume of active anode (cm3)": '',
        "Total volume of active cathode (cm3)": '',
        "Total volume of anode (cm3)": '',
        "Total volume of cathode (cm3)": '',
        "Total volume of cell without casing (cm3)": '',
        "Total volume of cell (cm3)": '',
        "Total area of the cathode (cm2)": '',
        "Total area of the anode (cm2)": '',
        "Full or Half Cell": '',
    })

    const [research, setResearch] = useState({
        'id': '',
        "Title": "",
        "Year of publication": "",
        "link": "",
        "DOI": "",
        "Journal": "",
        "Authors": "",
        "Contributor": ""
    })

    const [processing, setProcessing] = useState()
    const [cellAssembly, setCellAssembly] = useState();

    const batteryID = async() => {
        let result;
        if(batteryId) {
            result  = await BatteryIdAPI({batteryId}).unwrap();
        }else{
            result  = await BatteryIdAPI({ id }).unwrap();
        }

        if(result.message){
            console.log(result.message);
            setProcessing(result?.message.material_processing);
            setCellAssembly(result?.message.cell_assembly);
            setPerform({
                "Active cathode volume expansion (%)" : extractValue(result?.message.active_anode_volume),
                "Active anode volume expansion (%)" : extractValue(result?.message.active_cathode_volume),
                "Cycle number" : result?.message.cycle_number,
                "Retention Percentage of Capacity" : extractValue(result?.message.retention_percentage),
                "Discharge Gravimetric Specific  Capacity (mAh/g)" : extractValue(result?.message.discharge_gravimetric_specific_energy),
                "Discharge Gravimetric  Specific Energy (WhKg-1)" : extractValue(result?.message.discharge_gravimetric_specific_capacity),
                "Discharge  Gravimetric  Specific  Capacitance (F/g)" : extractValue(result?.message.discharge_gravimetric_specific_capacitance),
                "Discharge Areal  Specific Capacitance  (F/cm2)" : extractValue(result?.message.discharge_areal_specific_capacitance),
                "Charge Gravimetric Specific  Capacity (mAh/g)" : extractValue(result?.message.charge_gravimetric_specifc_capacity),
                "Charge Gravimetric   Specific  Energy (WhK/g)" : extractValue(result?.message.discharge_gravimetric_specific_energy),
                "Energy Effeciency" : extractValue(result?.message.energy),
                "Coulombic Effeciency" : extractValue(result?.message.coulombic),
                "Open Circuit Voltage (Volt)" : extractValue(result?.message.open_circuit_voltage),
            })

            setMaterial({
                "Active Cathode": result?.message.active_cathode,
                "Elements in Cathode": result?.message.element_cathode?.join(", "),
                "Active Anode": result?.message.active_anode,
                "Elements in Anode": result?.message.element_anode?.join(", "),
                "Electrolyte Salt & Solvent": result?.electrolyte,
                "Separator": result?.message.separator,
                "Shuttling Ion": result?.message.shuttling_ion,
            })

            setTesting({
                "Current Density (mA/g)": extractValue(result?.message.current_density_mag),
                "Current Density (C)": extractValue(result?.message.current_density_c),
                "Temperature (K)": extractValue(result?.message.temperature),
                "Testing Environment": result?.message.testing_env,
                "Minium Voltage (V)": extractValue(result?.message.min_voltage),
                "Maximum Voltage (V)": extractValue(result?.message.max_voltage),
            })

            setCell({
                "Measurement Method": result?.message.measurement_method,
                "Cell Component Weight (specific gravimetric calculation)": result?.cellComponentWeight,
                "Total weight of active anode (g)": extractValue(result?.message.tw_active_anode),
                "Total weight of active cathode (g)": extractValue(result?.message.tw_active_cathode),
                "Total weight of anode (g)": extractValue(result?.message.tw_anode),
                "Total weight of cathode (g)": extractValue(result?.message.tw_cathode),
                "Total weight of cell without casing (g)": extractValue(result?.message.tw_cell_without_casing),
                "Total weight of cell (g)": extractValue(result?.message.tw_cell),
                "Total volume of active anode (cm3)": extractValue(result?.message.tv_active_anode),
                "Total volume of active cathode (cm3)": extractValue(result?.message.tv_active_cathode),
                "Total volume of anode (cm3)": extractValue(result?.message.tv_anode),
                "Total volume of cathode (cm3)": extractValue(result?.message.tv_cathode),
                "Total volume of cell without casing (cm3)": extractValue(result?.message.tv_cell_without_casing),
                "Total volume of cell (cm3)": extractValue(result?.message.tv_cell),
                "Total area of the cathode (cm2)": extractValue(result?.message.ta_cathode),
                "Total area of the anode (cm2)": extractValue(result?.message.ta_anode),
                "Full or Half Cell": result?.message.full_half_cell,
            })

            setResearch({
                "id": result?.message.research_paper_id,
                "Title": result?.message.title,
                "Year of publication": result?.message.year,
                "link": result?.message.link,
                "DOI": result?.message.doi,
                "Journal": result?.message.journal,
                "Authors": result?.message.authors_list?.join(", "),
                "Contributor": result?.message.contributor +" - "+ result?.message.contributor_email
            })

        }
    }

    useEffect(()=>{
        batteryID();
    }, [id])
    return ( 
        <Layout>
            <PageTitle title={`Battery-${id}`} />
            <div ref={ContentRef} className="w-full sm:w-[80%] mx-auto px-4 py-8 bg-gray-50">
            
            <h3 className="mb-5 ml-2 text-5xl font-light text-indigo-900">{material["Active Cathode"]}</h3>

            
            <div className="grid sm:grid-cols-2 gap-5 p-5 rounded-md bg-white mb-5">
                <header className="text-3xl font-bold text-indigo-800">Performance</header>
                {performanceColumn.map((col, index) => (
                    <div key={index} className="flex flex-1 justify-between border-b gap-3 border-b-gray-700/20 border-spacing-2">
                        <p className="text-zinc-500">{col}</p>
                        <p className="font-bold">{perfrom[col] || '-'}</p>
                    </div>
                ))}
            </div>

            <div className="grid sm:grid-cols-2 gap-5 p-5 rounded-md bg-white mb-5">
            <header className="text-3xl font-bold text-indigo-800">Materials</header>
                {materialColumn.map((col, index) => (
                    <div key={index} className="columns-2 border-b gap-3 border-b-gray-700/20 border-spacing-2">
                        <p className="text-zinc-500">{col}</p>
                        <p className="font-bold">{material[col] || '-'}</p>
                    </div>
                ))}
            </div>

            <div className="grid sm:grid-cols-2 gap-5 p-5 rounded-md bg-white mb-5">
            <header className="text-3xl font-bold text-indigo-800">Testing Condition</header>
                {testingColumn.map((col, index) => (
                    <div key={index} className="columns-2 border-b gap-3 border-b-gray-700/20 border-spacing-2">
                        <p className="text-zinc-500">{col}</p>
                        <p className="font-bold">{testing[col] || '-'}</p>
                    </div>
                ))}
            </div>

            <div className="grid sm:grid-cols-2 gap-5 p-5 rounded-md bg-white mb-5">
            <header className="text-3xl font-bold text-indigo-800">Cell Information</header>
                {cell_information.map((col, index) => (
                    <div key={index} className="flex flex-1 justify-between border-b gap-3 border-b-gray-700/20 border-spacing-2">
                        <p className="text-zinc-500">{col}</p>
                        <p className="font-bold">{cell[col] || '-'}</p>
                    </div>
                ))}
            </div>

            <div className="grid grid-flow-row gap-5 p-5 rounded-md bg-white mb-5">
                <header className="text-3xl font-bold text-indigo-800">Material Processing</header>
                <div className="columns-2 gap-3 text-gray-600">
                    <p>{processing}</p>
                </div>
            </div>

            <div className="grid grid-flow-row gap-5 p-5 rounded-md bg-white mb-5">
                <header className="text-3xl font-bold text-indigo-800">Cell Assembly</header>
                <div className="columns-2 gap-3 text-gray-600">
                    <p>{cellAssembly}</p>
                </div>
            </div>


            <div className="grid sm:grid-cols-2 gap-5 p-5 rounded-md bg-white mb-5 text-blue-600">
            <header className="text-3xl font-bold text-indigo-800">Research Paper</header>
                {researchColumn.map((col, index) => (
                    <div key={index} className="flex flex-1 justify-between border-b gap-3 border-b-gray-700/20 border-spacing-2">
                        <p className="text-zinc-500">{col}</p>
                        <p className="text-wrap text-end">{research[col] || '-'}</p>
                    </div>
                ))}
            </div>
            </div>

            <br />
            <RelatedResearch id={research.id} contentRef={ContentRef} />
        </Layout>
    );
}

export default BatteryID;
