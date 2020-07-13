import React from 'react';

import { ColorizedElement } from 'components/ColorizedElement';
import { MRT_LINES } from 'configs';

import { Frequencies, PathTripStation } from 'helpers';

interface SearchResultDetailsItemProps {
    index: number,
    line: string,
    stations: PathTripStation[],
    timeBtw2Stations: number,
    timeSwitchBtw2Lines: number,
    frequencies: Frequencies,
}

export class SearchResultDetailsItem extends React.PureComponent<SearchResultDetailsItemProps> {
    renderLineHeader = (lineSymbol: string, lineName: string) => {
        return (
            <ColorizedElement
                className='line-header'
                line={lineSymbol}
                css='color'
                tag='span'
            >
                {lineName}
            </ColorizedElement>
        );
    }

    renderColorizedStation = (lineSymbol: string, stationId: number) => {
        return (
            <ColorizedElement
                className='colorized-station'
                line={lineSymbol}
                tag='span'
                css='background'
            >
                {lineSymbol}{stationId}
            </ColorizedElement>
        );
    }

    renderColorlizedLine = (lineSymbol: string, name: string) => {
        return (
            <ColorizedElement
                className='colorized-line'
                line={lineSymbol}
                tag='span'
                css='color'
            >
                {name}
            </ColorizedElement>         
        );
    }

    renderRow(time: number, renderChildren: () => React.ReactNode) {
        const { line } = this.props;

        return (
            <div className='row'>
                <div className='time'>
                    {time > 0 && (
                        <ColorizedElement
                            line={line}
                            tag='span'
                            css='background'
                        >
                            {time} MIN
                        </ColorizedElement>
                    )}                
                </div>
                <div className='description'>
                    {renderChildren()}
                </div>
            </div>
        );
    }

    render() {
        const {
            index,
            line: lineSymbol,
            stations,
            timeBtw2Stations,
            timeSwitchBtw2Lines,
            frequencies,
        } = this.props;
        const lineName = MRT_LINES[lineSymbol].name;

        const startStation = stations[0];
        const endStation = stations[stations.length - 1];

        const switchTime = index === 0 ? 0 : (timeSwitchBtw2Lines + frequencies[lineSymbol]);
        const travelTime = (stations.length - 1) * timeBtw2Stations;

        const minutes = `minute${travelTime > 1 ? 's' : ''}`;
        const travelStations = `${stations.length - 1} station${stations.length > 2 ? 's' : ''}`;

        return (
            <div className='SearchResultDetailsItem'>
                {this.renderRow(0, () => this.renderLineHeader(lineSymbol, lineName))}

                {index > 0 && this.renderRow(switchTime, () => (
                    <p>
                        Change to {this.renderColorlizedLine(lineSymbol, lineName)}
                    </p>
                ))}

                {this.renderRow(travelTime, () => (
                    <p>
                        Board the train{' '}
                        {index === 0 && (
                            <React.Fragment>
                                on {this.renderColorlizedLine(lineSymbol, lineName)}{' '}
                            </React.Fragment>
                        )}
                        from <span className='station-name'>{startStation.name}</span>{' '}
                        {this.renderColorizedStation(lineSymbol, startStation.id)}{' '}
                        to <span className='station-name'>{endStation.name}</span>{' '}
                        {this.renderColorizedStation(lineSymbol, endStation.id)},{' '}
                        <span>{travelStations}</span> later{' '}
                        in about <span>{travelTime} {minutes}</span>
                    </p>
                ))}
            </div>
        );
    };
};