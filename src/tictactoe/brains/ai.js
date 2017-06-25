'use strict';

const helpers = require('../helpers');

const isWinner = helpers.isWinner;
const availableMoves = helpers.availableMoves;
const isGameOver = helpers.isGameOver;
const nextPossibleBoard = helpers.nextPossibleBoard;
const nextPlayer = helpers.nextPlayer;

// function score({currentPlayer}) {
// 	return isWinner(currentPlayer)
// 			? 10
// 			: isWinner(nextPlayer(currentPlayer))
// 				? -10
// 				: 0;
// }
//
// function maxIndex(array) {
// 	const max = Math.max.apply(null, array);
// 	return array.indexOf(max);
// }
//
// function minIndex(array) {
// 	const min = Math.min.apply(null, array);
// 	return array.indexOf(min);
// }
//
// function minimax(board) {
// 	if (isGameOver(board)) return score(board);
// 	let scores = [];
// 	let moves = [];
//
// 	availableMoves(board.spaces).forEach(move => {
// 		const possible = nextPossibleBoard(move, board);
// 		scores.push(minimax(possible));
// 		moves.push(move);
// 	});
//
// 	if (board.currentPlayer === 'playerTwo') {
// 		const max = maxIndex(scores);
// 		choice = moves[maxIndex];
// 		return score[maxIndex];
// 	} else {
// 		const min = minIndex(scores);
// 		choice = moves[minIndex];
// 		return score[minIndex];
// 	}
// }

const cl = console.log;

function ai(board) {
	if (isEmpty(board)) return 4;
	let initialDepth = 0;
	let choice;
	minimax(board, initialDepth);
	return choice;

	function isEmpty({spaces}) {
		return !spaces.filter(item => item !== null).length;
	}

	function score(board, depth) {
		return isWinner(board, 'playerTwo')
				? 10 - depth
				: isWinner(board, 'playerOne')
					? depth - 10
					: 0;
	}

	function maxIndex(array) {
		const max = Math.max.apply(null, array);
		return array.indexOf(max);
	}

	function minIndex(array) {
		const min = Math.min.apply(null, array);
		return array.indexOf(min);
	}

	function minimax(board, depth) {
		if (isGameOver(board)) {
			const s = score(board, depth);
			return score(board, depth);
		}
		const newDepth = depth + 1;
		let scores = [];
		let moves = [];

		availableMoves(board.spaces).forEach(move => {
			const possible = nextPossibleBoard(move, board);
			const score = minimax(possible, newDepth);
			scores.push(score);
			moves.push(move);
		});

		if (board.currentPlayer === 'playerTwo') {
			const max = maxIndex(scores);
			choice = moves[max];
			return scores[max];
		} else {
			const min = minIndex(scores);
			choice = moves[min];
			return scores[min];
		}
	}
}

module.exports = ai;

// const b = {
// 	spaces: [null,null,null,null,null,null,null,null,null],
// 	currentPlayer: 'playerTwo'
// }
//
// cl(ai(b));
