import { MapClasses } from './classes';
import { MAP_COLORS, MAP_ELEMENTS } from 'configs';

import { MapConfigurations } from './MapConfigurations';
import { MapData } from './MapData';
import { GeoCentral } from 'apis';

export class MapBases {
    private drawedBorder = false;
    private drawedWater = false;
    private drawedParks = false;
    private drawedMainLocations = false;

    constructor(
        private configurations: MapConfigurations,
        private data: MapData
    ) {
        this.configurations.addZoomFunction(this.onZoom);
    }

    draw = () => {
        this.drawBorder();
        this.drawParks();
        this.drawWater();
        this.drawMainLocations();
    };

    private drawBorder = () => {
        if (this.drawedBorder) return;

        const { baseContainer, path } = this.configurations;
        const { border } = this.data;

        if (!baseContainer || !path || !border) return;

        baseContainer.selectAll(`.${MapClasses.border}`)
            .data(border.features)
            .enter()
            .append('path')
            .classed(MapClasses.border, true)
            .attr('d', path)
            .attr('stroke', MAP_COLORS.land)
            .attr('stroke-width', 1)
            .attr('fill', MAP_COLORS.land);

        this.drawedBorder = true;
    }

    private drawParks = () => {
        if (this.drawedParks) return;

        const { baseContainer, path } = this.configurations;
        const { park } = this.data;

        if (!baseContainer || !path || !park) return;
    
        baseContainer.selectAll(`.${MapClasses.park}`)
            .data(park.features)
            .enter()
            .append('path')
            .classed(MapClasses.park, true)
            .attr('d', path)
            .attr('fill', MAP_COLORS.park);

        this.drawedParks = true;
    }

    private drawWater = () => {
        if (this.drawedWater) return;

        const { baseContainer, path } = this.configurations;
        const { water } = this.data;

        if (!baseContainer || !path || !water) return;
    
        baseContainer.selectAll(`.${MapClasses.water}`)
            .data(water.features)
            .enter()
            .append('path')
            .classed(MapClasses.water, true)
            .attr('d', path)
            .attr('fill', MAP_COLORS.sea);

        this.drawedWater = true;
    }

    private drawMainLocations = () => {
        if (this.drawedMainLocations) return;

        const { baseContainer, projection } = this.configurations;
        const { border } = this.data;

        if (!baseContainer || !projection || !border) return;

        baseContainer.selectAll(`.${MapClasses.mainArea}`)
            .data(
                border.features.filter(area => !!area.central)
            )
            .enter()
            .append('text')
            .classed(MapClasses.mainArea, true)
            .text(d => d.properties?.PLN_AREA_N)
            .attr('x', d => {
                const central = d.central as GeoCentral;
                const converted = projection([central.x, central.y]);
                return converted && converted[0];
            })
            .attr('y', d => {
                const central = d.central as GeoCentral;
                const converted = projection([central.x, central.y]);
                return converted && converted[1];
            })
            .attr('font-size', `${MAP_ELEMENTS.bases.main_area_font}px`)
            .attr('font-weight', 600)
            .attr('font-style', 'italic')
            .style("text-anchor", "middle")
            .style('fill', MAP_COLORS.text);
            
        this.drawedMainLocations = true;
    }

    private onZoom = () => {
        this.zoomBases();
        this.zoomMainLocations();
    }

    private zoomBases = () => {
        const { baseContainer, transform } = this.configurations;

        if (baseContainer && transform) {
            const baseElements = [
                MapClasses.border,
                MapClasses.water,
                MapClasses.park
            ];

            baseElements.forEach(className => {
                baseContainer.selectAll(`.${className}`)
                    .attr('transform', transform.stringified);
            })
        }
    }

    private zoomMainLocations = () => {
        const {
            baseContainer,
            transform: { transform, stringified }
        } = this.configurations;
        const { trip } = this.data;
    
        if (!baseContainer || !transform) return;

        const { k } = transform;
    
        const size = (k >= 2 || trip) ?
            0 :
            MAP_ELEMENTS.bases.main_area_font / (1 + Math.log(k));

        baseContainer.selectAll(`.${MapClasses.mainArea}`)
            .attr('transform', stringified)
            .attr('font-size', `${size}px`); 
    }
}