import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { set } from 'idb-keyval';

const initialAuthState = { jwt: "", frontEndPrivilege: "public" };

const authSlice = createSlice({
    name: 'auth',
    initialState: initialAuthState,
    reducers: {
        setJwtUponLogin(state, action: PayloadAction<string>) {
            state.jwt = action.payload;
            set('jwt', state.jwt).then(() => console.log("Saved JWT in localStorage")).catch((err) => console.log(`Error saving JWT in localStorage: ${err}`));
        },
        consumeJwtFromIDB(state, action: PayloadAction<string>) {
            state.jwt = action.payload;
        },
        clearJwt(state) {
            state.jwt = "";
            set('jwt', "").then(() => console.log("Cleared JWT from localStorage")).catch((err) => console.log(`Error clearing JWT from localStorage: ${err}`));
        },
        setFrontEndPrivilegeUponLogin(state, action: PayloadAction<string>) {
            state.frontEndPrivilege = action.payload;
            set('front-end-privilege', state.frontEndPrivilege).then(() => console.log("Saved front-end-privilege in localStorage")).catch((err) => console.log(`Error saving front-end-privilege in localStorage: ${err}`));
        },
        consumeFrontEndPrivilegeFromIDB(state, action: PayloadAction<string>) {
            state.frontEndPrivilege = action.payload;
        },
        clearFrontEndPrivilege(state) {
            state.frontEndPrivilege = "public";
            set('front-end-privilege', "public").then(() => console.log("Saved front-end-privilege as public in localStorage")).catch((err) => console.log(`Error saving front-end-privilege as public in localStorage: ${err}`));
        }
    }
});

export const authActions = authSlice.actions;
export default authSlice;