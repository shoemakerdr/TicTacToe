'use strict';

function view (handlers) {
	// selectors
	const messageScreen = document.getElementById('messageScreen');
	const board = document.getElementById('board');
	const spaces = {
		space00: document.getElementById('space00'),
		space01: document.getElementById('space01'),
		space02: document.getElementById('space02'),
		space10: document.getElementById('space10'),
		space11: document.getElementById('space11'),
		space12: document.getElementById('space12'),
		space20: document.getElementById('space20'),
		space21: document.getElementById('space21'),
		space22: document.getElementById('space22')
	};

	function element (type, className, text) {
		const el = document.createElement(type);
		button.innerHTML = text;
		button.className = className;
		return el;
	}

	// html elements
	const twoPlayerbutton = el('div', 'Two Player', 'button');
	const easyGameButton = el('div', 'Easy', 'button');
	const unbeatableGameButton = el('div', 'Unbeatable', 'button');
	const yesButton = el('div', 'Yes', 'button');
	const noButton = el('div', 'No', 'button');
	const startScreen = (function () {
		// start screen div
		const messageText = 'What kind of game do you want to play?'
		const screen = el('div', null, 'options');
		const message = el('p', messageText, 'message');
		const buttonDiv = el('div', null, 'buttons');
		buttonDiv.appendChild(twoPlayerbutton);
		buttonDiv.appendChild(easyGameButton);
		buttonDiv.appendChild(unbeatableGameButton);
		screen.appendChild(message);
		screen.appendChild(buttonDiv);

		return screen;
	})();

	const playAgainScreen = function (outcomeText) {
		// play screen div
		const messageText = 'Do you want to play again?'
		const screen = el('div', null, 'options');
		const outcome = el('p', outcomeText, 'message');
		const message = el('p', messageText, 'message');
		const buttonDiv = el('div', null, 'buttons');
		buttonDiv.appendChild(yesButton);
		buttonDiv.appendChild(noButton);
		screen.appendChild(outcome);
		screen.appendChild(message);
		screen.appendChild(buttonDiv);

		return screen;
	};

	const handleGame = function (event) {
		if (!!handlers[event.target.id])
			handlers[event.target.id]();
	};

	function renderBoard (board) {
		for (let space in spaces) {
			spaces[space].innerHTML = board[space] || ' ';
		}
	}

	function renderStartScreen (gameType, start) {
		messageScreen.appendChild(startScreen);
		messageScreen.removeChild(startScreen);
		// render screen
		// listen for options
		// startScreenListener(gameType, start)
	}

	function renderPlayAgainScreen (outcome, yes, no) {
		// render screen with outcome
		// listen for options
		// playAgainListener(yes, no)
		const screen = playAgainScreen(outcome);
		messageScreen.appendChild(screen);
		messageScreen.removeChild(screen);
	}

	function addGameListener () {
		board.addEventListener('click', handleGame);
	}

	function removeGameListener () {
		board.removeEventListener('click', handleGame);
	}

	function playAgainListener (yes, no) {
		// user select to play again
		// yes()
		// no()
		// clear playAgain screen
	}

	function startScreenListener (gameType, start) {
		// user select game type
		// gameType(type)
		// then start game
		// start()
		// clear start screen
	}

	return {
		renderBoard,
		addGameListeners,
		removeGameListeners,

	};
}

module.exports = view;
