import React,{useState} from "react";
import {Link} from "react-router-dom"
// import {useHistory} from 'react-router-dom'
import "./pages.css"
function Register() {
  // const history = useHistory()
  const [name,setName]=useState("")
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")

  async function registerUser(event){
    event.preventDefault()
    const response = await fetch("http://localhost:5000/api/register", {
      method:'POST',
      headers:{
        'Content-Type':'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    })

    const data = await response.json()
    console.log(data)
    if (data.status === 'ok'){
      alert("user regestered succesful")
      window.location.href='/'
     }else{
      alert(data.error)
     }
    }
  return (
    <div className="App">
        {/*<h1>Register</h1>*/}
        <div className="form">
      <form onSubmit={registerUser}>

        <input
        value={name}
        onChange={(e)=>setName(e.target.value)}
        type="text"
        placeholder="Name"
        />
        <br/>

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

        <input className="submitbtn" type="submit" value="Register"/><br/><br/>
        <Link to="/"><button>already registered? Login here</button></Link>
      </form>
      
      </div>
    </div>
  );
}

export default Register;
