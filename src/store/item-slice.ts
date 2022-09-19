import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AbbreviatedItem } from "../types/item_types";

type ItemList = AbbreviatedItem[];

const initialItems: { items: ItemList, searchComplete: boolean } = { items: [], searchComplete: false };

const itemsSlice = createSlice({
    name: 'items',
    initialState: initialItems,
    reducers: {
        setItems(state, action: PayloadAction<ItemList>) {
            state.items = action.payload;
        },
        addItems(state, action: PayloadAction<ItemList>) {
            state.items.push(...action.payload);
        },
        clearItemList(state) {
            state.items = [];
        },
        declareSearchComplete(state, action: PayloadAction<boolean>) {
            state.searchComplete = action.payload;
        }
    }
});

export const itemsActions = itemsSlice.actions;
export default itemsSlice;