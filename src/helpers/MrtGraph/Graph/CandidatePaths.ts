import { PriorityQueue } from '../PriorityQueue';

interface IsCandidatePath {
    time: number;
    base: string[];
}

export class CandidatePaths<P extends IsCandidatePath> {
    private queue = new PriorityQueue<P>();
    private map: { [label: string]: boolean } = {};

    static joinPath(path: string[]): string {
        return path.join('&&');
    }

    enqueue(path: P): void {
        const label = CandidatePaths.joinPath(path.base);

        if (!this.map[label]) {
            this.queue.enqueue(path, path.time);
            this.map[label] = true;
        }
    }

    dequeue(): (P | null) {
        if (!this.queue.length) return null;

        const path = this.queue.dequeue() as P;
        this.map[CandidatePaths.joinPath(path.base)] = false;

        return path;
    }

    isNotEmpty(): boolean {
        return !!this.queue.length;
    }
}