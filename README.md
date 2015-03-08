# Forewarning:

This project is under initial development.  There is some JS code in the src folder but it doesn't do anything useful yet.  However if you're intrested in contributing or watching this project, please read on!

# mutie.js
mutie.js - Evolve your DOM!

# What is it?

mutie.js aims to create an automated multivariate testing platform capable of mutating DOM elements automatically.

It's a crazy idea, and while this is not the first time anyone's thought of doing this, I haven't come across any implementations.  So let's give it a shot!

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

Obviously this is all amorphous and subject to improvements and tweaks as time goes on.

# Project status

Currently the project is in a planning / early development phase.  

Current achievements:

* Basic nodejs server can respond with canned mutations for the border property.
* Primitive mutation bindings in the DOM are supported.

Current to-do's:

* Determine a license.
* More mappings.
* Make the property mappings modular.
* Extract the server settings from the server class.
* Actually save the mutations into tests against elements - right now they're just completely random.
* Work out sensible mutation metrics.  For example a color's range of mutation is between 0 - 255, so a change of 10% is 25 units (rather than multiplying each channel by the random amount).
* Implement goal tracking and multivariate testing algorithm.
* Think of more to-do's!

# How to test now:

1. Get nodejs if you haven't already.
2. Clone the repository.
3. Start the nodejs server in /src/server/server.js
4. Browse to the demo in /demo/demo.html
5. Refresh the page to see the random changes.  Note, this is just a quick test of communicating random mutations from the server to the client, in the future these will evolve over time and be based off tangible goal improvements.

# Code cleanliness:

I aim to Smash out a PoC first, we can clean it up, optimise and refactor later on, when something works.  Don't let perfect be the enemy of the good, etc.

# How to help?

If you have experience with NodeJS, evolutionary algorithms, multivariate testing and are interested in participating in a fun experiment, get in touch here or [via twitter](https://twitter.com/alexofparker "Alex's Twitter").

I aim to get a PoC up and running ASAP, it will be fun to see how effective this really can be.

# Ideas:

## What can be mutable?

* Basic element attributes - size, shape, color, font, etc.  Probably the easiest to implement.
* CTA text - markov chains or synonym substitution?  May have some hilarious results.
* Layout - would require intimate knowledge of grid systems etc in use.  At a guess to say this would be "tricky" is probably an understatement.

## How to determine winning element mutations?

Good question.  At its most basic, just award a point to every mutation active in a user's session if a goal is completed.  Or we could track which mutations a user has been exposed to during a particular visit and only award points to those.  We could explicitly define a goal funnel, and only mutations in that funnel would count.

Right now, it's all very blue-sky thinking.

# Project Contributors

* Alex Parker - Project initiator and maintainer.