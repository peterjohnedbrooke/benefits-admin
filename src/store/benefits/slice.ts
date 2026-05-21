import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Benefit } from '@/lib/types';

type BenefitsState = {
    list: Benefit[];
    loading: 'idle' | 'pending' | 'failed';
    error: string | null;
};

const initialState: BenefitsState = {
    list: [],
    loading: 'idle',
    error: null,
};

const benefitsSlice = createSlice({
    name: 'benefits',
    initialState,
    reducers: {
        fetchRequested(state) {
            state.loading = 'pending';
            state.error = null;
        },
        fetchSucceeded(state, action: PayloadAction<Benefit[]>) {
            state.list = action.payload;
            state.loading = 'idle';
            state.error = null;
        },
        fetchFailed(state, action: PayloadAction<string>) {
            state.loading = 'failed';
            state.error = action.payload;
        },
    },
});

export const benefitsActions = benefitsSlice.actions;
export const benefitsReducer = benefitsSlice.reducer;
export type { BenefitsState };
