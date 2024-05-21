import { baseUrl } from "../../utils/urls";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const storeApi = createApi({
  reducerPath: "storeApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${baseUrl}/store` }),
  endpoints: (builder) => ({
    GetStore: builder.mutation({
      query: (page) => ({
        url: `getStore/${page}`,
        method: "GET",
      }),
    }),
    GetSingleStore: builder.mutation({
      query: () => ({
        url: "getPackage",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetStoreMutation, useGetSingleStoreMutation } = storeApi;