import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
}

const initialState: AuthState = {
  user: null,
  isLoading: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isLoading = false;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    logoutUser: (state) => {
      state.user = null;
      state.isLoading = false;
    },
  },
});

export const { setCredentials, setLoading, logoutUser } = authSlice.actions;
export default authSlice.reducer;
