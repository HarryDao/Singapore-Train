import React, { Suspense, lazy, ReactNode } from 'react';

interface LoadableProps {
    fallback?: ReactNode | null;
}

export const loadable = <T extends React.ComponentType<any>> (
    importDynamicFn: () => Promise<{ default: T }>,
    { fallback = null }: LoadableProps = { fallback: null }
) => {
    const LazyComponent = lazy(importDynamicFn);

    return (props: React.ComponentProps<T>): JSX.Element => (
        <Suspense fallback={fallback}>
            <LazyComponent {...props}/>
        </Suspense>
    );
}