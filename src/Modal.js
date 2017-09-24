import React from 'react'
import './Modal.css'
import Animation from './Animation'
import Player from './Player'

const styles = {
    visible: {
        display: 'flex'
    },
    hidden: {
        display: 'none'
    },
    small : {
        display: 'inline',
        width: '16px',
        height: '16px'
    },
    winner: {
        display: 'inline',
        margin: '0 8px'
    }
}

const Modal = props => (
    <div
        className='Modal'
        style={props.struct.message ? styles.visible : styles.hidden}
    >
        <div className='message'>
            <div className='prompt'>
                {(props.struct.message[0] === 'x' || props.struct.message[0] === 'o')
                    ? <div><Player player={props.struct.message[0]} size={styles.small}/><div style={styles.winner}>{'is the winner!'}</div></div>
                    : props.struct.message
                }
            </div>
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
