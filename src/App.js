import React, { Component } from 'react'
import './App.css'
import Board from './Board'

class App extends Component {
    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <h1 className='title'>Tic Tac Toe</h1>
                </div>
                <div id='messageScreen' className='messageDiv'></div>
                <Board />
                <h2 id='gameState' className='state'>Game State</h2>
            </div>
        )
    }
}

export default App;
