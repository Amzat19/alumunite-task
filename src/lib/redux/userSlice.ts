import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { User } from "../types";
import usersData from "../../data/users.json";

// Initial state for the users
const initialState: User[] = usersData || [];

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<User>) => {
      state.push(action.payload);
      localStorage.setItem("users", JSON.stringify(state)); // Persist to localStorage
    },
    deleteUser: (state, action: PayloadAction<string>) => {
      const filteredUsers = state.filter((user) => user.id !== action.payload);
      localStorage.setItem("users", JSON.stringify(filteredUsers)); // Persist to localStorage
      return filteredUsers;
    },
  },
});

export const { addUser, deleteUser } = userSlice.actions;

export default userSlice.reducer;
