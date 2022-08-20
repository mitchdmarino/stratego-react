import React from 'react'
import styled from 'styled-components'

const Piece = styled.div`
    height: 40px;
    width: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    border-left: 8px solid black;
    border-right: 8px solid black;
`



export default function Soldier ({piece}) {   
    let rank = null
    let color = piece.color
    let bgColor = '#DFDFDF' 
    if (color === 'red') {
        color = '#DB222A'
        bgColor = '#F9B5AC'
    } else {
        color = '#0E34A0'
        bgColor = '#BFDBF7'
    }
    if (piece.revealed) {
        rank = piece.rank
        if (piece.rank === 'b') {
            rank = '💣'
        }
        if (piece.rank === 'f') {
            rank = '🏁'
        }
    } else {
        bgColor = '#DB222A'
    }
     
    return (
        <Piece 
            style={{borderColor: color, backgroundColor: bgColor }} 
            className={`${piece.color}-piece`
            }
            >
            {rank}
        </Piece>
    )
}