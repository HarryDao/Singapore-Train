import axios from 'axios';
import {
    STATIC_FILE_SERVER_URL,
    DATA_FILES,
} from 'configs';
import { GeoJsonData } from './types';

export interface FetchMapData {
    border: GeoJsonData;
    park: GeoJsonData;
    water: GeoJsonData
};


export const fetchMapData = async(): Promise<FetchMapData> => {
    const [border, park, water] = await Promise.all([
        axios.get<GeoJsonData>(`${STATIC_FILE_SERVER_URL}/${DATA_FILES.border}`),
        axios.get<GeoJsonData>(`${STATIC_FILE_SERVER_URL}/${DATA_FILES.park}`),
        axios.get<GeoJsonData>(`${STATIC_FILE_SERVER_URL}/${DATA_FILES.water}`),
    ]);

    return {
        border: border.data,
        park: park.data,
        water: water.data
    };
};