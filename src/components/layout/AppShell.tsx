import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';

export function AppShell() {
    return (
        <div className="flex min-h-screen bg-slate-50">
            <a
                href="#main"
                className="sr-only focus:not-sr-only focus:absolute focus:left-3 focus:top-3 focus:z-50 focus:rounded-md focus:bg-white focus:px-3 focus:py-2 focus:text-sm focus:font-medium focus:text-emerald-700 focus:shadow-md focus:ring-2 focus:ring-emerald-500"
            >
                Skip to content
            </a>
            <Sidebar />
            <div className="flex flex-1 flex-col">
                <TopBar />
                <main id="main" className="flex-1 px-8 py-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
