var Graph = require('./graph.js');
var GraphNode = require('./node.js');
var GraphEdge = require('./edge.js');
var Generator = require('./idGenerator.js');

class GraphGenerator {
    constructor(nodeCount) {
		this.graph = new Graph();
        this.generate(nodeCount);
    };
    
    generate(nodeCount) {
        var maxEdges = Math.floor(nodeCount * (((nodeCount / 2) - .5) / 2));
        var edgeCount = void 0;
        var idGenerator = new Generator();

        //create node collection
        for(var i = 0; i < nodeCount; i++) {
            this.graph.nodes.push(GraphNode.prototype.createBlankNode(idGenerator));
        }

        if (nodeCount > 1 && maxEdges === 0) {
            maxEdges = 1;
        }

        edgeCount = getRandomInt(nodeCount - 1, maxEdges);
        var source, target, weight;
        var goodToAdd = void 0;
        var neighbor = void 0;

        while (this.graph.edges.length != edgeCount) {
            goodToAdd = true;
            source = getRandomInt(0, this.graph.nodes.length);
            target = getRandomInt(0, this.graph.nodes.length);

            if (source !== target) {
                for(var edge in this.graph.edges) {
                    neighbor = this.graph.edges[edge].getNeighbor(this.graph.nodes[source]);

                    if (neighbor !== null && neighbor.id === this.graph.nodes[target].id) {
                        goodToAdd = false;
                        break;
                    }
                }

                if (goodToAdd) {
                    weight = getRandomInt(1, 10);
                    this.graph.edges.push(new GraphEdge(this.graph.nodes[target], this.graph.nodes[source], weight));
                }
            }
        }
    };
    
};

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

module.exports = GraphGenerator;