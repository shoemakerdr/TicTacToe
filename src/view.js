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

	function element (type, text, className, id) {
		const el = document.createElement(type);
		el.innerHTML = text;
		el.className = className;
		if (id) el.id = id;
		return el;
	}

	// html elements
	const twoPlayerbutton = element('div', 'Two Player', 'button', 'twoPlayer');
	const easyGameButton = element('div', 'Easy', 'button', 'easy');
	const unbeatableGameButton = element('div', 'Unbeatable', 'button', 'unbeatable');
	const yesButton = element('div', 'Yes', 'button', 'yes');
	const noButton = element('div', 'No', 'button', 'no');
	const startScreen = (function () {
		const messageText = 'What kind of game do you want to play?';
		const screen = element('div', null, 'options');
		const message = element('p', messageText, 'message');
		const buttonDiv = element('div', null, 'buttons');
		buttonDiv.appendChild(twoPlayerbutton);
		buttonDiv.appendChild(easyGameButton);
		buttonDiv.appendChild(unbeatableGameButton);
		screen.appendChild(message);
		screen.appendChild(buttonDiv);

		return screen;
	})();
	const playAgainScreen = function (outcomeText) {
		const messageText = 'Do you want to play again?';
		const screen = element('div', null, 'options');
		const outcome = element('p', outcomeText, 'message');
		const message = element('p', messageText, 'message');
		const buttonDiv = element('div', null, 'buttons');
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

	function renderStartScreen (gameType, gameTypeSetter, start) {
		function handler (event) {
			if (!!gameType[event.target.id]) {
				gameTypeSetter(event.target.id);
				start();
				messageScreen.removeChild(startScreen);
				messageScreen.style.display = 'none';
				messageScreen.removeEventListener('click', handler);
			}
		}
		messageScreen.appendChild(startScreen);
		messageScreen.style.display = 'flex';
		messageScreen.addEventListener('click', handler);
	}

	function renderPlayAgainScreen (outcome, yes, no) {
		const screen = playAgainScreen(outcome);
		function handler (event) {
			if (event.target.id === 'yes') {
				yes();
				messageScreen.removeChild(screen);
				messageScreen.style.display = 'none';
				messageScreen.removeEventListener('click', handler);
			}
			if (event.target.id === 'no') {
				no();
				messageScreen.removeChild(screen);
				messageScreen.removeEventListener('click', handler);
			}
		}
		messageScreen.appendChild(screen);
		messageScreen.style.display = 'flex';
		messageScreen.addEventListener('click', handler);
	}

	function addGameListener () {
		board.addEventListener('click', handleGame);
	}

	function removeGameListener () {
		board.removeEventListener('click', handleGame);
	}

	return {
		renderBoard,
		renderStartScreen,
		renderPlayAgainScreen,
		addGameListener,
		removeGameListener
	};
}

module.exports = view;
