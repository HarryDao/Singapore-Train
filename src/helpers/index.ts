import { MIN_TIME_LOADING_IN_MS } from 'configs'

export * from './MrtGraph';
export * from './path';
export * from './map';

export const setLoadingTimer = (): (() => number) => {
    const start = new Date().getTime();

    return () => {
        const end = new Date().getTime();
        
        return Math.max(
            0,
            MIN_TIME_LOADING_IN_MS - (end - start)
        );
    }
};

export const stringifyTime = (hours: number): string => {
    const am = hours < 12;
    const time = hours % 12;
    const h = Math.floor(time);
    const m = Math.floor((time - h) * 60);
    const mString = m < 10 ? `0${m}` : m;
    
    return `${h}:${mString} ${am ? 'am' : 'pm'}`;
}