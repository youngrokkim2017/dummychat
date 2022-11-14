import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import SendIcon from "@mui/icons-material/Send"
import { Box, Typography, OutlinedInput, InputAdornment, IconButton, Card } from "@mui/material";
// import { Textfield, Box, Container, Typography, OutlinedInput, InputAdornment, IconButton } from "@mui/material";
// import Button from "@mui/material/Button";
// import TextField from "@mui/material/TextField";
// import Box from "@mui/material/Box";

const ChatWindow = () => {
  const [socket, setSocket] = useState(null)
  const [message, setMessage] = useState("")
  const [chat, setChat] = useState([]);

  useEffect(() => {
    setSocket(io('http://localhost:4000'))
  }, [])

  useEffect(() => {
    if (!socket) return
    socket.on('message-from-server', (data) => {
      // console.log('message received', data)
      setChat((prev) => [...prev, { message: data.message, received: true }])
    })   
  }, [socket])

  const handleForm = (e) => {
    e.preventDefault()
    // console.log(message)
    socket.emit("send-message", { message })
    setChat((prev) => [...prev, { message, received: false }])
    setMessage("")
  }

  return (
    <>
      <Box sx={{ display: flex, justfiyContent: 'center' }}>
        <Card
          sx={{ 
            padding: 2, 
            marginTop: 10, 
            width: '60%', 
            backgroundColor: 'gray', 
          }}
          >
          <Box sx={{ marginBottom: 5 }}>
            {chat.map((message) => (
              <Typography sx={{ textAlign: data.received ? 'left' : 'right' }} key={data.message}>{data.message}</Typography>
              ))}
          </Box>
          <Box component="form" onSubmit={handleForm}>
            <OutlinedInput 
              sx={{ backgroundColor: 'white', fullWidth }}
              label="Write message"
              size="small"
              value={message}
              onChange={(e)=> setMessage(e.target.value)}
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
      </Box>
    </>
  )
}

export default ChatWindow