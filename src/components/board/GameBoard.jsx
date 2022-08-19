// https://www.youtube.com/watch?v=coi5AoV53Es&list=PLBmRxydnERkysOgOS917Ojc_-uisgb8Aj&index=3
import { useRef, useState } from 'react'
import styled from 'styled-components'

//components 
import Space from './Space'

import redTeam from '../utils/RedSoldiers'
import blueTeam from '../utils/BlueSoldiers'
import shuffle from '../utils/shuffle'
import Ruler from '../../Rules/ruler'






  


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
    const [gridX, setGridX] = useState(0)
    const [gridY, setGridY] = useState(0)
    const ruler = new Ruler()
    

    function grabPiece(e) {
        const gameboard = gameboardRef.current
        console.log(gameboard.style)
        if ((e.target.classList.contains('blue-piece') || e.target.classList.contains('red-piece') )&& gameboard && !activePiece) {
            // console.log(e.target)
            const element = e.target
            setActivePiece(element)
            setGridX(Math.floor((e.clientX - gameboard.offsetLeft)/60)) 
            setGridY(Math.abs(Math.ceil((e.clientY - gameboard.offsetTop - 600)/60)))
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
           
        }
    }

    function dropPiece(e) {
        const gameboard = gameboardRef.current
        if (activePiece && gameboard) {
            const x = Math.floor((e.clientX - gameboard.offsetLeft)/60) 
            const y = Math.abs(Math.ceil((e.clientY - gameboard.offsetTop - 600)/60))
            setBluePieces(value => {
                const pieces = value.map((p) => {
                    if (p.x === gridX && p.y === gridY) {
                        const validMove = ruler.isValidMove(gridX, gridY, x, y, p, value)
                        if (validMove) {
                            // check to see if there is an opponent 
                            const opp = redPieces.filter(red => {
                                return (red.x === x && red.y === y)
                            })
                            if (opp[0]) {
                                console.log('opponent')
                                const blueWon = ruler.attackSuccessful(p, opp[0])
                                if (blueWon === 'YES') {
                                    p.x = x
                                    p.y = y
                                    setRedPieces(value => {
                                        const redPieces = value.map(redpiece => {
                                            if (redpiece.x === x && redpiece.y === y) {
                                                redpiece.x = -9999
                                                redpiece.y = -9999
                                                redpiece.alive = false
                                                redpiece.revealed = true
                                            }
                                            return redpiece
                                        })
                                        return redPieces
                                    })
                                    return p
                                }
                                else if (blueWon === 'NO'){
                                    p.x = -9999
                                    p.y = -9999
                                    p.alive = false
                                    setRedPieces(value => {
                                        const redPieces = value.map(redpiece => {
                                            if (redpiece.x === x && redpiece.y === y) {
                                                redpiece.revealed = true
                                            }
                                            return redpiece
                                        })
                                        return redPieces
                                    })
                                    return p
                                } else if (blueWon === 'TIE') {
                                    p.x = -9999
                                    p.y = -9999
                                    p.alive = false
                                    setRedPieces(value => {
                                        const redPieces = value.map(redpiece => {
                                            if (redpiece.x === x && redpiece.y === y) {
                                                redpiece.x = -9999
                                                redpiece.y = -9999
                                                redpiece.alive = false
                                                redpiece.revealed = true
                                            }
                                            return redpiece
                                        })
                                        return redPieces
                                    })
                                    return p
                                } else if (blueWon === 'WIN') {
                                    console.log('the game is won')
                                }
                            }
                            p.x = x
                            p.y = y
                        } else {
                            activePiece.style.position = 'relative'
                            activePiece.style.left = 0
                            activePiece.style.top = 0
                        }

                    }
                    return p
                })
                
                return pieces

            })
            setRedPieces(value => {
                const pieces = value.map((p) => {
                    if (p.x === gridX && p.y === gridY) {
                        const validMove = ruler.isValidMove(gridX, gridY, x, y, p, value)
                        if (validMove) {
                            // check to see if there is an opponent 
                            const opp = bluePieces.filter(blue => {
                                return (blue.x === x && blue.y === y)
                            })
                            if (opp[0]) {
                                console.log('opponent')
                                const redWon = ruler.attackSuccessful(p, opp[0])
                                if (redWon === 'YES') {
                                    p.x = x
                                    p.y = y
                                    setBluePieces(value => {
                                        const bluePieces = value.map(bluepiece => {
                                            if (bluepiece.x === x && bluepiece.y === y) {
                                                bluepiece.x = -9999
                                                bluepiece.y = -9999
                                                bluepiece.alive = false
                                                bluepiece.revealed = true
                                            }
                                            return bluepiece
                                        })
                                        return bluePieces
                                    })
                                    return p
                                }
                                else if (redWon === 'NO'){
                                    p.x = -9999
                                    p.y = -9999
                                    p.alive = false
                                    setBluePieces(value => {
                                        const bluePieces = value.map(bluepiece => {
                                            if (bluepiece.x === x && bluepiece.y === y) {
                                                bluepiece.revealed = true
                                            }
                                            return bluepiece
                                        })
                                        return bluePieces
                                    })
                                    return p
                                } else if (redWon === 'TIE') {
                                    p.x = -9999
                                    p.y = -9999
                                    p.alive = false
                                    setBluePieces(value => {
                                        const bluePieces = value.map(bluepiece => {
                                            if (bluepiece.x === x && bluepiece.y === y) {
                                                bluepiece.x = -9999
                                                bluepiece.y = -9999
                                                bluepiece.alive = false
                                                bluepiece.revealed = true
                                            }
                                            return bluepiece
                                        })
                                        return bluePieces
                                    })
                                    return p
                                } else if (redWon === 'WIN') {
                                    console.log('the game is won')
                                }
                            }
                            p.x = x
                            p.y = y
                        } else {
                            activePiece.style.position = 'relative'
                            activePiece.style.left = 0
                            activePiece.style.top = 0
                        }

                    }
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