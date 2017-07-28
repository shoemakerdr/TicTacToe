
const path = require('path');

module.exports = {
	context: path.join(__dirname, 'src'),
	entry: './app.js',
	output: {
		path: path.join(__dirname, 'dist'),
		filename: 'bundle.js'
	}
}
