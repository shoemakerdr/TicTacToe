'use strict';

function Board() {
    this.spaces = [null,null,null,null,null,null,null,null,null];
}

Board.prototype.addMove = function(letter, position) {
    this.spaces[position - 1] = letter;
};

Board.prototype.isFull = function() {
    for (let space of this.spaces) {
        if (space === null) return false;
    }
    return true;
};

Board.prototype.setBoard = function(array) {
    this.spaces = array;
}

module.exports = Board;
