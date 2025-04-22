import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL,
  credentials: "include",  
});


export const BatteryAPI = createApi({
  reducerPath: "BatteryAPI",
  baseQuery: baseQuery,  
  endpoints: (build) => ({
    fetchbatteries: build.query({
      query: ({ param_value, searchText, page, limit, query, sort_field, sort_order }) => ({
        url: `/user/batteries/search?page=${page}&limit=${limit}&${param_value}=${searchText}&${query}&_sort_field=${sort_field}&_sort_order=${sort_order}`,
        method: 'GET',
      }),
    }),
    batteryId: build.mutation({
      query: (id) =>{
        if(id.batteryId){
            return{
              url: `/user/batteries/${id.batteryId}`,
              method: 'GET'
            }
        }
        return {
            url: `/user/batteries/${id.id}`,
            method: 'GET'
        };
      }
    }),
    relatedResearch: build.mutation({
      query: (id) => ({
        url: `user/batteries/research/${id.id}`,
        method: 'GET'
      })
    })
  }),
});

export const { useFetchbatteriesQuery, useBatteryIdMutation, useRelatedResearchMutation } = BatteryAPI;
