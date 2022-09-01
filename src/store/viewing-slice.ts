import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialViewState = { 
    sectorManagement: {
        currentSector: "",
        changesApplied: false
    },
    itemManagement: {
        currentCat: "",
        changesApplied: false
    }
 };

const viewingSlice = createSlice({
    name: 'viewing',
    initialState: initialViewState,
    reducers: {
        manageSector(state, action: PayloadAction<string>) {
            state.sectorManagement.currentSector = action.payload;
        },
        changesAppliedToSector(state) {
            state.sectorManagement.changesApplied = true;
        },
        manageItem(state, action: PayloadAction<string>) {
            state.itemManagement.currentCat = action.payload;
        },
        changesAppliedToItem(state) {
            state.itemManagement.changesApplied = true;
        }
    }
});

export const viewingActions = viewingSlice.actions;
export default viewingSlice;