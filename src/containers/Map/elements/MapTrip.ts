import * as d3 from 'd3';

import {
    MAP_COLORS,
    MAP_ELEMENTS,
    COLORS,
    MRT_LINES,
} from 'configs';
import {
    MapClasses,
    selectClassStartWith
} from './classes';
import { composeTripData, stringifyTransform } from 'helpers';

import { MapConfigurations } from './MapConfigurations';
import { MapData } from './MapData';
import { MapMrtLines } from './MapMrtLines';
import { MapMrtStations } from './MapMrtStations';
import { TripData, ActiveStation } from 'helpers';

export class MapTrip {
    private tripData: (TripData | null) = null;

    constructor(
        private configurations: MapConfigurations,
        private data: MapData,
        private linesDrawer: MapMrtLines,
        private stationsDrawer: MapMrtStations,
    ) {
        this.configurations.addZoomFunction(this.onZoom);
    }

    draw = () => {
        this.reset();

        const { trip, lines, stations } = this.data;
        this.tripData = composeTripData(
            trip,
            lines,
            stations,
        );
        if (!this.tripData) return;

        this.drawTrip();
        this.stationsDrawer.highlight(this.tripData.activeStations);
        this.drawTripEnds();
        this.drawTripSwitches();
        this.hightlight();
    }

    private drawTrip = () => {
        const { tripContainer, path, transform } = this.configurations;

        if (
            !tripContainer ||
            !path ||
            !this.tripData
        ) return;

        const { tripCoords } = this.tripData;

        const elements = tripContainer.selectAll(`.${MapClasses.trip}`)
            .data(tripCoords)
            .enter()
            .append('path')
            .classed(MapClasses.trip, true)
            .attr('d', d => path({
                type: 'LineString',
                coordinates: d
            }))
            .attr('fill', 'none')
            .attr('stroke', MAP_COLORS.trip)
            .attr('stroke-width', MAP_ELEMENTS.trip.width)
            .attr('stroke-opacity', 1)
            .attr('stroke-linejoin', 'round')
            .attr('stroke-miterlimit', 5)
            .attr('stroke-linecap', 'round');
            
        if (transform.transform) {
            elements.attr('transform', transform.stringified);
        }
    }

    private drawTripEnds = () => {
        const { tripContainer, projection } = this.configurations;
        
        if (
            !tripContainer ||
            !projection ||
            !this.tripData
        ) return;

        const {
            r,
            x,
            y,
            text_size,
            border_width,
        } = MAP_ELEMENTS.trip.ends;
        const { ends } = this.tripData;

        const root = tripContainer.selectAll(`.${MapClasses.tripEnd}`)
            .data(ends)
            .enter()
            .append('g')
            .classed(MapClasses.tripEnd, true)
            .attr('transform', this.convertCoordinates);

        root.append('polygon')
            .attr('points', `-${r * 2 / 3},${y} ${r * 2 / 3},${y} 0,0`)
            .attr('fill', COLORS.aqua_darker);

        root.append('circle')
            .attr('fill', COLORS.aqua_darker)
            .attr('r', r)
            .attr('cx', x)
            .attr('cy', y)
            .style('stroke', MAP_COLORS.land)
            .style('stroke-width', border_width);

        root.append('text')
            .style('font-size', `${text_size}px`)
            .style('text-anchor', 'middle')
            .style('alignment-baseline', 'middle')
            .style('dominant-baseline', 'middle')
            .style('font-weight', '700')
            .text(d => {
                return d === ends[0] ? 'A' : 'B'
            })
            .attr('fill', 'white')
            .attr('y', y);       
    }

