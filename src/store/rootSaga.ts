import { all, call } from "redux-saga/effects";
import { watchFetchDashboard } from "./dashboard/sagas";
import { watchFetchEmployees } from "./employees/sagas";

export default function* rootSaga() {
  yield all([
    call(watchFetchDashboard),
    call(watchFetchEmployees),
  ]);
}