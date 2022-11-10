import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { io } from "socket.io-client";

function App() {
  const [socket, setSocket] = useState(null)

  useEffect(() => {
    setSocket(io('http://localhost:4000'))
  }, [])

  return (
    <div className="App">
      Hello
    </div>
  );
}

export default App;
