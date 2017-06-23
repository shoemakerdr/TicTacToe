'use strict';

const prompt = require("prompt-sync")({autocomplete: false});

/**
 * Takes a player type which provides determines how the player object will
 * choose moves
 * 
 * @constructor
 * @param {String} type Either 'human' or 'ai'
 */
function Player(type) {
    this.type = type;
    this.chooseMove = type === 'human' ? human : ai;
    
    function randomIndex(len) {
        return Math.floor(Math.random() * len);
    }
    
    function availableMoves(spaces) {
            return spaces.map((item, i) => (item === null) ? i : item)
                         .filter(item => typeof item === 'number');
    }
    
    function ai({spaces}) {
        const avail = availableMoves(spaces);
        return avail[randomIndex(avail.length)];
    }
    
    function human({spaces}) {
        const avail = availableMoves(spaces);
        console.log('Here are the available moves: ');
        console.log(avail);
        return Number(prompt('What is your move? '));
    }
}

/**
 * Gives an index of an available space chosen by the player object
 *
 * @param {Object} board An instance of Board
 * @return {Number}
 */
Player.prototype.makeMove = function(board) {
    return this.chooseMove(board);
};

module.exports = Player;
