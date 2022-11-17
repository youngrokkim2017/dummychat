import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import SendIcon from "@mui/icons-material/Send"
import { Box, Typography, OutlinedInput, InputAdornment, IconButton, Card, InputLabel } from "@mui/material";
// import { Textfield, Box, Container, Typography, OutlinedInput, InputAdornment, IconButton } from "@mui/material";
// import Button from "@mui/material/Button";
// import TextField from "@mui/material/TextField";
// import Box from "@mui/material/Box";
import { useOutletContext, useParams } from 'react-router-dom'

const ChatWindow = () => {
  const { socket } = useOutletContext()
  // const [socket, setSocket] = useState(null)
  const [message, setMessage] = useState("")
  const [chat, setChat] = useState([]);
  const [typing, setTyping] = useState(false);
  const [typingTimeout, setTypingTimeout] = useState(null)
  const { roomId } = useParams()

  // useEffect(() => {
  //   setSocket(io('http://localhost:4000'))
  // }, [])

  useEffect(() => {
    if (!socket) return
    socket.on('message-from-server', (data) => {
      // console.log('message received', data)
      setChat((prev) => [...prev, { message: data.message, received: true }])
    })   
    socket.on('typing-started-from-server', () => {
      // console.log('typing...')
      setTyping(true)
    }) 
    socket.on('typing-stopped-from-server', () => {
      // console.log('typing...')
      setTyping(false)
    }) 
  }, [socket])

  const handleForm = (e) => {
    e.preventDefault()
    // console.log(message)
    socket.emit("send-message", { message })
    setChat((prev) => [...prev, { message, received: false }])
    setMessage("")
  }

  const handleInput = (e) => {
    setMessage(e.target.value)
    socket.emit('typing-started')

    if (typingTimeout) clearTimeout(typingTimeout)

    setTypingTimeout(setTimeout(() => {
      socket.emit('typing-stopped')
    }, 1000))
  }

  return (
    <>
      <Card
        sx={{ 
          padding: 2, 
          marginTop: 10, 
          width: '60%', 
          backgroundColor: 'gray', 
          color: 'white',
        }}
      >
        {roomId && <Typography>Room: {roomId}</Typography>}
        <Box sx={{ marginBottom: 5 }}>
          {chat.map((data) => (
            <Typography sx={{ textAlign: data.received ? 'left' : 'right' }} key={data.message}>{data.message}</Typography>
            ))}
        </Box>
        <Box component="form" onSubmit={handleForm}>
          {typing && (
            <InputLabel sx={{ color: 'white' }} shrink htmlFor='message-input'>
              Typing...
            </InputLabel>
          )}
          <OutlinedInput 
            sx={{ backgroundColor: 'white' }}
            fullWidth
            id='message-input'
            label="Write message"
            size="small"
            value={message}
            onChange={handleInput}
            endAdornment={
              <InputAdornment position="end">
                <IconButton type="submit" edge="end">
                  <SendIcon />
                </IconButton>
              </InputAdornment>
            }
            />
          {/* <TextField 
            id="standard-basic" 
            label="Standard" 
            variant="standard" 
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            />
          <Button variant="text" type="submit">Send</Button> */}
        </Box>
      </Card>
    </>
  )
}

export default ChatWindow