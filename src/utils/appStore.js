import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../utils/userSlice";
import feedReducer from "../utils/feedSlice";
import connectionsReducer from "../utils/connectionSlice";
import requestsReducer from "../utils/requestSlice";

const appStoe = configureStore({
  reducer: {
    user: userReducer,
    feed: feedReducer,
    connections: connectionsReducer,
    requests: requestsReducer,
   
  },
});

export  default appStoe;