import React,{useState} from "react";
import "./App.css";
import {HashRouter as Router , Route,Routes } from 'react-router-dom';
import Register from "./pages/register";
import Login from './pages/login';
import Quote from './pages/quote';

const App=()=> {
  return (

    <div className="App">
      <Router>
        <Routes>

          <Route exact path="/" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/notes" element={<Quote/>}/>

        </Routes>
        </Router>
    </div>

);

}

export default App;
