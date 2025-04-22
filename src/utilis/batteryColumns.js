export const BatteryColumn = [
    "ID",
    "Discharge Gravimetric Specific  Capacity (mAh/g)",
    "Active Cathode",
    "Elements in Cathode",
    "Active Anode",
    "Elements in Anode",
    "Electrolyte Salt & Solvent",
    "Separator",
    "Processing Details",
    "Current Density (mA/g)",
    "Current Density (C)",
    "Temperature (K)",
    "Shuttling Ion",
    "Testing Environment",
    "Minium Voltage (V)",
    "Maximum Voltage (V)",
    "Measurement Method",
    "Cell Component Weight (specific gravimetric calculation)",
    "Total weight of active anode (g)",
    "Total weight of active cathode (g)",
    "Total weight of anode (g)",
    "Total weight of cathode (g)",
    "Total weight of cell without casing (g)",
    "Total weight of cell (g)",
    "Total volume of active anode (cm3)",
    "Total volume of active cathode (cm3)",
    "Total volume of anode (cm3)",
    "Total volume of cathode (cm3)",
    "Total volume of cell without casing (cm3)",
    "Total volume of cell (cm3)",
    "Total area of the cathode (cm2)",
    "Total area of the anode (cm2)",
    "Full or Half Cell",
    "Active cathode volume expansion (%)",
    "Active anode volume expansion (%)",
    "Cycle number",
    "Retention Percentage of Capacity",
    "Discharge Gravimetric  Specific Energy (WhKg-1)",
    "Discharge  Gravimetric  Specific  Capacitance (F/g)",
    "Discharge Areal  Specific Capacitance  (F/cm2)",
    "Charge Gravimetric Specific  Capacity (mAh/g)",
    "Charge Gravimetric   Specific  Energy (WhK/g)",
    "Energy Effeciency",
    "Coulombic Effeciency",
    "Open Circuit Voltage (Volt)",
];

export const extractValue = (value) => {
    if (value && typeof value === "object" && "$numberDecimal" in value) {
      return value.$numberDecimal || '-';
    }
    return value || '-';
};


export const performanceColumn = [
  "Active cathode volume expansion (%)",
  "Active anode volume expansion (%)",
  "Cycle number",
  "Retention Percentage of Capacity",
  "Discharge Gravimetric Specific  Capacity (mAh/g)",
  "Discharge Gravimetric  Specific Energy (WhKg-1)",
  "Discharge  Gravimetric  Specific  Capacitance (F/g)",
  "Discharge Areal  Specific Capacitance  (F/cm2)",
  "Charge Gravimetric Specific  Capacity (mAh/g)",
  "Charge Gravimetric   Specific  Energy (WhK/g)",
  "Energy Effeciency",
  "Coulombic Effeciency",
  "Open Circuit Voltage (Volt)",
]

export const materialColumn = [
  "Active Cathode",
  "Elements in Cathode",
  "Active Anode",
  "Elements in Anode",
  "Electrolyte Salt & Solvent",
  "Separator",
  "Shuttling Ion",
]

export const testingColumn = [
    "Current Density (mA/g)",
    "Current Density (C)",
    "Temperature (K)",
    "Testing Environment",
    "Minium Voltage (V)",
    "Maximum Voltage (V)",
]

export const cell_information = [
  "Measurement Method",
    "Cell Component Weight (specific gravimetric calculation)",
    "Total weight of active anode (g)",
    "Total weight of active cathode (g)",
    "Total weight of anode (g)",
    "Total weight of cathode (g)",
    "Total weight of cell without casing (g)",
    "Total weight of cell (g)",
    "Total volume of active anode (cm3)",
    "Total volume of active cathode (cm3)",
    "Total volume of anode (cm3)",
    "Total volume of cathode (cm3)",
    "Total volume of cell without casing (cm3)",
    "Total volume of cell (cm3)",
    "Total area of the cathode (cm2)",
    "Total area of the anode (cm2)",
    "Full or Half Cell",
]


export const researchColumn = [
  "Title",
  "Year of publication",
  "link",
  "DOI",
  "Journal",
  "Authors",
  "Contributor"
]


export const relatedResearchColumn = [
  'ID',
  "Discharge Gravimetric Specific  Capacity (mAh/g)",
  "Active Cathode",
  "Active Anode",
  "Current Density (mA/g)",
  "Current Density (C)",
  "Temperature (K)",
  "Minium Voltage (V)",
  "Maximum Voltage (V)",
  "Measurement Method",
  "Full or Half Cell",
  "Cycle number",
  "Retention Percentage of Capacity",
]