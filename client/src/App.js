import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { io } from "socket.io-client";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

function App() {
  const [socket, setSocket] = useState(null)
  const [message, setMessage] = useState("")

  useEffect(() => {
    setSocket(io('http://localhost:4000'))
  }, [])

  useEffect(() => {
    if (!socket) return
    socket.on('message-from-server', (data) => {
      console.log('message received', data)
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
    </div>
  );
}

export default App;
