class Edge {
    constructor(target, source, weight) {
        this.target = target;
        this.source = source;
        this.weight = weight;
    };

    Contains(node) {
        return (this.target.id === node.id || this.source.id === node.id);
    };

    GetNeighbor(node) {
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