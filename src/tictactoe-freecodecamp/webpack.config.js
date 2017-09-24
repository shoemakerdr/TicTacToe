
const path = require('path');

module.exports = {
	context: __dirname,
	entry: './index.js',
	output: {
		path: path.join(__dirname, 'dist'),
		filename: 'index.js'
	},
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    }
                }
            }
        ]
    }
}
