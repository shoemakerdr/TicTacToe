'use strict';

const util = require('util');
const Board = require("./board");
// const player = require("./player");
const Game = require("./game");
const prompt = require("prompt-sync")();

const cl = console.log;

const b = new Board();
const g = new Game(b,'x', 'o');

// play();

function checkGame() {
    cl(g.showBoard());
    if (g.isGameOver()) {
        cl(g.results());
        process.exit();
    }
}

/**
 * TODO: write one player version
 */
function oneplayer() {
    return;
}

function twoplayer() {
    play();
}

function takeTurn(letter) {
    let pos = prompt(`It's ${letter}'s turn. What space do you want? `);
    g.board.addMove(letter, Number(pos));
    checkGame();
    (letter === 'x') ? takeTurn('o') : takeTurn('x');
}

function play() {
    cl(g.showBoard());
    takeTurn('x');
}

module.exports = {oneplayer, twoplayer};
