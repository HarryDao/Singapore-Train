import { convertPathData, splitTripByMrtLines } from '../path'
import { paths, trip} from 'tests';

describe('helpers/path', () => {
    it('convertPathData() correctly', () => {
        const path = paths[0];
        expect(convertPathData(path)).toEqual(
            {
                stations: path.base,
                trips: path.paths.map( splitTripByMrtLines),
                lines: path.paths[0].lines,
                time: path.time
            }
        );
    });

    it('splitTripByMrtLines() correctly', () => {
        expect(splitTripByMrtLines(paths[0].paths[0])).toEqual(trip);
    });
});