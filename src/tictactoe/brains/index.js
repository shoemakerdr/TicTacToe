'use strict';

const ai = require('./ai');
const easy = require('./easy');
const human = require('./human');

const brains = {
	ai: ai,
	easy: easy,
	human: human
};

function type(type) {
	const brains = {
		ai: ai,
		easy: easy,
		human: human
	};
	return brains[type];
}

module.exports = type;
