import {
  LoginReqData,
  LoginResData,
  RegisterReqData,
  RegisterResData,
  UpdatePassReqData,
  UserInterface,
} from "@/types/types";
import { mainApi } from "./root.api";

export const authApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    getMe: builder.query<UserInterface, null>({
      query: () => ({
        url: "/users/me",
      }),
      providesTags: ["user"],
    }),
    updatePass: builder.mutation<string, UpdatePassReqData>({
      query: (data) => ({
        url: "/users/me/password",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["user"],
    }),
    login: builder.mutation<LoginResData, LoginReqData>({
      query: (data) => ({
        url: "/token",
        method: "POST",
        body: data,
      }),
    }),
    register: builder.mutation<RegisterResData, RegisterReqData>({
      query: (data) => ({
        url: "/users/create",
        method: "POST",
        body: data,
      }),
    }),
    getOtp: builder.query<
      { number: number; otp: string; otp_created_at: string },
      null
    >({
      query: () => ({
        url: "/users/me/verify",
      }),
    }),
    verifyOtp: builder.mutation<
      { number: number; verified: boolean },
      { otp: string }
    >({
      query: (data) => ({
        url: `/users/me/verify?otp=${data.otp}`,
        method: "PATCH",
      }),
      invalidatesTags: ["user"],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useVerifyOtpMutation,
  useGetMeQuery,
  useLazyGetMeQuery,
  useUpdatePassMutation,
  useGetOtpQuery,
  useLazyGetOtpQuery,
} = authApi;
