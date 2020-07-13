import { Graph } from './Graph';
import { Line, LineNode } from './Line';
import { FetchStationsData } from 'apis';

export * from './Graph';

export class MrtGraph {
    private static graph: Graph;

    static getGraph(stations?: FetchStationsData ): Graph {
        if (!MrtGraph.graph) {
            const graph = new MrtGraph();

            if (stations) {
                graph.addStationsData(stations);
            }
            
            MrtGraph.graph = graph.mrtGraph;
        }

        return MrtGraph.graph;
    }

    private mrtGraph = new Graph();
    private mrtLines: { [key: string]: Line } = {}; 

    private addStationsData(stations: FetchStationsData) {
        const { mrtGraph, mrtLines } = this;
        
        Object.keys(stations).forEach(stationName => {
            mrtGraph.addStation(stationName);

            const { lines } = stations[stationName];

            Object.keys(lines).forEach(lineSymbol => {
                if (!mrtLines[lineSymbol]) {
                    mrtLines[lineSymbol] = new Line(lineSymbol);
                }

                let ids = lines[lineSymbol];

                if (!Array.isArray(ids)) {
                    ids = [ids];
                }

                ids.forEach(id => {
                    mrtLines[lineSymbol].addStation(
                        stationName,
                        lineSymbol,
                        id
                    );
                });
            });
        });

        this.addConnectionsToGraph();
    }

    private addConnectionsToGraph() {
        const { mrtGraph, mrtLines } = this;

        Object.keys(mrtLines).forEach(lineSymbol => {
            const line = mrtLines[lineSymbol];
            let prevStation: (LineNode | null) = null;

            line.traverseInOrder(station => {
                if (prevStation) {
                    mrtGraph.addConnection(prevStation, station);
                }
                prevStation = station;
            });
        });
    }
}