import { loadable, SpinnerSizes } from 'utils';

export const SearchInput = loadable(() => import('./SearchInput'), {
    size: SpinnerSizes.small
});

export * from './types';