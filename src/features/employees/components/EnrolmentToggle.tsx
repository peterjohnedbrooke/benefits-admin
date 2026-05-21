import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { enrolmentsActions } from '@/store/enrolments/slice';
import {
    selectEnrolmentStatus,
    selectIsToggling,
} from '@/store/enrolments/selectors';

type EnrolmentToggleProps = {
    employeeId: string;
    benefitId: string;
    benefitName: string;
};

export const EnrolmentToggle = ({ employeeId, benefitId, benefitName }: EnrolmentToggleProps) => {
    const dispatch = useAppDispatch();
    const status = useAppSelector(selectEnrolmentStatus(employeeId, benefitId));
    const isToggling = useAppSelector(selectIsToggling(employeeId, benefitId));

    const active = status === 'active';

    const handleClick = () => {
        if (isToggling) return;
        dispatch(
            enrolmentsActions.toggleRequested({
                employeeId,
                benefitId,
                optimisticNewStatus: active ? 'inactive' : 'active',
                previousStatus: status,
            }),
        );
    };

    return (
        <button
            type="button"
            role="switch"
            aria-checked={active}
            aria-label={`${active ? 'Disenrol from' : 'Enrol in'} ${benefitName}`}
            disabled={isToggling}
            onClick={handleClick}
            className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 ${
                active ? 'bg-emerald-500' : 'bg-slate-300'
            }`}
        >
            <span
                aria-hidden="true"
                className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
                    active ? 'translate-x-6' : 'translate-x-1'
                }`}
            />
        </button>
    );
};
