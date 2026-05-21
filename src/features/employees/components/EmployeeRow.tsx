import { useNavigate } from 'react-router-dom';
import type { Employee } from '@/lib/types';

type EmployeeRowProps = {
    employee: Employee;
};

const initialsOf = (firstName: string, lastName: string) =>
    `${firstName[0] ?? ''}${lastName[0] ?? ''}`.toUpperCase();

export const EmployeeRow = ({ employee }: EmployeeRowProps) => {
    const navigate = useNavigate();
    const goToDetail = () => navigate(`/employees/${employee.id}`);

    return (
        <tr
            tabIndex={0}
            onClick={goToDetail}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    goToDetail();
                }
            }}
            className="cursor-pointer border-t border-slate-100 hover:bg-slate-50 focus-visible:bg-emerald-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-emerald-500"
        >
            <td className="px-4 py-3">
                <div className="flex items-center gap-3">
                    <div
                        aria-hidden="true"
                        className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-xs font-medium text-emerald-700"
                    >
                        {initialsOf(employee.firstName, employee.lastName)}
                    </div>
                    <div>
                        <div className="text-sm font-medium text-slate-900">
                            {employee.firstName} {employee.lastName}
                        </div>
                        <div className="text-xs text-slate-500">{employee.email}</div>
                    </div>
                </div>
            </td>
            <td className="px-4 py-3 text-sm text-slate-700">{employee.role}</td>
            <td className="px-4 py-3 text-sm text-slate-700">{employee.department}</td>
            <td className="px-4 py-3 text-sm text-slate-700">
                {new Date(employee.startDate).toLocaleDateString('en-GB', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                })}
            </td>
        </tr>
    );
};
