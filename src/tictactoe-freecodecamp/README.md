# Tic Tac Toe

This is an npm module that can be used for Free Code Camp's Tic Tac Toe project.
It features three different game types:
- two player game
- easy one player game
- unbeatable one player game

It uses a simple API that you can easily plug into your application.

## Install
    $ npm install tictactoe-freecodecamp

## Include TicTacToe into Your Project
NOTE: This library is now only compatible with ES6 modules as it is intended as
a front end library.
```javascript
import ticTacToe from 'tictactoe-freecodecamp';
```

## Tic Tac Toe Games
When you require or import the tic tac toe module into your project, you'll have
access to three different game types.

To access a two player game:
```javascript
const twoPlayerGame = ticTacToe.twoPlayerGame();
```

To access an easy one player game, in which the automated player will be a
simple automated player:
```javascript
const easyGame = ticTacToe.easyGame();
```

To access an unbeatable one player game, in which the automated player will be
an unbeatable automated player:
```javascript
const unbeatableGame = ticTacToe.unbeatableGame();
```

When playing an automated game, you can choose whether the human player will be
'x' or 'o' by including the player symbol of choice as an argument:
```javascript
const easyGameAsO = ticTacToe.easyGame('o');
```
or:
```javascript
const easyGameAsX = ticTacToe.easyGame('x');
```
As shown in earlier examples, if no argument is included, the human player will
default to 'x'.

### Using the game
You can get the state of the game at anytime with the getState() method. For
example, every game automatically sets the current player to 'x.'
```javascript
const twoPlayerGame = ticTacToe.twoPlayerGame();
twoPlayerGame.getState();
// 'Current player is x'
```

If you simply want to access just the current player, use the getCurrentPlayer
method:
```javascript
const twoPlayerGame = ticTacToe.twoPlayerGame();
twoPlayerGame.getCurrentPlayer();
// 'x'
```

You can set the current player with the setCurrentPlayer method:
```javascript
const twoPlayerGame = ticTacToe.twoPlayerGame();
twoPlayerGame.setCurrentPlayer('o');
twoPlayerGame.getCurrentPlayer();
// 'o'
```

The Tic Tac Toe board is represented in this module as a two-dimensional array.
Each empty space is represented by a null object, and occupied spaces are
represented with either simple 'x' or 'o' strings. The board always starts
empty. To get the current state of the board, call the getBoardSpaces method:
```javascript
twoPlayerGame.getBoardSpaces();
//  [
//      [null, null, null],
//      [null, null, null],
//      [null, null, null]
//  ]
```

### Playing the game: Two players
To play the game just make a call to the turn method. If it is a human player's
turn, include the row index and column index of the space you'd like to add the
move as its arguments.
```javascript
column >  0     1     2
        [null, null, null]   0
        [null, null, null]   1
        [null, null, null]   2
                             ^ row
```

Example:
```javascript
const twoPlayerGame = ticTacToe.twoPlayerGame();
twoPlayerGame.getBoardSpaces();
//  [
//      [null, null, null],
//      [null, null, null],
//      [null, null, null]
//  ]

// make move in center square: row 1, column 1
twoPlayerGame.turn(1,1);
twoPlayerGame.getBoardSpaces();
//  [
//      [null, null, null],
//      [null, 'x' , null],
//      [null, null, null]
//  ]
```
The turn method will always make the move of the current player, and then switch
the current player to the next player. So no need to keep track of which letter
should be used: we've got that covered.
```javascript
twoPlayerGame.getBoardSpaces();
//  [
//      [null, null, null],
//      [null, 'x' , null],
//      [null, null, null]
//  ]
twoPlayerGame.turn(2,2);
twoPlayerGame.getBoardSpaces();
//  [
//      [null, null, null],
//      [null, 'x ', null],
//      [null, null, 'o' ]
//  ]
```
To check if the game is over, you can use the isGameOver method:
```javascript
twoPlayerGame.getBoardSpaces();
//  [
//      [null, null, null],
//      [null, 'x' , null],
//      [null, null, 'o' ]
//  ]
twoPlayerGame.isGameOver();
// false
```

After a completed game, you can make a call to getState, which will return
either 'Draw' (if the game ends in a draw) or tell you who the winner is.
Example:
```javascript
twoPlayerGame.getBoardSpaces();
//  [
//      [null, null, 'x' ],
//      [null, 'x' , 'o' ],
//      [null, null, 'o' ]
//  ]
twoPlayerGame.turn(2,0);
twoPlayerGame.getBoardSpaces();
//  [
//      [null, null, 'x' ],
//      [null, 'x' , 'o' ],
//      ['x' , null, 'o' ]
//  ]
twoPlayerGame.isGameOver();
// true
twoPlayerGame.getState();
// 'x is the winner'
```
or:
```javascript
twoPlayerGame.getBoardSpaces();
//  [
//      ['x' , 'o' , 'o' ],
//      ['o' , 'x' , 'x' ],
//      [null, 'x' , 'o' ]
//  ]
twoPlayerGame.turn(2,0);
twoPlayerGame.getBoardSpaces();
//  [
//      ['x' , 'o' , 'o' ],
//      ['o' , 'x' , 'x' ],
//      ['x' , 'x' , 'o' ]
//  ]
twoPlayerGame.isGameOver();
// true
twoPlayerGame.getState();
// 'Draw'
```

