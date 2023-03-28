import React,{useEffect,useState} from "react";
import "./newquotepage.css"
import thumbpin from '../assets/paperpin.png'
import loader from '../assets/loader.gif'
// import UpdateNote from './updatenote'
import {AiOutlineClose} from 'react-icons/ai';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Quote=()=>{
	const [quotes, setQuotes] = useState([]);
	const [name,setname] = useState();
	const [title,setTitle]=useState();
  const [content,setContent]=useState();
  const [modify,setModify]=useState(false);
  const [quoteID,setQuoteID]=useState(false);

	 useEffect(() => {
		    fetch("https://mern-authorization-server.onrender.com/api/quotes",{
				method:"GET",
				headers:{
					authorization: `${localStorage.getItem("token")}`
				}
				})
					.then(response => response.json())
					.then(json => setname(json.name))


				fetch("https://mern-authorization-server.onrender.com/api/allquotes",{
					method:"GET",
					headers:{
						authorization: `${localStorage.getItem("token")}`
					}
					}).then(response => response.json())
						.then(json => setQuotes(json))  
		});

	 function setdefault(){
	 		setContent("");
	 		setTitle("");
	 }
	 async function createQuote(event){
	 	event.preventDefault()
	    fetch("https://mern-authorization-server.onrender.com/api/newquote", {
	      method:'POST',
	      headers:{
	        'Content-Type':'application/json',
	        authorization: `${localStorage.getItem("token")}`
	      },
	      body: JSON.stringify({
	        title,
	        content,
	      }),
	    }).then(toast.info("new note was added")).then(setdefault())

	 }


	 async function deletequote(quoteid){
	 	// console.log(quoteid)
		fetch("https://mern-authorization-server.onrender.com/api/delete",{
		method:"POST",
		headers:{
			'Content-Type':'application/json',
			authorization: `${localStorage.getItem("token")}`
		},
	  body:JSON.stringify({quoteid:quoteid}),
	}).then(toast.info('note has been deleted'))

	 }
//http://localhost:5000/
	 async function UpdateNote(){
	 		fetch("https://mern-authorization-server.onrender.com/api/update",{
		method:"POST",
		headers:{
			'Content-Type':'application/json',
			authorization: `${localStorage.getItem("token")}`
		},
	  body:JSON.stringify({
	  	quoteid:quoteID,
	  	title,
	  	content,
	  }),
	}).then(toast.info('note has been updated')).then(setModify(!modify))
	 		.then(setdefault())
	 }

	 




	return(
		<>
		<ToastContainer theme="dark" autoClose={2000} pauseOnHover={false}/>
		{modify &&
			<div className="UpdateNoteDiv">
	      	<AiOutlineClose className="closeicon" onClick={()=>{setModify(!modify);setdefault()}} style={{color:"black",top: "-156px",right: "-237px",position: "relative"}}/>
	        <div className="UpdateNoteContent">
	        <h1 style={{textAlign:'center', fontSize:"1.5rem"}}>Modify Note</h1>
	      <form onSubmit={UpdateNote}>

	        <input
	        value={title}
	        onChange={(e)=>setTitle(e.target.value)}
	        type="text"
	        placeholder="Title"
	        />
	        <br/>

	        <input
	        value={content}
	        onChange={(e)=>{setContent(e.target.value);     
	        }}
	        placeholder="Content"
	        />
	        <br/>

	        <input className="submitbtn" type="submit" value="Modify Note"/><br/><br/>
	        
	      </form>
	      
	      </div>
    </div>}
			{!name && <div className="loaderDiv"><img className="loader" src={loader}/></div>}
			 
			<h1>Hello {name}</h1>
        <div className="newquoteform">
      <form onSubmit={createQuote}>

        <input
        value={title}
        onChange={(e)=>setTitle(e.target.value)}
        type="text"
        placeholder="Title"
        className="titleinput"
        />
        <br/>

        <input
        value={content}
        onChange={(e)=>setContent(e.target.value)}
        type="text"
        placeholder="Content"
        className="contentinput"
        />
        <br/>

        <input className="submitbtn" type="submit" value="Create"/><br/><br/>
      </form>
      
 
      </div>
      {quotes.length > 0 ? <h2>Your Notes</h2>:<h2 style={{textAlign:'center'}}>Add new notes<br/>(if you have added and not showing up, please refresh)</h2>}
      {quotes.map(quote => (
      		<div  className="quotediv">
				<div><img className="thumbpin" src={thumbpin} alt="thumbpin"/></div>
      			<h2 >{quote.title}</h2>
      			<h4 >{quote.content}</h4>
      			<div><button key={quote._id} className="deletebtn" onClick={()=>deletequote(quote._id)}>DELETE</button>
      				<button  className="modifybtn" onClick={()=>{setModify(!modify); setQuoteID(quote._id);setContent(quote.content);setTitle(quote.title)}}>MODIFY</button>
      			</div>
      		</div>
          
        ))}
		</>

		)
}

export default Quote;