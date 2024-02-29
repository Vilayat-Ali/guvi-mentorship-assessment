import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../interfaces/user";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    id: "",
    username: "",
    email: "",
  },
  reducers: {
    login: (state, action: PayloadAction<User>) => {
        state = action.payload;
    },
    logout: (state) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        state = {
            id: "",
            username: "",
            email: ""
        }
    }
  },
});

export const { login, logout } = userSlice.actions
export default userSlice.reducer
