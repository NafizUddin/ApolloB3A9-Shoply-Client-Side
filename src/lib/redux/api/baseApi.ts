// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
// import { verifyToken } from "@/src/utils/verifyToken";

// Define a service using a base URL and expected endpoints
export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api",
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;

      // console.log("from baseAPI", token);
      // if (token) {
      //   const user = verifyToken(token);
      //   console.log(user);
      // }

      if (token) {
        headers.set("authorization", `${token}`);
      }

      return headers;
    },
  }),
  tagTypes: [
    "users",
    "category",
    "products",
    "recent-products",
    "coupon",
    "orders",
  ],
  endpoints: () => ({}),
});
