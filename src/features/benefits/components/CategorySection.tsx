import type { Benefit, BenefitCategory } from '@/lib/types';
import { BenefitCard } from './BenefitCard';

type CategorySectionProps = {
    category: BenefitCategory;
    benefits: Benefit[];
};

const headingId = (category: BenefitCategory) => `category-${category.toLowerCase()}`;

export const CategorySection = ({ category, benefits }: CategorySectionProps) => {
    if (benefits.length === 0) return null;

    return (
        <section aria-labelledby={headingId(category)} className="space-y-3">
            <h2
                id={headingId(category)}
                className="text-base font-semibold text-slate-900"
            >
                {category}
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {benefits.map((benefit) => (
                    <BenefitCard key={benefit.id} benefit={benefit} />
                ))}
            </div>
        </section>
    );
};
