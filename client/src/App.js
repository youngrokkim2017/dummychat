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
        <Outlet />
        {/* <ChatWindow /> */}
      </Container>
    </div>
  );
}

export default App;
