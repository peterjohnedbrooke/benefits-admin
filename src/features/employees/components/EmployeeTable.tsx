import type { Employee } from '@/lib/types';
import { EmployeeRow } from './EmployeeRow';

type EmployeeTableProps = {
    employees: Employee[];
};

export const EmployeeTable = ({ employees }: EmployeeTableProps) => {
    return (
        <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
            <table className="w-full">
                <thead className="bg-slate-50 text-left text-xs font-medium uppercase tracking-wide text-slate-500">
                    <tr>
                        <th scope="col" className="px-4 py-3">Name</th>
                        <th scope="col" className="px-4 py-3">Role</th>
                        <th scope="col" className="px-4 py-3">Department</th>
                        <th scope="col" className="px-4 py-3">Start date</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((employee) => (
                        <EmployeeRow key={employee.id} employee={employee} />
                    ))}
                </tbody>
            </table>
        </div>
    );
};
