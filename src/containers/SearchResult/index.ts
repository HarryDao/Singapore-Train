import { loadable } from 'utils';

export const SearchResult = loadable(() => import('./SearchResult'));
export * from './types';