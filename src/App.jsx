import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Error404 from "./pages/Error";
import Case from "./pages/Case";
import AlertPage from "./pages/Alert";

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
