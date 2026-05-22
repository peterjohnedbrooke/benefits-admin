import { forwardRef, useEffect, useState } from 'react';

type SearchInputProps = {
    value: string;
    onChange: (next: string) => void;
    placeholder?: string;
    label: string;
    debounceMs?: number;
};

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
    function SearchInput({ value, onChange, placeholder, label, debounceMs = 250 }, ref) {
        const [local, setLocal] = useState(value);

        useEffect(() => {
            setLocal(value);
        }, [value]);

        useEffect(() => {
            if (local === value) return;
            const id = window.setTimeout(() => onChange(local), debounceMs);
            return () => window.clearTimeout(id);
        }, [local, value, onChange, debounceMs]);

        return (
            <label className="block">
                <span className="sr-only">{label}</span>
                <input
                    ref={ref}
                    type="search"
                    value={local}
                    placeholder={placeholder}
                    onChange={(e) => setLocal(e.target.value)}
                    className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                />
            </label>
        );
    },
);
