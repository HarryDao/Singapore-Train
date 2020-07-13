interface GraphListNeighbor {
    from: string,
    fromId: number,
    to: string,
    toId: number
}

export interface GraphListNeighbors {
    [lineName: string]: GraphListNeighbor
}

interface GraphListItem {
    [toStationName: string]: GraphListNeighbors
}

interface GraphList {
    [fromStationName: string]: GraphListItem
}

enum RemovedStackTypes {
    station = 'station',
    connection = 'connection'
};

interface RemovedStation {
    type: RemovedStackTypes.station;
    station: {
        name: string,
        data: GraphListItem
    };
    neighbors: { [name: string]: GraphListNeighbors };
}

interface RemovedConnection {
    type: RemovedStackTypes.connection;
    from: string;
    fromData: GraphListNeighbors;
    to: string;
    toData: GraphListNeighbors;
}

interface isNode {
    name: string;
    line: string;
    id: number;
}

export class GraphData<N extends isNode> {
    list: GraphList = {};
    private removedStack: (RemovedStation | RemovedConnection)[] = [];

    addStation = (station: string): void => {
        this.list[station] = {};
    }

    addConnection = (station1: N, station2: N): void => {
        if (!this.list[station1.name][station2.name]) {
            this.list[station1.name][station2.name] = {};
        }
        if (!this.list[station2.name][station1.name]) {
            this.list[station2.name][station1.name] = {};
        }
        if (!this.list[station1.name][station2.name][station1.line]) {
            this.list[station1.name][station2.name][station1.line] = {
                from: station1.name,
                fromId: station1.id,
                to: station2.name,
                toId: station2.id,           
            }
        }
        if (!this.list[station2.name][station1.name][station1.line]) {
            this.list[station2.name][station1.name][station1.line] = {
                from: station2.name,
                fromId: station2.id,
                to: station1.name,
                toId: station1.id,  
            }
        }
    }

    removeStation = (station: string) => {
        if (!this.list[station]) return;

        const stationData = this.list[station];
        const neighbors: { [name: string]: GraphListNeighbors } = {};

        delete this.list[station];

        Object.keys(stationData).forEach(neighbor => {
            neighbors[neighbor] = this.list[neighbor][station];
            delete this.list[neighbor][station];
        });

        const removedData: RemovedStation = {
            type: RemovedStackTypes.station,
            station: {
                name: station,
                data: stationData
            },
            neighbors
        };

        this.removedStack.push(removedData);
    }

    removeConnection = (from: string, to: string) => {
        if (
            !this.list[from] ||
            !this.list[from][to]
        ) return;

        const removedData: RemovedConnection = {
            type: RemovedStackTypes.connection,
            from,
            fromData: this.list[from][to],
            to,
            toData: this.list[to][from]
        };

        this.removedStack.push(removedData);

        delete this.list[from][to];
        delete this.list[to][from];
    }

    restoreGraph = () => {
        while (this.removedStack.length) {
            const removedItem = this.removedStack.pop() as (RemovedStation | RemovedConnection);

            if (removedItem.type === RemovedStackTypes.station) {
                const { station, neighbors } = removedItem;
                this.list[station.name] = station.data;
                Object.keys(neighbors).forEach(neighbor => {
                    this.list[neighbor][station.name] = neighbors[neighbor];
                });
            }

            if (removedItem.type === RemovedStackTypes.connection) {
                const { from, fromData, to, toData } = removedItem;
                this.list[from][to] = fromData;
                this.list[to][from] = toData;
            }
        }
    }
}