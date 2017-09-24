import React from 'react'
import './Animation.css'
import Player from './Player'

const Animation = props => (
    <div>
        <div>
            <Player
                animated={true}
                player='x'
            />
        </div>
        <div className='restarting'>Restarting...</div>
    </div>
)

export default Animation
