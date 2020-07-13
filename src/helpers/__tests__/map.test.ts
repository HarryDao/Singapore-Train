import { processBorderData, composeTripData } from '../map';
import { apiData, trip, tripData } from 'tests';

const { border, lines, stations } = apiData;

describe('helpers/map', () => {
    it('processBorderData without error', () => {
        let error = false;
        try {
            processBorderData(border);
        } catch(err) {
            error = true;
        }

        expect(error).toBeFalsy();
    });

    it('composeTripData correctly', () => {
        expect(composeTripData(
            trip,
            lines,
            stations
        )).toEqual(tripData);
    });
});