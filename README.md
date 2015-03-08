# mutie.js
mutie.js - Evolve your DOM!

# What is it?

mutie.js aims to create an automated multivariate testing platform capable of mutating DOM elements automatically.

# But why?

If you're in web marketing there's endless debate over which font sizes, colors, weights, borders, paddings and margins are most effective on calls to action.

Developers are commonly asked to make a border thicker, change its color, add or remove padding, all in a typically ad-hoc fashion.

By randomising these changes and tracking their effectiveness when it comes to goal conversion, we may be able to automatically evolve the DOM over time towards a state that converts most effectively.

# How would it work?

The client would bootstrap a script from a server, which then processes all DOM elements that are flagged as mutatable.  Random variations would be picked for these elements, and their impact on goals would be tracked accordingly.

This is a high-level overview of the processes involved:

![High level process diagram](/doc/mutie.js.process-overview.jpg?raw=true "High level process diagram")

Here is a more in-depth take on the processes:

![Detailed process diagram](/doc/mutie.js.process.jpg?raw=true "Detailed process diagram")

# Project status

Currently the project is in a planning phase.  Current to-dos:

* Determine a license.
* Implement processes.

# How to help?

If you have experience with NodeJS, evolutionary algorithms, multivariate testing and are interested in participating in a fun experiment, get in touch here or [via twitter](https://twitter.com/alexofparker "Alex's Twitter").

I aim to get a PoC up and running ASAP, it will be fun to see how effective this really can be.

# Project Contributors

* Alex Parker - Project initiator and maintainer.