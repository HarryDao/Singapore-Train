export class PriorityQueue<T> {
    values: PriorityQueueNode<T>[] = [];
    length = 0;

    swap(index1: number, index2: number) {
        if (
            index1 >= this.length ||
            index2 >= this.length ||
            index1 === index2
        ) {
            return;
        }
        const temp = this.values[index1];
        this.values[index1] = this.values[index2];
        this.values[index2] = temp;

    }

    enqueue(value: T, priority: number): void {
        const newPriorityQueueNode = new PriorityQueueNode(value, priority);
        this.values.push(newPriorityQueueNode);

        this.length += 1;
        let index = this.values.length - 1;

        while (index > 0) {
            const parentIndex = Math.floor((index - 1) / 2);
            const parentPriorityQueueNode = this.values[parentIndex];

            if (parentPriorityQueueNode.priority <= newPriorityQueueNode.priority) break;

            this.swap(parentIndex, index);
            index = parentIndex;
        }
    }

    dequeue(): (T | null) {
        if (!this.length) return null;

        this.swap(0, this.length - 1);
        const result = this.values.pop() as PriorityQueueNode<T>;
        this.length -= 1;

        if (!this.length) return result.value;

        const { length, values } = this;
        const node = values[0];
        let index = 0;

        while (index < length - 1) {
            const left = index * 2 + 1;
            const right = index * 2 + 2;
            let childIndex;

            if (left > length - 1 && right > length - 1) {
                break;
            } else if (left > length - 1) {
                childIndex = right;
            } else if (right > length - 1) {
                childIndex = left;
            } else if (values[right].priority < values[left].priority) {
                childIndex = right;
            } else {
                childIndex = left;
            }

            if (node.priority <= values[childIndex].priority) {
                break;
            }

            this.swap(index, childIndex);
            index = childIndex;
        }

        return result.value;
    }
}

export class PriorityQueueNode<T> {
    constructor(public value: T, public priority: number) {};
}