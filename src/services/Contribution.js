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

export const ContributionAPI = createApi({
  reducerPath: "ContributionAPI",
  baseQuery: baseQueryWithAuth,
  endpoints: (build) => ({
    uploadexcel: build.mutation({
        query: (data) => ({
            url: '/user/contribution/upload',
            method: 'POST',
            body: data,
        })
    }),
    userContributions: build.query({
      query: () => ({
        url: '/user/contribution',
        method: 'GET'
      })
    }),
    fetchResearchPaper: build.mutation({
      query: (title) => ({
        url: '/user/contribution/autofill',
        method: 'POST',
        body: { title },
      }),
    }),
    deleteContribution: build.mutation({
      query:(user_doi) => ({
        url: '/user/contribution/delete',
        method: 'DELETE',
        body: user_doi
      })
    }),
    finalSubmission: build.mutation({
      query: (body) => ({
        url: '/user/contribution/confirmation',
        method: 'POST',
        body: body
      })
    })
  }),
});

export const { useUploadexcelMutation, useUserContributionsQuery, useFetchResearchPaperMutation, useDeleteContributionMutation,
  useFinalSubmissionMutation } = ContributionAPI;
