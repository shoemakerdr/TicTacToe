'use strict';

function randomIndex(len) {
	return Math.floor(Math.random() * len);
}

function availableMoves(spaces) {
		return spaces.map((item, i) => (item === null) ? i : item)
					 .filter(item => typeof item === 'number');
}

function easy({spaces}) {
	const avail = availableMoves(spaces);
	return avail[randomIndex(avail.length)];
}

module.exports = easy;
