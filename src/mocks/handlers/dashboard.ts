
  import { http, HttpResponse } from 'msw';
  import type { DashboardStats } from '@/lib/types';
  import { employees } from '@/mocks/data/employees';
  import { benefits } from '@/mocks/data/benefits';
  import { getAllEnrolments } from '@/mocks/store';
  
  export const dashboardHandlers = [
      http.get('/api/dashboard/stats', () => {
          const active = getAllEnrolments().filter((e) => e.status === 'active');
          const benefitCostById = new Map(benefits.map((b) => [b.id, b.monthlyCost]));
          const monthlyCostGbp = active.reduce(
              (sum, e) => sum + (benefitCostById.get(e.benefitId) ?? 0),
              0,
          );
  
          const stats: DashboardStats = {
              totalEmployees: employees.length,
              activeEnrolments: active.length,
              monthlyCostGbp,
          };
          return HttpResponse.json(stats);
      }),
  ];
