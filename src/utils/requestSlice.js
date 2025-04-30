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
    removeRequest: (state, action) => {
      const newArray = state.requests.filter((request) => request._id !== action.payload);
      return newArray;
    }
  },
});

export const { addRequests, removeRequest } = requestSlice.actions;
export default requestSlice.reducer;