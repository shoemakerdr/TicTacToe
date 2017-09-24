import React from 'react'
import './Row.css'
import XImage from './XImage'
import OImage from './OImage'

const Row = props => (
        <div className='Row' style={props.rowStyle}>
            <div
                onClick={props.leftHandler}
                className='space space-left'
            >
                {props.left === 'x' ? <XImage /> : props.left === 'o' ? <OImage /> : '' }
            </div>
            <div
                onClick={props.centerHandler}
                className='space space-center'
            >
                {props.center === 'x' ? <XImage /> : props.center === 'o' ? <OImage /> : '' }
            </div>
            <div
                onClick={props.rightHandler}
                className='space space-right'
            >
                {props.right === 'x' ? <XImage /> : props.right === 'o' ? <OImage /> : '' }
            </div>
        </div>
    )

export default Row
