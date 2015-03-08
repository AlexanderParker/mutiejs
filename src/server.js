// Define server operations:
var server = function() {

	// Goal object:
	function Goal(config) {
		this.data = config.data;
		this.prototype.process = function() {
			// Update all associated mutation scores

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
		this.prototype.getScore = function() {
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
				throw {
					message: "Attempted to push non-Goal object to goalProcessingQueue",
					data: goal
				}
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

	/**
	 * Expose public methods:
	 */

	return {
		start: start
	}
}

mutieServer = new server();
mutieServer.start();
