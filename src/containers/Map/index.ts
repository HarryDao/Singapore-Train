import { loadable } from 'utils';

export const Map = loadable(() => import('./Map'));
export * from './types';