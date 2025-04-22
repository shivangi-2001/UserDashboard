import { configureStore } from "@reduxjs/toolkit";
import batteryContentTable from "../features/batteryContentTable";
import Authenticated from "../features/authentication";
import searchInput from "../features/searchInput";
import Contributor from "../features/contribution";
import { BatteryAPI } from "../services/BatteryData";
import { AuthAPI } from "../services/Auth";
import { AuthLogoutAPI } from "../services/AuthLogout";
import { SettingAPI } from "../services/Setting";
import { ContributionAPI } from "../services/Contribution";

export const store = configureStore({
    reducer: {
        batteryContentTable: batteryContentTable,
        authenticated: Authenticated,
        searchInput: searchInput,
        contributor: Contributor,
        [BatteryAPI.reducerPath]: BatteryAPI.reducer,
        [AuthAPI.reducerPath]: AuthAPI.reducer,
        [AuthLogoutAPI.reducerPath]: AuthLogoutAPI.reducer,
        [SettingAPI.reducerPath]: SettingAPI.reducer,
        [ContributionAPI.reducerPath]: ContributionAPI.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }).concat(
        BatteryAPI.middleware,
        AuthAPI.middleware,
        AuthLogoutAPI.middleware,
        SettingAPI.middleware,
        ContributionAPI.middleware
    ),
    devTools: import.meta.env.MODE === "development"
})