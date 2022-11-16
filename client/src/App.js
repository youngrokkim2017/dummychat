import React from "react";
import { Outlet } from 'react-router-dom';
import { Container, Typography } from "@mui/material";

import ChatWindow from "./components/ChatWindow";
import Header from './components/Header';

function App() {
  return (
    <div className="App">
      <Container>
        <Header />
        <Box sx={{ display: flex, justfiyContent: 'center' }}>
          <Outlet />
          {/* <ChatWindow /> */}
        </Box>
      </Container>
    </div>
  );
}

export default App;
