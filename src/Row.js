import React from 'react'
import './Row.css'

const Row = props => (
        <div className='Row' style={props.rowStyle}>
            <div id='space00' className='space space-left'>X</div>
            <div id='space01' className='space space-center'>O</div>
            <div id='space02' className='space space-right'>X</div>
        </div>
    )

export default Row