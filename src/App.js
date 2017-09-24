import React, { Component } from 'react'
import './App.css'
import Board from './Board'
import Modal from './Modal'
import ticTacToe from 'tictactoe-freecodecamp'

const { twoPlayerGame, easyGame, unbeatableGame } = ticTacToe
const initialState = {
    board: [[null,null,null],[null,null,null],[null,null,null]],
    status: 'Game State'
}
const doNothing = () => {}

class App extends Component {
    constructor () {
        super()
        this.makeMove = this.makeMove.bind(this)
        this.game = unbeatableGame()
        this.players = 1
        this.state = initialState 
    }

    makeMove (row, column) {
        if (!this.game.isGameOver()) {
            this.game.turn(row, column)
            this.setState({
                board: this.game.getBoardSpaces(),
                status: this.game.getState()
            })
            if (!this.game.isGameOver() && this.players === 1) {
                setTimeout(() => {
                    this.game.turn()
                    this.setState({
                        board: this.game.getBoardSpaces(),
                        status: this.game.getState()
                    })
                }, 500)
            }
        }
    }

    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <h1 className='title'>Tic Tac Toe</h1>
                </div>
                <Modal />
                <Board
                    board={this.state.board}
                    turn={this.makeMove}
                />
                <h2 id='gameState' className='status'>{this.state.status}</h2>
            </div>
        )
    }
}

export default App;
