// Define server operations:
var server = function() {

	// A basic struct for our goals:
	function Goal(data) {
		this.data = data;
		this.prototype.process = function() {
			// Process a goal:
		}
	}

	// A place to store goal notifications.
	var goalProcessingQueue = {
		items: [],
		shift: function() {
			return this.items.shift();
		},
		push: function(data) {
			return this.items.push(data);
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
		goalProcessingQueue.push(new Goal(data));
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

	function _log(message) {
		console.log(new Date().toGMTString(), message)
	}

	/**
	 * Expose public methods:
	 */

	return {
		start: start
	}
}

mutieServer = new server();

