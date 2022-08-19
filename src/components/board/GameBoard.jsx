// https://www.youtube.com/watch?v=coi5AoV53Es&list=PLBmRxydnERkysOgOS917Ojc_-uisgb8Aj&index=3
import { useRef, useState } from 'react'
import styled from 'styled-components'


// Red Team array, Blue Team array, Rules of the game 
import redTeam from '../utils/RedSoldiers'
import blueTeam from '../utils/BlueSoldiers'
import Ruler from '../../Rules/ruler'
import gameBoardConstructor from '../utils/GameSpaceArray'
import { verticalAxis, horizontalAxis } from '../utils/constants'
import cpuTurn from '../utils/cpuTurn'

// styled components
const Board = styled.div`
    display: grid;
    grid-template-rows: repeat(10, 60px);
    grid-template-columns: repeat(10, 60px);
    width: 600px;
      
`

export default function GameBoard() {
    const gameboardRef = useRef(null)
    const [activePiece, setActivePiece] = useState(null)
    const [redPieces, setRedPieces] = useState(redTeam)
    const [bluePieces, setBluePieces] = useState(blueTeam)
    const [gridX, setGridX] = useState(0)
    const [gridY, setGridY] = useState(0)
    const playerTurn = useRef(true)
    const ruler = new Ruler()
    

    function grabPiece(e) {
        if (playerTurn.current) {
            const gameboard = gameboardRef.current
            if ((e.target.classList.contains('blue-piece') )&& gameboard && !activePiece) {
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
       
    }

    function movePiece(e) {
        const gameboard = gameboardRef.current
        if (activePiece && gameboard) {
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
                            playerTurn.current = false
                            // check to see if there is an opponent 
                            const opp = redPieces.filter(red => {
                                return (red.x === x && red.y === y)
                            })
                            if (opp[0]) {
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
            setActivePiece(null)

            // after a successful player turn, it is now the opponent's turn
            
            setTimeout(function() {
                console.log('time for the cpu to play in 2 seconds')
                cpuTurn(playerTurn.current, setRedPieces, redPieces, setBluePieces, bluePieces, ruler)
            }, 2000)

            setTimeout(function() {
                playerTurn.current = true
            }, 2500)
        
        }
    }
    
    const gameSpaceArray = gameBoardConstructor(
        verticalAxis,
        horizontalAxis,
        redPieces,
        bluePieces
      ) 
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