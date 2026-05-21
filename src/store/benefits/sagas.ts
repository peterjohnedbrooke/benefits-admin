import { call, put, takeLatest } from 'redux-saga/effects';
import { apiGet, ApiError } from '@/lib/api';
import type { Benefit } from '@/lib/types';
import { benefitsActions } from './slice';

function* fetchBenefitsWorker(): Generator<unknown, void, Benefit[]> {
    try {
        const benefits = yield call(apiGet<Benefit[]>, '/api/benefits');
        yield put(benefitsActions.fetchSucceeded(benefits));
    } catch (err) {
        const message =
            err instanceof ApiError
                ? `${err.status}: ${err.message}`
                : err instanceof Error
                    ? err.message
                    : 'Unknown error';
        yield put(benefitsActions.fetchFailed(message));
    }
}

export function* watchFetchBenefits() {
    yield takeLatest(benefitsActions.fetchRequested.type, fetchBenefitsWorker);
}
