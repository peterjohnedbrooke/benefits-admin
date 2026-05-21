import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { dashboardActions } from '@/store/dashboard/slice';
import {
    selectDashboardStats,
    selectDashboardLoading,
    selectDashboardError,
} from '@/store/dashboard/selectors';
import { PageHeader } from '@/components/layout/PageHeader';
import { StatCard } from './components/StatCard';
import { StatCardSkeleton } from './components/StatCardSkeleton';
import { DashboardError } from './components/DashboardError';

const gbp = new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    maximumFractionDigits: 0,
});

const DashboardPage = () => {
    const dispatch = useAppDispatch();
    const stats = useAppSelector(selectDashboardStats);
    const loading = useAppSelector(selectDashboardLoading);
    const error = useAppSelector(selectDashboardError);

    useEffect(() => {
        if (loading === 'idle' && stats === null) {
            dispatch(dashboardActions.fetchRequested());
        }
    }, [dispatch, loading, stats]);

    const handleRetry = () => {
        dispatch(dashboardActions.fetchRequested());
    };

    return (
        <div>
            <PageHeader
                title="Dashboard"
                description="Overview of employees and benefits enrolment."
            />

            {loading === 'failed' && (
                <DashboardError
                    message={error ?? 'Something went wrong.'}
                    onRetry={handleRetry}
                />
            )}

            {loading !== 'failed' && (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    {stats === null ? (
                        <>
                            <StatCardSkeleton />
                            <StatCardSkeleton />
                            <StatCardSkeleton />
                        </>
                    ) : (
                        <>
                            <StatCard
                                label="Total employees"
                                value={stats.totalEmployees.toString()}
                            />
                            <StatCard
                                label="Active enrolments"
                                value={stats.activeEnrolments.toString()}
                            />
                            <StatCard
                                label="Monthly cost"
                                value={gbp.format(stats.monthlyCostGbp)}
                                hint="Across all active enrolments"
                            />
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default DashboardPage;
