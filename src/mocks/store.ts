import type { Enrolment, EnrolmentStatus } from '@/lib/types';
import { enrolments as seedEnrolments } from '@/mocks/data/enrolments';

export const INJECT_FAILURES = true;

let enrolmentsState: Enrolment[] = seedEnrolments.map((e) => ({ ...e }));

export function getAllEnrolments(): Enrolment[] {
    return enrolmentsState;
}

export function getEnrolmentsForEmployee(employeeId: string): Enrolment[] {
    return enrolmentsState.filter((e) => e.employeeId === employeeId);
}

export function findEnrolment(
    employeeId: string,
    benefitId: string,
): Enrolment | undefined {
    return enrolmentsState.find(
        (e) => e.employeeId === employeeId && e.benefitId === benefitId,
    );
}

export function setEnrolmentStatus(
    employeeId: string,
    benefitId: string,
    status: EnrolmentStatus,
): Enrolment {
    const existing = findEnrolment(employeeId, benefitId);
    const today = new Date().toISOString().slice(0, 10);

    if (existing) {
        existing.status = status;
        if (status === 'active' && existing.enrolledAt === null) {
            existing.enrolledAt = today;
        }
        return existing;
    }

    const created: Enrolment = {
        employeeId,
        benefitId,
        status,
        enrolledAt: status === 'active' ? today : null,
    };
    enrolmentsState.push(created);
    return created;
}

export function resetMockStore(): void {
    enrolmentsState = seedEnrolments.map((e) => ({ ...e }));
}
