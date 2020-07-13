import {
    stringifyTime,
    setLoadingTimer,
} from '../index';

describe('helpers/index', () => {
    it('setLoadingTimer correctly', () => {
        const timer = setLoadingTimer();
        expect(typeof timer()).toEqual('number');
    });
    
    it('stringifyTime', () => {
        expect(stringifyTime(22.3)).toEqual('10:18 pm');
        expect(stringifyTime(8)).toEqual('8:00 am');
    });
});