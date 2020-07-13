import _flattenDeep from 'lodash/flattenDeep';

import { MAIN_AREAS } from 'configs';

import { Position } from 'geojson';
import { GeoJsonData, FetchMRTLinesData, FetchStationsData } from 'apis';
import { PathTripSplit } from 'helpers';

export const processBorderData = (border: GeoJsonData) => {
    const map: { [key: string]: boolean } = {};
    
    for (const area of MAIN_AREAS) {
        map[area] = true;
    }

    border.features?.forEach(area => {
        if (
            !area.properties ||
            !area.properties.PLN_AREA_N ||
            !map[area.properties.PLN_AREA_N]
        ) return;

        const flatten = _flattenDeep(area.geometry.coordinates) as number[];

        area.central = flatten.reduce((total, num, index, array) => {
            if (index % 2) {
                total.y += num * 2 / array.length;
            } else {
                total.x += num * 2 / array.length;
            }
            return total;
        }, { x: 0, y: 0 });
    });
}



export interface ActiveStation {
    station: string;
    line: string | null;
    coords: Position;
}

interface BoundaryCoords {
    x0: number;
    y0: number;
    x1: number;
    y1: number;
}

export interface TripData {
    activeStations: ActiveStation[],
    tripCoords: Position[][],
    boundaryCoords: BoundaryCoords,
    ends: ActiveStation[],
    switches: ActiveStation[],
}

export const composeTripData = (
    trip: PathTripSplit[] | null,
    linesData: FetchMRTLinesData,
    stationsData: FetchStationsData
): ( TripData | null ) => {
    if (!trip) return trip;

    const activeStations: ActiveStation[] = [];
    const tripCoords: Position[][] = [];
    const boundaryCoords: BoundaryCoords = {
        x0: Number.POSITIVE_INFINITY,
        y0: Number.POSITIVE_INFINITY,
        x1: 0,
        y1: 0
    };

    trip.forEach(({ line, stations }, lineIndex) => {
        const lineData = linesData[line];

        for (let i = 1, l = stations.length; i < l; i++) {
            const start = stations[i - 1];
            const end = stations[i];

            activeStations.push({
                station: start.name,
                line: i === 1 ? line : null,
                coords: stationsData[start.name].coords
            });

            if (lineIndex === trip.length - 1 && i === l - 1) {
                activeStations.push({
                    station: end.name,
                    line,
                    coords: stationsData[end.name].coords
                });
            }

            let starts = stationsData[start.name].lines[line];
            let ends = stationsData[end.name].lines[line];

            starts = Array.isArray(starts) ? starts : [starts];
            ends = Array.isArray(ends) ? ends : [ends];
            
            let coords: Position[] = [];

            loopCoords:
            for (const s of starts) {
                for (const e of ends) {
                    const data = lineData[`${s}-${e}`] || lineData[`${e}-${s}`];
                    if (data) {
                        coords = data;
                        break loopCoords;
                    }
                }
            }

            for (let [x, y] of coords) {
                if (x < boundaryCoords.x0) {
                    boundaryCoords.x0 = x;
                }
                if (x > boundaryCoords.x1) {
                    boundaryCoords.x1 = x;
                }
                if (y < boundaryCoords.y0) {
                    boundaryCoords.y0 = y;
                }
                if (y > boundaryCoords.y1) {
                    boundaryCoords.y1 = y;
                }
            }

            if (coords) {
                tripCoords.push(coords);
            }
        }
    });

    const ends: ActiveStation[] = [];
    const switches: ActiveStation[] = [];

    activeStations.filter(s => s.line).forEach((anchor, index, arr) => {
        if (index === 0) {
            ends.push(anchor);
            switches.push(anchor);
        } else if (index === arr.length - 1) {
            ends.push(anchor);
        } else {
            switches.push(anchor);
        }
    });    

    return {
        activeStations,
        tripCoords,
        boundaryCoords,
        ends,
        switches,
    }
}

export interface Transformable {
    x: number;
    y: number;
    k: number;
}

export const stringifyTransform = ({ x, y, k }: Transformable): string => {
    return `translate(${x}, ${y})scale(${k})`;
} 