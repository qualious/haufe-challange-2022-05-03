import { RootState } from "../../app/store";
import { fetchLogin, fetchRegister } from "./api";
import { AsyncThunkConfig, Status } from "../types";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
  authorized: boolean;
  status: Status;
}

export interface RequestPayload {
  email: string;
  password: string;
}

export const initialState: AuthState = {
  status: Status.IDLE,
  authorized: window.sessionStorage.getItem("loggedIn") === "true",
};

export const login = createAsyncThunk<
  boolean,
  RequestPayload,
  AsyncThunkConfig
>(
  "auth/login",
  async ({ email, password }: RequestPayload, _) =>
    await fetchLogin(email, password)
);

export const register = createAsyncThunk<
  boolean,
  RequestPayload,
  AsyncThunkConfig
>(
  "auth/register",
  async ({ email, password }: { email: string; password: string }, _) =>
    await fetchRegister(email, password)
);

export const authSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = Status.LOADING;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<boolean>) => {
        state.status = Status.IDLE;
        state.authorized = action.payload;
      })
      .addCase(login.rejected, (state) => {
        state.status = Status.FAILED;
      })
      .addCase(register.pending, (state) => {
        state.status = Status.LOADING;
      })
      .addCase(register.fulfilled, (state, action: PayloadAction<boolean>) => {
        state.status = Status.IDLE;
      })
      .addCase(register.rejected, (state) => {
        state.status = Status.FAILED;
      });
  },
});

export const selectAuthorized = (state: RootState): boolean =>
  state.auth.authorized;

export const selectStatus = (state: RootState): Status => state.auth.status;

export default authSlice.reducer;
