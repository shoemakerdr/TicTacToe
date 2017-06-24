'use strict';

const util = require('util');
const Board = require("./board");
const Player = require("./player");
const Game = require("./game");
const prompt = require("prompt-sync")({autocomplete: false});

/**
 * TODO: write one player version
 */
function oneplayer() {
    const name = prompt('What is your name? ');
    const b = new Board();
    const p1 = new Player('human', name);
    const p2 = new Player('ai');
    const g = new Game(b, p1, p2);
    g.start();
}

function twoplayer() {
    const name1 = prompt('What is the name of the first player? ');
    const name2 = prompt('What is the name of the second player? ');
    const b = new Board();
    const p1 = new Player('human', name1);
    const p2 = new Player('human', name2);
    const g = new Game(b, p1, p2);
    g.start();
}

function takeTurn(letter) {
    let pos = prompt(`It's ${letter}'s turn. What space do you want? `);
    g.board.addMove(letter, Number(pos));
    checkGame();
    (letter === 'x') ? takeTurn('o') : takeTurn('x');
}

function play() {
    const numPlayers = prompt('How many players? (1 or 2) ');
    (numPlayers === '2')
        ? twoplayer()
        : oneplayer();
}

module.exports.play = play;
