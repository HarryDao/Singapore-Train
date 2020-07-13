import { FetchMapDataAction } from 'actions';
import { MapDataTypes } from './elements/MapData';

export interface MapProps extends MapDataTypes {
    loading: boolean;
    error: boolean;
    fetchMapData: () => FetchMapDataAction;
}