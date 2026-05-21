import { combineReducers } from "@reduxjs/toolkit";
import { dashboardReducer } from "./dashboard/slice";
import { employeesReducer } from "./employees/slice";
import { benefitsReducer } from "./benefits/slice";
import { enrolmentsReducer } from "./enrolments/slice";
import { toastsReducer } from "./toasts/slice";

const rootReducer = combineReducers({
  dashboard: dashboardReducer,
  employees: employeesReducer,
  benefits: benefitsReducer,
  enrolments: enrolmentsReducer,
  toasts: toastsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;