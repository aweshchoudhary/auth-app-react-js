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
    }),
    updatePass: builder.mutation<string, UpdatePassReqData>({
      query: (data) => ({
        url: "/users/me/password",
        method: "PATCH",
        body: data,
      }),
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
    verifyOtp: builder.mutation({
      query: (data) => ({
        url: "/users/verify",
        method: "POST",
        body: data,
      }),
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
} = authApi;
