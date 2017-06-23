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
    this.spaces[position - 1] = letter;
};

/**
 * Checks whether every space on board is occupied
 * 
 * @return {Boolean}
 */
Board.prototype.isFull = function() {
    for (let space of this.spaces) {
        if (space === null) return false;
    }
    return true;
};

module.exports = Board;
