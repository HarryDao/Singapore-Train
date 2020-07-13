import border from './singapore.geo.json';
import park from './park.geo.json';
import water from './waterbody.geo.json';
import lines from './mrt_lines.json';
import stations from './stations.json';

import { GeoJsonData, FetchMRTLinesData, FetchStationsData } from 'apis';

export const apiData = {
    border: border as GeoJsonData,
    park: park as GeoJsonData,
    water: water as GeoJsonData,
    lines: lines as FetchMRTLinesData,
    stations: stations as FetchStationsData,
};