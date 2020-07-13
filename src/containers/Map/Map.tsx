import React from 'react';
import { connect } from 'react-redux';

import './Map.scss';
import { fetchMapData } from 'actions';
import {
    MapConfigurations,
    MapData,
    MapBases,
    MapMrtLines,
    MapMrtStations,
    MapTrip,
} from './elements';

import { StoreState } from 'reducers';
import { MapProps } from './types';

export class _Map extends React.PureComponent<MapProps> {
    private configurations = new MapConfigurations();
    private data = new MapData();
    private basesDrawer = new MapBases(this.configurations, this.data);
    private linesDrawer = new MapMrtLines(this.configurations, this.data);
    private stationsDrawer = new MapMrtStations(
        this.configurations,
        this.data
    );
    private tripDrawer = new MapTrip(
        this.configurations,
        this.data,
        this.linesDrawer,
        this.stationsDrawer
    );

    componentDidMount() {
        this.configurations.init();
        this.props.fetchMapData();
    }

    componentDidUpdate(prevProps: MapProps) {
        this.data.update(this.props);

        const { border, trip } = this.props;

        if (border && !this.configurations.projection) {
            this.configurations.prepareProjection(border);
        }

        if (border) {
            this.basesDrawer.draw();
            this.linesDrawer.draw();
            this.stationsDrawer.draw();
        }

        if (prevProps.trip !== trip) {
            this.tripDrawer.draw();
        }
    }

    render() {
        return (
            <div className='Map'>
                <svg
                    ref={svg => {
                        this.configurations.svg = svg;
                    }}
                />
            </div>
        );
    }
}

const mapStateToProps = ({ map, station, path }: StoreState) => {
    const { paths } = path;
    const activePath = paths && paths[path.activePath];
    const trip = activePath && activePath.trips[path.activeTrip];

    return {
        loading: map.loading,
        error: map.error,
        park: map.park,
        border: map.border,
        water: map.water,
        stations: station.stations,
        lines: station.lines,
        trip: trip || null,
    }
}

export default connect(
    mapStateToProps,
    {
        fetchMapData
    }
)(_Map);