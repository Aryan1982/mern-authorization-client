import React,{useEffect,useState} from "react";
import "./newquotepage.css"
import thumbpin from '../assets/paperpin.png'

const Quote=()=>{
	const [quotes, setQuotes] = useState([]);
	const [name,setname] = useState();
	const [title,setTitle]=useState();
  const [content,setContent]=useState();

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
	    }).then(alert("new note was added"))

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
	}).then(alert('note has been deleted'))

	 }
	return(
		<>
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
      		<div  key={quote._id} className="quotediv">
				<div><img className="thumbpin" src={thumbpin} alt="thumbpin"/></div>
      			<h2 >{quote.title}</h2>
      			<h4 >{quote.content}</h4>
      			<div><button key={quote._id} className="deletebtn" onClick={()=>deletequote(quote._id)}>DELETE</button></div>
      		</div>
          
        ))}
		</>

		)
}

export default Quote;