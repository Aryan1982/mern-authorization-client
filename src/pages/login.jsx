import React,{useState} from "react";
import {Link} from "react-router-dom"

import "./pages.css"
const Login=()=> {
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")

  async function loginUser(event){
    event.preventDefault()
    
    // const token = localStorage.getItem('token');
    const response = await fetch("https://mern-authorization-server.onrender.com/api/login", {
      method:'POST',
      headers:{
        'Content-Type':'application/json',
        // 'Authorization':`Bearer ${token}`
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
    const data = await response.json()
    
    // console.log(data)
    if (data.accessToken){
      localStorage.setItem('token', data.accessToken);
      // const token = localStorage.getItem("token");

      fetch("https://mern-authorization-server.onrender.com/api/login", {
         method:'POST',
        headers: { Authorization: `{token}` }
      }).then(response => response.json())
        .then(data => console.log(data))

      alert(`user login succesful`)
      window.location.hash='/notes'
    }else{
      alert("incorrect email or password")
    }

  }
  return (
    <div className="App">
        <div className="form">
      <form onSubmit={loginUser}>

        <input
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
        type="text"
        placeholder="Email"
        />
        <br/>

        <input
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
        type="password"
        placeholder="Password"
        />
        <br/>

        <input className="submitbtn" type="submit" value="Login"/><br/><br/>
        <Link to="/register"><button>new here? register here</button></Link>
      </form>
      
      </div>
    </div>
  );
}

export default Login;
