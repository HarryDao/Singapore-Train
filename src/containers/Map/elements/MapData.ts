import { GeoJsonData, FetchMRTLinesData, FetchStationsData } from 'apis';
import { PathTripSplit } from 'helpers';

export interface MapDataTypes {
    park: GeoJsonData | null;
    border: GeoJsonData | null;
    water: GeoJsonData | null;
    stations: FetchStationsData;
    lines: FetchMRTLinesData;
    trip: PathTripSplit[] | null;   
}

export class MapData {
    park: MapDataTypes['park'] = null;
    border: MapDataTypes['border'] = null;
    water: MapDataTypes['water'] = null;
    stations: MapDataTypes['stations'] = {};
    lines: MapDataTypes['lines'] = {};
    trip: MapDataTypes['trip'] = null;

    update({
        park,
        border,
        water,
        stations,
        lines,
        trip
    }: MapDataTypes) {
        this.park = park;
        this.border = border;
        this.water = water;
        this.stations = stations;
        this.lines = lines;
        this.trip = trip;
    }
}