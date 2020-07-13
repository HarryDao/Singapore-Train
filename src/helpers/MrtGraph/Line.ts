export interface LineResult {
    id: number;
    name: string;
}

export class Line {
    root: (LineNode | null) = null;

    constructor(public symbol: string) {}

    addStation(name: string, line: string, id: number) {
        const newNode = new LineNode(name, line, id);
        
        if (!this.root) {
            this.root = newNode;
            return this;
        }

        let currentNode = this.root;
        while (currentNode) {
            if (id === currentNode.id) {
                break;
            }
            else if (id > currentNode.id) {
                if (!currentNode.right) {
                    currentNode.right = newNode;
                    break
                } else {
                    currentNode = currentNode.right;
                }
            } else {
                if (!currentNode.left) {
                    currentNode.left = newNode;
                    break;
                } else {
                    currentNode = currentNode.left;
                }
            }
        }
    }

    traverseInOrder(
        fn?: (node: LineNode) => any
    ) : (LineResult[] | undefined) {
        const result: LineResult[] = [];

        (function traverse(node: LineNode | null): void {
            if (!node) return;
            if (node.left) traverse(node.left);
            
            if (fn && typeof fn === 'function') {
                fn(node);
            } else {
                result.push({
                    id: node.id,
                    name: node.name
                });
            }

            if (node.right) traverse(node.right);
        })(this.root);

        if (!fn) return result;
    }
}

export class LineNode {
    left: LineNode | null = null;
    right: LineNode | null = null;

    constructor(
        public name: string,
        public line: string,
        public id: number
    ) {};
}