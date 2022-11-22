import React, { useState, useEffect } from "react";
import { Outlet } from 'react-router-dom';
import { Container, Box, Typography } from "@mui/material";
import { io } from 'socket.io-client';
import Cookies from 'js-cookies';

import ChatWindow from "./components/ChatWindow";
import Header from './components/Header';

function App() {
  const [socket, setSocket] = useState(null)
  const [userId, setUserId] = useState(null)

  useEffect(() => {
    setSocket(io('http://localhost:4000'))
    const _userId = Cookies.getItem('userId')

    if (userId) setUserId(_userId)
  }, [])

  return (
    <div className="App">
      <Container>
        <Header socket={socket} userId={userId} setUserId={setUserId} />
        <Box sx={{ display: 'flex', justfiyContent: 'center' }}>
          <Outlet context={{ socket, userId }} />
          {/* <ChatWindow /> */}
        </Box>
      </Container>
    </div>
  );
}

export default App;
