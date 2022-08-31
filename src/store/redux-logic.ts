import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth-slice";
import itemsSlice from "./item-slice";

const store = configureStore({
    reducer: { auth: authSlice.reducer, items: itemsSlice.reducer }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;