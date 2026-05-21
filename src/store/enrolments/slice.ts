import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Enrolment, EnrolmentStatus } from '@/lib/types';

type EnrolmentsState = {
    byEmployeeId: Record<string, Enrolment[]>;
    loadingByEmployeeId: Record<string, 'idle' | 'pending' | 'failed'>;
    togglingKeys: Record<string, true>;
    error: string | null;
};

const initialState: EnrolmentsState = {
    byEmployeeId: {},
    loadingByEmployeeId: {},
    togglingKeys: {},
    error: null,
};

const toggleKey = (employeeId: string, benefitId: string) => `${employeeId}:${benefitId}`;

const enrolmentsSlice = createSlice({
    name: 'enrolments',
    initialState,
    reducers: {
        fetchRequested(state, action: PayloadAction<{ employeeId: string }>) {
            state.loadingByEmployeeId[action.payload.employeeId] = 'pending';
            state.error = null;
        },
        fetchSucceeded(
            state,
            action: PayloadAction<{ employeeId: string; enrolments: Enrolment[] }>,
        ) {
            const { employeeId, enrolments } = action.payload;
            state.byEmployeeId[employeeId] = enrolments;
            state.loadingByEmployeeId[employeeId] = 'idle';
        },
        fetchFailed(
            state,
            action: PayloadAction<{ employeeId: string; error: string }>,
        ) {
            state.loadingByEmployeeId[action.payload.employeeId] = 'failed';
            state.error = action.payload.error;
        },

        toggleRequested(
            state,
            action: PayloadAction<{
                employeeId: string;
                benefitId: string;
                optimisticNewStatus: EnrolmentStatus;
                previousStatus: EnrolmentStatus;
            }>,
        ) {
            const { employeeId, benefitId, optimisticNewStatus } = action.payload;
            const list = state.byEmployeeId[employeeId] ?? [];
            const existing = list.find((e) => e.benefitId === benefitId);
            if (existing) {
                existing.status = optimisticNewStatus;
            } else {
                list.push({
                    employeeId,
                    benefitId,
                    status: optimisticNewStatus,
                    enrolledAt: optimisticNewStatus === 'active'
                        ? new Date().toISOString().slice(0, 10)
                        : null,
                });
                state.byEmployeeId[employeeId] = list;
            }
            state.togglingKeys[toggleKey(employeeId, benefitId)] = true;
        },

        toggleSucceeded(
            state,
            action: PayloadAction<{ employeeId: string; benefitId: string; serverEnrolment: Enrolment }>,
        ) {
            const { employeeId, benefitId, serverEnrolment } = action.payload;
            const list = state.byEmployeeId[employeeId] ?? [];
            const index = list.findIndex((e) => e.benefitId === benefitId);
            if (index >= 0) {
                list[index] = serverEnrolment;
            } else {
                list.push(serverEnrolment);
            }
            delete state.togglingKeys[toggleKey(employeeId, benefitId)];
        },

        toggleFailed(
            state,
            action: PayloadAction<{
                employeeId: string;
                benefitId: string;
                previousStatus: EnrolmentStatus;
                error: string;
            }>,
        ) {
            const { employeeId, benefitId, previousStatus } = action.payload;
            const list = state.byEmployeeId[employeeId] ?? [];
            const existing = list.find((e) => e.benefitId === benefitId);
            if (existing) {
                existing.status = previousStatus;
            }
            delete state.togglingKeys[toggleKey(employeeId, benefitId)];
        },
    },
});

export const enrolmentsActions = enrolmentsSlice.actions;
export const enrolmentsReducer = enrolmentsSlice.reducer;
export { toggleKey };
export type { EnrolmentsState };
