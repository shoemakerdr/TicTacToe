'use strict';

const tictactoe = require('tictactoe-freecodecamp');
const controller = require('./controller');
const view = require('./view');

document.addEventListener('DOMContentLoaded', function () {
	const app = controller(tictactoe, view);
	app.start();
});
