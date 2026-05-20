  import { http, HttpResponse, delay } from 'msw';
  import type { EnrolmentStatus } from '@/lib/types';
  import {
      INJECT_FAILURES,
      getEnrolmentsForEmployee,
      setEnrolmentStatus,
  } from '@/mocks/store';
  
  type ToggleBody = {
      status: EnrolmentStatus;
  };
  
  export const enrolmentsHandlers = [
      http.get('/api/employees/:id/enrolments', ({ params }) => {
          const employeeId = String(params.id);
          return HttpResponse.json(getEnrolmentsForEmployee(employeeId));
      }),
  
      http.patch(
          '/api/employees/:id/enrolments/:benefitId',
          async ({ params, request }) => {
              await delay(400); // artificial latency so optimistic UI is visible
  
              if (INJECT_FAILURES && Math.random() < 0.1) {
                  return new HttpResponse(null, { status: 500 });
              }
  
              const employeeId = String(params.id);
              const benefitId = String(params.benefitId);
              const body = (await request.json()) as ToggleBody;
  
              const updated = setEnrolmentStatus(employeeId, benefitId, body.status);
              return HttpResponse.json(updated);
          },
      ),
  ];