import { useState, useEffect } from 'react'
import React from 'react'


export default function Soldier ({piece}) {
    const [active, setActive] = useState(false)

    function grabPiece(e) {
        if (piece.color==='blue') {
            // console.log(e.target)
            setActive(true)
            const x = e.clientX - 25
            const y = e.clientY - 25
            e.target.style.position = 'absolute'
            e.target.style.left = `${x}px`
            e.target.style.top = `${y}px`
        }
    }

    function movePiece(e) {
        if (piece.color === 'blue' && active) {
            // console.log(e.target)
            const x = e.clientX - 25
            const y = e.clientY - 25
            e.target.style.position = 'absolute'
            e.target.style.left = `${x}px`
            e.target.style.top = `${y}px`
        }
    }

    function dropPiece() {
        if (active) {
            setActive(false)
        }
    }
    return (
        <div 
            style={{backgroundColor: piece.color, height: 40, width: 40}} 
            className={`${piece.color}-piece`}
            onMouseDown={e => grabPiece(e)}
            onMouseMove={e => movePiece(e)}
            onMouseUp={dropPiece}>
            
            {piece.revealed ? piece.rank: ''}
        
        </div>
    )
}