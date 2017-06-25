'use strict';

const prompt = require('prompt-sync')({autocomplete: false});

function availableMoves(spaces) {
		return spaces.map((item, i) => (item === null) ? i : item)
					 .filter(item => typeof item === 'number');
}

function human({spaces}) {
	const avail = availableMoves(spaces);
	console.log('Here are the available moves: ');
	console.log(avail);
	return Number(prompt('What is your move? '));
}

module.exports = human;
