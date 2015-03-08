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
	return Array.prototype.slice.call(document.querySelectorAll('.mutie-enabled'));
}

// Create a request from an array of elements:
mutiejs.createMutieRequest = function(mutableElements) {
	return mutableElements.map(function mapToRequest(currentValue, index, array) {
		return {
			session: mutiejs.sessionKey,
			element: currentValue.dataset.mutieId,
			properties: currentValue.dataset.mutieProperties.split(',')
		};
	});
}

// Send the mutiejs request to the server
mutiejs.sendMutieRequest = function(mutieRequest) {
// construct an HTTP request
  var xhr = new XMLHttpRequest();
  xhr.open('POST', this.serverUrl + '/mutations', true);
  xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
  xhr.onloadend = this.processMutieResponse;
  xhr.send(JSON.stringify(mutieRequest));  
}

mutiejs.processMutieResponse = function(evt) {
	if (this.status != 200) {
		console.log({
			message: "Unable to connect to mutie server.", 
			event: evt, 
			request: this
		});
	}
	else {
		mutiejs.mutations = JSON.parse(evt.target.response);
		mutiejs.applyMutations();
	}
}

// Apply the mutations to the DOM elements.
mutiejs.applyMutations = function() {
	console.log(mutiejs.mutations);
	// Iterate over each mutation result:
	mutiejs.mutations.forEach(function(mutations, index, array) {
		// Iterate over each mutated element:
		mutiejs.filterMutieElements(mutations.element).forEach(function(el, index, array){
			// Iterate over each mutation:
			mutations.mutations.forEach(function(mutation, index, array){
				if (mutation.parameters !== null) {
					switch(mutation.property) {
						case "border":
							mutiejs.mutateBorder(el, mutation.parameters)
						break;
					}
				}
				else {
					console.log('No mutation found for property: ' + mutation.property);
				}
			});
		});
	});
}

// Mutate an element's border:
mutiejs.mutateBorder = function(element, parameters) {
	console.log(parameters);
	var computedStyle = window.getComputedStyle(element);
	// Currently only works with RGB - need to add RGBA support:
	var m = computedStyle.borderColor.match(/^rgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/i);
    element.style.borderColor = "rgb(" 
    	+ parseInt(mutiejs.clamp(parseFloat(m[1]) * parameters.color.r, 0, 255)) + ", " 
    	+ parseInt(mutiejs.clamp(parseFloat(m[2]) * parameters.color.b, 0, 255)) + ", " 
    	+ parseInt(mutiejs.clamp(parseFloat(m[3]) * parameters.color.b, 0, 255)) + ")";
	console.log(element.style.borderColor);
}

// Given a mutieId, retrieve only the elements matching it:
mutiejs.filterMutieElements = function(mutieId) {
	return Array.prototype.slice.call(mutiejs.mutieElements.filter(function(value, index, array) {
		return value.dataset.mutieId == mutieId;
	}));
}

// Clamp a number between two values
mutiejs.clamp = function(num, min, max) {
	return Math.min(Math.max(num, min), max);
}

// Fallback in case of error:
mutiejs.processMutieError = function(evt) {
	console.log(evt, this);
}

// Function to start the fun:
mutiejs.bootstrap = function(serverUrl) {    
	this.serverUrl = serverUrl;
    mutiejs.sessionKey = this.getSessionKey();
    mutiejs.mutieElements = this.getMutieElements();
    mutiejs.mutieRequest = this.createMutieRequest(mutiejs.mutieElements);
    this.sendMutieRequest(mutiejs.mutieRequest);
}
