import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserForm from "./Screens/UserForm";
import UserDetails from "./Screens/UserDetails";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<UserDetails />}></Route>
        <Route path="/UserForm" element={<UserForm />}></Route>
      </Routes>
    </>
  );
}

export default App;
