import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  email: string | null;
  isAdmin: boolean;
}

const initialState: AuthState = {
  email: null,
  isAdmin: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginUser: (
      state,
      action: PayloadAction<{ email: string; isAdmin: boolean }>
    ) => {
      state.email = action.payload.email;
      state.isAdmin = action.payload.isAdmin;
    },
    logoutUser: (state) => {
      state.email = null;
      state.isAdmin = false;
    },
  },
});

export const { loginUser, logoutUser } = authSlice.actions;

export default authSlice.reducer;
