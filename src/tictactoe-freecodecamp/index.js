
import Game from './game'
import Board from './board'
import { none, simple, unbeatable } from './strategies'

function twoPlayerGame() {
    const board = new Board();
    return new Game(board, none, none);
}

function easyGame(player) {
    const board = new Board();
    if (player === 'o')
        return new Game(board, simple, none);
    if (player === 'x' || player === undefined)
        return new Game(board, none, simple);
}

function unbeatableGame(player) {
    const board = new Board();
    if (player === 'o')
        return new Game(board, unbeatable, none);
    if (player === 'x' || player === undefined)
        return new Game(board, none, unbeatable);
}

const ticTacToe = {
    twoPlayerGame,
    easyGame,
    unbeatableGame
};

export default ticTacToe
