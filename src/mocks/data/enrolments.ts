import type { Enrolment } from '@/lib/types';

// Sparse representation: only active enrolments are listed.
// A missing (employeeId, benefitId) pair is treated as 'inactive' by the handler.
export const enrolments: Enrolment[] = [
    // emp-1 Alice — heavy enroller (5)
    { employeeId: 'emp-1', benefitId: 'ben-bupa', status: 'active', enrolledAt: '2023-01-15' },
    { employeeId: 'emp-1', benefitId: 'ben-pension', status: 'active', enrolledAt: '2023-01-15' },
    { employeeId: 'emp-1', benefitId: 'ben-cycle', status: 'active', enrolledAt: '2024-04-02' },
    { employeeId: 'emp-1', benefitId: 'ben-birthday', status: 'active', enrolledAt: '2023-01-15' },
    { employeeId: 'emp-1', benefitId: 'ben-wellness', status: 'active', enrolledAt: '2023-01-15' },

    // emp-2 Marcus — long-tenured, balanced (4)
    { employeeId: 'emp-2', benefitId: 'ben-bupa', status: 'active', enrolledAt: '2019-09-01' },
    { employeeId: 'emp-2', benefitId: 'ben-pension', status: 'active', enrolledAt: '2019-09-01' },
    { employeeId: 'emp-2', benefitId: 'ben-life', status: 'active', enrolledAt: '2019-09-01' },
    { employeeId: 'emp-2', benefitId: 'ben-tech', status: 'active', enrolledAt: '2022-06-10' },

    // emp-3 Priya — manager (3)
    { employeeId: 'emp-3', benefitId: 'ben-bupa', status: 'active', enrolledAt: '2020-12-01' },
    { employeeId: 'emp-3', benefitId: 'ben-pension', status: 'active', enrolledAt: '2020-12-01' },
    { employeeId: 'emp-3', benefitId: 'ben-wellness', status: 'active', enrolledAt: '2021-03-15' },

    // emp-4 Tom — modest (2)
    { employeeId: 'emp-4', benefitId: 'ben-eap', status: 'active', enrolledAt: '2021-06-01' },
    { employeeId: 'emp-4', benefitId: 'ben-birthday', status: 'active', enrolledAt: '2021-06-01' },

    // emp-5 Sofia — exec, comprehensive (4)
    { employeeId: 'emp-5', benefitId: 'ben-bupa', status: 'active', enrolledAt: '2018-03-01' },
    { employeeId: 'emp-5', benefitId: 'ben-pension', status: 'active', enrolledAt: '2018-03-01' },
    { employeeId: 'emp-5', benefitId: 'ben-life', status: 'active', enrolledAt: '2018-03-01' },
    { employeeId: 'emp-5', benefitId: 'ben-gym', status: 'active', enrolledAt: '2019-01-08' },

    // emp-6 James — sales, fresh-ish (3)
    { employeeId: 'emp-6', benefitId: 'ben-bupa', status: 'active', enrolledAt: '2023-02-01' },
    { employeeId: 'emp-6', benefitId: 'ben-gym', status: 'active', enrolledAt: '2023-02-01' },
    { employeeId: 'emp-6', benefitId: 'ben-birthday', status: 'active', enrolledAt: '2023-02-01' },

    // emp-7 Hannah — junior, just the freebies (2)
    { employeeId: 'emp-7', benefitId: 'ben-birthday', status: 'active', enrolledAt: '2024-07-01' },
    { employeeId: 'emp-7', benefitId: 'ben-wellness', status: 'active', enrolledAt: '2024-07-01' },

    // emp-8 Daniel — exec (4)
    { employeeId: 'emp-8', benefitId: 'ben-bupa', status: 'active', enrolledAt: '2017-10-01' },
    { employeeId: 'emp-8', benefitId: 'ben-pension', status: 'active', enrolledAt: '2017-10-01' },
    { employeeId: 'emp-8', benefitId: 'ben-life', status: 'active', enrolledAt: '2017-10-01' },
    { employeeId: 'emp-8', benefitId: 'ben-tech', status: 'active', enrolledAt: '2020-05-22' },

    // emp-9 Olivia — content, lifestyle-heavy (3)
    { employeeId: 'emp-9', benefitId: 'ben-gym', status: 'active', enrolledAt: '2022-11-15' },
    { employeeId: 'emp-9', benefitId: 'ben-birthday', status: 'active', enrolledAt: '2022-11-01' },
    { employeeId: 'emp-9', benefitId: 'ben-wellness', status: 'active', enrolledAt: '2022-11-01' },

    // emp-10 Reuben — performance marketer (2)
    { employeeId: 'emp-10', benefitId: 'ben-cycle', status: 'active', enrolledAt: '2024-03-01' },
    { employeeId: 'emp-10', benefitId: 'ben-wellness', status: 'active', enrolledAt: '2024-03-01' },

    // emp-11 Isla — newest joiner with nothing yet (0)

    // emp-12 Noah — junior, just one (1)
    { employeeId: 'emp-12', benefitId: 'ben-birthday', status: 'active', enrolledAt: '2025-10-01' },
];
