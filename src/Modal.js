import React from 'react'
import './Modal.css'
import Animation from './Animation'

const styles = {
    visible: {
        display: 'flex'
    },
    hidden: {
        display: 'none'
    }
}

const Modal = props => (
    <div
        className='Modal'
        style={props.struct.message ? styles.visible : styles.hidden}
    >
        <div className='message'>
            <div className='prompt'>{props.struct.message}</div>
            <div className='buttons'>
                {props.struct.animation
                    ? <Animation />
                    : props.struct.buttons.map((button,index) => (
                        <div
                            key={index}
                            onClick={button.action}
                            className='button'
                        >
                            {button.name}
                        </div>
                ))}
            </div>
        </div>
    </div>
)

export default Modal
