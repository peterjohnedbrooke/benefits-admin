import { useEffect } from 'react';
import type { Toast as ToastType } from '@/store/toasts/slice';

type ToastProps = {
    toast: ToastType;
    onDismiss: (id: string) => void;
    durationMs?: number;
};

const toneStyles: Record<ToastType['tone'], string> = {
    success: 'border-emerald-200 bg-emerald-50 text-emerald-800',
    error: 'border-red-200 bg-red-50 text-red-800',
    info: 'border-slate-200 bg-white text-slate-800',
};

export const Toast = ({ toast, onDismiss, durationMs = 4000 }: ToastProps) => {
    useEffect(() => {
        const id = window.setTimeout(() => onDismiss(toast.id), durationMs);
        return () => window.clearTimeout(id);
    }, [toast.id, onDismiss, durationMs]);

    return (
        <div
            role="status"
            aria-live="polite"
            className={`pointer-events-auto flex items-start gap-3 rounded-lg border px-4 py-3 shadow-md ${toneStyles[toast.tone]}`}
        >
            <p className="flex-1 text-sm font-medium">{toast.message}</p>
            <button
                type="button"
                onClick={() => onDismiss(toast.id)}
                className="text-sm font-medium underline-offset-2 hover:underline focus-visible:outline-none focus-visible:underline"
            >
                Dismiss
            </button>
        </div>
    );
};
