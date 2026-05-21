import { call, put, takeLatest } from 'redux-saga/effects';
import { apiGet, ApiError } from '@/lib/api';
import type { DashboardStats } from '@/lib/types';
import { dashboardActions } from './slice';

function* fetchDashboardWorker(): Generator<unknown, void, DashboardStats> {
    try {
        const stats = yield call(apiGet<DashboardStats>, '/api/dashboard/stats');
        yield put(dashboardActions.fetchSucceeded(stats));
    } catch (err) {
        const message =
            err instanceof ApiError
                ? `${err.status}: ${err.message}`
                : err instanceof Error
                    ? err.message
                    : 'Unknown error';
        yield put(dashboardActions.fetchFailed(message));
    }
}

export function* watchFetchDashboard() {
    yield takeLatest(dashboardActions.fetchRequested.type, fetchDashboardWorker);
}
