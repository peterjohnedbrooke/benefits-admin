import { all, call } from "redux-saga/effects";
import { watchFetchDashboard } from "./dashboard/sagas";

export default function* rootSaga() {
  yield all([
    call(watchFetchDashboard),
  ]);
}