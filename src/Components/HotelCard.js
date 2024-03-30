import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function HotelCard({hotelDesc,handleCommentClick}) {
  console.log(hotelDesc.hotelRating);
  let [selectedOption, setSelectedOption] = useState(0); 
  let [hotelRating,setHotelRating]= useState(parseFloat(hotelDesc.hotelRating));
  console.log(hotelRating);
  let [totalRatings,setTotalRatings] = useState(parseInt(hotelDesc.totalRatings));
  
  let ratingChangeEventHandler = function(event){
            setSelectedOption(event.target.value);

  }
  
  let ratingSubmissionHandler = function(){
    console.log('Button Clicked');
    if(selectedOption===0){
      alert("Select a rating first")
    }
    else{
        let currentRating=hotelRating;
        console.log(currentRating);
        let currentTotal = currentRating*totalRatings;
        console.log(currentTotal);
        totalRatings=totalRatings+1;
        setTotalRatings(totalRatings);
        currentTotal+=parseInt(selectedOption);
        console.log(currentTotal)
        currentRating = currentTotal/totalRatings;
        setHotelRating(currentRating);
        
        let requestBody = JSON.stringify({
          hotelName: hotelDesc.hotelName,
          hotelRating: hotelRating,
          totalRatings: totalRatings
      });
      console.log(requestBody);
      axios.post('http://localhost:8080/rating', requestBody, {
          headers: {
              'Content-Type': 'application/json',
          },
      })
      .then(response => {
          // Handle success
          console.log('Response:', response.data);
      })
      .catch(error => {
          // Handle error
          console.error('Error:', error);
      });

  }
}
  return (
    <div className="card" style={{width: '18rem'}}>
    <div className="card-body">
      <h5 className="card-title">{hotelDesc.hotelName}</h5>
      <h8 className="card-subtitle mb-2 text-muted">{hotelDesc.hotelStars}</h8>
      <p className="card-text">{hotelDesc.hotelDesc}</p>
      <p className="card-text">Hotel Rating : {hotelRating}/5</p>
      <p className="card-text">Total Ratings: {totalRatings}</p>
      <select className="form-select" aria-label="Default select example" onChange={ratingChangeEventHandler}>
  <option selected>Select Rating</option>
  <option value="1">1</option>
  <option value="2">2</option>
  <option value="3">3</option>
  <option value="4">4</option>
  <option value="5">5</option>
</select>
      <input className="btn btn-primary" type="submit" value="Submit" onClick={ratingSubmissionHandler}></input>
    </div>
    <Link to="/comment" onClick={()=>handleCommentClick(hotelDesc)}>Comment</Link>
    <button >Test Button</button>
  </div>
  )
}
