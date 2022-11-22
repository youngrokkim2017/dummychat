import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useOutletContext } from 'react-router-dom'
import { Card, Button, Box } from '@mui/material'
import { v4 as uuidv4 } from 'uuid'
import Cookies from 'js-cookies'

const Header = ({ socket, userId, setUserId }) => {
    // const { socket } = useOutletContext()
    const navigate = useNavigate()
    const [rooms, setRooms] = useState([])
    
    const createNewRoom = () => {
        const roomId = uuidv4();
        navigate(`/room/${roomId}`)
        socket.emit('new-room-created', { roomId })
        setRooms([...rooms, roomId])
    }

    const handleLogin = () => {
        const userId = uuidv4();
        setUserId(userId);
        Cookies.setItem('userId', userId);
        navigate('/');
    }

    const handleLogout = () => {
        setUserId(null);
        Cookies.removeItem('userId');
        navigate('/');
    }

    useEffect(() => {
        async function fetchRooms() {
            const res = await fetch('http://localhost:4000/rooms')
            const { rooms } = await res.json()
            setRooms(rooms)
        }
        fetchRooms()
    }, [])

    useEffect(() => {
        if (!socket) return
        socket.on('new-room-created', ({ roomId }) => {
            setRooms([...rooms, roomId])
        })
    }, [socket])

    return (
        <Card sx={{ marginTop: 5, backgroundColor: 'gray' }} raised>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Box>
                    <Link to='/' style={{ textDecoration: 'none' }} >
                        <Button sx={{ color: 'white' }} variant='text'>Home</Button>
                    </Link>
                    {rooms.map((room) => (
                        <Link to={`/room/${room.roomId }`} style={{ textDecoration: 'none' }} key={room._id}>
                            <Button sx={{ color: 'white' }} variant='text'>{room.name}</Button>
                        </Link>
                    ))}
                </Box>
                <Box>
                    {userId ? (
                        <>
                            <Button sx={{ color: 'white' }} variant='text' onClick={createNewRoom}>
                                New Room
                            </Button>
                            <Button sx={{ color: 'white' }} variant='text' onClick={handleLogout}>
                                Logout
                            </Button>
                        </>
                    )
                    : (
                        <Button sx={{ color: 'white' }} variant='text' onClick={handleLogin}>
                            Login
                        </Button>
                    )}
                </Box>
            </Box>
        </Card> 
    )
}

export default Header