import React from 'react'
import './Board.css'
import Row from './Row'

const Board = props => (
    <div className='Board-wrapper'>
        <div className='Board'>
            <Row
                left={props.board[0][0]}
                center={props.board[0][1]}
                right={props.board[0][2]}
                leftHandler={() => props.turn(0,0)}
                centerHandler={() => props.turn(0,1)}
                rightHandler={() => props.turn(0,2)}
            />
            <div className='row-center'>
                <Row
                    left={props.board[1][0]}
                    center={props.board[1][1]}
                    right={props.board[1][2]}
                    leftHandler={() => props.turn(1,0)}
                    centerHandler={() => props.turn(1,1)}
                    rightHandler={() => props.turn(1,2)}
                />
            </div>
            <Row
                left={props.board[2][0]}
                center={props.board[2][1]}
                right={props.board[2][2]}
                leftHandler={() => props.turn(2,0)}
                centerHandler={() => props.turn(2,1)}
                rightHandler={() => props.turn(2,2)}
            />
        </div>
    </div>
)

export default Board
