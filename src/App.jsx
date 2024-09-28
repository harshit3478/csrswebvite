import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import io from "socket.io-client";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Error404 from "./pages/Error";
import Case from "./pages/Case";
import { useEmergencyContext } from "./hooks/useEmergencyContext";
import AlertPage from "./pages/Alert";
import { socket } from "./utils/socket";

function App() {
 
  return (
    <>
      <Router>
        <Routes>
          <Route path ="/"  element={<HomePage />}/>
          <Route path='/login' element={<Login />} />
          <Route path='/case/:id' element={<Case />} />
          <Route path="/alert/:id" element={<AlertPage />} />
          <Route path="*" element={<Error404 />}/>
        </Routes>
      </Router>
    </>
  );


}

export default App;
