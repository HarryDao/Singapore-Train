export interface TrainInformationData {
    firstTrain: number;
    lastTrain: number;
    frequencies: { [key: string]: number };
    isPeak: boolean;
    timeSwitchBtw2Lines: number;
    timeBtw2Stations: number;
};