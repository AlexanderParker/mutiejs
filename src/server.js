// Define server operations:
var server = function() {

	// Goal object:
	function Goal(config) {
		this.data = config.data;
		this.prototype.process = function() {
			// Update all associated mutation scores

		}
	}

	function Element(config) {
		if (config.mutations.constructor === Array) {
			this.mutations = config.mutations;
		}
		else {
			this.mutations = [];
		}	
		this.prototype.getMutations = function() {
			return this.mutations;
		}
		this.prototype.getPrimaryMutation = function() {
			// Grab the primary mutation for the element;
			return this.mutations.find(function isPrimary(element, index, array) {
				return element.isPrimary;
			});
		}
		this.prototype.getAlternateMutations = function() {
			// Grab the alternate mutations for the element;
			return this.mutations.filter(function isPrimary(element, index, array) {
				return !element.isPrimary;
			});
		}
		this.prototype.getRandomMutation = function() {
			// Retrieve a random mutation for the element;
			return this.mutations[
				Math.floor(Math.random()*this.mutations.length)
			];
		}
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
	var goalProcessingQueue = function(items) {
		if (items.constructor === Array) {
			this.items = items;
		}
		else {
			this.items = [];
		}		
		this.prototype.shift = function() {
			return this.items.shift();
		}
		this.prototype.push = function(goal) {
			// You can only push valid Goals to the queue:
			if (goal.constructor === Goal) {
				return this.items.push(goal);
			}
			else {				
				throw _exception(
					"Attempted to push non-Goal object to goalProcessingQueue",
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
		goalProcessingQueue.push(new Goal({
			data: data
		}));
		return true;			
	}

	// Goal success processing callback:
	function _processGoalQueue() {
		if (goalProcessingQueue.length > 0) {
			goalProcessingQueue.shift.process();
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
