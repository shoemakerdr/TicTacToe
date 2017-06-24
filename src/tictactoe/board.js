'use strict';

/**
 * Gives a tic tac toe board object
 *
 * @constructor
 * @param {Array} spaces Optional array of spaces used for testing.
 */
function Board(spaces) {
    this.spaces = spaces || [null,null,null,null,null,null,null,null,null];
}

/**
 * Gives a tic tac toe board object
 *
 * @constructor
 * @param {Array} spaces Optional array of spaces used for testing.
 */
Board.prototype.addMove = function(letter, position) {
    this.spaces[position] = letter;
};

/**
 * Checks whether given space or index on board is occupied
 *
 * @param {Any} space Either an index of the board array or item from board
 * array
 * @return {Boolean}
 */
 Board.prototype.isOccupied = function (space) {
    return (space === Number(space))
            ? this.spaces[space] !== null
            : space !== null;
 };

/**
 * Checks whether every space on board is occupied
 *
 * @return {Boolean}
 */
Board.prototype.isFull = function() {
    for (let space of this.spaces) {
        if (!this.isOccupied(space)) return false;
    }
    return true;
};

module.exports = Board;
