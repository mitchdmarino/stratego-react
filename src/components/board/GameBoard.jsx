// https://www.youtube.com/watch?v=coi5AoV53Es&list=PLBmRxydnERkysOgOS917Ojc_-uisgb8Aj&index=3
import { useRef } from 'react'
import styled from 'styled-components'

//components 
import Space from './Space'

import RedSoldier from '../utils/RedSoldiers'
import BlueSoldier from '../utils/BlueSoldiers'
import shuffle from '../utils/shuffle'



let redTeam = []
for (let i=0; i<10; i++) {
    for (let j=9; j>5; j--) {
        redTeam.push(new RedSoldier(i,j))
    }
}
const redSoldierRanks = [1,2,3,3,4,4,4,5,5,5,5,6,6,6,6,7,7,7,7,8,8,8,8,8,9,9,9,9,9,9,9,9,'s','b','b','b','b','b','b','f']
    redTeam.forEach(item => {
        item.rank = shuffle(redSoldierRanks).pop()
    })
let blueTeam = []
for (let i=0; i<10; i++) {
    for (let j=0; j<4; j++) {
        blueTeam.push(new BlueSoldier(i,j))
    }
}
const blueSoldierRanks = [1,2,3,3,4,4,4,5,5,5,5,6,6,6,6,7,7,7,7,8,8,8,8,8,9,9,9,9,9,9,9,9,'s','b','b','b','b','b','b','f']
    blueTeam.forEach(item => {
        item.rank = shuffle(blueSoldierRanks).pop()
    })


// styled components
const Board = styled.div`
    display: grid;
    grid-template-rows: repeat(10, 60px);
    grid-template-columns: repeat(10, 60px);   
`
const verticalAxis = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]
const horizontalAxis = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"]
// array for game board
let gameSpaceArray = []
for (let j=verticalAxis.length-1;j>=0;j--) {
    for (let i=0;i<horizontalAxis.length;i++){
        //We have designated "lake" spaces that are not passable. Make them lightblue. 
        let piece = null
        redTeam.forEach(p => {
            if (p.x === i && p.y === j) {
                piece = p
            }
        })
        blueTeam.forEach(p => {
            if (p.x === i && p.y === j) {
                piece = p
            }
        })
        
        if (
            (i===2 && j===5) || (i===6 && j===5) ||
            (i===2 && j===4) || (i===6 && j===4)  ||
            (i===3 && j===5) || (i===7 && j===5)  ||
            (i===3 && j===4) || (i===7 && j===4) ) {
            gameSpaceArray.push(<Space 
                                    key={`${i}${j}`} 
                                    color={'blue'} 
                                    ind={`${horizontalAxis[i]}${verticalAxis[j]}`}/>)
            }
        // create checkerboard appearance 
        else if (
            (i%2===0 && j%2===0) || 
            (i%2>0 && j%2>0) ) {
                gameSpaceArray.push(<Space 
                                        key={`${i}${j}`} 
                                        color={'green'} 
                                        ind={`${horizontalAxis[i]}${verticalAxis[j]}`} 
                                        pawn={piece}/>)  
            } 
            else {
                gameSpaceArray.push(<Space 
                                        key={`${i}${j}`} 
                                        color={'lightgreen'} 
                                        ind={`${horizontalAxis[i]}${verticalAxis[j]}`} 
                                        pawn={piece}/>)  
            }         
    }
}



export default function GameBoard() {
    // render each individual space with starting piece config 
    const spaces = gameSpaceArray.map(space => {
        return space
    })
    const gameboardRef = useRef(null)
    let activePiece = null

    function grabPiece(e) {
        if (e.target.classList.contains('blue-piece')) {
            // console.log(e.target)
            activePiece = e.target
            const x = e.clientX - 25
            const y = e.clientY - 25
            e.target.style.position = 'absolute'
            e.target.style.left = `${x}px`
            e.target.style.top = `${y}px`
        }
    }

    function movePiece(e) {
        if (activePiece) {
            // console.log(e.target)
            const x = e.clientX - 25
            const y = e.clientY - 25
            e.target.style.position = 'absolute'
            e.target.style.left = `${x}px`
            e.target.style.top = `${y}px`
        }
    }

    function dropPiece() {
        if (activePiece) {
            activePiece = null
        }
    }


   

    return (
        <Board 
            ref={gameboardRef}
            onMouseDown={e => grabPiece(e)}
            onMouseMove={e => movePiece(e)}
            onMouseUp={dropPiece}
        >
            {spaces}
        </Board>
    )
}