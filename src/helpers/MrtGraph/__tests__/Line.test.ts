import { Line, LineNode } from '../Line';

const stations = [
    {
        name: '2',
        line: 'l2',
        id: 2
    },
    {
        name: '1',
        line: 'l1',
        id: 1,
    },
    {
        name: '3',
        line: 'l3',
        id: 3,
    },
]

describe('helpers/mrtLines/Line', () => {
    const line = new Line('test');

    it('should add and remove station correctly', () => {
        line.addStation(
            stations[0].name,
            stations[0].line,
            stations[0].id
        );
        line.addStation(
            stations[1].name,
            stations[1].line,
            stations[1].id
        );
        line.addStation(
            stations[2].name,
            stations[2].line,
            stations[2].id
        );

        const nodes = line.traverseInOrder() as LineNode[];
        const ids = nodes.map(item => item.id);
        expect(ids).toEqual([1, 2, 3]);
    });
});