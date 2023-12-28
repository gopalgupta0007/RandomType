import React from 'react'
import NavConfig from '../Mode/NavConfig'
import { Container } from '@mui/material'

const CarGame = () => {
    return (
        <>
            <Container maxWidth="xl">
                <NavConfig mode={"car-game-mode"} />
            </Container>
        </>
    )
}

export default CarGame