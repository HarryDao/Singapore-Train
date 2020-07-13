import { MrtGraph } from '../index';
import { paths, inputs, apiData } from 'tests';

const { stations } = apiData;
const {
    start,
    end,
    timeBtw2Stations,
    timeSwitchBtw2Lines,
    frequencies
} = inputs;

describe('helpers/mrtGraph/index', () => {
    const g = MrtGraph.getGraph(stations);

    it('create a singleton of mrt graph', () => {
        const g1 = MrtGraph.getGraph();
        expect(g === g1).toBeTruthy();
    });

    it('should find correct shortest paths', () => {
        g.findNextShortestPath(
            start,
            end,
            timeBtw2Stations,
            timeSwitchBtw2Lines,
            frequencies
        );
        g.findNextShortestPath();
        expect(g.shortestPaths).toEqual(paths);
    });
});