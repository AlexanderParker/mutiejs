var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var jsonParser = bodyParser.json();

app.use(bodyParser.json({ type: 'application/*+json' }));

// Define server operations:
function server() {
	this.start();
};

// Goal object:
server.prototype.Goal = function(config) {
	this.type = config.type;
	this.data = config.data;
};

// Manage configured goals:
server.prototype.GoalManager = function(config) {
	if (config.goals.constructor === Array) {
		this.goals = config.goals;
	}
	else {
		this.goals = [];
	}
	server.prototype.push = function(goal) {
		if (goal.constructor === Goal) {
			this.goals.push(goal);
		}
		else {
			throw _exception(
				"Attempted to push non-Goal object to GoalManager goals",
				goal
			);
		}
	}
};

// ElementManager object:
server.prototype.ElementManager = function(config) {
	if (config.elements.constructor === Array) {
		this.elements = config.elements;
	}
	else {
		this.elements = [];
	}
	server.prototype.push = function(element) {
		if (element.constructor === MutableElement) {
			this.elements.push(element);
		}
		else {
			throw _exception(
				"Attempted to push non-MutableElement object to ElementManager elements",
				element
			);
		}
	}
};

// MutableElement object:
server.prototype.MutableElement = function(config) {
	this.elementId = config.elementId;
};

// ElementMutations object:
server.prototype.ElementMutations = function(config) {
	// MutableElement reference is required
	if (config.element.constructor === MutableElement) {
		this.element = config.element;
	}
	else {
		throw _exception("ElementMutations requires a MutableElement in constructor.");
	}
	// Mutations list may be optional:
	if (config.mutations.constructor === Array) {
		this.mutations = config.mutations;
	}
	else {
		this.mutations = [];
	}
	// Set the timestamp of the experiment start:
	this.experimentStartTimestamp = config.experimentStartTimestamp;
	// Retrieve mutations associated with the element:
	server.prototype.getMutations = function() {
		return this.mutations;
	}
	// Retrieve the element's primary mutation:
	server.prototype.getPrimaryMutation = function() {
		// Grab the primary mutation for the element;
		return this.mutations.find(function isPrimary(element, index, array) {
			return element.isPrimary;
		});
	}
	// Retrieve the alternative mutations:
	server.prototype.getAlternateMutations = function() {
		// Grab the alternate mutations for the element;
		return this.mutations.filter(function isPrimary(element, index, array) {
			return !element.isPrimary;
		});
	}
	// Fetch a random mutation for the element:
	server.prototype.getRandomMutation = function() {
		// Retrieve a random mutation for the element;
		return this.mutations[
			Math.floor(Math.random()*this.mutations.length)
		];
	}
	// Add a new mutation to the element:
	server.prototype.addMutation = function(mutation) {
		if (mutation.constructor === Mutation) {
			this.mutations.push(mutation);
		}
		else {
			throw _exception(
				"Attempted to push non-Mutation object to Element mutations",
				mutation
			);
		}
	}
};

// Mutation object:
server.prototype.Mutation = function(config) {		
	// Parameters determine the extent of mutation:
	this.parameters = config.parameters;
	// Is the mutation enabled?
	this.isEnabled = config.isEnabled;
	// Is the mutation primary?
	this.isPrimary = config.isPrimary;
	// Associate the mutation with its element:
	this.element = config.element;
	// Set the mutation score:
	this.score = config.score;
	// Set the created timestamp:
	this.createdTimestamp = config.createdTimestamp;
	// Increment the mutation's score.
	server.prototype.incrementScore = function(points) {
		// Minimum points to add is 1.
		if (!points) {
			this.score +=  1;
		}
		else {
			this.score += points;
		}
		return this.score;
	}
};

// A place to store goal notifications.
server.prototype.GoalResultProcessingQueue = function(items) {
	if (items.constructor === Array) {
		this.items = items;
	}
	else {
		this.items = [];
	}
	server.prototype.shift = function() {
		return this.items.shift();
	}
	server.prototype.push = function(goalResult) {
		// You can only push valid Goals to the queue:
		if (goal.constructor === GoalResult) {
			return this.items.push(goalResult);
		}
		else {
			throw _exception(
				"Attempted to push non-GoalResult object to goalResultProcessingQueue",
				goal
			);
		}
	}
	server.prototype.length = function() {
		return items.length;
	}
};

