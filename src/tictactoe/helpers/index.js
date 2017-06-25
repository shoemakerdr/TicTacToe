'use strict';

function availableMoves(spaces) {
		return spaces.map((item, i) => (item === null) ? i : item)
					 .filter(item => typeof item === 'number');
}

function isWinner({spaces}, currentPlayer) {
	const letter = letterFromPlayer(currentPlayer);

    return (spaces[0] === letter && spaces[1] === letter && spaces[2] === letter
            || spaces[0] === letter && spaces[3] === letter && spaces[6] === letter
            || spaces[0] === letter && spaces[4] === letter && spaces[8] === letter
            || spaces[1] === letter && spaces[4] === letter && spaces[7] === letter
            || spaces[2] === letter && spaces[4] === letter && spaces[6] === letter
            || spaces[2] === letter && spaces[5] === letter && spaces[8] === letter
            || spaces[3] === letter && spaces[4] === letter && spaces[5] === letter
            || spaces[6] === letter && spaces[7] === letter && spaces[8] === letter);
}

function isGameOver(board){
	return (isWinner(board, board.currentPlayer)
            || isWinner(board, nextPlayer(board.currentPlayer))
            || isFull(board));
}

function isFull({spaces}) {
	return (spaces.filter(item => item === null).length === 0);
}

function nextPossibleBoard(move, {spaces, currentPlayer}){

	const newSpaces = spaces.map((item, i) => {
		return move === i
				? letterFromPlayer(currentPlayer)
				: item;
	});
	const player = nextPlayer(currentPlayer);

	return {
		spaces: newSpaces,
		currentPlayer: player
	}
}

function nextPlayer(player) {
	return player === 'playerOne'
					? 'playerTwo'
					: 'playerOne';
}

function letterFromPlayer(player) {
	return player === 'playerOne'
			? 'x'
			: 'o';
}

module.exports = {
	availableMoves,
	isWinner,
	isGameOver,
	isFull,
	nextPossibleBoard,
	nextPlayer,
	letterFromPlayer
}
