import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth-slice";
import itemsSlice from "./item-slice";
import viewingSlice from "./viewing-slice";

const store = configureStore({
    reducer: { auth: authSlice.reducer, items: itemsSlice.reducer, viewing: viewingSlice.reducer }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;