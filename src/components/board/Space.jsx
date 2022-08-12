import React from 'react'
import styled from 'styled-components'

const NewSpace = styled.div`
    border: 2px solid black;    
`

export default function Space ({ ind, color }) {
    
    
    // handle the click of a space
    const handleClick = (ind) => {
        console.log(`space ${ind} was clicked`)
    }
    
    return (
        <NewSpace onClick={event => handleClick(ind)} style={{backgroundColor: color}}>{ind}</NewSpace>
    )
    
}