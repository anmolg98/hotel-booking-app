import React, { useEffect, useState } from 'react';
import CommentItem from './CommentItem';
import axios from 'axios';


export default function CommentComp(props) {
  const [commentDesc, setCommentDesc] = useState(''); // State to hold the comment description
  let [submissionState,setSubmissionState]=useState(false)
  let [placeholder,changePlaceholder]=useState("Enter Your Comment")
  const registerCommentHandler = () => {
    // Prepare request body with the comment description from state
    const jsDate = new Date();
    const isoString = jsDate.toISOString();
    let requestBody = JSON.stringify({
      hotel: {
        hotelId: props.currentHotel.hotelId
      },
      comment_desc: commentDesc, // Use the comment description from state
      timestampField: isoString
    });

    // Send POST request to the server
    axios.post('http://localhost:8080/insertComment', requestBody, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(response => {
      // Handle response if needed
      console.log(response);
      setSubmissionState(true)
      changePlaceholder("Enter Another Comment")


    })
    .catch(error => {
      // Handle error if needed
      console.error('Error:', error);
    });
  }

   let [currentHotelComments,setCurrentHotelComments]=useState([]);
   useEffect(()=>{
       let requestBody = JSON.stringify({
        hotelId: props.currentHotel.hotelId
     });
     axios.post('http://localhost:8080/getCommentsByHotel',requestBody,{
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(
      response=>{
        setCurrentHotelComments(response.data)
      }
     ).catch(error => {
      // Handle error if needed
      console.error('Error:', error);
    });

   },[]
)

  // Check if props.currentHotel exists before accessing its properties
  const hotelName = props.currentHotel ? props.currentHotel.hotelName : '';

  return (
    
    <div>
      This is comment section
       <h2>Hotel Name : {hotelName}</h2>
      <input id="inputId"
        type="text" 
        value={placeholder}
        
        onChange={(e) => {setCommentDesc(e.target.value);
          changePlaceholder(e.target.value);
        }
        } // Update commentDesc state on change
      /><br />
      {/* Display hotel name */}
      <button onClick={registerCommentHandler}>Comment</button><br />
      {submissionState?<div>Comment Submmitted Succesfully</div>:<div/>}
     { currentHotelComments.map((comment,index) => {
    
       return <div className="m-2">
         <CommentItem comment={comment} key={index}></CommentItem>
        </div>
        })
      }

    </div>
  );
}
