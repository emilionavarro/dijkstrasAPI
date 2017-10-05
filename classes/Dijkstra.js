var Graph = require('./graph.js');
var GraphNode = require('./node.js');
var GraphEdge = require('./edge.js');
var Generator = require('./idGenerator.js');

class Dijkstra {
    constructor(startNodeId, graph) {
        this.graph = graph;
        this.initialize();
        this.solve(startNodeId);
    };

    initialize() {
        //set all weights to infinity
        for (var i = 0, len = this.graph.nodes.length; i < len; i++) {
            this.graph.nodes[i].bestWeight = Infinity;
        }
    };

    solve(startNodeId) {
        var currentNode = this.FindNode(startNodeId);

        if (currentNode !== null) {
            currentNode.bestWeight = 0;
            currentNode.sourceId = startNodeId;

            while(!this.AllNodesFinalized()) {
                currentNode.finalized = true;

                this.UpdateNeighbors(currentNode);
                currentNode = this.GetNextNode();
            }
        } else {
            return null;
        }
    };

    GetNextNode(){
        var currentNode = void 0;
        var node = void 0;
        var first = true;

        for(var i = 0, len = this.graph.nodes.length; i < len; i++) {
            node = this.graph.nodes[i];

            if (!node.finalized && !node.bestWeight != Infinity) {
                if (first) {
                    currentNode = node;
                    first = false;
                } else if (node.bestWeight <= currentNode.bestWeight) {
                    currentNode = node;
                }
            }
        }

        return currentNode;
    };

    UpdateNeighbors(currentNode) {
        var connectedEdges = this.GetConnectedEdges(currentNode);
        var neighbor = void 0;
        var currentEdge = void 0;
        var weight = void 0;

        for(var i = 0, length = connectedEdges.length; i < length; i++) {
            currentEdge = connectedEdges[i];
            weight = currentEdge.weight + currentNode.bestWeight;

            neighbor = this.GetNode(currentEdge.GetNeighbor(currentNode).id);

            if (!(neighbor.bestWeight <= weight)) {
                neighbor.bestWeight = weight;
                neighbor.sourceId = currentNode.id;
            }
        }
    };

    GetNode(id) {
        for (var i = 0, len = this.graph.nodes.length; i < len; i++) {
            if (this.graph.nodes[i].id === id) 
                return this.graph.nodes[i];
        }

        return null;
    }

    GetConnectedEdges(currentNode) {
        var connectedEdges = [];
        var currentEdge = void 0;

        for(var i = 0, length = this.graph.edges.length; i < length; i++ ){
            currentEdge = this.graph.edges[i];
            currentEdge = new GraphEdge(currentEdge.target, currentEdge.source, currentEdge.weight);

            if (currentEdge.Contains(currentNode) && !currentEdge.GetNeighbor(currentNode).finalized) {
                connectedEdges.push(currentEdge);
            }
        }

        return connectedEdges;
    };

    AllNodesFinalized() {
        for(var i = 0, length = this.graph.nodes.length; i < length; i++) {
            if (!this.graph.nodes[i].finalized) {
                return false;
            }
        }

        return true;
    };

    FindNode(id) {
        for(var i = 0, length = this.graph.nodes.length; i < length; i++) {
            if (this.graph.nodes[i].id === id) {
                return this.graph.nodes[i];
            }
        }

        return null;
    };
};

module.exports = Dijkstra;