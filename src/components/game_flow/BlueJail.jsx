import Soldier from '../Soldier'
import styled from "styled-components"

const Jail = styled.div`
display: flex;
width: 300px;
flex-wrap: wrap;
justify-content: flex-start;
`

export default function BlueJail ({bluePieces}) {
    const blueCaptured = bluePieces.filter(p => {
        return (!p.alive)
    })

    const jailed = blueCaptured.map(p => {
        return (
        <div style={{margin: 5}}><Soldier piece={p}/></div>
        )
    })
    return (
        <Jail>
            {jailed}
        </Jail>
    )
}