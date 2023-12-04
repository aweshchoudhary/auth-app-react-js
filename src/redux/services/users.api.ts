import { MakeSuperUserReqProps, UserInterface } from "@/types/types";
import { mainApi } from "./root.api";

export const authApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<UserInterface[], null>({
      query: () => ({
        url: "/admin/users",
      }),
    }),
    makeSuperUser: builder.mutation<UserInterface, MakeSuperUserReqProps>({
      query: (data) => ({
        url: `/admin/users/{user}/super/?user_=${data.number}`,
        method: "PATCH",
        body: data,
      }),
    }),
    getUser: builder.query<UserInterface[], number>({
      query: (number) => ({
        url: `/admin/users/{user}/?user_=${number}`,
      }),
    }),
  }),
});

export const {
  useGetUserQuery,
  useLazyGetUserQuery,
  useGetUsersQuery,
  useLazyGetUsersQuery,
  useMakeSuperUserMutation,
} = authApi;
