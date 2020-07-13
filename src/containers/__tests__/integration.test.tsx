import React from 'react';
import { mount } from 'enzyme';
import { Root } from '../Root';
import { App } from '../App';
import { MapConfigurations } from '../Map/elements';
import * as actions from 'actions';
import * as helpers from 'helpers';
import { apiData, trainInformation } from 'tests';

const { border, water, park, stations, lines } = apiData;

let zoomScope: MapConfigurations;

jest.mock('socket.io-client', () => () => ({
    on: () => {}
}));
jest.mock('axios');
jest.mock('d3', () => {
    const d3 = jest.requireActual('d3');
    const { select, zoom } = d3;

    return {
        ...d3,
        zoom: function(...args: any[]) {
            const zoomResult = zoom.apply(this, args);
            const on = zoomResult.on;

            zoomResult.on = function(...args: any[]) {
                const onResult = on.apply(this, args);
                if (args[0] === 'zoom' && typeof args[1] === 'function') {
                    zoomScope = args[1]();
                }

                return onResult;
            }

            return zoomResult;
        },
        select: function(...args: any[]) {
            const afterSelect = select.apply(this, args);
            const append = afterSelect.append;
 
            afterSelect.append = function(...args: any[]) {
                let afterAppend = append.apply(afterSelect, args);
                if (args[0] === 'g') {
                    afterAppend = {
                        __proto__: afterAppend.__proto__,
                        ...afterAppend,
                        transition: () => ({
                            duration: () => ({
                                call: () => {}
                            })
                        })
                    };
                }

                return afterAppend;
            };
            
            return afterSelect;
        }
    };
});
jest.mock('helpers', () => {
    const helpers = jest.requireActual('helpers');
    return {
        ...helpers,
        setLoadingTimer: () => () => 1
    }
});


const INITIAL_STATE = {
    station: {
        stations,
        lines,
    }
}
const transform1 = {
    "k": 1.0013872557113346,
    "x": -0.4716669418537549,
    "y": -0.4684589130213226
}
const transform2 = {
    "k": 3,
    "x": -0.4716669418537549,
    "y": -0.4684589130213226
}



describe('containers/App', () => {
    describe('perform a full search', () => {
        let wrapper = mount(
            <Root initialState={INITIAL_STATE}>
                <App/>
            </Root>
        );

        const graph = helpers.MrtGraph.getGraph(stations);
        helpers.processBorderData(border);

        it('can choose stations and click search', async () => {
            await new Promise(resolve => setTimeout(resolve, 200));
            wrapper.update();

            wrapper.find('button[type="submit"]').simulate('click');

            Array(2).fill(0).forEach(() => {
                Root.getStore()?.dispatch(
                    actions.updateTrainInformation(trainInformation)
                );
            });
    
            Root.getStore()?.dispatch(
                actions.fetchMapDataSuccess({
                    border,
                    water,
                    park
                })
            )
    
            await new Promise(resolve => setTimeout(resolve, 200));
    
            Root.getStore()?.dispatch(
                actions.fetchStationsSuccess(stations, lines)
            );
    
            await new Promise(resolve => setTimeout(resolve, 200));
            wrapper.update();
    
            function setInputs (from: string, to: string) {
                wrapper.find('.SearchInput')
                    .first()
                    .find('input')
                    .simulate('change', {
                        target: { value: from }
                    });
    
                wrapper.find('.SearchInput')
                    .first()
                    .find('li')
                    .first()
                    .simulate('click');
    
                wrapper.find('.SearchInput')
                    .at(1)
                    .find('input')
                    .simulate('change', {
                        target: { value: to }
                    });
    
                wrapper.find('.SearchInput')
                    .at(1)
                    .simulate('keyDown', { keyCode: 40 })
                    .simulate('keyDown', { keyCode: 40 })
                    .simulate('keyDown', { keyCode: 38 })
                    .simulate('keyDown', { keyCode: 13 });
    
                wrapper.update();
            }
    
            setInputs('Punggol', 'Riviera');
            setInputs('Riviera', 'Punggol');
            setInputs('Raffl', 'City H');
    
            expect(wrapper.find('.SearchResult').hasClass('active')).toBeTruthy();
        });

        it('can choose alternative trip', async () => {
            await new Promise(resolve => setTimeout(resolve, 200));
            wrapper.update();

            expect(wrapper.find('.switch-trip').find('button').length);

            wrapper.find('.switch-trip').find('button').simulate('click')

            expect(wrapper.find('.switch-trip').hasClass('prev')).toBeTruthy();
        });

        it('can click on different route', () => {
            wrapper.find('.SearchResultOptionsItem').at(1).simulate('click');

            expect(wrapper.find('.SearchResultOptionsItem').at(1).hasClass('active')).toBeTruthy();
        });

        it('can find next route', async () => {
            jest.spyOn(graph, 'findNextShortestPath')
                .mockImplementation(() => {});
        
            wrapper.find('.next-button').simulate('click');

            await new Promise(resolve => setTimeout(resolve, 200));
            wrapper.update();
            
            expect(
                wrapper.find('.Slide.no-more').props().style?.opacity
            ).toEqual(1);
        })

        it('can zoom on map', async () => {
            zoomScope.zoomManually(transform1);

            await new Promise(resolve => setTimeout(resolve, 200));
    
            zoomScope.zoomManually(transform2);
    
            await new Promise(resolve => setTimeout(resolve, 200));
        })
    });
});