import type { Employee } from '@/lib/types';

type EmployeeProfileProps = {
    employee: Employee;
};

const initialsOf = (firstName: string, lastName: string) =>
    `${firstName[0] ?? ''}${lastName[0] ?? ''}`.toUpperCase();

export const EmployeeProfile = ({ employee }: EmployeeProfileProps) => {
    const startDate = new Date(employee.startDate).toLocaleDateString('en-GB', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    return (
        <div className="flex items-start gap-4 rounded-lg border border-slate-200 bg-white px-5 py-4 shadow-sm">
            <div
                aria-hidden="true"
                className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-lg font-semibold text-emerald-700"
            >
                {initialsOf(employee.firstName, employee.lastName)}
            </div>
            <div>
                <h2 className="text-lg font-semibold text-slate-900">
                    {employee.firstName} {employee.lastName}
                </h2>
                <p className="text-sm text-slate-600">{employee.role}</p>
                <dl className="mt-3 grid grid-cols-2 gap-x-6 gap-y-1 text-sm">
                    <dt className="text-slate-500">Department</dt>
                    <dd className="text-slate-900">{employee.department}</dd>
                    <dt className="text-slate-500">Email</dt>
                    <dd className="text-slate-900">{employee.email}</dd>
                    <dt className="text-slate-500">Start date</dt>
                    <dd className="text-slate-900">{startDate}</dd>
                </dl>
            </div>
        </div>
    );
};
