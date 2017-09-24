import React from 'react'
import './Player.css'
import oPNG from './o.png'
import xPNG from './x.png'

const styles = {
    width: 0,
    height: 0
}

const animated = {
    width: '40px',
    height: '40px'
}

const hiddenWithoutPlayer = player =>
    player ? {} : styles

const playerSrcFromProps = player =>
    player === 'x'
        ? xPNG
        : player === 'o'
            ? oPNG
            : null

const Player = props => (
    <img
        className={props.animated ? 'animated Player' : 'Player'}
        style={props.animated ? animated : hiddenWithoutPlayer(props.player)}
        src={playerSrcFromProps(props.player)}
        alt={props.player}
    />
)

export default Player
