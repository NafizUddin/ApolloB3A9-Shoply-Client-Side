import { TResponseRedux } from "@/src/types";
import { baseApi } from "../../api/baseApi";

const couponApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCoupons: builder.query({
      query: () => {
        return {
          url: "/coupons",
          method: "GET",
        };
      },
      transformResponse: (response: TResponseRedux<any>) => {
        return response.data;
      },
      providesTags: ["coupon"],
    }),
    applyCoupon: builder.mutation({
      query: (couponInfo) => {
        return {
          url: "/coupons/apply-coupon",
          method: "POST",
          body: couponInfo,
        };
      },
      transformResponse: (response: TResponseRedux<any>) => {
        return response.data;
      },
      invalidatesTags: ["coupon"],
    }),
  }),
});

export const { useGetAllCouponsQuery, useApplyCouponMutation } = couponApi;
