import React,{useState} from "react";
import "./App.css";
import {BrowserRouter, Route,Routes } from 'react-router-dom';
import Register from "./pages/register"
import Login from './pages/login'
import Quote from './pages/quote'
const App=()=> {
  return (
    <BrowserRouter>
    <div className="App">

          <Routes>
          <Route exact path="/" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/notes" element={<Quote/>}/>
        </Routes>
    </div>
   </BrowserRouter>
  );
}

export default App;
