import React, { useState, useEffect } from "react";
import { Outlet } from 'react-router-dom';
import { Container, Box, Typography } from "@mui/material";
import { io } from 'socket.io-client';

import ChatWindow from "./components/ChatWindow";
import Header from './components/Header';

function App() {
  const [socket, setSocket] = useState(null)

  useEffect(() => {
    setSocket(io('http://localhost:4000'))
  }, [])

  return (
    <div className="App">
      <Container>
        <Header socket={socket} />
        <Box sx={{ display: 'flex', justfiyContent: 'center' }}>
          <Outlet context={{ socket }} />
          {/* <ChatWindow /> */}
        </Box>
      </Container>
    </div>
  );
}

export default App;
