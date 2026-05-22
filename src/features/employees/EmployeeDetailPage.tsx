import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { usePageTitle } from '@/lib/usePageTitle';
import { employeesActions } from '@/store/employees/slice';
import {
    selectAllEmployees,
    selectEmployeesLoading,
    selectEmployeeById,
} from '@/store/employees/selectors';
import { benefitsActions } from '@/store/benefits/slice';
import {
    selectAllBenefits,
    selectBenefitsLoading,
} from '@/store/benefits/selectors';
import { enrolmentsActions } from '@/store/enrolments/slice';
import { selectEnrolmentsLoading } from '@/store/enrolments/selectors';
import { PageHeader } from '@/components/layout/PageHeader';
import { EmployeeProfile } from './components/EmployeeProfile';
import { BenefitsForEmployee } from './components/BenefitsForEmployee';

const EmployeeDetailPage = () => {
    const { id } = useParams<{ id: string }>();
    const employeeId = id ?? '';
    const dispatch = useAppDispatch();

    const allEmployees = useAppSelector(selectAllEmployees);
    const employeesLoading = useAppSelector(selectEmployeesLoading);
    const employee = useAppSelector(selectEmployeeById(employeeId));

    const benefits = useAppSelector(selectAllBenefits);
    const benefitsLoading = useAppSelector(selectBenefitsLoading);

    const enrolmentsLoading = useAppSelector(selectEnrolmentsLoading(employeeId));

    usePageTitle(employee ? `${employee.firstName} ${employee.lastName}` : 'Employee');

    useEffect(() => {
        if (employeesLoading === 'idle' && allEmployees.length === 0) {
            dispatch(employeesActions.fetchRequested());
        }
    }, [dispatch, employeesLoading, allEmployees.length]);

    useEffect(() => {
        if (benefitsLoading === 'idle' && benefits.length === 0) {
            dispatch(benefitsActions.fetchRequested());
        }
    }, [dispatch, benefitsLoading, benefits.length]);

    useEffect(() => {
        if (employeeId && enrolmentsLoading === 'idle') {
            dispatch(enrolmentsActions.fetchRequested({ employeeId }));
        }
    }, [dispatch, employeeId, enrolmentsLoading]);

    if (employeesLoading === 'pending' && !employee) {
        return (
            <div>
                <PageHeader title="Employee" />
                <p className="text-sm text-slate-500">Loading employee…</p>
            </div>
        );
    }

    if (!employee) {
        return (
            <div>
                <PageHeader title="Employee not found" />
                <p className="text-sm text-slate-600">
                    We couldn’t find an employee with that ID.{' '}
                    <Link to="/employees" className="font-medium text-emerald-700 hover:underline">
                        Back to employees
                    </Link>
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <PageHeader
                title={`${employee.firstName} ${employee.lastName}`}
                description="Profile and benefits enrolments."
            />

            <EmployeeProfile employee={employee} />

            <section aria-labelledby="benefits-heading" className="space-y-3">
                <h2 id="benefits-heading" className="text-base font-semibold text-slate-900">
                    Benefits
                </h2>
                {benefitsLoading === 'pending' && benefits.length === 0 ? (
                    <p className="text-sm text-slate-500">Loading benefits…</p>
                ) : (
                    <BenefitsForEmployee employeeId={employeeId} benefits={benefits} />
                )}
            </section>
        </div>
    );
};

export default EmployeeDetailPage;
