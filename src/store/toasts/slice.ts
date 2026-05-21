import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export type ToastTone = 'success' | 'error' | 'info';

export type Toast = {
    id: string;
    tone: ToastTone;
    message: string;
};

type ToastsState = {
    items: Toast[];
};

const initialState: ToastsState = {
    items: [],
};

let nextToastId = 0;
const makeId = () => `toast-${++nextToastId}`;

const toastsSlice = createSlice({
    name: 'toasts',
    initialState,
    reducers: {
        added: {
            reducer(state, action: PayloadAction<Toast>) {
                state.items.push(action.payload);
            },
            prepare(input: { tone: ToastTone; message: string }) {
                return { payload: { id: makeId(), ...input } };
            },
        },
        removed(state, action: PayloadAction<string>) {
            state.items = state.items.filter((t) => t.id !== action.payload);
        },
    },
});

export const toastsActions = toastsSlice.actions;
export const toastsReducer = toastsSlice.reducer;
export type { ToastsState };
