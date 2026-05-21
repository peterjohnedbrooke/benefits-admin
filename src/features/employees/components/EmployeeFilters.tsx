import type { Department } from '@/lib/types';

const DEPARTMENTS: Department[] = ['Engineering', 'People', 'Sales', 'Marketing'];

type EmployeeFiltersProps = {
    selected: Department[];
    onToggle: (department: Department) => void;
};

export const EmployeeFilters = ({ selected, onToggle }: EmployeeFiltersProps) => {
    return (
        <fieldset className="flex flex-wrap items-center gap-2">
            <legend className="sr-only">Filter by department</legend>
            {DEPARTMENTS.map((dept) => {
                const active = selected.includes(dept);
                return (
                    <button
                        key={dept}
                        type="button"
                        role="switch"
                        aria-checked={active}
                        onClick={() => onToggle(dept)}
                        className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 ${
                            active
                                ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                                : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                        }`}
                    >
                        {dept}
                    </button>
                );
            })}
        </fieldset>
    );
};
