import { TResponseRedux } from "@/src/types";
import { baseApi } from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/login",
        method: "POST",
        body: userInfo,
      }),
    }),
    signUp: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/signup",
        method: "POST",
        body: userInfo,
      }),
      invalidatesTags: ["users"],
    }),
    getAllUsers: builder.query({
      query: (queryData) => {
        const params = queryData ? { ...queryData } : {};

        return {
          url: "/auth/users",
          method: "GET",
          params,
        };
      },
      transformResponse: (response: TResponseRedux<any>) => {
        return {
          usersData: response.data.result,
          meta: response.data.meta,
        };
      },
      providesTags: ["users"],
    }),
    updateUser: builder.mutation({
      query: (options) => {
        return {
          url: `/auth/users/${options.id}`,
          method: "PATCH",
          body: options.data,
        };
      },
      invalidatesTags: ["users"],
    }),
    getMyProfile: builder.query({
      query: () => {
        return {
          url: "/users/me",
          method: "GET",
        };
      },
      transformResponse: (response: TResponseRedux<any>) => {
        return {
          userData: response.data,
        };
      },
      providesTags: ["users"],
    }),
  }),
});

export const {
  useLoginMutation,
  useSignUpMutation,
  useGetAllUsersQuery,
  useUpdateUserMutation,
  useGetMyProfileQuery,
} = authApi;
