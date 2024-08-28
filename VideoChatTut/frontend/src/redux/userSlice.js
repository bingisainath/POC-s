import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  socketConnection: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setSocketConnection: (state, action) => {
      state.socketConnection = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setSocketConnection,
} = userSlice.actions;

export default userSlice.reducer;
