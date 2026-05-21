import { useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { employeesActions } from '@/store/employees/slice';
import {
    selectAllEmployees,
    selectEmployeesLoading,
    selectEmployeesError,
    selectFilteredEmployees,
    type EmployeesFilter,
} from '@/store/employees/selectors';
import type { Department } from '@/lib/types';
import { PageHeader } from '@/components/layout/PageHeader';
import { SearchInput } from '@/components/ui/SearchInput';
import { EmployeeFilters } from './components/EmployeeFilters';
import { EmployeeTable } from './components/EmployeeTable';

const ALL_DEPARTMENTS: Department[] = ['Engineering', 'People', 'Sales', 'Marketing'];

const EmployeesListPage = () => {
    const dispatch = useAppDispatch();
    const allEmployees = useAppSelector(selectAllEmployees);
    const loading = useAppSelector(selectEmployeesLoading);
    const error = useAppSelector(selectEmployeesError);

    const [searchParams, setSearchParams] = useSearchParams();
    const q = searchParams.get('q') ?? '';
    const deptParam = searchParams.getAll('dept');
    const departments = useMemo(
        () => deptParam.filter((d): d is Department => ALL_DEPARTMENTS.includes(d as Department)),
        [deptParam.join(',')],
    );

    const filter: EmployeesFilter = useMemo(() => ({ q, departments }), [q, departments]);
    const filtered = useAppSelector((state) => selectFilteredEmployees(state, filter));

    useEffect(() => {
        if (loading === 'idle' && allEmployees.length === 0) {
            dispatch(employeesActions.fetchRequested());
        }
    }, [dispatch, loading, allEmployees.length]);

    const setQ = (next: string) => {
        const params = new URLSearchParams(searchParams);
        if (next.trim().length === 0) {
            params.delete('q');
        } else {
            params.set('q', next);
        }
        setSearchParams(params, { replace: true });
    };

    const toggleDepartment = (dept: Department) => {
        const params = new URLSearchParams(searchParams);
        const current = params.getAll('dept');
        if (current.includes(dept)) {
            params.delete('dept');
            current.filter((d) => d !== dept).forEach((d) => params.append('dept', d));
        } else {
            params.append('dept', dept);
        }
        setSearchParams(params, { replace: true });
    };

    return (
        <div>
            <PageHeader
                title="Employees"
                description="Browse and manage employees and their benefits enrolments."
            />

            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="sm:max-w-xs sm:flex-1">
                    <SearchInput
                        label="Search employees"
                        placeholder="Search by name or email"
                        value={q}
                        onChange={setQ}
                    />
                </div>
                <EmployeeFilters selected={departments} onToggle={toggleDepartment} />
            </div>

            {loading === 'failed' && (
                <div role="alert" className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    Could not load employees. {error}
                </div>
            )}

            {loading !== 'failed' && (
                <>
                    <p aria-live="polite" className="mb-3 text-sm text-slate-500">
                        {loading === 'pending' && allEmployees.length === 0
                            ? 'Loading employees…'
                            : `${filtered.length} of ${allEmployees.length} employees`}
                    </p>

                    {filtered.length > 0 ? (
                        <EmployeeTable employees={filtered} />
                    ) : (
                        allEmployees.length > 0 && (
                            <div className="rounded-lg border border-dashed border-slate-300 bg-white px-6 py-12 text-center">
                                <p className="text-sm font-medium text-slate-900">No employees match these filters</p>
                                <p className="mt-1 text-sm text-slate-500">Try clearing the search or selecting a different department.</p>
                            </div>
                        )
                    )}
                </>
            )}
        </div>
    );
};

export default EmployeesListPage;
