import { PriorityQueue } from '../PriorityQueue';

const data: [string, number][] = [
    ['A', 3],
    ['B', 10],
    ['C', 6],
    ['D', 300],
    ['E', 1],
    ['F', 20]
];

describe('helpers/mrtLines/PriorityQueue', () => {
    const queue = new PriorityQueue<string>();

    it('should work', () => {
        data.forEach(([value, priority]) => {
            queue.enqueue(value, priority);
        });

        const arr = data.map(() => queue.dequeue());

        expect(arr).toEqual(['E', 'A', 'C', 'B', 'F', 'D']);
    });
});