import { Path, BasePath, PathDetail } from './MrtGraph';

export interface ConvertedPath {
    stations: BasePath,
    trips: PathTripSplit[][],
    lines: number;
    time: number;
}

export const convertPathData = (p: Path): ConvertedPath => ({
    stations: p.base,
    trips: p.paths.map(splitTripByMrtLines),
    lines: p.paths[0].lines,
    time: p.time,
});

export type PathTripStation = { name: string; id: number };
export interface PathTripSplit {
    line: string;
    stations: PathTripStation[]
};

export const splitTripByMrtLines = (data: PathDetail): PathTripSplit[] => {
    const trip = data.path;
    const splits: PathTripSplit[] = [];
    let prevLine: (string | null) = null;
    let stations: PathTripStation[] = [];

    for (let step of trip) {
        const line = Object.keys(step)[0];
        const {
            from,
            fromId,
            to,
            toId,
        } = step[line];

        if (!prevLine) {
            stations.push(
                {
                    name: from,
                    id: fromId
                },
                {
                    name: to,
                    id: toId
                }
            );
        } else if (prevLine !== line) {
            splits.push({
                line: prevLine,
                stations: stations
            });
            stations = [
                {
                    name: from,
                    id: fromId
                },
                {
                    name: to,
                    id: toId
                }
            ];
        } else {
            stations.push({
                name: to,
                id: toId
            });
        }
        prevLine = line;
    }

    if (stations.length && prevLine) {
        splits.push({ line: prevLine, stations });
    }

    return splits;
}