'use strict';

function unbeatable (game) {
    let choice;
	return chooseMove(game);

    function chooseMove(game) {
    	const player = game.getCurrentPlayer();
    	const opponent = getOpponent(player);
    	const minimax = getMinimax(player, opponent);
    	if (game.getBoardSpaces()[1][1] === null) return [1,1];
    	let initialDepth = 0;
    	minimax(game, initialDepth);
    	return choice;
    }

    function getOpponent (player) {
    	return (player === 'x') ? 'o' : 'x';
    }

    function isEmpty(game) {
    	return game.getAvailableSpaces().length === 9;
    }

    function score(game, depth, player, opponent) {
    	return game.isWinner(player)
    			? (10 - depth)
    			: game.isWinner(opponent)
    				? (depth - 10)
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

    function possibleGame (move, game) {
    	const dummy = game.dummyGame();
    	dummy.board.addMove(game.getCurrentPlayer(), move[0], move[1]);
    	dummy.nextPlayer();
    	return dummy;
    }

    function getMinimax (player, opponent) {
    	return minimax;

    	function minimax(game, depth) {
    		if (game.isGameOver())
    			return score(game, depth, player, opponent);
    		const newDepth = depth + 1;
    		const scores = [];
    		const moves = [];

    		game.getAvailableSpaces().forEach(move => {
    			const possible = possibleGame(move, game);
    			const score = minimax(possible, newDepth);
    			scores.push(score);
    			moves.push(move);
    		});

    		return getMinMaxScore(game.getCurrentPlayer());

    		function getMinMaxScore(currentPlayer) {
    			const maxMinIndex = {
    				[player]: maxIndex(scores),
    				[opponent]: minIndex(scores)
    			};
    			const index = maxMinIndex[currentPlayer];
    			choice = moves[index];
    			return scores[index];
    		}
    	}
    }
}

export default unbeatable;
