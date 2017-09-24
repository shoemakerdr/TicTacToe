import React from 'react'
import './Modal.css'

const gameSetup = {
    message: 'What kind of game do you want to play?',
    buttons: ['Two Player', 'Easy', 'Unbeatable']
}

const Modal = props => (
        <div className='Modal'>
            <div className='message'>
                <div className='prompt'>{gameSetup.message}</div>
                <div className='buttons'>
                    {gameSetup.buttons.map((button,index) => (
                        <div
                            key={index}
                            className='button'
                        >
                            {button}
                        </div>
                    ))}
                </div>
            </div>
        </div>
        
    )

export default Modal
