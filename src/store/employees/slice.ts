import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Employee } from '@/lib/types';

type EmployeesState = {
    list: Employee[];
    loading: 'idle' | 'pending' | 'failed';
    error: string | null;
};

const initialState: EmployeesState = {
    list: [],
    loading: 'idle',
    error: null,
};

const employeesSlice = createSlice({
    name: 'employees',
    initialState,
    reducers: {
        fetchRequested(state) {
            state.loading = 'pending';
            state.error = null;
        },
        fetchSucceeded(state, action: PayloadAction<Employee[]>) {
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

export const employeesActions = employeesSlice.actions;
export const employeesReducer = employeesSlice.reducer;
export type { EmployeesState };
