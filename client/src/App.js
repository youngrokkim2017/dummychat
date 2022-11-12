import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { io } from "socket.io-client";
import { Textfield, Box, Container, Typography } from "@mui/material";
// import TextField from "@mui/material/TextField";
// import Box from "@mui/material/Box";

function App() {
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
      setChat((prev) => [...prev, data.message])
    })   
  }, [socket])

  const handleForm = (e) => {
    e.preventDefault()
    // console.log(message)
    socket.emit("send-message", { message })
    setMessage("")
  }

  return (
    <div className="App">
      <Container>
        <Box sx={{ marginBottom: 5 }}>
          {chat.map((message) => (
            <Typography key={message}>{message}</Typography>
          ))}
        </Box>
        <Box component="form" onSubmit={handleForm}>
          <TextField 
            id="standard-basic" 
            label="Standard" 
            variant="standard" 
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <Button variant="text" type="submit">Send</Button>
        </Box>
      </Container>
    </div>
  );
}

export default App;
