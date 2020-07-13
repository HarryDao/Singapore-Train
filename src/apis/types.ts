import { ExtendedFeatureCollection, ExtendedFeature } from 'd3';
import { Polygon } from 'geojson';

export type GeoCentral = {
    x: number;
    y: number;
}

export interface GeoFeature extends ExtendedFeature {
    geometry: Polygon,
    central?: GeoCentral
}

export interface GeoJsonData extends ExtendedFeatureCollection {
    features: GeoFeature[];
};