/**
 * Public Methods:
 */

// Start the server:
server.prototype.start = function() {
	// Load settings
	this._loadSettings();
	// Initialise the mutiejs endpoints:
	this._log('Starting mutiejs server.');
	// Set up mutations endpoint.
	app.use(function(req, res, next) {
		res.header('Access-Control-Allow-Origin', '*');
		res.header('Access-Control-Allow-Credentials', true); 
		res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
		res.header('Access-Control-Allow-Headers', 'Content-Type');
		if (res.type == 'OPTIONS') {
			res.sendStatus(200);		
		}
		else {
			next();
		}
	});	
	app.post('/mutations', jsonParser, function(req, res) {
		if (!req.body) return res.sendStatus(400);
		// Get session mutations for selected elements:
		res.send(req.body.map(function(value, index, array) {
			return {
				element: value.element,
				// Todo: lock these down to a session and test iteration.  For now it's always random.
				mutations: this._generateMutation(value.properties)
			};
		}.bind(this)));
	}.bind(this));
	app.listen(this.settings.serverPort);
	this._log('Started mutiejs server on port ' + this.settings.serverPort);
};

// Stop the server:
server.prototype.stop = function() {
	// Gracefully exit:
	this._log('Stopping mutiejs server.');
	process.exit;
};

/**
 * Private Methods:
 */

// Push goal success to the queue:
server.prototype._pushGoalSuccess = function(data) {
	// Insert data into a Goal instance in the queue.
	goalProcessingQueue.push(new GoalResult({
		goal: new Goal(data.goal),
		elements: data.elements
	}));
	return true;			
};

// Goal success processing callback:
server.prototype._processGoalQueue = function() {
	// Process the most recent goal result.
	if (goalResultProcessingQueue.length > 0) {
		goalResultProcessingQueue.shift.process();
	}
};

// Clean up old sessions:
server.prototype._cleanupSessions = function() {

};

// Resolve mutation stalemates:
server.prototype._resolveStalemates = function() {

};

// Generic log message:
server.prototype._log = function(message) {
	console.log(new Date().toGMTString() + '::' + message);
};

// Disable the provided mutations:
server.prototype._disableMutations = function(mutations) {

};

// Generic exception format:
server.prototype._exception = function(message, data) {
	return {
		message: message,
		data: data
	}
};

server.prototype._loadSettings = function() {
	// These will be externally configurable one day.
	this.settings = {
		// The port the mutiejs server will run on:
		serverPort: 8398,
		// The interval to process the goal success queue on (milliseconds):
		goalSuccessProcessInterval: 10,
		// The interval to clean up old sessions on (milliseconds):
		sessionCleanupInterval: 100000,
		// The interval to clean up stalemates on (milliseconds):
		stalemateCleanupInterval: 100000,
		// The age (in hours) at which to clean up stalemates:
		stalemateResolutionAge: 100,
		// The factor to mutate each new generation by:
		mutationFactor: 0.4,
		// The number of mutation variations to generate each generation:
		mutationVariations: 5,
		// The factor of difference required for any mutation to be declared the winner:
		victoryFactor: 0.05
	};
};

// Given a property list, generate a mutant:
server.prototype._generateMutation = function(parameters) {
	// Randomly affect only certain parameters - at least 1.
	var actualParameters = [];
	while (actualParameters.length === 0) {
		actualParameters = parameters.filter(function() {
			return Math.random() < 0.5;
		});
	}
	// Generate variations on the parameters:
	var mutant = actualParameters.map(function(value, index, array) {
		console.log(value);
		switch (value) {
			case "border":
			return this.mutateBorder();
			break;
			default:
			return { property: value, parameters: null };
			break;			
		}
	}.bind(this));
	console.log(mutant);
	return mutant;
}

// Generate a border mutation:

server.prototype.mutateBorder = function() {
	return {
		property: "border",
		parameters: {
			width: this.getRandom(),
			color: this.mutateColor(),
			radius: this.getRandom()
		},		
	};
}

server.prototype.mutateColor = function() {
	return {
		r: this.getRandom(),
		g: this.getRandom(),
		b: this.getRandom(),
	};
}

// Get a random vale
server.prototype.getRandom = function() {
	min = -this.settings.mutationFactor;
	max = this.settings.mutationFactor;
	return 1 + Math.random() * (max - min) + min;
}

mutieServer = new server();
