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

export const AuthLogoutAPI = createApi({
  reducerPath: "AuthLogoutAPI",
  baseQuery: baseQueryWithAuth,
  endpoints: (build) => ({
    logout: build.mutation({
        query: () => ({
            url: '/user/logout',
            method: 'POST'
        })
    })
  }),
});

export const { useLogoutMutation } = AuthLogoutAPI;
