import { ConvertedPath, Frequencies } from 'helpers';
import {
    SwitchDestinationsAction,
    FindNextPathAction,
    ChangeActivePathAction,
    ChangeActiveTripAction,
} from 'actions';

export interface SearchResultProps {
    from: string;
    to: string;
    loading: boolean;
    paths: ConvertedPath[];
    error: boolean;
    switchLoading: boolean;
    searchable: boolean;
    nextLoading: boolean;
    activePath: number;
    activeTrip: number;
    timeBtw2Stations: number;
    timeSwitchBtw2Lines: number;
    frequencies: Frequencies;
    firstTrain: number;
    lastTrain: number;
    switchDestinations: () => SwitchDestinationsAction;
    findNextPath: () => FindNextPathAction;
    changeActivePath: (nextIndex: number) => ChangeActivePathAction;
    changeActiveTrip: () => ChangeActiveTripAction;
}