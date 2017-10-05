var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var graph = require('./classes/graph.js');
var idGenerator = require('./classes/idGenerator.js');
var graphGenerator = require('./classes/graphGenerator.js');
var Dijkstra = require('./classes/Dijkstra.js');

var idGenerator = new idGenerator();
// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

router.get('/generate/:nodeCount', function (req, res) {
    var nodeCount = 5;

    if (req.params.nodeCount !== null) {
        nodeCount = parseInt(req.params.nodeCount);    
    }

    var generator = new graphGenerator(nodeCount);
    res.json(generator.graph);
});

router.post('/solve/:startNodeId', function (req, res) {
    var startNodeId = 1;

    if (req.params.startNodeId !== null) {
        startNodeId = parseInt(req.params.startNodeId);    
    }
    if (req.body && (!req.body.edges || !req.body.nodes)) {
        res.json( {message: "Nodes and Edges are required!"} );
    } else {
        var solution = new Dijkstra(startNodeId, req.body);
        res.json(solution.graph);
    }
});

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api

app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Running on port ' + port);