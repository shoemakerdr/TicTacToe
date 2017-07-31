/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function Board(spaces) {
    this.spaces = spaces || [
        [null,null,null],
        [null,null,null],
        [null,null,null]
    ];
}

Board.prototype.setBoard = function (spaces) {
    this.spaces = spaces;
}

Board.prototype.resetBoard = function() {
    this.spaces = this.spaces.map(row => row.map(space => null));
};

Board.prototype.addMove = function (player, row, column) {
    if (!this.isSpaceOccupied(row, column))
        this.spaces[row][column] = player;
};

Board.prototype.isFull = function() {
    const rows = 3;
    for (let row = 0; row < rows; row++) {
        if (this.spaces[row].indexOf(null) > -1)
            return false;
    }
    return true;
};

Board.prototype.isSpaceOccupied = function (row, column) {
    return (this.spaces[row][column] !== null);
};

Board.prototype.availableSpaces = function () {
    const spaces = this.spaces;
    let available = [];
    const rows = 3;
    const columns = 3;
    for (let row = 0; row < rows; row++) {
        for (let column = 0; column < columns; column++) {
            if (spaces[row][column] === null) {
                available.push([row,column]);
            }
        }
    }
    return available;
};

module.exports = Board;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const tictactoe = __webpack_require__(2);
const controller = __webpack_require__(8);
const view = __webpack_require__(9);

