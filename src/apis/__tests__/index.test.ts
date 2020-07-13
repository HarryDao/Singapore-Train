import axios from 'axios';
import {
    fetchMapData,
    fetchMRTLines,
    fetchStations,
} from '../index';

const MAP = {
    border: {},
    park: {},
    water: {},
};
const STATIONS = {};
const LINES = {};

describe('api/index', () => {
    let fn;
    beforeEach(() => {
        fn = jest.fn();
        axios.get = fn;
        fn.mockImplementation(() => ({
            data: {}
        }));
    });

    it('fetchMapData properly', async () => {
        const map = await fetchMapData();
        expect(map).toEqual(MAP);
    });

    it('fetchStations properly', async () => {
        const stations = await fetchStations();
        expect(stations).toEqual(STATIONS);
    });

    it('fetchMRTLines properly', async () => {
        const lines = await fetchMRTLines();
        expect(lines).toEqual(LINES);
    });
});