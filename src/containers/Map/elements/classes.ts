export enum MapClasses {
    baseContainer = 'map-base-container',
    lineContainer = 'map-line-container',
    stationContainer = 'map-station-container',
    tripContainer = 'map-trip-container',
    border = 'map-border',
    park = 'map-park',
    water = 'map-water',
    line = 'map-line',
    station = 'map-station',
    stationInfo = 'map-info-station',
    trip = 'map-trip',
    mainArea = 'map-main-area',
    tripEnd = 'map-end-trip',
    tripSwitch = 'map-switch-trip'
}

export const createLineClass = (lineSymbol: string): string => {
    return `${MapClasses.line}-${lineSymbol}`;
};

export const createStationClass = (station: string): string => {
    return `${MapClasses.station}-${station.replace(/\s/g, '_')}`;
};

export const createStationInfoClass = (station: string): string => {
    return `${MapClasses.stationInfo}-${station.replace(/\s/g, '_')}`;
};

export const selectClassStartWith = (className: string) => {
    return `[class^="${className}"]`;
};