To restart the game, use the restart method, which resets the board to empty
and current player to 'x'.
```javascript
twoPlayerGame.getBoardSpaces();
//  [
//      ['x' , 'o' , 'o' ],
//      ['o' , 'x' , 'x' ],
//      ['x' , 'x' , 'o' ]
//  ]
twoPlayerGame.restart();
twoPlayerGame.getBoardSpaces();
//  [
//      [null, null, null],
//      [null, null, null],
//      [null, null, null]
//  ]
twoPlayerGame.getCurrentPlayer();
// 'x'
```

### Playing the game: One player
You can also choose to play against an automated player. The 'easy' player will
choose a random available space when taking a turn. The 'x' player will always
go first by default, which (if no player symbol is included as an argument when
intially creating the game type) will be the human player:
```javascript
const easyGame = ticTacToe.easyGame();
easyGame.getBoardSpaces();
//  [
//      [null, null, null],
//      [null, null, null],
//      [null, null, null]
//  ]
easyGame.turn(1,1);
easyGame.getBoardSpaces();
//  [
//      [null, null, null],
//      [null, 'x' , null],
//      [null, null, null]
//  ]
easyGame.turn();
// 'o' player makes random move from available spaces
easyGame.getBoardSpaces();
//  [
//      [null, 'o' , null],
//      [null, 'x' , null],
//      [null, null, null]
//  ]
```

As you can see, you do not provide arguments when using an automated player. You
just call the turn method, and it automatically makes a move. The same goes when
using an unbeatable player. The only difference is, the unbeatable player will
make moves to block you or try to win.
```javascript
const unbeatableGame = ticTacToe.unbeatableGame();
unbeatableGame.turn(1,1);
unbeatableGame.getBoardSpaces();
//  [
//      [null, null, null],
//      [null, null, null],
//      [null, null, 'x' ]
//  ]
unbeatableGame.turn();
// unbeatable 'o' player will make the best move it can, like
// always taking the center space if available
unbeatableGame.getBoardSpaces();
//  [
//      [null, null, null],
//      [null, 'o' , null],
//      [null, null, 'x' ]
//  ]

// ... later in the game...

unbeatableGame.getBoardSpaces();
//  [
//      [null, null, 'o' ],
//      [null, 'o' , 'x' ],
//      ['x' , null, 'x' ]
//  ]
unbeatableGame.turn();
// unbeatable 'o' player will always make blocking move
unbeatableGame.getBoardSpaces();
//  [
//      [null, null, 'o' ],
//      [null, 'o' , 'x' ],
//      ['x' , 'o' , 'x' ]
//  ]

// ... and if you make a mistake...

unbeatableGame.turn(1,0);
unbeatableGame.getBoardSpaces();
//  [
//      [null, null, 'o' ],
//      ['x' , 'o' , 'x' ],
//      ['x' , 'o' , 'x' ]
//  ]
unbeatableGame.turn();
// unbeatable 'o' player will take advantage of your mistake
unbeatableGame.getBoardSpaces();
//  [
//      [null, 'o' , 'o' ],
//      ['x' , 'o' , 'x' ],
//      ['x' , 'o' , 'x' ]
//  ]
unbeatableGame.getState();
// o is the winner
```

The best you could possibly do is end in a draw with the unbeatable player.

### Helpful methods
There are several methods included in this module that are helpful when
building your Tic Tac Toe applications. For example, to check if a particular
space is occupied, use isSpaceOccupied.

```javascript
unbeatableGame.getBoardSpaces();
//  [
//      [null, null, 'o' ],
//      [null, 'o' , 'x' ],
//      ['x' , 'o' , 'x' ]
//  ]
unbeatableGame.isSpaceOccupied(0,0);
// false
unbeatableGame.isSpaceOccupied(1,1);
// true
```

You can also check if a particular move is valid given in any particular game
state with the isValidMove method:
```javascript
unbeatableGame.getBoardSpaces();
//  [
//      [null, null, 'o' ],
//      [null, 'o' , 'x' ],
//      ['x' , 'o' , 'x' ]
//  ]
unbeatableGame.isValidMove(1,0);
// true
unbeatableGame.isValidMove(0,2);
// false
unbeatableGame.isValidMove(0,3);
// false
unbeatableGame.isValidMove(2, 'bubble');
// false
```

## Issues
If you find any issues or bugs with the game or want to request new features,
please do so [here](https://github.com/shoemakerdr/tic-tac-toe/issues).

## Tests
    $ npm test

## License

The MIT License (MIT)

Copyright (c) 2017 Derek Shoemaker

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
