'use strict';

function controller (game, view) {

	const twoPlayer = game.twoPlayerGame();
	const easy = game.easyGame();
	const unbeatable = game.unbeatableGame();
	const gameTypes = {
		twoPlayer,
		easy,
		unbeatable
	};
	const turnChoices = {
		space00: takeTurn(0,0),
		space01: takeTurn(0,1),
		space02: takeTurn(0,2),
		space10: takeTurn(1,0),
		space11: takeTurn(1,1),
		space12: takeTurn(1,2),
		space20: takeTurn(2,0),
		space21: takeTurn(2,1),
		space22: takeTurn(2,2)
	};

	view = view(turnChoices);
	let activeGame;

	function start () {
		view.renderStartScreen(setGameType, playGame);
	}

	function setGameType (type) {
		activeGame = gameTypes[type];
	}

	function playGame () {
		activeGame.restart();
		view.addGameListener();
	}

	function gameOver () {
		view.renderPlayAgain(activeGame.getState(), playGame, start);
	}

	function takeTurn (row, column) {
		if (!activeGame.board.isSpaceOccupied(row, column)) {
			view.removeGameListener();
			activeGame.turn(row, column);
			view.renderBoard(boardState());
			if (activeGame.isGameOver()) {
				gameOver();
			}
			else {
				if (activeGame === easy || activeGame === unbeatable)
					automatedTurn();
				view.addGameListener();
			}
		}
	}

	function automatedTurn () {
		activeGame.turn();
		view.renderBoard(boardState());
	}

	function boardState () {
		board = activeGame.getBoardSpaces();
		return {
			space00: board[0][0],
			space01: board[0][1],
			space02: board[0][2],
			space10: board[1][0],
			space11: board[1][1],
			space12: board[1][2],
			space20: board[2][0],
			space21: board[2][1],
			space22: board[2][2]
		};
	}

	// render start up screen
	// get user input for type of game to be played
	// render new game based on type user selected
	// play game until game is over
	// when game is over, render play again screen
	// if play again, restart game
	// else, clear game and render start up screen

	return {
		start
	};
};

module.exports = controller;
