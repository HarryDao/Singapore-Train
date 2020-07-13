import _isEqual from 'lodash/isEqual';

import {
    MapClasses,
    selectClassStartWith,
    createStationClass,
    createStationInfoClass,
} from './classes';
import {
    STATIC_FILE_SERVER_URL,
    IMAGE_FILES,
    MAP_COLORS,
    MAP_ELEMENTS,
} from 'configs';
import { stringifyTransform } from 'helpers';

import { MapConfigurations } from './MapConfigurations';
import { MapData } from './MapData';
import { ActiveStation } from 'helpers';

export class MapMrtStations {
    private drawed = false;

    constructor(
        private configurations: MapConfigurations,
        private data: MapData
    ) {
        this.configurations.addZoomFunction(this.onZoom);
    }

    draw = (): void => {
        if (this.drawed) return;

        this.reset();

        const drawedIcons = this.drawIcons();
        const drawedInformation = this.drawInformation();

        if (drawedIcons && drawedInformation) {
            this.drawed = true;
        }
    }

    highlight = (stations: ActiveStation[]): void => {
        this.highlightIcons(stations);
        this.highlightInformation(stations);
    }

    private highlightIcons = (stations: ActiveStation[]) => {
        const { stationContainer } = this.configurations;
        const classes = stations.map(name => {
            return `.${createStationClass(name.station)}`;
        }).join(',');

        stationContainer?.selectAll(selectClassStartWith(MapClasses.station))
            .style('opacity', 0);

        stationContainer?.selectAll(classes).style('opacity', 1);
    }

    private highlightInformation = (stations: ActiveStation[]) => {
        const { stationContainer } = this.configurations;
        const classes = stations.map(name => {
            return `.${createStationInfoClass(name.station)}`;
        }).join(',');

        stationContainer?.selectAll(selectClassStartWith(MapClasses.stationInfo))
            .style('opacity', 0);

        stationContainer?.selectAll(classes).style('opacity', 1);
    }

    private drawIcons = (): boolean => {
        const { stationContainer, projection } = this.configurations;
        const { stations } = this.data;
    
        if (
            !stationContainer ||
            !projection ||
            _isEqual(stations, {})
        ) return false;

        stationContainer.selectAll(selectClassStartWith(MapClasses.station))
            .data(Object.keys(stations))
            .enter()
            .append('svg:image')
            .attr('class', createStationClass)
            .attr('xlink:href', `${STATIC_FILE_SERVER_URL}/${IMAGE_FILES.subway}`)
            .attr('alt', 'subway')
            .attr('width', 0)
            .attr('height', 0)
            .style('fill', 'white')
            .attr('x', s => this.convertCoordinates(s, 0))
            .attr('y', s => this.convertCoordinates(s, 1));

        return true;
    }

    private drawInformation = (): boolean => {
        const { stationContainer, projection } = this.configurations;
        const { stations } = this.data;
    
        if (
            !stationContainer ||
            !projection ||
            _isEqual(stations, {})
        ) return false;

        stationContainer.selectAll(selectClassStartWith(MapClasses.stationInfo))
            .data(Object.keys(stations))
            .enter()
            .append('text')
            .attr('class', createStationInfoClass)
            .text(d => d)
            .attr('x', s => this.convertCoordinates(s, 0))
            .attr('y', s => this.convertCoordinates(s, 1))
            .attr('font-size', `0px`)
            .attr('font-weight', '600')
            .attr('font-style', 'italic')
            .style('fill', MAP_COLORS.text)
            .style("text-anchor", "middle");

        return true;
    }

    private convertCoordinates = (station: string, index: number): (number | null) => {
        const { projection } = this.configurations;
        const { stations } = this.data;

        if (!stations || !projection || !stations[station]) return null;

        const coords = stations[station].coords as [number, number];
        const converted = projection(coords);

        return converted && converted[index];
    }

    private onZoom = (): void => {
        this.zoomStationIcons();
        this.zoomStationInformation();
    }

    private zoomStationIcons = (): void => {
        const {
            stationContainer,
            transform: { transform }
        } = this.configurations;
        const { trip } = this.data;
    
        if (!stationContainer || !transform) return;

        const { x, y, k } = transform;

        const size = (k < 2 && !trip) ? 
            0 :
            MAP_ELEMENTS.station.image_size / (1 + Math.log(k));
    
        stationContainer.selectAll(selectClassStartWith(MapClasses.station))
            .attr('transform', stringifyTransform({
                x: x - (size * k) / 2,
                y: y - (size * k) / 2,
                k 
            }))
            .attr('width', size)
            .attr('height', size);        
    }

    private zoomStationInformation = (): void => {
        const { station } = MAP_ELEMENTS;
        const { stationContainer, transform: { transform } } = this.configurations;
        const { trip } = this.data;

        if (!stationContainer || !transform) return;
    
        const { x, y, k } = transform;
        const top = station.image_size / (1 + Math.log(k)) * k * 1.2;
        const font = (k < 2 && !trip) ? 
            0 : 
            station.info_font / (1 + Math.log(k));

        stationContainer.selectAll(selectClassStartWith(MapClasses.stationInfo))
            .attr('transform', stringifyTransform({
                x,
                y: y + top,
                k
            }))
            .attr('font-size', `${font}px`);        
    }



    private reset() {
        const elements = [
            MapClasses.station,
            MapClasses.stationInfo,
        ];
        const { stationContainer } = this.configurations;

        elements.forEach(className => {
            stationContainer?.selectAll(selectClassStartWith(className))
                .remove();
        });
    }
}