import React from 'react'
import './Player.css'
import oPNG from './o.png'
import xPNG from './x.png'

const styles = {
    width: 0,
    height: 0
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
            className='Player'
            style={hiddenWithoutPlayer(props.player)}
            src={playerSrcFromProps(props.player)}
            alt={props.player}
        />
    )

export default Player
