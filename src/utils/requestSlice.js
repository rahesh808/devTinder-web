import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
  name: "requests",
  initialState: {
    requests: [], 
  },
  reducers: {
    addRequests: (state, action) => {
      state.requests = action.payload;
    },
    removeRequest: () => null
  },
});

export const { addRequests, removeRequest } = requestSlice.actions;
export default requestSlice.reducer;