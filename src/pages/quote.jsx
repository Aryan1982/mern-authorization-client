import React,{useEffect,useState} from "react";
import "./newquotepage.css"
import thumbpin from '../assets/paperpin.png'

const Quote=()=>{
	const [quotes, setQuotes] = useState([]);
	const [name,setname] = useState();
	const [title,setTitle]=useState();
  const [content,setContent]=useState();

	 useEffect(() => {
	//  	fetch("http://localhost:5000/api/allQuotes",{
	// 	method:"GET",
	// 	headers:{
	// 		authorization: `${localStorage.getItem("token")}`
	// 	}
	// })
	// .then(response => response.json())
	// .then(json => setQuotes(json))
	// console.log(quotes)

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
      {quotes.length > 1 ? <h2>Your Notes</h2>:<h2>Add new notes</h2>}
      {quotes.map(quote => (
      		<div  className="quotediv">
				<div><img className="thumbpin" src={thumbpin}/></div>
      			<h2 >{quote.title}</h2>
      			<h4 >{quote.content}</h4>
      			
      		</div>
          
        ))}
		</>

		)
}

export default Quote;