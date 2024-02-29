import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../interfaces/user";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    username: "",
    email: "",
  },
  reducers: {
    login: (state, {payload: {email, username}}: PayloadAction<User>) => {
        state.email = email;
        state.username = username;
    },
    logout: (state) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        state.username = "";
        state.email = "";
    }
  },
});

export const { login, logout } = userSlice.actions
export default userSlice.reducer