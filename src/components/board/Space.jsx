import { render } from '@testing-library/react'
import React from 'react'
import { useEffect, useState } from 'react'

import styled from 'styled-components'

// components 
import Soldier from '../soldier'

const NewSpace = styled.div`
    border: 2px solid black;
    justify-content: center;
    align-items: center;
    display: flex;    
`

export default function Space ({ ind, color, pawn }) {
    
    const [soldier, setSoldier] = useState(pawn)

    var renderSoldier = null
    if (soldier) {
        renderSoldier = <Soldier color={soldier} />
    }
    
    // handle the click of a space
    const handleClick = (ind) => {
        console.log(`space ${ind} was clicked`)
    }
    
    return (
        <NewSpace onClick={event => handleClick(ind)} style={{backgroundColor: color}}>
            {renderSoldier}
        </NewSpace>
    )
    
}