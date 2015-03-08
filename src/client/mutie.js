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

// Function to start the fun:
mutiejs.bootstrap = function() {    
    var sessionKey = this.getSessionKey();
    console.log(sessionKey);
}