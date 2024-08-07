import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  auth: {},
};

const authSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    saveAuthData: (state, action) => {
      state.auth = { ...state.auth, ...action.payload };
      localStorage.setItem("financeAuth", JSON.stringify(state.auth));
    },
    logOutUser: (state) => {
      state.auth = {};
      localStorage.removeItem("financeAuth");
    },
  },
});

export const { saveAuthData, logOutUser } = authSlice.actions;
export default authSlice.reducer;
