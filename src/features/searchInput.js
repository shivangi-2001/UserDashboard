import { createSlice } from "@reduxjs/toolkit";

const searchParams = new URLSearchParams(window.location.search);

const formulaKey =
  Array.from(searchParams.keys()).find((key) => key.endsWith("_formula")) ||
  Array.from(searchParams.keys()).find((key) => key.endsWith("_include")) ||
  Array.from(searchParams.keys()).find((key) => key.endsWith("_exclude")) ||
  '';

const formulaValue = formulaKey ? searchParams.get(formulaKey) : '';

const getParameter = (params, tab) => {
  const map = {
    "electrode,include": "electrode_include",
    "electrode,exclude": "electrode_exclude",
    "electrode,formula": "electrode_formula",
    "anode,formula": "anode_formula",
    "anode,include": "anode_include",
    "anode,exclude": "anode_exclude",
    "cathode,formula": "cathode_formula",
    "cathode,include": "cathode_include",
    "cathode,exclude": "cathode_exclude",
  };
  return map[`${params},${tab}`] || "";
};

const initialState = {
  searchText: formulaValue || '',
  tab: formulaKey ? formulaKey.split('_')[1] || 'formula' : 'formula',
  cell: formulaKey ? formulaKey.split('_')[0] || 'electrode' : 'electrode',
  selectedSymbol: formulaValue ? formulaValue.split(',') : [],
  window_params: window.location.search,
  cell_parameter: null,
  filter_set: {
    discharge_capacity: '',
    min_current_density: '',
    min_retention_percentage: '',
    min_cycle_number: '',
    shuttling_ion: '',
    min_temperature: '',
    max_temperature: '',
    min_voltage: '',
    max_volatge: '',
    measurement_method: ''
  },
  query: null,
  sort_field: {
    column: "discharge_gravimetric_specific_capacity", 
    order: "desc", 
  },
};

const searchInput = createSlice({
  name: "searchInput",
  initialState,
  reducers: {
    setTab: (state, action) => {
      state.tab = action.payload;
      state.cell_parameter = getParameter(state.cell, state.tab);
    },
    setCell: (state, action) => {
      state.cell = action.payload;
      state.cell_parameter = getParameter(state.cell, state.tab);
    },
    setSearchText: (state, action) => {
      state.searchText = action.payload;
    },
    setReset: (state) => {
      state.params = 'electrode';
      state.tab = 'formula';
      state.searchText = '';
      state.selectedSymbol = [];
      state.window_params = '';
      const url = new URL(window.location);
      url.search = ''; 
      window.history.replaceState(null, '', url.toString());
      state.filter_set = {
        discharge_capacity: '',
        min_current_density: '',
        min_retention_percentage: '',
        min_cycle_number: '',
        shuttling_ion: '',
        min_temperature: '',
        max_temperature: '',
        min_voltage: '',
        max_voltage: ''
      },
      state.query = null,
      state.cell_parameter = null
    },
    setSelectedSymbol: (state, action) => {
      state.selectedSymbol = [...state.selectedSymbol, action.payload];
    },
    setWindowParams: (state, action) => {
      state.window_params = action.payload;
    },
    setFilterSet: (state, action) => {
      state.filter_set[action.payload.name] = action.payload.value;
    },
    setCellParamater: (state, action) => {
      state.cell_parameter = action.payload
    },
    setQuery: (state, action) => {
      state.query = action.payload
    },
    setSorting: (state, action) => {
      const { column } = action.payload;
      if (state.sort_field.column === column) {
        // Toggle between asc and desc
        state.sort_field.order = state.sort_field.order === "asc" ? "desc" : "asc";
      } else {
        // New column, reset order to desc
        state.sort_field.column = column;
        state.sort_field.order = "desc";
      }
    },
  },
});

export const { setTab, setCell, setSearchText, setReset, setQuery, setSorting,
setSelectedSymbol, setWindowParams, setFilterSet, setCellParamater } = searchInput.actions;
export default searchInput.reducer;
