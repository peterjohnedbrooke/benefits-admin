import { useEffect } from 'react';

const SUFFIX = 'Benefits Admin';

export const usePageTitle = (title: string) => {
    useEffect(() => {
        document.title = `${title} · ${SUFFIX}`;
    }, [title]);
};
