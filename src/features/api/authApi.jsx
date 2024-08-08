import { ErrorNotify } from "../../utils/getNotify";
import { saveAuthData } from "../auth/authSlice";
import { apiSlice } from "./apiSlice";
import moment from "moment";
const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data) => ({
        url: "/user/register",
        method: "POST",
        body: data,
      }),
    }),
    login: builder.mutation({
      query: (data) => ({
        url: "/user/login",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(args, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          const responseData = result?.data;
          if (responseData) {
            const currentDate = moment();
            const futureDate = currentDate.add(20, "days");
            const expireAt = futureDate.unix();
            const data = {
              ...responseData,
              expireAt,
            };
            dispatch(saveAuthData(data));
          }
        } catch (error) {
          console.log(error);
        }
      },
    }),

    forgotPassword: builder.mutation({
      query: (data) => ({
        url: "/user/forgot-password",
        method: "POST",
        body: data,
      }),
    }),
    resetPassword: builder.mutation({
      query: ({ data, tokenId }) => ({
        url: `/user/reset-password/${tokenId}`,
        method: "PATCH",
        body: data,
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
} = authApi;
