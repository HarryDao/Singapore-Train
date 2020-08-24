import React, { Suspense, lazy, ReactNode } from 'react';
import { PuffLoader } from 'react-spinners';

export enum SpinnerSizes {
    large = 'large',
    medium = 'medium',
    small = 'small'
};

export interface FallbackOptions {
    size?: SpinnerSizes;
    color? : string;
}

function getSpinnerSize(useFallback: FallbackOptions): number {
    if (useFallback.size === SpinnerSizes.large) {
        return 70;
    } else if (useFallback.size === SpinnerSizes.medium) {
        return 50;
    } else {
        return 30;
    }
}

function getSpinnerColor(useFallback: FallbackOptions): string {
    return useFallback.color || 'white';
}

export const loadable = <T extends React.ComponentType<any>> (
    importDynamicFn: () => Promise<{ default: T }>,
    useFallback?: FallbackOptions
) => {
    const LazyComponent = lazy(importDynamicFn);

    let fallback: JSX.Element | null = null;
    if (useFallback) {
        fallback = <PuffLoader
            css="margin: 0 5px;"
            size={getSpinnerSize(useFallback)}
            color={getSpinnerColor(useFallback)}
        />
    }

    return (props: React.ComponentProps<T>): JSX.Element => (
        <Suspense fallback={fallback}>
            <LazyComponent {...props}/>
        </Suspense>
    );
}