import React from 'react'
import './Board.css'
import Row from './Row'

const styles = {
    centerRow: {
        borderTop: '2px solid #888',
        borderBottom: '2px solid #888'
    }
}

const Board = props => (
        <div className='Board-wrapper'>
            <div className='Board'>
                <Row />
                <Row rowStyle={styles.centerRow}/>
                <Row />
            </div>
        </div>
        
    )

export default Board
