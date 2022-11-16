import React from "react";
import { Outlet } from 'react-router-dom';
import { Container } from "@mui/material";

import ChatWindow from "./components/ChatWindow";

function App() {
  return (
    <div className="App">
      <Container>
        <Outlet />
        {/* <ChatWindow /> */}
      </Container>
    </div>
  );
}

export default App;
