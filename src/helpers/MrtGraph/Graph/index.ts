import _cloneDeep from 'lodash/cloneDeep';
import { GraphData, GraphListNeighbors } from './GraphData';
import { GraphInputs } from './GraphInputs';
import { CandidatePaths } from './CandidatePaths';
import { LineNode } from '../Line';
import { PriorityQueue } from '../PriorityQueue';

export interface Frequencies {
    [lineSymbol: string]: number;
}

export type BasePath = string[];
export interface PathDetail {
    path: GraphListNeighbors[];
    lines: number;
    time: number;
}
export interface Path {
    paths: PathDetail[],
    base: BasePath,
    time: number;
}

interface Distances {
    [stationName: string]: Path
}

interface Previous {
    [key: string]: (string | null)
};

interface Visited {
    [key: string]: boolean
}

interface LineCount {
    [lineSymbol: string]: number;
}

interface BestOption {
    data: GraphListNeighbors;
    count: LineCount;
}

export class Graph {
    shortestPaths: Path[] = [];
    private candidatePaths = new CandidatePaths<Path>();
    private inputs = new GraphInputs<Frequencies>();
    private graphData = new GraphData<LineNode>();

    get start() {
        return this.inputs.start
    }

    get end() {
        return this.inputs.end
    }

    addStation = this.graphData.addStation;

    addConnection = this.graphData.addConnection;

    findNextShortestPath(
        start?: string,
        end?: string,
        timeBtw2Stations?: number,
        timeSwitchBtw2Lines?: number,
        frequencies?: Frequencies
    ): void {
        const { needReset, isValid } = this.inputs.validateAndUpdateInputs(
            start,
            end,
            timeBtw2Stations,
            timeSwitchBtw2Lines,
            frequencies
        );

        if (needReset) this.reset();
        if (!isValid) return;

        const { shortestPaths, candidatePaths } = this;

        if (!shortestPaths.length) {
            const shortest = this.findShortestPath();
            if (shortest) shortestPaths.push(shortest);
            return;
        }

        const prevShortestBasePath = shortestPaths[shortestPaths.length - 1].base;

        for (
            let index = 0, length = prevShortestBasePath.length;
            index < length - 1;
            index ++
        ) {
            const spurStation = prevShortestBasePath[index];
            const rootBasePath = prevShortestBasePath.slice(0, index + 1);
            const rootPathData = this.getRootPathData(rootBasePath);
            const isStartWithRootBasePath = new RegExp(
                `^${CandidatePaths.joinPath(rootBasePath)}`
            );

            shortestPaths.forEach(({ base }) => {
                const isMatched = CandidatePaths.joinPath(base)
                    .match(isStartWithRootBasePath);

                if (isMatched) {
                    this.graphData.removeConnection(
                        base[index],
                        base[index + 1]
                    );
                }
            });

            rootBasePath.forEach(station => {
                if (station !== spurStation) {
                    this.graphData.removeStation(station);
                }
            });

            const spurShortestPath = this.findShortestPath(
                spurStation,
                this.inputs.end,
                rootPathData
            );

            this.graphData.restoreGraph();

            if (spurShortestPath) {
                candidatePaths.enqueue(spurShortestPath);
            }
        }

        if (candidatePaths.isNotEmpty()) {
            this.addToShortestPaths();
        }
    }
    private reset = () => {
        this.shortestPaths = [];
        this.candidatePaths = new CandidatePaths<Path>();
    }

    private addToShortestPaths(): void {
        const { shortestPaths, candidatePaths } = this;
        const nextLength = shortestPaths.length + 1;

        while (shortestPaths.length) {
            candidatePaths.enqueue(shortestPaths.pop() as Path);
        }

        while (
            shortestPaths.length < nextLength &&
            candidatePaths.isNotEmpty()
        ) {
            shortestPaths.push(candidatePaths.dequeue() as Path);
        }
    }

    private getRootPathData(path: BasePath): GraphListNeighbors[] {
        const { list } = this.graphData;
        const stations = [];

        for (let i = 0, l = path.length; i < l - 1; i++) {

            stations.push(list[path[i]][path[i + 1]]);
        }

        return _cloneDeep(stations);
    }

