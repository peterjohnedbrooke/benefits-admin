export function TopBar() {
    return (
        <header className="flex h-14 items-center justify-between border-b border-slate-200 bg-white px-6">
            <div className="text-sm text-slate-500">Unified benefits administration</div>
            <div className="flex items-center gap-3">
                <span className="text-sm text-slate-700">Admin User</span>
                <div
                    aria-hidden="true"
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-sm font-medium text-emerald-700"
                >
                    AU
                </div>
            </div>
        </header>
    );
}
