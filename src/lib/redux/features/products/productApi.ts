import { TResponseRedux } from "@/src/types";
import { baseApi } from "../../api/baseApi";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: (queryData) => {
        return {
          url: "/products",
          method: "GET",
        };
      },
      transformResponse: (response: TResponseRedux<any>) => {
        return response;
      },
      providesTags: ["category"],
    }),
  }),
});

export const { useGetAllProductsQuery } = productApi;
