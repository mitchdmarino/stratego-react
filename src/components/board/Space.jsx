import React from 'react'

import styled from 'styled-components'

// components 
import Soldier from '../Soldier'

const NewSpace = styled.div`
    border: 2px solid black;
    justify-content: center;
    align-items: center;
    display: flex;    
`

export default function Space ({ ind, color, pawn, revealed }) {
    
    const handleClick = (ind) => {
        console.log(`space ${ind} was clicked`)
    }

    let renderPawn = null

    if (pawn) {
        renderPawn = <Soldier piece={pawn}/>
    }

    
    
    return (
        <NewSpace onClick={event => handleClick(ind)} >
            {renderPawn}
        </NewSpace>
    )
    
}