import { loadable } from 'utils';

export const ColorizedElement = loadable(
    () => import('./ColorizedElement')
);
export * from './types';