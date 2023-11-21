import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getLocalStorageItem } from "@/lib/localstorage.helper";
import { UserInterface } from "@/types/types";
import { RootState } from "../store";

// Define the types for the auth slice
interface AuthSliceInterface {
  accessToken: string | null;
  user: UserInterface | null;
}

// Define the initial state
const initialState: AuthSliceInterface = {
  accessToken: getLocalStorageItem("accessToken") || null,
  user: getLocalStorageItem("user", true) || null,
};

// Create the auth slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      { payload }: PayloadAction<{ accessToken?: string; user?: UserInterface }>
    ) => {
      if (payload.accessToken) {
        state.accessToken = payload.accessToken;
        localStorage.setItem("accessToken", payload.accessToken);
      }
      if (payload.user) {
        state.user = payload.user;
        localStorage.setItem("user", JSON.stringify(payload.user));
      }
    },
    logOut: (state) => {
      state.accessToken = null;
      state.user = null;
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
    },
  },
});

// Export the actions and reducer
export const { setCredentials, logOut } = authSlice.actions;
export default authSlice.reducer;

// Define selectors with proper types
export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectCurrentToken = (state: RootState) => state.auth.accessToken;
