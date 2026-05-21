import { NavLink } from 'react-router-dom';

const links = [
    { to: '/', label: 'Dashboard', end: true },
    { to: '/employees', label: 'Employees', end: false },
    { to: '/benefits', label: 'Benefits', end: false },
];

export function Sidebar() {
    return (
        <aside className="w-60 shrink-0 border-r border-slate-200 bg-white">
            <div className="px-6 py-5">
                <span className="text-lg font-semibold text-emerald-600">Benifex Admin</span>
            </div>
            <nav aria-label="Primary" className="px-3">
                <ul className="space-y-1">
                    {links.map((link) => (
                        <li key={link.to}>
                            <NavLink
                                to={link.to}
                                end={link.end}
                                className={({ isActive }) =>
                                    `block rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                                        isActive
                                            ? 'bg-emerald-50 text-emerald-700'
                                            : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                                    }`
                                }
                            >
                                {link.label}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
    );
}
