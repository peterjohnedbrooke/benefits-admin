import { call, put, takeLatest } from 'redux-saga/effects';
import { apiGet, ApiError } from '@/lib/api';
import type { Employee } from '@/lib/types';
import { employeesActions } from './slice';

function* fetchEmployeesWorker(): Generator<unknown, void, Employee[]> {
    try {
        const employees = yield call(apiGet<Employee[]>, '/api/employees');
        yield put(employeesActions.fetchSucceeded(employees));
    } catch (err) {
        const message =
            err instanceof ApiError
                ? `${err.status}: ${err.message}`
                : err instanceof Error
                    ? err.message
                    : 'Unknown error';
        yield put(employeesActions.fetchFailed(message));
    }
}

export function* watchFetchEmployees() {
    yield takeLatest(employeesActions.fetchRequested.type, fetchEmployeesWorker);
}
