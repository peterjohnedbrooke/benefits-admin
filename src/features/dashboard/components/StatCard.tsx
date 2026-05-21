type StatCardProps = {
    label: string;
    value: string;
    hint?: string;
};

export const StatCard = ({ label, value, hint }: StatCardProps) => {
    return (
        <div className="rounded-lg border border-slate-200 bg-white px-5 py-4 shadow-sm">
            <dl>
                <dt className="text-sm font-medium text-slate-600">{label}</dt>
                <dd
                    aria-live="polite"
                    className="mt-2 text-3xl font-semibold tracking-tight text-slate-900"
                >
                    {value}
                </dd>
                {hint && <dd className="mt-1 text-xs text-slate-500">{hint}</dd>}
            </dl>
        </div>
    );
};
