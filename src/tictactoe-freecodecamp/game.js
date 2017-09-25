
import Board from './board'

function Game(board, xStrategy, oStrategy) {
    this.board = board;
    this.x = xStrategy;
    this.o = oStrategy;
    this.currentPlayer = 'x';
}

Game.prototype.turn = function (row, column) {
    if (row === undefined && column === undefined) {
        const move = this[this.getCurrentPlayer()](this);
        row = move[0];
        column = move[1];
    }
    if (this.isValidMove(row, column)) {
        this.board.addMove(this.getCurrentPlayer(), row, column);
        this.nextPlayer();
    }
}

Game.prototype.restart = function () {
    this.board.resetBoard();
    this.currentPlayer = 'x';
};

Game.prototype.getAvailableSpaces = function () {
    return this.board.availableSpaces();
}

Game.prototype.isSpaceOccupied = function (row, column) {
    return this.board.isSpaceOccupied(row, column);
}

Game.prototype.isValidMove = function (row, column) {
    return row >= 0
            && row <= 2
            && column >= 0
            && column <= 2
            && !this.isSpaceOccupied(row, column);
}

Game.prototype.getBoardSpaces = function () {
    return this.board.spaces;
};

Game.prototype.setBoardSpaces = function (spaces) {
    this.board.setBoard(spaces);
};

Game.prototype.getState = function () {
    if (!this.isGameOver())
        return `Current player is ${this.currentPlayer}`;
    else return this.isWinner('x')
                ? 'x is the winner'
                : this.isWinner('o')
                  ? 'o is the winner'
                  : 'Draw';
};

Game.prototype.getCurrentPlayer = function () {
    return this.currentPlayer;
};

Game.prototype.setCurrentPlayer = function (player) {
    this.currentPlayer = player;
};

Game.prototype.nextPlayer = function (player) {
    this.currentPlayer = (this.currentPlayer === 'x')
                          ? 'o'
                          : 'x';
};

Game.prototype.dummyGame = function () {
    const dummyBoard = new Board();
    const dummy = new Game(dummyBoard);
	dummy.setBoardSpaces(this.board.spaces.map(x => x.map(x => x)));
	dummy.setCurrentPlayer(this.getCurrentPlayer());
	return dummy;
}

Game.prototype.isGameOver = function () {
    return this.isWinner('o') || this.isWinner('x') || this.board.isFull();
};

Game.prototype.isWinner = function(player) {
    const spaces = this.getBoardSpaces();
    return rowWin(player) || columnWin(player) || diagonalWin(player);

    function rowWin(player) {
        const rows = 3;
        for (let row = 0; row < rows; row++) {
            if (
                spaces[row][0] === player
                && spaces[row][1] === player
                && spaces[row][2] === player
            )
                return true;
        }
        return false;
    }

    function columnWin(player) {
        const columns = 3;

        for (let column = 0; column < columns; column++) {
            if (
                spaces[0][column] === player
                && spaces[1][column] === player
                && spaces[2][column] === player
            )
                return true;
        }
        return false;
    }

    function diagonalWin(player) {
        const leftToRight = spaces[0][0] === player
                            && spaces[1][1] === player
                            && spaces[2][2] === player;
        const rightToLeft = spaces[0][2] === player
                            && spaces[1][1] === player
                            && spaces[2][0] === player;
        if (leftToRight || rightToLeft)
            return true;
        return false;
    }
};

export default Game;
