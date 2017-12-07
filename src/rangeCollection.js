//Data Structure used: Interval Tree: An augmented binary search tree
//Each node stores a range
//Tree uses low value as key
//max is the max range endpoint value available in the tree/subtree.

//Prerequisites to run: Babel+JSX

class RangeNode {
    constructor (low, high) {
        this.low = low;
        this.high = high;
        this.max = high;
        this.left = null;
        this.right = null;
    }
}

class RangeCollection  {
    constructor () {
        this.root = null;
    }

    add (range) {
        const low = range[0];
        const high = range[1];
        if(low === high) {
            return;
        }
        const newNode = new RangeNode(low, high);
        let currentNode = this.root;
        if(this.root === null) {
            this.root = newNode;
            return;
        } else {
            while(currentNode) {
                if (this.intersects(currentNode, newNode)) {
                    this.modify(currentNode, newNode);
                    break;
                }
                if(newNode.low < currentNode.low) {
                    if(currentNode.left === null) {
                        currentNode.left = newNode;
                        break;
                    } else {
                        if(currentNode.max < newNode.max) {
                            currentNode.max = newNode.max;
                        }
                        currentNode = currentNode.left;
                    }
                } else {
                    if(currentNode.right === null) {
                        currentNode.right = newNode;
                        break;
                    } else {
                        if(currentNode.max < newNode.max) {
                            currentNode.max = newNode.max;
                        }
                        currentNode = currentNode.right;
                    }
                }
            }
        }
    }

    intersects (node1, node2) {
        if((node2.low <= node1.high && node2.low >= node1.low) ||
            (node2.high <= node1.high && node2.low >= node1.low) ||
            (node2.low < node1.low && node2.high > node1.high) ||
            (node2.low < node1.low && node2.high < node1.high)) {
            return true;
        }
        return false;
    }

    modify (node1,node2) {
        if(node2.low > node1.low && node2.high < node1.high) {
            return node1;
        } else if (node2.low > node1.low && node2.high > node1.high) {
            node1.high = node2.high;
            node1.max = node2.max;
            return node1;
        }
    }

    getMinNode(root) {
        while(root.left) {
            root = root.left;
        }
        return root;
    }

    deleteNode(root, low, high) {
        if(root ===  null) {
            return null;
        }
        if(root.low === low && root.high === high ) {
            if(!root.left && !root.right) {
                return null;
            } else if( !root.left) {
                return root.right;
            } else if(!root.right) {
                return root.left;
            } else {
                const minNode = this.getMinNode(root.right);
                root.low = minNode.low;
                root.high = minNode.high;
                root.max = monNode.max;
                root.right = this.deleteNode(root.right, minNode.low, minNode.high);
                return root;
            }
        } else if( low < root.low) {
            root.left = this.deleteNode(root.left, low, high);
            return root;
        } else {
            root.right = this.deleteNode(root.right, low, high);
            return root;
        }
    }

    remove (range) {
        const low = range[0];
        const high = range[1];
        if(low === high) {
            return;
        }
        const nodeToDelete = new RangeNode(low, high);
        const foundNode = this.search(this.root,nodeToDelete);
        if(foundNode) {
            if(nodeToDelete.low === foundNode.low && nodeToDelete.high <= foundNode.high) {
                foundNode.low = nodeToDelete.high;
                return;
            } else if( nodeToDelete.low > foundNode.low && nodeToDelete.high < foundNode.high) {
                const tempHigh = foundNode.high;
                foundNode.high = nodeToDelete.low;
                this.add([nodeToDelete.high, tempHigh]);
            } else if(nodeToDelete.low > foundNode.low && nodeToDelete.high > foundNode.high) {
                const tempHigh = foundNode.high;
                foundNode.high = nodeToDelete.low;
                this.remove([tempHigh, nodeToDelete.high]);
            } else if(nodeToDelete.low < foundNode.low && nodeToDelete.high < foundNode.high) {
                foundNode.low = nodeToDelete.high;
                return;
            } else {
                this.root = this.deleteNode(this.root, foundNode.low, foundNode.high);
                this.remove([foundNode.high, nodeToDelete.high]);
            }
        }




    }

    search (root, node) {
        if (root === null || this.intersects(root, node)) {
            return root;
        } else if(root.left === null || node.low > node.left.max ) {
            return this.search(root.right, node);
        } else {
            return this.search(root.left, node);
        }
    }

    traverseInOrder (root) {
        let result = [];
        if(root.left) {
            result = result.concat(this.traverseInOrder(root.left));
        }
        result.push(`[${root.low}, ${root.high})`);
        if(root.right) {
            result = result.concat(this.traverseInOrder(root.right));
        }
        return result;
    }

    print () {
        console.log(this.traverseInOrder(this.root).join(' '));
    }
}

const rc = new RangeCollection();

rc.add([1,5]);
rc.print()
rc.add([10,20]);
rc.print()
rc.add([20,20]);
rc.print()
rc.add([20,21]);
rc.print()
rc.add([2,4]);
rc.print()
rc.add([3,8]);
rc.print()
rc.remove([10,10]);
rc.print()
rc.remove([10,11]);
rc.print()
rc.remove([15,17]);
rc.print()
rc.remove([3,19]);
rc.print()
