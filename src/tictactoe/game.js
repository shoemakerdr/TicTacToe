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
    this.playerone = {
        letter: 'x',
        player: x
    };
    
    this.playertwo = {
        letter: 'o',
        player: o
    };
    this.currentTurn = 'playerone';

    this.board = board;
}

/**
 * Takes a player object and checks if player won game.
 * 
 * @param {Player} destructured to only take letter property as param
 * @return {Boolean}
 */
Game.prototype.isWinner = function({letter}) {
    
    const array = this.board.spaces;

    if (array[0] === letter && array[1] === letter && array[2] === letter ||
        array[0] === letter && array[3] === letter && array[6] === letter ||
        array[0] === letter && array[4] === letter && array[8] === letter ||
        array[1] === letter && array[4] === letter && array[7] === letter ||
        array[2] === letter && array[4] === letter && array[6] === letter ||
        array[2] === letter && array[5] === letter && array[8] === letter ||
        array[3] === letter && array[4] === letter && array[5] === letter ||
        array[6] === letter && array[7] === letter && array[8] === letter
    )
        return true;
    return false;
};

/**
 * Will check whether game is over.
 * 
 * @return {Boolean}
 */
Game.prototype.isGameOver = function() {
    return (this.isWinner(this.playerone) ||
            this.isWinner(this.playertwo) ||
            this.board.isFull()) ?
            true :
            false;
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
    return this.isWinner(this.playerone) ? 'x is the winner!' :
           this.isWinner(this.playertwo) ? 'o is the winner!' :
           'Draw.';
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

Game.prototype.showBoard = function() {
    return this.template(this.board);
};

module.exports = Game;
