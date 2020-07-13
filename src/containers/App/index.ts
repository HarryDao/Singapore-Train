import { loadable } from 'utils';

export const App = loadable(() => import('./App'));
export * from './App';