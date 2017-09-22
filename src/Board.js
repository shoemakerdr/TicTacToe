import React from 'react'
import './Board.css'
import Row from './Row'

const Board = props => (
        <div className='Board-wrapper'>
            <div className='Board'>
                <Row />
                <div className='row-center'>
                    <Row />
                </div>
                <Row />
            </div>
        </div>
        
    )

export default Board
