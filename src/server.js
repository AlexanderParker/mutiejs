// Define server operations:
var server = function() {

	// Goal object:
	function Goal(config) {		
		this.type = config.type;
		this.data = config.data;
	}

	// Manage configured goals:
	function GoalManager(config) {
		if (config.goals.constructor === Array) {
			this.goals = config.goals;
		}
		else {
			this.goals = [];
		}
		this.prototype.push = function(goal) {
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
	}

	// ElementManager object:
	function ElementManager(config) {
		if (config.elements.constructor === Array) {
			this.elements = config.elements;
		}
		else {
			this.elements = [];
		}
		this.prototype.push = function(element) {
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
	}

	// MutableElement object:
	function MutableElement(config) {
		this.elementId = config.elementId;
	}

	// ElementMutations object:
	function ElementMutations(config) {
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
		// Retrieve mutations associated with the element:
		this.prototype.getMutations = function() {
			return this.mutations;
		}
		// Retrieve the element's primary mutation:
		this.prototype.getPrimaryMutation = function() {
			// Grab the primary mutation for the element;
			return this.mutations.find(function isPrimary(element, index, array) {
				return element.isPrimary;
			});
		}
		// Retrieve the alternative mutations:
		this.prototype.getAlternateMutations = function() {
			// Grab the alternate mutations for the element;
			return this.mutations.filter(function isPrimary(element, index, array) {
				return !element.isPrimary;
			});
		}
		// Fetch a random mutation for the element:
		this.prototype.getRandomMutation = function() {
			// Retrieve a random mutation for the element;
			return this.mutations[
				Math.floor(Math.random()*this.mutations.length)
			];
		}
		// Add a new mutation to the element:
		this.prototype.addMutation = function(mutation) {
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
	}

	// Mutation object:
	function Mutation(config) {		
		this.parameters = config.parameters;
		this.isEnabled = config.isEnabled;
		this.isPrimary = config.isPrimary;
		this.elementIdentifier = config.elementIdentifier;
		this.score = config.score;
		this.createdTimestamp = config.createdTimestamp;
		// Increment the mutation's score.
		this.prototype.incrementScore = function(points) {
			// Minimum points to add is 1.
			if (!points) {
				this.score +=  1;
			}
			else {
				this.score += points;
			}
			return this.score;
		}
	}

	// A place to store goal notifications.
	var goalResultProcessingQueue = function(items) {
		if (items.constructor === Array) {
			this.items = items;
		}
		else {
			this.items = [];
		}
		this.prototype.shift = function() {
			return this.items.shift();
		}
		this.prototype.push = function(goalResult) {
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
		this.prototype.length = function() {
			return items.length;
		}
	}

	/**
	 * Public Methods:
	 */

	// Start the server:
	function start() {
		// Initialise the mutiejs endpoints:
		_log('Starting mutiejs server.')
	}

	// Stop the server:
	function stop() {
		// Gracefully exit:
		_log('Stopping mutiejs server.')
	}


	/**
	 * Private Methods:
	 */

	// Push goal success to the queue:
	function _pushGoalSuccess(data) {
		// Insert data into a Goal instance in the queue.
		goalProcessingQueue.push(new GoalResult({
			goal: new Goal(data.goal)
		}));
		return true;			
	}

	// Goal success processing callback:
	function _processGoalQueue() {
		// Process the most recent goal result.
		if (goalResultProcessingQueue.length > 0) {
			goalResultProcessingQueue.shift.process();
		}
	}

	// Clean up old sessions:
	function _cleanupSessions() {

	}

	// Resolve mutation stalemates:
	function _resolveStalemates() {

	}

	// Generic log message:
	function _log(message) {
		console.log(new Date().toGMTString() + '::' + message);
	}

	// Disable the provided mutations:
	function _disableMutations(mutations) {

	}

	// Generic exception format:
	function _exception(message, data) {
		return {
			message: message,
			data: data
		}
	}

	/**
	 * Expose public methods:
	 */

	return {
		start: start
	}
}

mutieServer = new server();
mutieServer.start();
