// https://www.youtube.com/watch?v=coi5AoV53Es&list=PLBmRxydnERkysOgOS917Ojc_-uisgb8Aj&index=3
import { useRef, useState, useEffect } from 'react'
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
    width: 600px;
      
`
const verticalAxis = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]
const horizontalAxis = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"]
// array for game board





export default function GameBoard() {
    
    const gameboardRef = useRef(null)
    const [activePiece, setActivePiece] = useState(null)
    const [redPieces, setRedPieces] = useState(redTeam)
    const [bluePieces, setBluePieces] = useState(blueTeam)

    

    function grabPiece(e) {
        const gameboard = gameboardRef.current
        console.log(gameboard.style)
        if (e.target.classList.contains('blue-piece') && gameboard && !activePiece) {
            // console.log(e.target)
            const element = e.target
            setActivePiece(element)
            const x = e.clientX - 25
            const y = e.clientY - 25
            element.style.position = 'absolute'
            element.style.left = `${x}px`
            element.style.top = `${y}px`
        }
    }

    function movePiece(e) {
        const gameboard = gameboardRef.current
        if (activePiece && gameboard) {
            // console.log(e.target)
            const minX = gameboard.offsetLeft 
            const minY = gameboard.offsetTop 
            const maxX = gameboard.offsetLeft + 560 
            const maxY = gameboard.offsetTop + 560
            const x = e.clientX - 25
            const y = e.clientY - 25
            activePiece.style.position = 'absolute'
            
            //If x is smaller than minimum amount
            if (x < minX) {
                activePiece.style.left = `${minX}px`;
            }
            //If x is bigger than maximum amount
            else if (x > maxX) {
                activePiece.style.left = `${maxX}px`;
            }
            //If x is in the constraints
            else {
                activePiece.style.left = `${x}px`;
            }

            //If y is smaller than minimum amount
            if (y < minY) {
                activePiece.style.top = `${minY}px`;
            }
            //If y is bigger than maximum amount
            else if (y > maxY) {
                activePiece.style.top = `${maxY}px`;
            }
            //If y is in the constraints
            else {
                activePiece.style.top = `${y}px`;
            }
            console.log(`is our maxX ${maxX} greater than our x ${x}?`)
        }
    }

    function dropPiece(e) {
        console.log(e)
        if (activePiece) {
            setBluePieces(value => {
                const pieces = value.map((p) => {
                    return p
                })
                
                return pieces

            })
            setActivePiece(null)
        }
    }
    let gameSpaceArray = []
    for (let j=verticalAxis.length-1;j>=0;j--) {
        for (let i=0;i<horizontalAxis.length;i++){
            //We have designated "lake" spaces that are not passable. Make them lightblue. 
            let piece = null
            redPieces.forEach(p => {
                if (p.x === i && p.y === j) {
                    piece = p
                }
            })
            bluePieces.forEach(p => {
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

    // render each individual space with starting piece config 
    const spaces = gameSpaceArray.map(space => {
        return space
    })
   

    return (
        <div
            className='gameboard-container'
            onMouseDown={e => grabPiece(e)}
            onMouseMove={e => movePiece(e)}
            onMouseUp={e =>dropPiece(e)}>
            <Board 
            ref={gameboardRef}
            
            >
                {spaces}
            </Board>
        </div>
    )
}