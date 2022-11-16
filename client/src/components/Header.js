import React from 'react'
import { Link } from 'react-router-dom'
import { Card, Button } from '@mui/material'

const Header = () => {
    return (
        <Card sx={{ marginTop: 5, backgroundColor: 'gray' }} raised>
            <Link to='/'>
                <Button sd={{ color: 'white', textDecoration: 'none' }} variant='text'>Home</Button>
            </Link>
            <Link to='/chats'>
                <Button sd={{ color: 'white', textDecoration: 'none' }} variant='text'>Chats</Button>
            </Link>
        </Card>
    )
}

export default Header