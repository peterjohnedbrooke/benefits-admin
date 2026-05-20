  import { employeesHandlers } from './employees';
  import { benefitsHandlers } from './benefits';
  import { enrolmentsHandlers } from './enrolments';
  import { dashboardHandlers } from './dashboard';
  
  export const handlers = [
      ...employeesHandlers,
      ...benefitsHandlers,
      ...enrolmentsHandlers,
      ...dashboardHandlers,
  ];