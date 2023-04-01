import React,{useState} from "react";
import {Link} from "react-router-dom"
import { AiFillEyeInvisible,AiFillEye } from 'react-icons/ai';
import { ToastContainer, toast } from 'react-toastify';
import "./pages.css"


function Register() {
  // const history = useHistory()
  const [name,setName]=useState("")
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
  async function registerUser(event){
    event.preventDefault()
    const response = await fetch("https://mern-authorization-server.onrender.com/api/register", {
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
    const handleToastClose = () => {
            window.location.hash='/'
          };
    const data = await response.json()
    if (data.status === 'ok'){
      toast.success(`user login succesful`, {
      onClose:handleToastClose ,
    })
      
     }else{
      toast.error(data.error, {
    })
     }
    }
  return (
    <div className="App">
        <ToastContainer theme="dark" autoClose={2000} pauseOnHover={false}/>
        <div className="form">
        <h1 style={{textAlign:'center', marginTop:"0px"}}>REGISTER</h1>
      <form onSubmit={registerUser}>

        <input
        value={name}
        onChange={(e)=>setName(e.target.value)}
        type="text"
        placeholder="Name"
        className="inputfield"
        />
        <br/>

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
        onChange={(e)=>setPassword(e.target.value)}
        type={passwordType}
        placeholder="Password"
        className="inputfield"
        /><button type="button" className="togglepassword" onClick={togglePassword}>
        { passwordType==="password"? <AiFillEyeInvisible style={{color:"black",fontSize: '20px'}}/> :<AiFillEye style={{color:"black",fontSize: '20px'}}/> }</button>
        <br/>

        <input className="submitbtn" type="submit" value="Register"/><br/><br/>
        <Link to="/"><button>already registered? Login here</button></Link>
      </form>
      
      </div>
    </div>
  );
}

export default Register;
