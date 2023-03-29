import React,{useState} from "react";
import {Link} from "react-router-dom"
import { AiFillEyeInvisible,AiFillEye } from 'react-icons/ai';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./pages.css"


const Login=()=> {
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const [passwordType, setPasswordType] = useState("password");

    const togglePassword =()=>{
      if(passwordType==="password")
      {
       setPasswordType("text")
       return;
      }
      setPasswordType("password")
    }
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
    

    if (data.accessToken){
      localStorage.setItem('token', data.accessToken);


       const handleToastClose = () => {
            window.location.hash='/notes'
          };

      fetch("https://mern-authorization-server.onrender.com/api/login", {
         method:'POST',
        headers: { Authorization: `{token}` }
      }).then(response => response.json())
        .then(data => console.log(data))

      toast.success(`user login succesful`, {
      onClose:handleToastClose ,
    })
      // .then(window.location.hash='/notes')
      
    }else{
      toast.error('Incorrect username or password')
    }

  }
  return (
    <>
    <ToastContainer theme="dark" autoClose={2000} pauseOnHover={false}/>
    <div className="App">
    
      
        <div className="form">
        <h1 style={{textAlign:'center', marginTop:"0px"}}>LOGIN</h1>
      <form onSubmit={loginUser}>

        <input
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
        type="text"
        placeholder="Email"
        className="inputfield"
        />
        <br/>

        <input
        value={password}
        onChange={(e)=>{setPassword(e.target.value);     
        }}
        className="inputfield"
        type={passwordType}
        placeholder="Password"
        /><button type="button" className="togglepassword" onClick={togglePassword}>
        { passwordType==="password"? <AiFillEyeInvisible style={{color:"black",fontSize: '20px'}}/> :<AiFillEye style={{color:"black",fontSize: '20px'}}/> }</button>
        <br/>

        <input className="submitbtn" type="submit" value="Login"/><br/><br/>
        <Link to="/register"><button>click here to register</button></Link>
      </form>
      
      </div>
    </div>
    </>
  );
}

export default Login;
