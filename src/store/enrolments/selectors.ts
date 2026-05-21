import type { RootState } from '@/store/store';
import type { EnrolmentStatus } from '@/lib/types';
import { toggleKey } from './slice';

export const selectEnrolmentsForEmployee = (employeeId: string) => (state: RootState) =>
    state.enrolments.byEmployeeId[employeeId] ?? [];

export const selectEnrolmentsLoading = (employeeId: string) => (state: RootState) =>
    state.enrolments.loadingByEmployeeId[employeeId] ?? 'idle';

export const selectEnrolmentStatus =
    (employeeId: string, benefitId: string) =>
    (state: RootState): EnrolmentStatus => {
        const enrolment = state.enrolments.byEmployeeId[employeeId]?.find(
            (e) => e.benefitId === benefitId,
        );
        return enrolment?.status ?? 'inactive';
    };

export const selectIsToggling =
    (employeeId: string, benefitId: string) =>
    (state: RootState): boolean =>
        state.enrolments.togglingKeys[toggleKey(employeeId, benefitId)] === true;
