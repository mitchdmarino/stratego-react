import React from 'react'
import styled from 'styled-components'

//components 
import Space from './Space'


// styled components
const Board = styled.div`
    display: grid;
    grid-template-rows: repeat(10, 60px);
    grid-template-columns: repeat(10, 60px);
`

// array for game board
let gameSpaceArray = []
for (let i=0;i<10;i++) {
    for (let j=0;j<10;j++) {
        //We have designated "lake" spaces that are not passable. Make them lightblue. 
        if (
            (i===4 && j===2) || (i===5 && j===2) ||
            (i===4 && j===3) || (i===5 && j===3)  ||
            (i===4 && j===6) || (i===5 && j===6)  ||
            (i===4 && j===7) || (i===5 && j===7) ) {
            gameSpaceArray.push('blue')
            }
        // create checkerboard appearance 
        else if (
            (i%2===0 && j%2===0) || 
            (i%2>0 && j%2>0) ) {
                gameSpaceArray.push('green')  
            } 
            else {
                gameSpaceArray.push('lightgreen')  
            }         
    }
}
export default function GameBoard() {
    
    const spaces = gameSpaceArray.map((square,i) => {
        if (square === 'blue') {
            return (
                <Space ind={i} key={i} color={'blue'}/>
            )
        }
        else if (square === 'lightgreen'){
            if (i<40){
                return (
                    <Space ind={i} key={i} color={'lightgreen'} pawn={'red'} />
                )
            }
            if (i>59){
                return (
                    <Space ind={i} key={i} color={'lightgreen'} pawn={'blue'} />
                )
            }
            else {
                return (
                    <Space ind={i} key={i} color={'lightgreen'} pawn={null}/>
                )
            }
            
        } else {
            if (i<40){
                return (
                    <Space ind={i} key={i} color={'green'} pawn={'red'} />
                )
            }
            if (i>59){
                return (
                    <Space ind={i} key={i} color={'green'} pawn={'blue'} />
                )
            }
            else {
                return (
                    <Space ind={i} key={i} color={'green'} pawn={null} />
                )
            }
        }
    })

    return (
        <Board>
            {spaces}
        </Board>
    )
}