    private findShortestPath(
        start?: string,
        end?: string,
        rootPathData: GraphListNeighbors[] = []
    ): (Path | null) {
        start = start || this.inputs.start;
        end = end || this.inputs.end;

        if (!start || !end) return null;

        const { list } = this.graphData;
        const queue = new PriorityQueue<string>();
        const distances: Distances = {};
        const prev: Previous = {};
        const visited: Visited = {};

        for (const station in list) {
            if (station === start) {
                queue.enqueue(station, 0);    
            }

            distances[station] = {
                time: station === start ? 0 : Number.POSITIVE_INFINITY,
                paths: [],
                base: []
            };
            prev[station] = null;
        }

        while (queue.length) {
            let smallest = queue.dequeue() as string;

            if (smallest === end) {
                return distances[smallest];
            }

            if (
                !distances[smallest] ||
                distances[smallest].time === Number.POSITIVE_INFINITY
            ) continue;

            for (let neighbor in list[smallest]) {
                if (visited[neighbor]) continue;

                const neighborPath = this.generateNeighborPathData(
                    prev,
                    smallest,
                    neighbor,
                    rootPathData
                );

                if (neighborPath.time < distances[neighbor].time) {
                    distances[neighbor] = neighborPath;
                    prev[neighbor] = smallest;
                    queue.enqueue(neighbor, neighborPath.time);
                }
            }
            visited[smallest] = true;
        }

        return null;
    }

    private generateNeighborPathData = (
        prev: Previous,
        smallest: string,
        neighbor: string,
        rootPathData: GraphListNeighbors[] = []
    ): Path => {
        const { list } = this.graphData;
        
        const spurPathData: GraphListNeighbors[] = [];
        let next = neighbor;
        let current = smallest;

        while (current) {
            spurPathData.push(list[current][next]);
            next = current;
            current = prev[current] as string;
        }

        const paths = this.generatePaths([
            ...rootPathData,
            ...spurPathData.reverse()
        ]);
        const base: BasePath = [];
        
        paths[0].path.forEach((stationData, index, arr) => {
            const lineSymbol = Object.keys(stationData)[0];

            base.push(stationData[lineSymbol].from);
            
            if (index === arr.length - 1) {
                base.push(stationData[lineSymbol].to);
            }
        });

        return {
            paths,
            base,
            time: paths[0].time
        };
    }

    private generatePaths = (stations: GraphListNeighbors[]): PathDetail[] => {
        const lineCount: LineCount = {};
        const paths: {
            path: GraphListNeighbors[];
            count: LineCount;
        }[] = [];

        stations.forEach(station => {
            Object.keys(station).forEach(lineSymbol => {
                lineCount[lineSymbol] = (lineCount[lineSymbol] || 0) + 1;
            });
        });

        paths.push({
            path: [],
            count: _cloneDeep(lineCount)
        });

        for (const stationData of stations) {
            if (Object.keys(stationData).length < 2) {
                paths.forEach(path => {
                    path.path.push(stationData);
                });
                continue;
            }

            paths.forEach(path => {
                this.findBestOptions(stationData, path.count)
                    .forEach((option, index, bestOptions) => {
                        if (index < bestOptions.length - 1) {
                            paths.push({
                                path: [...path.path, option.data],
                                count: option.count
                            });
                        } else {
                            path.path.push(option.data);
                            path.count = option.count;
                        }
                    });
            });
        }

        let minTime = Number.POSITIVE_INFINITY;
        
        return paths
            .map(path => {
                const { time, lines } = this.calculatePathProperties(path.path);

                if (time < minTime) minTime = time;

                return {
                    path: path.path,
                    time,
                    lines
                };
            })
            .filter(path => path.time === minTime);
    }

    private calculatePathProperties(
        path: GraphListNeighbors[]
    ): { lines: number; time: number } {
        const {
            timeBtw2Stations,
            timeSwitchBtw2Lines,
            frequencies
        } = this.inputs as {
            timeBtw2Stations: number,
            timeSwitchBtw2Lines: number,
            frequencies: Frequencies
        };

        let prevLineSymbol: (string | null) = null;
        let lines = 0;
        let time = 0;

        for (let stationData of path) {
            const lineSymbol = Object.keys(stationData)[0];
            time += timeBtw2Stations;

            if (!prevLineSymbol) {
                lines += 1;
            } else if (prevLineSymbol !== lineSymbol) {
                lines += 1;
                time += timeSwitchBtw2Lines + frequencies[lineSymbol];
            }
            prevLineSymbol = lineSymbol;
        }

        return { lines, time };
    }

    private findBestOptions = (
        stationData: GraphListNeighbors,
        count: LineCount
    ): BestOption[] => {
        const options = Object.keys(stationData);
        const maxCount = Math.max(...options.map(option => count[option]));
        
        return options
            .filter(option => count[option] === maxCount)
            .map(option => {
                const newData = _cloneDeep(stationData);
                const newCount = _cloneDeep(count);

                options.forEach(opt => {
                    if (opt !== option) {
                        delete newData[opt];
                        newCount[opt] -= 1;
                    }
                });

                return { data: newData, count: newCount };
            });
    }
}