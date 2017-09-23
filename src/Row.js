import React from 'react'
import './Row.css'
import XImage from './XImage'
import OImage from './OImage'

const Row = props => (
        <div className='Row' style={props.rowStyle}>
            <div id='space00' className='space space-left'><XImage /></div>
            <div id='space01' className='space space-center'><OImage /></div>
            <div id='space02' className='space space-right'><XImage /></div>
        </div>
    )

export default Row
