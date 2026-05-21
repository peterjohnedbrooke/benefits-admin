import type { Benefit } from '@/lib/types';
import { EnrolmentToggle } from './EnrolmentToggle';

type BenefitsForEmployeeProps = {
    employeeId: string;
    benefits: Benefit[];
};

const gbp = new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    maximumFractionDigits: 0,
});

export const BenefitsForEmployee = ({ employeeId, benefits }: BenefitsForEmployeeProps) => {
    return (
        <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
            <ul className="divide-y divide-slate-100">
                {benefits.map((benefit) => (
                    <li
                        key={benefit.id}
                        className="flex items-center justify-between gap-4 px-5 py-4"
                    >
                        <div className="min-w-0">
                            <div className="flex items-center gap-2">
                                <p className="text-sm font-medium text-slate-900">{benefit.name}</p>
                                <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600">
                                    {benefit.category}
                                </span>
                            </div>
                            <p className="mt-0.5 text-xs text-slate-500">{benefit.description}</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="text-sm text-slate-700">
                                {benefit.monthlyCost === 0 ? 'Free' : `${gbp.format(benefit.monthlyCost)}/mo`}
                            </span>
                            <EnrolmentToggle
                                employeeId={employeeId}
                                benefitId={benefit.id}
                                benefitName={benefit.name}
                            />
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};
