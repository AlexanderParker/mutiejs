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
		// Increment the mutation's score.
		this.prototype.incrementScore = function(points) {
			// Minimum points to add is 1.
			if (!points) {
				this.score +=  1;
			} else {
				this.score += points;
			}
			return this.score;
		}
		this.prototype.getScore = function() {
			return this.score;
		}
	}

	// A place to store goal notifications.
	var goalProcessingQueue = {
		items: [],
		shift: function() {
			return this.items.shift();
		},
		push: function(goal) {
			return this.items.push(goal);
		},
		length: function() {
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

	// Push goal success to the queue:
	function goalPushSuccess(data) {
		// Insert data into a Goal instance in the queue.
		goalProcessingQueue.push(new Goal({
			data: data
		}));
		return true;			
	}

	// Goal success processing callback:
	function processGoalSuccess() {
		if (goalProcessingQueue.length > 0) {
			goalProcessingQueue.shift.process();
		}
	}

	/**
	 * Private Methods:
	 */

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

