import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { toastsActions } from '@/store/toasts/slice';
import { selectToasts } from '@/store/toasts/selectors';
import { Toast } from './Toast';

export const Toaster = () => {
    const dispatch = useAppDispatch();
    const toasts = useAppSelector(selectToasts);

    if (toasts.length === 0) return null;

    return (
        <div
            aria-live="polite"
            className="pointer-events-none fixed inset-x-0 bottom-4 z-50 flex flex-col items-center gap-2 px-4"
        >
            {toasts.map((toast) => (
                <Toast
                    key={toast.id}
                    toast={toast}
                    onDismiss={(id) => dispatch(toastsActions.removed(id))}
                />
            ))}
        </div>
    );
};
