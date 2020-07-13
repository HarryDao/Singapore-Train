import _map from 'lodash/map';
import _isEqual from 'lodash/isEqual';

import { MapClasses, createLineClass, selectClassStartWith } from './classes';
import { MRT_LINES, MAP_ELEMENTS } from 'configs';

import { MapConfigurations } from './MapConfigurations';
import { MapData } from './MapData';

export class MapMrtLines {
    private drawed = false;

    constructor(
        private configurations: MapConfigurations,
        private data: MapData
    ) {
        this.configurations.addZoomFunction(this.onZoom);
    }

    draw = (): void => {
        if (this.drawed) return;

        const { lineContainer, path } =  this.configurations;
        const { lines } = this.data;

        if (
            !lineContainer||
            !path ||
            _isEqual(lines, {})
        ) return;

        _map(lines, (paths, lineSymbol) => {
            const className = createLineClass(lineSymbol);

            lineContainer.selectAll(`.${MapClasses.line}`)
                .data(Object.values(paths))
                .enter()
                .append('path')
                .classed(className, true)
                .attr('d', d => path({
                    type: 'LineString',
                    coordinates: d
                }))
                .attr('fill', 'none')
                .attr('stroke', MRT_LINES[lineSymbol].color)
                .style('stroke-dasharray', ("3, 1"))
                .style('stroke-width', MAP_ELEMENTS.line.width);
        });

        this.changeLinesOpacity();

        this.drawed = true;
    }

    changeLinesOpacity = (): void => {
        this.configurations.lineContainer?.selectAll(
            selectClassStartWith(MapClasses.line)
        ).style('opacity', this.data.trip ? 0.3 : 1);
    }

    private onZoom = () => {
        const {
            lineContainer,
            transform: { transform, stringified }
        } = this.configurations;
        const { trip } = this.data;

        if (!lineContainer || !transform) return;

        const width = MAP_ELEMENTS.line.width / (1 + Math.log(transform.k));
        const opacity = trip ? 0.3 : 1 / (1 + Math.log(transform.k));
    
        lineContainer.selectAll(selectClassStartWith(MapClasses.line))
            .attr('transform', stringified)
            .style('stroke-width', width)
            .style('opacity', opacity);
    }
}