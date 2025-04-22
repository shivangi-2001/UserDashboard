import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  defaultActiveColumns: {
    "ID": true,
    "Shuttling Ion": true,
    "Active Cathode": true,
    "Elements in Cathode": false,
    "Active Anode": true,
    "Elements in Anode": false,
    "Electrolyte Salt & Solvent": false,
    "Separator": false,
    "Processing Details": false,
    "Current Density (mA/g)": false,
    "Current Density (C)": false,
    "Temperature (K)": true,
    "Testing Environment": false,
    "Minium Voltage (V)": false,
    "Maximum Voltage (V)": false,
    "Measurement Method": false,
    "Cell Component Weight (specific gravimetric calculation)": false,
    "Total weight of active anode (g)": false,
    "Total weight of active cathode (g)": false,
    "Total weight of anode (g)": false,
    "Total weight of cathode (g)": false,
    "Total weight of cell without casing (g)": false,
    "Total weight of cell (g)":  false,
    "Total volume of active anode (cm3)": false,
    "Total volume of active cathode (cm3)": false,
    "Total volume of anode (cm3)": false,
    "Total volume of cathode (cm3)": false,
    "Total volume of cell without casing (cm3)": false,
    "Total volume of cell (cm3)": false,
    "Total area of the cathode (cm2)": false,
    "Total area of the anode (cm2)": false,
    "Full or Half Cell": false,
    "Active cathode volume expansion (%)": false,
    "Active anode volume expansion (%)": false,
    "Cycle number": false,
    "Retention Percentage of Capacity": false,
    "Discharge Gravimetric Specific  Capacity (mAh/g)": true,	
    "Discharge Gravimetric  Specific Energy (WhKg-1)": false,
    "Discharge  Gravimetric  Specific  Capacitance (F/g)": false,
    "Discharge Areal  Specific Capacitance  (F/cm2)": false,
    "Charge Gravimetric Specific  Capacity (mAh/g)": false,
    "Charge Gravimetric   Specific  Energy (WhK/g)": false,	
    "Energy Effeciency": false,
    "Coulombic Effeciency": false,
    "Open Circuit Voltage (Volt)": false
  },
  rowPerPage: 10,
  currentPage: 1,
  totalRecords: 0,
  records: null,
  batteryId: '',
};

const batteryContentTable = createSlice({
  name: "BatteryContentTable",
  initialState,
  reducers: {
    toggleColumn: (state, action) => {
      const columnName = action.payload;
      state.defaultActiveColumns[columnName] = !state.defaultActiveColumns[columnName];
    },
    setRowsPerPage: (state, action) => {
      state.rowPerPage = action.payload;
      state.currentPage = 1; 
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setTotalRecords: (state, action) => {
      state.totalRecords = action.payload
    },
    setRecords: (state, action) => {
      state.records = action.payload
    },
    setBatteryId: (state, action) => {
      state.batteryId = action.payload
    },
    
  },
});

export const { toggleColumn, setRowsPerPage, setCurrentPage, setTotalRecords, setRecords, setBatteryId } = batteryContentTable.actions;
export default batteryContentTable.reducer;

