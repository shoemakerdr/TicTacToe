import React, { Component } from 'react'
import './App.css'
import Board from './Board'
import Modal from './Modal'
import ticTacToe from './tictactoe-freecodecamp'

class App extends Component {
    constructor () {
        super()
        this.restart = this.restart.bind(this)
        this.turn = this.turn.bind(this)
        this.setGameType = this.setGameType.bind(this)
        this.setPlayer = this.setPlayer.bind(this)
        this.computerTurn = this.computerTurn.bind(this)
        this.game = null
        this.type = null
        this.players = 2
        this.humanPlayer = null
        this.modalStructs = {
            gameType: {
                message: 'What kind of game do you want to play?',
                buttons: [
                    {name: 'Two Player', action: () => this.setGameType('twoPlayerGame')},
                    {name: 'Easy', action: () => this.setGameType('easyGame')},
                    {name: 'Unbeatable', action: () => this.setGameType('unbeatableGame')}
                ]
            },
            choosePlayer: {
                message: 'Do you want to be X or O?',
                buttons: [
                    {name: 'X', action: () => this.setPlayer('x')},
                    {name: 'O', action: () => this.setPlayer('o')}
                ]
            },
            none: {
                message: '',
                buttons: [
                    {name:'', action: () => {}}
                ]
            },
            restarting: (state) => ({
                message: state,
                buttons: [
                    {name:'', action: () => {}}
                ],
                animation: true
            })
        }
        this.initialState = {
            board: [[null,null,null],[null,null,null],[null,null,null]],
            status: '',
            whoseTurn: 'human',
            modal: this.modalStructs.gameType
        }
        this.state = this.initialState
    }

    restart () {
        this.setState(this.initialState)
    }

    setGameType (type) {
        this.type = type
        this.players = type === 'twoPlayerGame' ? 2 : 1
        if (this.players === 1)
            this.setState({modal: this.modalStructs.choosePlayer})
        else  {
            this.humanPlayer = 'x'
            this.game = ticTacToe[type]()
            this.setState({
                modal: this.modalStructs.none,
                status: this.game.getState()
            })
        }
    }

    setPlayer (player) {
        this.humanPlayer = player
        this.game = ticTacToe[this.type](player)
        this.setState({
            ...this.initialState,
            whoseTurn: (this.players === 1 && player === 'o') ? 'ai' : 'human',
            modal: this.modalStructs.none,
            status: this.game.getState()
        })
        if (player === 'o')
            this.computerTurn()
    }

    turn (row, column) {
        if (!this.game.isGameOver() && this.state.whoseTurn === 'human') {
            this.game.turn(row, column)
            this.setState({
                board: this.game.getBoardSpaces(),
                status: this.game.getState(),
                whoseTurn: this.players === 1 ? 'ai' : 'human'
            })
            if (!this.game.isGameOver() && this.players === 1)
                this.computerTurn()
        }
        if (this.game.isGameOver()){
            this.setState({modal: this.modalStructs.restarting(this.game.getState())})
            setTimeout(() => this.setPlayer(this.humanPlayer), 3000)
        }
    }

    computerTurn () {
        setTimeout(() => {
            this.game.turn()
            this.setState({
                board: this.game.getBoardSpaces(),
                status: this.game.getState(),
                whoseTurn: 'human'
            })
            if (this.game.isGameOver()){
                this.setState({modal: this.modalStructs.restarting(this.game.getState())})
                setTimeout(() => this.setPlayer(this.humanPlayer), 3000)
            }
        }, 500)
    }

    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <h1 className='title'>Tic Tac Toe</h1>
                </div>
                <Modal
                    struct={this.state.modal}
                />
                <Board
                    board={this.state.board}
                    turn={this.turn}
                />
                <div className='restart-wrapper'>
                    <div
                        onClick={this.restart}
                        className='restart'
                    >
                        {this.state.modal.message ? '' : 'Restart'}
                    </div>
                </div>
            </div>
        )
    }
}

export default App
