import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import type { PayloadAction } from '@reduxjs/toolkit';
import { apiGet, apiPatch, ApiError } from '@/lib/api';
import type { Enrolment, EnrolmentStatus } from '@/lib/types';
import { enrolmentsActions } from './slice';
import { toastsActions } from '@/store/toasts/slice';

function* fetchEnrolmentsWorker(
    action: PayloadAction<{ employeeId: string }>,
): Generator<unknown, void, Enrolment[]> {
    const { employeeId } = action.payload;
    try {
        const enrolments = yield call(
            apiGet<Enrolment[]>,
            `/api/employees/${employeeId}/enrolments`,
        );
        yield put(enrolmentsActions.fetchSucceeded({ employeeId, enrolments }));
    } catch (err) {
        const message =
            err instanceof ApiError
                ? `${err.status}: ${err.message}`
                : err instanceof Error
                    ? err.message
                    : 'Unknown error';
        yield put(enrolmentsActions.fetchFailed({ employeeId, error: message }));
    }
}

type TogglePayload = {
    employeeId: string;
    benefitId: string;
    optimisticNewStatus: EnrolmentStatus;
    previousStatus: EnrolmentStatus;
};

function* toggleWorker(
    action: PayloadAction<TogglePayload>,
): Generator<unknown, void, Enrolment> {
    const { employeeId, benefitId, optimisticNewStatus, previousStatus } = action.payload;
    try {
        const serverEnrolment = yield call(
            apiPatch<Enrolment>,
            `/api/employees/${employeeId}/enrolments/${benefitId}`,
            { status: optimisticNewStatus },
        );
        yield put(
            enrolmentsActions.toggleSucceeded({ employeeId, benefitId, serverEnrolment }),
        );
    } catch (err) {
        const message =
            err instanceof ApiError
                ? `Server returned ${err.status}`
                : err instanceof Error
                    ? err.message
                    : 'Unknown error';
        yield put(
            enrolmentsActions.toggleFailed({
                employeeId,
                benefitId,
                previousStatus,
                error: message,
            }),
        );
        yield put(
            toastsActions.added({
                tone: 'error',
                message: 'Could not update enrolment. Please try again.',
            }),
        );
    }
}

export function* watchFetchEnrolments() {
    yield takeLatest(enrolmentsActions.fetchRequested.type, fetchEnrolmentsWorker);
}

export function* watchToggleEnrolment() {
    yield takeEvery(enrolmentsActions.toggleRequested.type, toggleWorker);
}
