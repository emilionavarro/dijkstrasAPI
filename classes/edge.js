class Edge {
    constructor(target, source, weight) {
        this.target = target;
        this.source = source;
        this.weight = weight;
    };

    contains(node) {
        return (this.target.id === node.id || this.source.id === node.id);
    };

    getNeighbor(node) {
        if (this.source.id === node.id) {
            return this.target;
        } else if (this.target.id === node.id) {
            return this.source;
        } else {
            return null;
        }
    }
};

module.exports = Edge;