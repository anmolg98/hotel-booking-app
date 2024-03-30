import React, { useEffect, useState } from 'react';
import CommentItem from './CommentItem';
import axios from 'axios';


export default function CommentComp(props) {
  const [commentDesc, setCommentDesc] = useState(''); // State to hold the comment description

  const registerCommentHandler = () => {
    // Prepare request body with the comment description from state
    let requestBody = JSON.stringify({
      hotel: {
        hotelId: props.currentHotel.hotelId
      },
      comment_desc: commentDesc, // Use the comment description from state
      timestampField: "2023-09-13T15:30:00"
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
    })
    .catch(error => {
      // Handle error if needed
      console.error('Error:', error);
    });
  }

   let [currentHotelComments,setCurrentHotelComments]=useState([]);
  /* useEffect(()=>{
       let requestBody = JSON.stringify({
        hotelId: props.currentHotel.hotelId
});
 

   },[]
)*/

  // Check if props.currentHotel exists before accessing its properties
  const hotelName = props.currentHotel ? props.currentHotel.hotelName : '';

  return (
    
    <div>
      This is comment section
       <h2>Hotel Name : {hotelName}</h2>
      <input 
        type="text" 
        placeholder="Enter your comment" 
         
        onChange={(e) => setCommentDesc(e.target.value)} // Update commentDesc state on change
      /><br />
      {/* Display hotel name */}
      <button onClick={registerCommentHandler}>Comment</button><br />
     { currentHotelComments.map((comment,index) => {
    
       return <div className="m-2">
         <CommentItem comment={comment} key={index}></CommentItem>
        </div>
        })
      }

    </div>
  );
}