    private drawTripSwitches = () => {
        const { tripContainer, projection } = this.configurations;

        if (
            !tripContainer ||
            !projection ||
            !this.tripData
        ) return;

        const {
            rx,
            ry,
            x,
            y,
            text_size
        } = MAP_ELEMENTS.trip.switches;
        const { switches } = this.tripData;

        const root = tripContainer.selectAll(`.${MapClasses.tripSwitch}`)
            .data(switches)
            .enter()
            .append('g')
            .classed(MapClasses.tripSwitch, true)
            .attr('x', d => d.coords[0])
            .attr('y', d => d.coords[1])
            .attr('transform', this.convertCoordinates);

        root.append('ellipse')
            .attr('cx', x)
            .attr('cy', y)
            .attr('rx', rx)
            .attr('ry', ry)
            .attr('fill', d => d.line ? MRT_LINES[d.line].color : '');

        root.append('polygon')
            .attr('points', `${x},${y} ${x},${y - ry} 0,0`)
            .attr('fill', d => d.line ? MRT_LINES[d.line].color : '');

        root.append('text')
            .style('font-size', `${text_size}px`)
            .style('text-anchor', 'middle')
            .style('alignment-baseline', 'middle')
            .style('dominant-baseline', 'middle')
            .style('font-weight', '700')
            .text(d => d.line)
            .attr('x', x)
            .attr('y', y)
            .attr('fill', 'white');        
    }

    private reset = () => {
        this.linesDrawer.changeLinesOpacity();

        const { tripContainer } = this.configurations;
        
        if (!tripContainer) return;

        const elements = [
            MapClasses.trip,
            MapClasses.tripEnd,
            MapClasses.tripSwitch,
        ];

        elements.forEach(className => {
            tripContainer.selectAll(selectClassStartWith(className))
                .remove();
        });
    }

    private convertCoordinates = (d: ActiveStation): string => {
        const { projection } = this.configurations;

        if (!projection) return '';

        const coords = d.coords as [number, number];
        const converted = projection(coords);

        return converted ? `translate(${converted[0]} ${converted[1]})` : '';
    }

    private hightlight = () => {
        this.configurations.calculateMapSize();

        const { container, projection, width, height, zoom } = this.configurations;

        if (
            !container ||
            !projection ||
            !zoom ||
            !this.tripData
        ) return;

        const [min, max] = MAP_ELEMENTS.zoom.extends;
        const { boundaryCoords } = this.tripData;
    
        const topPoints = projection([boundaryCoords.x0, boundaryCoords.y0]);
        const bottomPoints = projection([boundaryCoords.x1, boundaryCoords.y1]);

        if (!topPoints || !bottomPoints) return;

        const [ x0, y0 ] = topPoints;
        const [ x1, y1 ] = bottomPoints;
    
        let scale = (1 - MAP_ELEMENTS.trip.highlight.boundary) / Math.max(
            width ? Math.abs(x1 - x0) / width : 0,
            height ? Math.abs(y1 - y0) / height : 0
        );
    
        if (scale < min) scale = min;
        if (scale > max) scale = max;

        container.transition().duration(750).call(
            zoom.transform,
            d3.zoomIdentity
                .translate(width / 2, height / 2)
                .scale(scale)
                .translate(-(x0 + x1) / 2, -(y0 + y1) / 2)
        );        
    }

    private onZoom = () => {
        const { tripContainer, projection, transform } = this.configurations;

        if (
            !tripContainer ||
            !projection ||
            !transform.transform ||
            !this.tripData
        ) return;

        const { trip } = MAP_ELEMENTS;
        const { x, y, k } = transform.transform;
        const logK = 1 + Math.log(k);

        tripContainer.selectAll(`.${MapClasses.trip}`)
            .attr('transform', stringifyTransform({ x, y, k }))
            .style('stroke-width', trip.width / logK);

        tripContainer.selectAll(`.${MapClasses.tripEnd}`)
            .attr('transform', d => this.stringifyTripIndicatorTransform(d, x, y, k))
            .selectAll('circle')
            .style('stroke-width', trip.ends.border_width / logK);

        tripContainer.selectAll(`.${MapClasses.tripSwitch}`)
            .attr('transform', d => this.stringifyTripIndicatorTransform(d, x, y, k))
            .selectAll('ellipse')
            .style('stroke-width', trip.switches.border_width / logK);
    }

    private stringifyTripIndicatorTransform = (
        d: any,
        x: number,
        y: number,
        k: number
    ): string => {
        const { projection } = this.configurations;
        if (!projection || !d || !d.coords) return '';

        const coords = d.coords as [number, number];
        const converted = projection(coords);

        if (!converted) return '';

        return stringifyTransform({
            x: x + converted[0] * k,
            y: y + converted[1] * k,
            k: 1 + Math.log(k)
        });
    }
}
