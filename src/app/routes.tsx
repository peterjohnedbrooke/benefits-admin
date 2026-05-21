import { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { AppShell } from '@/components/layout/AppShell';

const DashboardPage = lazy(() => import('@/features/dashboard/DashboardPage'));
const EmployeesListPage = lazy(() => import('@/features/employees/EmployeesListPage'));
const EmployeeDetailPage = lazy(() => import('@/features/employees/EmployeeDetailPage'));
const BenefitsCataloguePage = lazy(() => import('@/features/benefits/BenefitsCataloguePage'));

function PageFallback() {
    return (
        <div className="flex h-32 items-center justify-center text-sm text-slate-500">
            Loading…
        </div>
    );
}

function withSuspense(node: React.ReactNode) {
    return <Suspense fallback={<PageFallback />}>{node}</Suspense>;
}

export const router = createBrowserRouter([
    {
        path: '/',
        element: <AppShell />,
        children: [
            { index: true, element: withSuspense(<DashboardPage />) },
            { path: 'employees', element: withSuspense(<EmployeesListPage />) },
            { path: 'employees/:id', element: withSuspense(<EmployeeDetailPage />) },
            { path: 'benefits', element: withSuspense(<BenefitsCataloguePage />) },
        ],
    },
]);