document.addEventListener('DOMContentLoaded', function () {
	const app = controller(tictactoe, view);
	app.start();
});


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {


const Game = __webpack_require__(3);
const Board = __webpack_require__(0);
const strategies = __webpack_require__(4);

const noStrategy = strategies['none'];
const simpleStrategy = strategies['simple'];
const unbeatableStrategy = strategies['unbeatable'];

function twoPlayerGame() {
    const board = new Board();
    return new Game(board, noStrategy, noStrategy);
}

function easyGame() {
    const board = new Board();
    return new Game(board, noStrategy, simpleStrategy);
}

function unbeatableGame() {
    const board = new Board();
    return new Game(board, noStrategy, unbeatableStrategy);
}

module.exports = {
    twoPlayerGame,
    easyGame,
    unbeatableGame
};


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const Board = __webpack_require__(0);

function Game(board, xStrategy, oStrategy) {
    this.board = board;
    this.x = xStrategy;
    this.o = oStrategy;
    this.currentPlayer = 'x';
}

Game.prototype.turn = function (row, column) {
    if (row === undefined && column === undefined) {
        const move = this[this.getCurrentPlayer()](this);
        row = move[0];
        column = move[1];
    }
    this.board.addMove(this.getCurrentPlayer(), row, column);
    this.nextPlayer();
};

Game.prototype.restart = function () {
    this.board.resetBoard();
    this.currentPlayer = 'x';
};

Game.prototype.getAvailableSpaces = function () {
    return this.board.availableSpaces();
}

Game.prototype.getBoardSpaces = function () {
    return this.board.spaces;
};

Game.prototype.setBoardSpaces = function (spaces) {
    this.board.setBoard(spaces);
};

Game.prototype.getState = function () {
    if (!this.isGameOver())
        return `Current player is ${this.currentPlayer}`;
    else return this.isWinner('x')
                ? 'x is the winner'
                : this.isWinner('o')
                  ? 'o is the winner'
                  : 'Draw';
};

Game.prototype.getCurrentPlayer = function () {
    return this.currentPlayer;
};

Game.prototype.setCurrentPlayer = function (player) {
    this.currentPlayer = player;
};

Game.prototype.nextPlayer = function (player) {
    this.currentPlayer = (this.currentPlayer === 'x')
                          ? 'o'
                          : 'x';
};

Game.prototype.dummyGame = function () {
    const dummyBoard = new Board();
    const dummy = new Game(dummyBoard);
	dummy.setBoardSpaces(this.board.spaces.map(x => x.map(x => x)));
	dummy.setCurrentPlayer(this.getCurrentPlayer());
	return dummy;
}

Game.prototype.isGameOver = function () {
    return this.isWinner('o') || this.isWinner('x') || this.board.isFull();
};

Game.prototype.isWinner = function(player) {
    const spaces = this.getBoardSpaces();
    return rowWin(player) || columnWin(player) || diagonalWin(player);

    function rowWin(player) {
        const rows = 3;
        for (let row = 0; row < rows; row++) {
            if (
                spaces[row][0] === player
                && spaces[row][1] === player
                && spaces[row][2] === player
            )
                return true;
        }
        return false;
    }

    function columnWin(player) {
        const columns = 3;

        for (let column = 0; column < columns; column++) {
            if (
                spaces[0][column] === player
                && spaces[1][column] === player
                && spaces[2][column] === player
            )
                return true;
        }
        return false;
    }

    function diagonalWin(player) {
        const leftToRight = spaces[0][0] === player
                            && spaces[1][1] === player
                            && spaces[2][2] === player;
        const rightToLeft = spaces[0][2] === player
                            && spaces[1][1] === player
                            && spaces[2][0] === player;
        if (leftToRight || rightToLeft)
            return true;
        return false;
    }
};

module.exports = Game;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const none = __webpack_require__(5);
const simple = __webpack_require__(6);
const unbeatable = __webpack_require__(7);

module.exports = {
	none,
	simple,
	unbeatable
}


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function none (game) {
	return null;
}

module.exports = none;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function simple (game) {
	const length = game.getAvailableSpaces().length;
	const randomIndex = Math.floor(Math.random() * length);
	return game.getAvailableSpaces()[randomIndex];
}

module.exports = simple;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function unbeatable (game) {
    let choice;
	return chooseMove(game);

    function chooseMove(game) {
    	const player = game.getCurrentPlayer();
    	const opponent = getOpponent(player);
    	const minimax = getMinimax(player, opponent);
    	if (isEmpty(game)) return [1,1];
    	let initialDepth = 0;
    	minimax(game, initialDepth);
    	return choice;
    }
    
    function getOpponent (player) {
    	return (player === 'x') ? 'o' : 'x';
    }
    
    function isEmpty(game) {
    	return game.getAvailableSpaces().length === 9;
    }
    
    function score(game, depth, player, opponent) {
    	return game.isWinner(player)
    			? (10 - depth)
    			: game.isWinner(opponent)
    				? (depth - 10)
    				: 0;
    }
    
    function maxIndex(array) {
    	const max = Math.max.apply(null, array);
    	return array.indexOf(max);
    }
    function minIndex(array) {
    	const min = Math.min.apply(null, array);
    	return array.indexOf(min);
    }
    
    function possibleGame (move, game) {
    	const dummy = game.dummyGame();
    	dummy.board.addMove(game.getCurrentPlayer(), move[0], move[1]);
    	dummy.nextPlayer();
    	return dummy;
    }
    
    function getMinimax (player, opponent) {
    	return minimax;
    
    	function minimax(game, depth) {
    		if (game.isGameOver())
    			return score(game, depth, player, opponent);
    		const newDepth = depth + 1;
    		const scores = [];
    		const moves = [];
    
    		game.getAvailableSpaces().forEach(move => {
    			const possible = possibleGame(move, game);
    			const score = minimax(possible, newDepth);
    			scores.push(score);
    			moves.push(move);
    		});
    
    		return getMinMaxScore(game.getCurrentPlayer());
    		
    		function getMinMaxScore(currentPlayer) {
    			const maxMinIndex = {
    				[player]: maxIndex(scores),
    				[opponent]: minIndex(scores)
    			};
    			const index = maxMinIndex[currentPlayer];
    			choice = moves[index];
    			return scores[index];
    		}
    	}
    }
}

module.exports = unbeatable;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


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
		space00: () => takeTurn(0,0),
		space01: () => takeTurn(0,1),
		space02: () => takeTurn(0,2),
		space10: () => takeTurn(1,0),
		space11: () => takeTurn(1,1),
		space12: () => takeTurn(1,2),
		space20: () => takeTurn(2,0),
		space21: () => takeTurn(2,1),
		space22: () => takeTurn(2,2)
	};

	view = view(turnChoices);
	let activeGame;

	function start () {
		view.renderStartScreen(gameTypes, setGameType, playGame);
	}

	function setGameType (type) {
		activeGame = gameTypes[type];
	}

	function playGame () {
		activeGame.restart();
		view.renderBoard(boardState());
		view.addGameListener();
	}

	function gameOver () {
		view.renderPlayAgainScreen(activeGame.getState(), playGame, start);
	}

	function takeTurn (row, column) {
		if (activeGame.isGameOver()) {
				gameOver();
			}
		else if (!activeGame.board.isSpaceOccupied(row, column)) {
			view.removeGameListener();
			activeGame.turn(row, column);
			view.renderBoard(boardState());
			if (activeGame.isGameOver()) {
				gameOver();
			}
			else {
				if (activeGame === easy || activeGame === unbeatable)
					automatedTurn();
				else view.addGameListener();
			}
		}
	}

	function automatedTurn () {
		activeGame.turn();
		view.renderBoard(boardState());
		if (activeGame.isGameOver())
				gameOver();
		else view.addGameListener();
	}

	function boardState () {
		const board = activeGame.getBoardSpaces();
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

	return {
		start
	};
}

module.exports = controller;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


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


/***/ })
/******/ ]);