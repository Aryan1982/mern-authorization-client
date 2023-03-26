import React,{useState} from "react";
import "./App.css";
import {BrowserRouter, Route,Routes } from 'react-router-dom';
import Register from "./pages/register";
import Login from './pages/login';
import Quote from './pages/quote';

const App=()=> {
  return (

    <div className="App">

        <Routes>

          <Route exact path="/" element={Login}/>
          <Route path="/register" element={Register}/>
          <Route path="/notes" element={Quote}/>

        </Routes>
    </div>

);

}

export default App;
