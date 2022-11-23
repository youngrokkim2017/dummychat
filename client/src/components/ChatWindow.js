import React, { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import SendIcon from "@mui/icons-material/Send";
import { Box, Typography, OutlinedInput, InputAdornment, IconButton, Card, InputLabel, Button } from "@mui/material";
import AttachFileIcon from '@mui/icons-material/AttachFile';
// import { Textfield, Box, Container, Typography, OutlinedInput, InputAdornment, IconButton } from "@mui/material";
// import Button from "@mui/material/Button";
// import TextField from "@mui/material/TextField";
// import Box from "@mui/material/Box";
import { useOutletContext, useParams } from 'react-router-dom';

const ChatWindow = () => {
  const { socket } = useOutletContext();
  // const [socket, setSocket] = useState(null)
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [typing, setTyping] = useState(false);
  const [typingTimeout, setTypingTimeout] = useState(null);
  const { roomId } = useParams();
  const fileRef = useRef();

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
    socket.on('uploaded', (data) => {
      // console.log(data)
      setChat((prev) => [[...prev, { message: data.buffer, received: true, type: 'image' }]])
    }) 
  }, [socket])

  const handleForm = (e) => {
    e.preventDefault()
    // console.log(message)
    socket.emit("send-message", { message, roomId })
    setChat((prev) => [...prev, { message, received: false }])
    setMessage("")
  }

  const handleInput = (e) => {
    setMessage(e.target.value)
    socket.emit('typing-started', { roomId })

    if (typingTimeout) clearTimeout(typingTimeout)

    setTypingTimeout(setTimeout(() => {
      socket.emit('typing-stopped', { roomId })
    }, 1000))
  }

  const removeRoom = async () => {
    // await fetch(`http://localhost:4000/rooms/${roomId}`, {
    //   method: 'DELETE',
    // })

    socket.emit('room-removed', { roomId })
  }

  const selectFile = () => {
    fileRef.current.click();
  }

  const handleFileSelected = (e) => {
    const file = e.target.files[0];
    if (!file) return
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const data = reader.result
      socket.emit('upload', { data, roomId })
    }
    setChat((prev) => [
      ...prev,
      { message: reader.result, received: false, type: 'image' }
    ])
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
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          {roomId && <Typography>Room: {roomId}</Typography>}
          {roomId && <Button size='small' variant='text' color='secondary' onClick={removeRoom}>Delete Room</Button>}
        </Box>
        <Box sx={{ marginBottom: 5 }}>
          {chat.map((data, i) => (
            data.type === 'image' ? (
              <img style={{ float: data.received ? 'left' : 'right' }} src={data.message} alt='image-message' width='100' />
            )
            :
            (
              // <Typography sx={{ textAlign: data.received ? 'left' : 'right' }} key={data.message}>{data.message}</Typography>
              <Typography sx={{ textAlign: data.received ? 'left' : 'right' }} key={i}>{data.message}</Typography>
            )
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
                <input ref={fileRef} onChange={handleFileSelected} type="file" style={{ display: 'none' }} />
                <IconButton type="button" edge="end" sx={{ marginRight: 1 }} onClick={selectFile} >
                  <AttachFileIcon />
                </IconButton>
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