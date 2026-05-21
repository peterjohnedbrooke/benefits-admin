 import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
  import type { DashboardStats } from '@/lib/types';
  
  type DashboardState = {
      stats: DashboardStats | null;
      loading: 'idle' | 'pending' | 'failed';
      error: string | null;
  };
  
  const initialState: DashboardState = {
      stats: null,
      loading: 'idle',
      error: null,
  };

  const dashboardSlice = createSlice({
      name: 'dashboard',
      initialState,
      reducers: {
          fetchRequested(state) {
              state.loading = 'pending';
              state.error = null;
          },
          fetchSucceeded(state, action: PayloadAction<DashboardStats>) {
              state.stats = action.payload;
              state.loading = 'idle';
              state.error = null;
          },
          fetchFailed(state, action: PayloadAction<string>) {
              state.loading = 'failed';
              state.error = action.payload;
          },
      }, 
  });
  
  export const dashboardActions = dashboardSlice.actions;
  export const dashboardReducer = dashboardSlice.reducer;
  export type { DashboardState };
