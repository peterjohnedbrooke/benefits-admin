type DashboardErrorProps = {
    message: string;
    onRetry: () => void;
};

export const DashboardError = ({ message, onRetry }: DashboardErrorProps) => {
    return (
        <div
            role="alert"
            className="rounded-lg border border-red-200 bg-red-50 px-5 py-4"
        >
            <h2 className="text-sm font-semibold text-red-800">Could not load dashboard</h2>
            <p className="mt-1 text-sm text-red-700">{message}</p>
            <button
                type="button"
                onClick={onRetry}
                className="mt-3 rounded-md border border-red-300 bg-white px-3 py-1.5 text-sm font-medium text-red-700 hover:bg-red-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
            >
                Try again
            </button>
        </div>
    );
};
