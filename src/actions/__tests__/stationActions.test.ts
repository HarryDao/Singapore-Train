import { ActionTypes } from '../types';
import {
    fetchStations,
    fetchStationsError,
    fetchStationsSuccess,
} from '../stationActions';
import { apiData } from 'tests';

const { stations, lines } = apiData;

describe('actions/stationActions', () => {
    it('fetchStations correctly', () => {
        expect(fetchStations()).toEqual({
            type: ActionTypes.fetchStations
        });
    });

    it('fetchStationsSuccess correctly', () => {
        expect(fetchStationsSuccess(
            stations,
            lines
        )).toEqual({
            type: ActionTypes.fetchStationsSuccess,
            payload: {
                stations,
                lines
            }
        })
    });

    it('fetchStationsError correctly', () => {
        expect(fetchStationsError()).toEqual({
            type: ActionTypes.fetchStationsError
        });
    });
});