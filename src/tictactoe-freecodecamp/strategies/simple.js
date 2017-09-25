
function simple (game) {
	const length = game.getAvailableSpaces().length;
	const randomIndex = Math.floor(Math.random() * length);
	return game.getAvailableSpaces()[randomIndex];
}

export default simple;
