// Define server operations:
var server = function() {

	// A place to store goal notifications.
	var goalProcessingQueue = {
		items: [],
		shift: function() {
			return this.items.shift();
		}
		push: function(data) {
			this.items.push(data);
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

	// 
	function goalSuccess(data) {
		goalProcessingQueue.push(data);
		return true;			
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

