import React from 'react'
import { Link } from 'react-router-dom'
import { Card, Button } from '@mui/material'
import { v4 as uuidv4 } from 'uuid'

const Header = () => {
    const roomId = uuidv4();

    return (
        <Card sx={{ marginTop: 5, backgroundColor: 'gray' }} raised>
            <Link to='/'>
                <Button sd={{ color: 'white', textDecoration: 'none' }} variant='text'>Home</Button>
            </Link>
            <Link to='/chats'>
                <Button sd={{ color: 'white', textDecoration: 'none' }} variant='text'>Chats</Button>
            </Link>
            <Link to={`/room/${roomId}`}>
                <Button sd={{ color: 'white', textDecoration: 'none' }} variant='text'>Room1</Button>
            </Link>
        </Card>
    )
}

export default Header