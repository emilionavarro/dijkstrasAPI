class Node {
    constructor(id, bestWeight, sourceId) {
        this.id = id;
        this.bestWeight = bestWeight || Infinity;
        this.sourceId = sourceId;
        this.finalized = false;
    };

    getNewId() {
        return ++this.lastId;   
    };
};

Node.prototype.createBlankNode = function(idGenerator) {
    if (idGenerator) {
        return new Node(idGenerator.getNewId(), Infinity, 0)
    } else {
        return null;
    }
    
};

module.exports = Node;