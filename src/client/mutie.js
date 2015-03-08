var mutiejs = mutiejs || {};

// Basic session key functionality.
mutiejs.getSessionKey = function() {
    var sessionKey = document.cookie.replace(/(?:(?:^|.*;\s*)mutiesession\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    if (!sessionKey) {
        // Create a basic random ID.  Will need to look out for collisions later on.
        document.cookie = "mutiesession=" + Math.random().toString(36).substr(2) + Math.random().toString(36).substr(2);
    }
    return document.cookie.replace(/(?:(?:^|.*;\s*)mutiesession\s*\=\s*([^;]*).*$)|^.*$/, "$1");
}

// Function to load mutable elements:
mutiejs.getMutieElements = function() {
	return document.querySelectorAll('.mutie-enabled');
}

// Create a request from an array of elements:
mutiejs.createMutieRequest = function(mutableElements) {
	return Array.prototype.slice.call(mutableElements).map(function mapToRequest(currentValue, index, array) {
		return {
			id: currentValue.dataset.mutieId,
			properties: currentValue.dataset.mutieProperties
		};
	});
}

// Send the mutiejs request to the server
mutiejs.sendMutieRequest = function(mutieRequest) {
// construct an HTTP request
  var xhr = new XMLHttpRequest();
  xhr.open('GET', this.serverUrl + '/mutations', true);
  xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
  // send the collected data as JSON
  xhr.send(JSON.stringify(mutieRequest));
  xhr.onloadend = this.processMutieResponse;
}

mutiejs.processMutieResponse(response, status) {
	console.log(response, status);
}

// Function to start the fun:
mutiejs.bootstrap = function(serverUrl) {    
	this.serverUrl = serverUrl;
    var sessionKey = this.getSessionKey(),
        mutieElements = this.getMutieElements(),
        mutieRequest = this.createMutieRequest(mutieElements)
        mutieResponse = this.sendMutieRequest(mutieRequest);
}