import { combineReducers } from "@reduxjs/toolkit";
import { dashboardReducer } from "./dashboard/slice";
import { employeesReducer } from "./employees/slice";

const rootReducer = combineReducers({
  dashboard: dashboardReducer,
  employees: employeesReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;