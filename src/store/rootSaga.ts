import { all, call } from "redux-saga/effects";
import { watchFetchDashboard } from "./dashboard/sagas";
import { watchFetchEmployees } from "./employees/sagas";
import { watchFetchBenefits } from "./benefits/sagas";
import { watchFetchEnrolments, watchToggleEnrolment } from "./enrolments/sagas";

export default function* rootSaga() {
  yield all([
    call(watchFetchDashboard),
    call(watchFetchEmployees),
    call(watchFetchBenefits),
    call(watchFetchEnrolments),
    call(watchToggleEnrolment),
  ]);
}