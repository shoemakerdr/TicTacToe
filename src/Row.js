import React from 'react'
import './Row.css'
import Player from './Player'

const Row = props => (
    <div className='Row' style={props.rowStyle}>
        <div
            onClick={props.leftHandler}
            className='space space-left'
        >
            <Player player={props.left} />
        </div>
        <div
            onClick={props.centerHandler}
            className='space space-center'
        >
            <Player player={props.center} />
        </div>
        <div
            onClick={props.rightHandler}
            className='space space-right'
        >
            <Player player={props.right} />
        </div>
    </div>
)

export default Row
