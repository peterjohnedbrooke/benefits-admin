import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '@/store/store';
import type { Benefit, BenefitCategory } from '@/lib/types';

export const selectAllBenefits = (state: RootState) => state.benefits.list;
export const selectBenefitsLoading = (state: RootState) => state.benefits.loading;
export const selectBenefitsError = (state: RootState) => state.benefits.error;

export const selectBenefitsByCategory = createSelector(
    [selectAllBenefits],
    (benefits): Record<BenefitCategory, Benefit[]> => {
        const grouped: Record<BenefitCategory, Benefit[]> = {
            Health: [],
            Finance: [],
            Tech: [],
            Lifestyle: [],
        };
        for (const benefit of benefits) {
            grouped[benefit.category].push(benefit);
        }
        return grouped;
    },
);
