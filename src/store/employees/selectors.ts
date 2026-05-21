import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '@/store/store';
import type { Department, Employee } from '@/lib/types';

export const selectAllEmployees = (state: RootState) => state.employees.list;
export const selectEmployeesLoading = (state: RootState) => state.employees.loading;
export const selectEmployeesError = (state: RootState) => state.employees.error;

export type EmployeesFilter = {
    q: string;
    departments: Department[];
};

const selectFilter = (_state: RootState, filter: EmployeesFilter) => filter;

export const selectFilteredEmployees = createSelector(
    [selectAllEmployees, selectFilter],
    (employees, filter): Employee[] => {
        const q = filter.q.trim().toLowerCase();
        const departments = filter.departments;

        return employees.filter((employee) => {
            if (departments.length > 0 && !departments.includes(employee.department)) {
                return false;
            }

            if (q.length === 0) return true;
            const haystack = `${employee.firstName} ${employee.lastName} ${employee.email}`.toLowerCase();
            return haystack.includes(q);
        });
    },
);

export const selectEmployeeById = (id: string) => (state: RootState) =>
    state.employees.list.find((e) => e.id === id);
