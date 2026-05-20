  import type { Enrolment, EnrolmentStatus } from '@/lib/types';
  import { enrolments as seedEnrolments } from '@/mocks/data/enrolments';
  
  // ⚠️  TODO: set to false before deploying to production.
  // When true, the PATCH /enrolments handler returns 500 ~10% of the time
  // so the optimistic-UI rollback path has something to react to.
  export const INJECT_FAILURES = true;
  
  // Mutable runtime copy of enrolments. Handlers read and write through the
  // helpers below — never mutate this array directly from a handler.
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
      const now = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
  
      if (existing) {
          existing.status = status;
          existing.enrolledAt = status === 'active' ? (existing.enrolledAt ?? now) : existing.enrolledAt;
          return existing;
      }
  
      const created: Enrolment = { 
          employeeId, 
          benefitId,
          status,
          enrolledAt: status === 'active' ? now : null,
      };
      enrolmentsState.push(created);
      return created; 
  } 
  
  // Test-only helper — resets the store between Vitest cases (Unit 12).
  export function resetMockStore(): void {
      enrolmentsState = seedEnrolments.map((e) => ({ ...e }));
  } 