import { combineReducers } from 'redux';
import {
    MapReducer,
    reducer as map,
    INITIAL_STATE as mapState
} from './mapReducers';
import {
    StationReducer,
    reducer as station,
    INITIAL_STATE as stationState
} from './stationReducers';
import {
    TrainReducer,
    reducer as train,
    INITIAL_STATE as trainState
} from './trainReducers';
import {
    PathReducer,
    reducer as path,
    INITIAL_STATE as pathState
} from './pathReducers';

export interface StoreState {
    map: MapReducer,
    station: StationReducer,
    train: TrainReducer,
    path: PathReducer
};

export const INITIAL_STATE: StoreState = {
    map: mapState,
    station: stationState,
    train: trainState,
    path: pathState
}

export const reducers = combineReducers({
    map,
    station,
    train,
    path,
});