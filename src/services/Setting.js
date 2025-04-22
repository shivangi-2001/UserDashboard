import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getCookie } from "../utilis/getCookie";


const baseQuery = fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    credentials: "include",
  });
  
const baseQueryWithAuth = async (args, api, extraOptions) => {
    const AuthToken = getCookie('_csid');
    const result = await baseQuery(
      {
        ...args,
        headers: {
          ...args.headers,
          authorization: AuthToken ? `JWT ${AuthToken}` : "",
        },
      },
      api,
      extraOptions
    );
  
    return result;
};

export const SettingAPI = createApi({
  reducerPath: "SettingAPI",
  baseQuery: baseQueryWithAuth,
  endpoints: (build) => ({
    getprofile: build.query({
        query: () => ({
            url: '/user/profile',
            method: 'GET'
        })
    }),
    editProfile: build.mutation({
        query: (formData) => (
            console.log(formData),{
            url: '/user/profile/',
            method: 'PATCH',
            body: formData
        })
    }),
    resetpassword: build.mutation({
        query: (formData) => (
            console.log(formData),{
            url: '/user/reset_password',
            method: 'PATCH',
            body: formData
        })
    })
  }),
});

export const { useGetprofileQuery, useEditProfileMutation, useResetpasswordMutation } = SettingAPI;
