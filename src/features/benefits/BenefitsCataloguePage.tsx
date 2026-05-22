import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { usePageTitle } from '@/lib/usePageTitle';
import { benefitsActions } from '@/store/benefits/slice';
import {
    selectAllBenefits,
    selectBenefitsLoading,
    selectBenefitsError,
    selectBenefitsByCategory,
} from '@/store/benefits/selectors';
import type { BenefitCategory } from '@/lib/types';
import { PageHeader } from '@/components/layout/PageHeader';
import { CategorySection } from './components/CategorySection';

const CATEGORY_ORDER: BenefitCategory[] = ['Health', 'Finance', 'Tech', 'Lifestyle'];

const BenefitsCataloguePage = () => {
    usePageTitle('Benefits');
    const dispatch = useAppDispatch();
    const benefits = useAppSelector(selectAllBenefits);
    const loading = useAppSelector(selectBenefitsLoading);
    const error = useAppSelector(selectBenefitsError);
    const grouped = useAppSelector(selectBenefitsByCategory);

    useEffect(() => {
        if (loading === 'idle' && benefits.length === 0) {
            dispatch(benefitsActions.fetchRequested());
        }
    }, [dispatch, loading, benefits.length]);

    return (
        <div className="space-y-6">
            <PageHeader
                title="Benefits catalogue"
                description="All available benefits, grouped by category."
            />

            {loading === 'failed' && (
                <div role="alert" className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    Could not load benefits. {error}
                </div>
            )}

            {loading === 'pending' && benefits.length === 0 && (
                <p className="text-sm text-slate-500">Loading benefits…</p>
            )}

            {benefits.length > 0 && (
                <div className="space-y-8">
                    {CATEGORY_ORDER.map((category) => (
                        <CategorySection
                            key={category}
                            category={category}
                            benefits={grouped[category]}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default BenefitsCataloguePage;
