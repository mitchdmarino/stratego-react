import React from 'react'


export default function Soldier ({piece}) {    
    return (
        <div 
            style={{backgroundColor: piece.color, height: 40, width: 40}} 
            className={`${piece.color}-piece`}
            >
            
            {piece.revealed ? piece.rank: ''}
        
        </div>
    )
}