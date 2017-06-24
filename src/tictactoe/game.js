'use strict';

/**
 * Takes a board object and two player objects and controls interaction between
 * them.
 *
 * @constructor
 * @param {Object} board The board instance
 * @param {Object} x An instance of Player object
 * @param {Object} o An instance of Player object
 */
function Game(board, x, o) {
    this.board = board;
    this.playerOne = {
        letter: 'x',
        player: x
    };
    this.playerTwo = {
        letter: 'o',
        player: o
    };
    this.currentPlayer = null;
    this.previousWinner = null;
}


/**
 * Picks random player
 *
 * @return {String}
 */
Game.prototype.randomPlayer = function() {
    return (Math.floor(Math.random() * 2))
            ? 'playerOne'
            : 'playerTwo';
};

/**
 * Takes a player and sets it to currentPlayer for start of game.
 *
 * @param  {String} player either 'playerOne' or 'playerTwo'
 */
Game.prototype.setPlayer = function(player) {
    this.currentPlayer = player;
};

Game.prototype.start = function() {
    const player = this.previousWinner || this.randomPlayer();
    this.setPlayer(player);
    this.takeTurns();
};

Game.prototype.takeTurns = function() {
    console.log(this.showBoard());
    this.getMove(this.currentPlayer);
    if (this.isGameOver()) {
        console.log(this.results());
        process.exit();
    }
    this.setPlayer(this.nextPlayer());
    this.takeTurns();
};

Game.prototype.getMove = function (player) {
    const playerObj = this[player];
    const move = playerObj.player.makeMove(this.board);
    if (!this.board.isOccupied(move)) {
        this.board.addMove(playerObj.letter, move);
        return;
    } else {
        console.log('Please pick a valid move.');
        this.getMove(player);
        return;
    }
};

/**
 * Takes a player object and checks if player won game.
 *
 * @param {Player} letter (destructured) letter property from player object
 * @return {Boolean}
 */
Game.prototype.isWinner = function({letter}) {

    const array = this.board.spaces;

    return (array[0] === letter && array[1] === letter && array[2] === letter
            || array[0] === letter && array[3] === letter && array[6] === letter
            || array[0] === letter && array[4] === letter && array[8] === letter
            || array[1] === letter && array[4] === letter && array[7] === letter
            || array[2] === letter && array[4] === letter && array[6] === letter
            || array[2] === letter && array[5] === letter && array[8] === letter
            || array[3] === letter && array[4] === letter && array[5] === letter
            || array[6] === letter && array[7] === letter && array[8] === letter);
};

/**
 * Will check whether game is over.
 *
 * @return {Boolean}
 */
Game.prototype.isGameOver = function() {
    return (this.isWinner(this.playerOne)
            || this.isWinner(this.playerTwo)
            || this.board.isFull());
};

/**
 * Gives results of the name.
 *
 * @Return {String}
 *
 * TODO: change 'x/o' to template string with winner's name.
 *   Ex. `${this.x.name} is the winner!`
 *
 * TODO: change return results based on whether game is one or two player
 *   If one player: Return 'You win' or 'You lose'
 *   If two player: Return `${winner} is the winner!`
 */
Game.prototype.results = function() {
    return this.isWinner(this.playerOne)
           ? 'x is the winner!'
           : this.isWinner(this.playerTwo)
               ? 'o is the winner!'
               : 'Draw.';
};

/**
 * Takes a board object and gives human readable view of board
 *
 * @param {Board} destructured to only take spaces property as param
 * @return {String}
 */
Game.prototype.template = function({spaces}) {
    const array = spaces.map(space => space === null ? ' ' : space);
    return `
     ${array[0]} | ${array[1]} | ${array[2]}
    -----------
     ${array[3]} | ${array[4]} | ${array[5]}
    -----------
     ${array[6]} | ${array[7]} | ${array[8]}
    \n`;
};

/**
 * Shows current state of board
 *
 * @return {String}
 */
Game.prototype.showBoard = function() {
    return this.template(this.board);
};

/**
 * Gives next player
 *
 * @return {String} not current player
 */
Game.prototype.nextPlayer = function() {
    return (this.currentPlayer === 'playerOne')
            ? 'playerTwo'
            : 'playerOne';
};

module.exports = Game;
