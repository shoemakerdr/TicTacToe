'use strict';

function Game(board, x, o) {
    this.x = x;
    this.o = o;

    this.board = board;
}

Game.prototype.isWinner = function(letter) {
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

Game.prototype.isGameOver = function() {
    return (this.isWinner('x') || this.isWinner('o') || this.board.isFull()) ?
        true : false;
};

Game.prototype.results = function() {
    return this.isWinner('x') ? 'x is the winner.' :
           this.isWinner('o') ? 'o is the winner.' :
           'Draw.';
};

Game.prototype.template = function(spaces) {
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
    return this.template(this.board.spaces);
};

module.exports = Game;
