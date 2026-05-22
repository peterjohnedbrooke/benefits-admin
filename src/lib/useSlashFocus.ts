import { useEffect, useRef } from 'react';

const isEditableTarget = (target: EventTarget | null): boolean => {
    if (!(target instanceof HTMLElement)) return false;
    const tag = target.tagName;
    if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return true;
    return target.isContentEditable;
};

export const useSlashFocus = <T extends HTMLElement>() => {
    const ref = useRef<T | null>(null);

    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.key !== '/' || e.metaKey || e.ctrlKey || e.altKey) return;
            if (isEditableTarget(e.target)) return;
            e.preventDefault();
            ref.current?.focus();
        };
        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, []);

    return ref;
};
