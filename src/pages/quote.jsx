import React,{useEffect,useState} from "react";
// import jwt from 'jsonwebtoken';
// import {useHistory} from 'react-router-dom';
import {Link} from "react-router-dom"
import "./newquotepage.css"
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

    fetch("http://localhost:5000/api/quotes",{
		method:"GET",
		headers:{
			authorization: `${localStorage.getItem("token")}`
		}
	})
	.then(response => response.json())
	.then(json => setname(json.name))

	fetch("http://localhost:5000/api/allquotes",{
		method:"GET",
		headers:{
			authorization: `${localStorage.getItem("token")}`
		}
	}).then(response => response.json())
	.then(json => setQuotes(json))
	  });


	 async function createQuote(event){
	 	event.preventDefault()
	    const response = await fetch("http://localhost:5000/api/newquote", {
	      method:'POST',
	      headers:{
	        'Content-Type':'application/json',
	        authorization: `${localStorage.getItem("token")}`
	      },
	      body: JSON.stringify({
	        title,
	        content,
	      }),
	    })

	    const newQuote = await response.json()
	    console.log(newQuote)



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
      
      {/*<div><h1>Title: {quotes}</h1></div>*/}
      </div>
      <h2>Your Notes</h2>
      {quotes.map(quote => (
      		<div  className="quotediv">
      			<h2 >{quote.title}</h2>
      			<h4 >{quote.content}</h4>
      			
      		</div>
          
        ))}
		</>

		)
}

export default Quote;