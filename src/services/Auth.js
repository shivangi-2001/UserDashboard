import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const AuthAPI = createApi({
  reducerPath: "AuthAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    credentials: 'include',
  }),  
  endpoints: (build) => ({
    getcsrftoken: build.query({
        query: () => ({
            url: '/getcsrftoken',
            method: 'GET'
        }) 
    }),
    Login: build.mutation({
        query: (formData) => ({
            url: '/user/login',
            method: 'POST',
            body: formData
        }) 
    }),
    forgetPassword: build.mutation({
      query: (formData) => ({
        url: '/user/auth/forget_password',
        method: "POST",
        body: formData
      })
    }),
    verifyotp: build.mutation({
      query: ({ email, otp }) => ({
        url: `/user/auth/verify?email=${email}`,
        method: 'POST',
        body: {otp}
      })
    }),
    setPassword: build.mutation({
      query: ({email, password, confirm_password}) => ({
        url: `/user/auth/set_password?email=${email}`,
        method: 'POST',
        body: {password, confirm_password}
      })
    }),
    register: build.mutation({
      query: (formData) => ({
        url: '/user/auth/request',
        method: 'POST',
        body: formData
      })
    })
  }),
});

export const { useGetcsrftokenQuery, useLoginMutation, useForgetPasswordMutation, 
useVerifyotpMutation, useSetPasswordMutation, useRegisterMutation } = AuthAPI;
