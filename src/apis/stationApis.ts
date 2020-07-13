import axios from 'axios';

import {
    STATIC_FILE_SERVER_URL,
    DATA_FILES,
} from 'configs';

import { Position } from 'geojson';

export interface StationData {
    coords: Position,
    lines: {
        [lineSymbol: string]: number | number[]
    }
}

export interface FetchStationsData {
    [key: string]: StationData
}

export const fetchStations = async(): Promise<FetchStationsData> => {
    const stations = await axios.get<FetchStationsData>(
        `${STATIC_FILE_SERVER_URL}/${DATA_FILES.stations}`
    );
    return stations.data;
}

export type FetchMRTLinesData = {
    [key: string]: {
        [fromIdToId: string]: Position[]
    };
}

export const fetchMRTLines = async(): Promise<FetchMRTLinesData> => {
    const lines = await axios.get<FetchMRTLinesData>(
        `${STATIC_FILE_SERVER_URL}/${DATA_FILES.lines}`
    );
    return lines.data;
}