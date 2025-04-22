import { createSlice } from "@reduxjs/toolkit";
import { setRecords } from "./batteryContentTable";

const initialState = {
    total: '',
    records: null
};

const Contributor = createSlice({
  name: "Contributor",
  initialState,
  reducers: {
   setContributorRecord: (state, action) => {
    state.records = action.payload
   },
   setTotalContributorRecord: (state, action) => {
    state.total = action.payload
   }
  },
});

export const {  setContributorRecord, setTotalContributorRecord } = Contributor.actions;
export default Contributor.reducer;

