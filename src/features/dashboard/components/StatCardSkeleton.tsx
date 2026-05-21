export const StatCardSkeleton = () => {
    return (
        <div
            aria-hidden="true"
            className="rounded-lg border border-slate-200 bg-white px-5 py-4 shadow-sm"
        >
            <div className="h-4 w-32 animate-pulse rounded bg-slate-200" />
            <div className="mt-3 h-8 w-24 animate-pulse rounded bg-slate-200" />
        </div>
    );
};
