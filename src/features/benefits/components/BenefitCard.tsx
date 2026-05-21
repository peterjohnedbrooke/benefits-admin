import type { Benefit } from '@/lib/types';

type BenefitCardProps = {
    benefit: Benefit;
};

const gbp = new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    maximumFractionDigits: 0,
});

export const BenefitCard = ({ benefit }: BenefitCardProps) => {
    return (
        <article className="flex flex-col gap-2 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between gap-3">
                <h3 className="text-base font-semibold text-slate-900">{benefit.name}</h3>
                <span className="shrink-0 rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600">
                    {benefit.category}
                </span>
            </div>
            <p className="text-sm text-slate-600">{benefit.description}</p>
            <p className="mt-auto pt-2 text-sm font-medium text-slate-900">
                {benefit.monthlyCost === 0 ? 'Free' : `${gbp.format(benefit.monthlyCost)} / month`}
            </p>
        </article>
    );
};
