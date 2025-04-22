import { createSlice } from "@reduxjs/toolkit";
import getExpirationTime from "../utilis/getExperationTime";
import { getCookie } from "../utilis/getCookie";


function checkAuth(token) {
    if (token) {
        let expireDate = getExpirationTime(token);
        if (!expireDate) return false; 
        return new Date(expireDate).getTime() > Date.now();
    } else return false;
}


const initialState = {
    token: getCookie('_csid') || '',
    isAuthenticated: checkAuth(getCookie('_csid') || null),
    otp_verified: false,
    success_status: '',
    loading: false,
    profile: {
        first_name: '',
        last_name: '',
        email: '',
        contact_number: ''
    }
};

const Authenticated = createSlice({
  name: "Authenticated",
  initialState,
  reducers: {
    setLocalAuthToken: (state, action) => {
        state.token =  action.payload
        state.isAuthenticated = true
    },
    setLogout: (state, action) => {
        state.token = null
        state.isAuthenticated = false
    },
    setOtpVerify: (state, action) => {
        state.otp_verified = action.payload
    },
    setStatus: (state, action) => {
        state.success_status = action.payload
    },
    setLoading: (state,action) => {
        state.loading = action.payload
    },
    setProfile: (state, action) => {
        state.profile[action.payload.name] = action.payload.value
    }
  },
});

export const { setLocalAuthToken, setLogout, setOtpVerify, setStatus, setLoading, setProfile } = Authenticated.actions;
export default Authenticated.reducer;

