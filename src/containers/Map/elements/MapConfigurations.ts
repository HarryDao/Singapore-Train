import * as d3 from 'd3';

import { MapClasses } from './classes';
import { MAP_ELEMENTS } from 'configs';
import { stringifyTransform } from 'helpers';

import { GeoJsonData } from 'apis';
import { Transformable } from 'helpers';

export type ContainerType = SVGGElement;
export type ContainerSelectionType = d3.Selection<ContainerType, unknown, null, undefined> | undefined;

export interface Transform {
    transform: (Transformable | null);
    stringified: string;
}

export class MapConfigurations {
    svg: (SVGSVGElement | null) = null;
    container: ContainerSelectionType;
    baseContainer: ContainerSelectionType;
    lineContainer: ContainerSelectionType;
    stationContainer: ContainerSelectionType;
    tripContainer: ContainerSelectionType;

    width: number = 0;
    height: number = 0;

    projection: (d3.GeoProjection | undefined);
    path: (d3.GeoPath<any, d3.GeoPermissibleObjects> | undefined);

    zoom: (d3.ZoomBehavior<ContainerType, unknown> | undefined);

    transform: Transform = {
        transform: null,
        stringified: ''
    };

    private zoomFunctions: Function[] = [];

    init() {
        if (!this.svg) return;

        this.calculateMapSize();

        this.container = d3.select(this.svg).append('g');

        this.baseContainer = this.container.append('g')
            .classed(MapClasses.baseContainer, true);
        this.lineContainer = this.container.append('g')
            .classed(MapClasses.lineContainer, true);
        this.stationContainer = this.container.append('g')
            .classed(MapClasses.stationContainer, true);
        this.tripContainer = this.container.append('g')
            .classed(MapClasses.tripContainer, true);

        this.addZoom();
    }

    calculateMapSize = () => {
        if (this.svg) {
            const { width, height } = this.svg.getBoundingClientRect();
            this.width = width;
            this.height = height;
        }
    }

    addZoomFunction = (fn: Function) => {
        this.zoomFunctions.push(fn);
    }

    prepareProjection = (border: GeoJsonData) => {
        const { width, height } = this;

        this.projection = d3.geoMercator()
            .fitSize([width, height], border);

        this.path = d3.geoPath().projection(this.projection);
    }

    zoomManually = (transform: Transformable) => {
        this.getTransform(transform);
        this.runZoomFunctions();
    }

    private addZoom = () => {
        this.zoom = d3.zoom<ContainerType, unknown>()
            .scaleExtent(MAP_ELEMENTS.zoom.extends as [number, number])
            .on('zoom', this.onZoomed);
        this.container?.call(this.zoom);
    }

    private onZoomed = () => {
        this.getTransform();
        this.runZoomFunctions();
        return this;
    }

    private runZoomFunctions = () => {
        this.zoomFunctions.forEach(fn => fn());
    }

    private getTransform = (inputTransform?: Transformable) => {
        let transform = inputTransform;

        if (!transform && d3.event && d3.event.transform) {
            transform = d3.event.transform as Transformable;
        }

        if (transform) {
            this.transform = {
                transform,
                stringified: stringifyTransform(transform)
            };
        }
    }
}