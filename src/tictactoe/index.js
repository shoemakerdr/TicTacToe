'use strict';

const util = require('util');
const Board = require("./board");
// const player = require("./player");
const Game = require("./game");
const prompt = require("prompt-sync")();

const cl = console.log;

const b = new Board();
const g = new Game(b,'x', 'o');

play();

function checkGame() {
    cl(g.showBoard());
    if (g.isGameOver()) {
        cl(g.results());
        process.exit();
    }
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

module.exports.play = play;

// function setVar(message, variable, callback) {
//     process.stdout.write(message);
//     process.stdin.setEncoding('utf8');

//     process.stdin.on('data', (data) => {
//         const d = util.inspect(data);
//         variable = d.substring(1, d.length - 3);
//         process.stdout.write(variable);
//         process.stdin.pause();

//     });
//     process.stdin.on('end', () => {
//         callback();
// });
// }
